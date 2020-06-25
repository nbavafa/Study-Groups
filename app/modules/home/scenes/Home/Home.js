import React from 'react';
import {View,
        FlatList,
        ActivityIndicator,
        TextInput,
        Text,
        TouchableOpacity,
        ScrollView
} from 'react-native';

import {connect} from 'react-redux';

import {actions as home} from "../../index"
const { getQuotes } = home;

import styles from "./styles"
import Quote from "../../components/Quote"
import { auth } from "../../../../config/firebase";

const BLUE = "rgb(183, 203, 233)"

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
          searchCode: "",
          searchNum: "",
          onlyShowLiked: false,
          likedTextColor: "#aaa",
          myTextColor: "#aaa",
          onlyShowMy: false
        }

        this.renderItem = this.renderItem.bind(this);
        this.onSearchNumChange = this.onSearchNumChange.bind(this);
        this.onSearchCodeChange = this.onSearchCodeChange.bind(this);
        this.onShowLikedChange = this.onShowLikedChange.bind(this);
        this.onShowMyChange = this.onShowMyChange.bind(this);

    }

    componentDidMount() {
        this.props.getQuotes((error) => alert(error.message))
    }

    onSearchCodeChange(searchCode) {
      this.setState({searchCode: searchCode.toUpperCase()})
    }

    onSearchNumChange(searchNum) {
      this.setState({searchNum: searchNum.toUpperCase()})
    }

    onShowLikedChange() {
      this.setState({onlyShowLiked: !this.state.onlyShowLiked})
      if (this.state.likedTextColor === "#aaa") {
        this.setState({likedTextColor: BLUE})
      }
      else {
        this.setState({likedTextColor: "#aaa"})
      }
    }

    onShowMyChange() {
      this.setState({onlyShowMy: !this.state.onlyShowMy})
      if (this.state.myTextColor === "#aaa") {
        this.setState({myTextColor: BLUE})
      }
      else {
        this.setState({myTextColor: "#aaa"})
      }
    }

    renderItem({item, index, searchCode, searchNum}) {
        return <Quote index={index}
                      searchNum={searchNum}
                      searchCode={searchCode}
                />
    }

    render() {
        {/*
        else if (auth.currentUser.emailVerified === false) {
          return (<View style={{justifyContent: 'center', alignSelf: 'center', alignContent: 'center', marginTop: 20, marginHorizontal: 30}}>
                <Text style={{fontSize: 25, fontWeight: '200'}}>
                  Your email has not be verified.{"\n"}Please check your .edu email for verification instructions!
                </Text>
                <Text style={{fontSize: 20, fontWeight: '100', marginTop: 40, flex: 1, flexWrap: 'wrap'}}>
                  If you believe you are seeing this in error, make sure the link gave you a confirmation message and reload this application
                </Text>
          </View>);
        }
        */}
        if (this.props.isLoading){
            return(
                <View style={styles.activityIndicator}>
                    <ActivityIndicator animating={true}/>
                </View>
            )
        }
        else {
            return (
              <ScrollView style={{marginBottom: 10, paddingTop: 10}}>
             <TextInput
                 multiline={false}
                 onChangeText={this.onSearchCodeChange}
                 placeholder={"Subject Code"}
                 style={styles.searchBar}
                 value={this.state.searchCode}
                 autoCorrect={false}
                 spellCheck={false}
                 //autoFocus={true}
                 placeholderTextColor={"#aaa"}
             />

             <TextInput
                 multiline={false}
                 onChangeText={this.onSearchNumChange}
                 placeholder={"Course Number"}
                 style={styles.searchBar}
                 value={this.state.searchNum}
                 autoCorrect={false}
                 spellCheck={false}
                 //autoFocus={true}
                 placeholderTextColor={"#aaa"}
             />
             <View style={{flexDirection: 'row', width: '100%'}}>
                 <TouchableOpacity
                        onPress={this.onShowMyChange}
                        style={{margin: 10,
                                padding: 6,
                                width: '45%',
                                borderRadius: 20,
                                //backgroundColor: BLUE,

                                alignItems: 'center',
                                alignSelf: 'flex-start',
                                backgroundColor: this.state.myTextColor
                              }} >
                    <Text style={{color: "white",fontSize: 16}}>
                            Show My Groups
                    </Text>
                 </TouchableOpacity>


                 <TouchableOpacity
                        onPress={this.onShowLikedChange}
                        style={{margin: 10,
                                padding: 6,
                                borderRadius: 20,
                                width: '45%',
                                //backgroundColor: BLUE,
                                alignItems: 'center',
                                alignSelf: 'flex-end',
                                backgroundColor: this.state.likedTextColor
                              }} >
                    <Text style={{color: "white",fontSize: 16}}>
                            Show Liked Groups
                    </Text>
                  </TouchableOpacity>

            </View>

            <FlatList
                ref='listRef'
                data={this.props.quotes}
                extraData={this.state}
                //keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => <Quote index={index}
                                          searchNum={this.state.searchNum}
                                          searchCode={this.state.searchCode}
                                          onlyShowLiked={this.state.onlyShowLiked}
                                          onlyShowMy={this.state.onlyShowMy}
                                        />
                           }
                initialNumToRender={5}
            />

            </ScrollView>


            );
        }
    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.homeReducer.isLoading,
        quotes: state.homeReducer.quotes
    }
}

export default connect(mapStateToProps, { getQuotes })(Home);
