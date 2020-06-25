import React from 'react';

import { View, TouchableOpacity } from 'react-native';

import {Actions} from 'react-native-router-flux'
import {Icon} from 'react-native-elements'

import styles from "./styles"
import {connect} from "react-redux";

import {actions as home, theme} from "../../index"
const { addQuote, updateQuote, updatePosts } = home;
const { normalize } = theme;

import { auth, database } from "../../../../config/firebase";

class SaveButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.onPress = this.onPress.bind(this)
    }

    onPress() {
        const { data } = this.props;
        const { edit } = data;

        if (edit) this.editQuote()
        else this.saveQuote()
    }

    editQuote() {
        let { data } = this.props;
        const {code, number, selectedStartDate, color, desc, location, group_time} = data.data;
        const {quote} = data

        quote['code'] = code;
        quote['number'] = number;
        quote['selectedStartDate'] = selectedStartDate;
        quote['location'] = location;
        quote['desc'] = desc;
        quote['group_time'] = group_time;
        quote['color'] = color;

        this.props.updateQuote(quote, this.onSuccess, this.onError)
    }

    saveQuote(){
        var { data, user} = this.props;
        const user1 = user
        const userRef = database.ref('/users/' + user1.uid);
        userRef.on('value', function(snapshot) {
            user = snapshot
        });
        //console.log(user["lastPosted"]["1"])
        //console.log(user.lastPosted[1])

        const { code, number, selectedStartDate, color, desc, location, group_time} = data.data;

        var lastVal = 0

        try {
          lastVal = user["lastPosted"]["1"]
        } catch(error) {
          console.log("undefined error")
        }


        var diff =  Date.now() - lastVal
        diff = diff / (1000 * 60 * 60)
        if (diff < 24) {
          alert("You can only post two groups within 24 hours... please wait " + (24 - diff).toString().substring(0,4) + " hours before trying again!")
        }
        else {
            const newQuote = {
                code,
                number,
                selectedStartDate,
                color,
                desc,
                location,
                group_time,
                time: Date.now(),
                userId: user1.uid,
                school: user1.school,
                user: user1.username,
                loveCount: 0,
                author: {
                    name: user1.username,
                    school: user1.school
                }
            };

            var firstVal = Date.now()
            try {
              firstVal = user["lastPosted"]["0"]
            } catch(error) {
              console.log("undefined error")
            }

            this.props.updatePosts(Date.now(), firstVal, user1.uid, this.onSuccess, this.onError)
            this.props.addQuote(newQuote, this.onSuccess, this.onError)
        }
    }

    onSuccess(){
        Actions.pop();
    }

    onError(error){
        alert(error.message)
    }

    render() {
        return (
            <TouchableOpacity onPress={this.onPress}>
                <View style={styles.wrapper}>
                    <Icon name={"md-send"}
                          type={"ionicon"}
                          size={25}
                          iconStyle={styles.icon}
                          color={"rgba(0,0,0,.84)"}/>
                </View>
            </TouchableOpacity>
        )
    }
}


function mapStateToProps(state, props) {
    return {
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps, { addQuote, updateQuote, updatePosts })(SaveButton);
