import React from 'react';

import { Text, View, TouchableOpacity, TextInput, Dimensions } from 'react-native';

import { Icon } from 'react-native-elements'
import moment from "moment";

import styles from "./styles"
import { connect } from "react-redux";

import { actions, theme } from "../../index"
import { Actions } from "react-native-router-flux";

import ActionSheet from 'react-native-actionsheet'

const { deleteQuote, toggleLove } = actions;
const { normalize } = theme;

var {height, width} = Dimensions.get('window');

const truncateD = (str, len) => {
  if (str.length > len) {
    return str.substring(0, (len-1))
  }
  else {
    return str
  }
}

class Quote extends React.Component {
    constructor() {
        super();
        this.state = {
        }

        this.onOption = this.onOption.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onToggleLove = this.onToggleLove.bind(this);

        this.renderLoveButton = this.renderLoveButton.bind(this);
    }

    componentWillMount() {
      const { user, quotes, index, searchNum, searchCode, onlyShowLiked, onlyShowMy} = this.props;
      const quote = quotes[index];

      if (this.calc_day(quote.selectedStartDate)) {
        this.onDelete()
      }
    }

    onOption(){
        const { quotes, index } = this.props;
        const quote = quotes[index];


        this.ActionSheet.show()
        /*
        ActionSheetIOS.showActionSheetWithOptions({
                options: ['Edit', 'Delete', 'Cancel'],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 2,
            },
            (buttonIndex) => {
                if (buttonIndex === 0) Actions.NewQuote({ edit:true, quote })
                else if (buttonIndex === 1) this.onDelete();
            });
            */
    }

    onDelete(){
        const { quotes, index } = this.props;
        const quote = quotes[index];

        this.props.deleteQuote(quote, (error) =>  alert(error.message))
    }

    onToggleLove(){
        const { user, quotes, index } = this.props;
        const quote = quotes[index];

        const data = { quote, uid:user.uid };

        this.props.toggleLove(data, (error) =>  alert(error.message))
    }

    renderOptionButton(){
        return(
            <View>
                <TouchableOpacity onPress={this.onOption}>
                    <View style={styles.buttonContainer}>
                        <Icon
                            name={'md-more'}
                            type='ionicon'
                            color='#fff'
                            size={normalize(30)}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    renderLoveButton(){
        const { user, quotes, index } = this.props;
        const quote = quotes[index];
        const { loves } = quote;

        return(
            <TouchableOpacity onPress={this.onToggleLove}>
                <View style={styles.buttonContainer}>
                    <Icon
                        name={
                            (loves && loves[user.uid]) ?
                                'md-checkbox'
                                :
                                'md-checkbox-outline'
                        }
                        type='ionicon'
                        color='#fff'
                        iconStyle={{height:normalize(40)}}
                        size={normalize(40)}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    getFormattedTime(str) {
      var arr = str.split(":")
      var toReturn = "";
      var hour = Math.floor(parseInt(arr[0]) / 12)

      if ( hour === 1 ) {
          toReturn = parseInt(arr[0]) % 12 + ":" + arr[1] + " PM"
      }
      else {
        toReturn = arr[0] + ":" +arr[1] + " AM"
      }
      return toReturn;

    }

    calc_day(str) {
      var today = new Date();
      var day = Math.ceil((today - new Date(today.getFullYear(),0,1)) / 86400000);

      var year = today.getFullYear()
      var study_year = parseInt(str.split(",")[2].substring(1))

      if ((study_year - year) < 0 ) { return true }

      var str_arr = str.substring(5)
      var study_date = new Date(str_arr + " 00:00:00")
      var study_day = Math.ceil((study_date - new Date(study_date.getFullYear(),0,1)) / 86400000) + 1;

      if (study_day > 363) {
        if (day > 2) {
          return true
        }
        else {
          return false
        }
      }
      else {
        if ((study_day - day) < -2) {
          return true;
        }
        else {
          return false;
        }
      }

    }

    render() {
        var { user, quotes, index, searchNum, searchCode, onlyShowLiked, onlyShowMy} = this.props;
        var quote = quotes[index];

        const { code, number, selectedStartDate, author, time, color, userId, desc, location, group_time} = quote;
        var foundLove = false

        if (quote.loves != null) {
          if (quote.loves[user.uid]) {
            foundLove = true
          }
        }

        var personal = false
        if (onlyShowMy) {
          if (quote.userId === user.uid) {
            personal = true
          }
        }

        if ( (author.school === user.school) &&
             (code.includes(searchCode)) &&
             (number.includes(searchNum)) ) {
               if (onlyShowMy) {
                 if (personal) {
                   return (
                       <View style={[styles.container]}>

                            <View style={[styles.wrapper, {backgroundColor: color, borderColor: color}]}>

                              <View style={{flexDirection: 'row'}}>
                                <View style={{alignSelf: 'flex-start', width: '85%'}}>
                                  <Text style={{fontWeight: "500", fontSize: 26, color: 'white'}}>
                                    {truncateD(code, 4)} {truncateD(number, 4)}
                                  </Text>
                                </View>
                                <View style={{alignSelf: 'flex-end'}}>
                                  {(user.uid === userId) && this.renderOptionButton()}
                                </View>
                              </View>

                              <View style={{flexDirection: 'row'}}>
                                <Text style={{marginLeft: 10, fontWeight: '200', fontSize: 22, color: 'white'}}>
                                  Location:
                                </Text>

                                <Text style={{marginLeft: 10, fontWeight: '300', fontSize: 22, color: 'white', flex: 1, flexWrap: 'wrap'}}>
                                  {truncateD(location, 50)}
                                </Text>
                              </View>

                              <View style={{flexDirection: 'row'}}>
                                <Text style={{marginLeft: 10, fontWeight: '200', fontSize: 22, color: 'white'}}>
                                  Time:
                                </Text>

                                <Text style={{marginLeft: 10, fontWeight: '300', fontSize: 22, color: 'white'}}>
                                  {this.getFormattedTime(group_time)}
                                </Text>
                              </View>

                              <View style={{flexDirection: 'row'}}>
                                <Text style={{marginLeft: 10, fontWeight: '200', fontSize: 22, color: 'white'}}>
                                  Date:
                                </Text>

                                <Text style={{marginLeft: 10, fontWeight: '300', fontSize: 22, color: 'white'}}>
                                  {selectedStartDate}
                                </Text>
                              </View>

                              <View style={{flexDirection: 'row', marginTop: 6, maxWidth: 10}}>
                                <Text style={{marginLeft: 10, fontWeight: '200', fontSize: 22, color: 'white'}}>
                                  Description:
                                </Text>

                                <Text style={{marginLeft: 10, fontWeight: '300', fontSize: 22, color: 'white', flex: 1, flexWrap: 'wrap'}}>
                                  Description: {truncateD(desc, 280)}
                                </Text>
                              </View>

                               <View style={styles.bottom}>

                                   <View style={styles.left}>
                                       <Text style={[styles.author]}>
                                           {author.name}
                                       </Text>
                                       <Text style={[styles.publishedAt]}>
                                           {moment(time).fromNow()}
                                       </Text>
                                   </View>

                                   <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>

                                        <View style={{backgroundColor: 'rgba(255, 255, 255, .7)',
                                                      borderRadius: 15,
                                                      width: 30,
                                                      justifyContent: 'center',
                                                      alignItems: 'center'
                                                    }}>
                                          <Text style={{fontSize: 20, color: color}}>{quote.loveCount}</Text>
                                        </View>
                                       {this.renderLoveButton()}
                                   </View>
                               </View>

                               <ActionSheet
                                   ref={o => this.ActionSheet = o}
                                   title={"Options"}
                                   options={['Edit', 'Delete', 'Cancel']}
                                   destructiveButtonIndex={1}
                                   cancelButtonIndex={2}
                                   onPress={(buttonIndex) => {
                                       if (buttonIndex === 0) {
                                           Actions.NewQuote({ edit:true, quote })

                                       }
                                       else if (buttonIndex === 1) this.onDelete();
                                   }}
                               />
                           </View>

                       </View>
                   );
                 }
                 else { return null }
               }
               else if (onlyShowLiked) {
                 if (foundLove) {
                   return (
                       <View style={[styles.container]}>

                            <View style={[styles.wrapper, {backgroundColor: color, borderColor: color}]}>

                              <View style={{flexDirection: 'row'}}>
                                <View style={{alignSelf: 'flex-start', width: '85%'}}>
                                  <Text style={{fontWeight: "500", fontSize: 26, color: 'white'}}>
                                    {truncateD(code, 4)} {truncateD(number, 4)}
                                  </Text>
                                </View>
                                <View style={{alignSelf: 'flex-end'}}>
                                  {(user.uid === userId) && this.renderOptionButton()}
                                </View>
                              </View>

                              <View style={{flexDirection: 'row'}}>
                                <Text style={{marginLeft: 10, fontWeight: '200', fontSize: 22, color: 'white'}}>
                                  Location:
                                </Text>

                                <Text style={{marginLeft: 10, fontWeight: '300', fontSize: 22, color: 'white', flex: 1, flexWrap: 'wrap'}}>
                                  {truncateD(location, 50)}
                                </Text>
                              </View>

                              <View style={{flexDirection: 'row'}}>
                                <Text style={{marginLeft: 10, fontWeight: '200', fontSize: 22, color: 'white'}}>
                                  Time:
                                </Text>

                                <Text style={{marginLeft: 10, fontWeight: '300', fontSize: 22, color: 'white'}}>
                                  {this.getFormattedTime(group_time)}
                                </Text>
                              </View>

                              <View style={{flexDirection: 'row'}}>
                                <Text style={{marginLeft: 10, fontWeight: '200', fontSize: 22, color: 'white'}}>
                                  Date:
                                </Text>

                                <Text style={{marginLeft: 10, fontWeight: '300', fontSize: 22, color: 'white'}}>
                                  {selectedStartDate}
                                </Text>
                              </View>

                              <View style={{flexDirection: 'row', marginTop: 6}}>
                                <Text style={{marginLeft: 10, fontWeight: '200', fontSize: 22, color: 'white'}}>
                                  Description:
                                </Text>

                                <Text style={{marginLeft: 10, fontWeight: '300', fontSize: 22, color: 'white', flex: 1, flexWrap: 'wrap'}}>
                                  {truncateD(desc, 280)}
                                </Text>
                              </View>

                               <View style={styles.bottom}>

                                   <View style={styles.left}>
                                       <Text style={[styles.author]}>
                                           {author.name}
                                       </Text>
                                       <Text style={[styles.publishedAt]}>
                                           {moment(time).fromNow()}
                                       </Text>
                                   </View>

                                   <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>

                                        <View style={{backgroundColor: 'rgba(255, 255, 255, .7)',
                                                      borderRadius: 15,
                                                      width: 30,
                                                      justifyContent: 'center',
                                                      alignItems: 'center'
                                                    }}>
                                          <Text style={{fontSize: 20, color: color}}>{quote.loveCount}</Text>
                                        </View>
                                       {this.renderLoveButton()}
                                   </View>
                               </View>

                               <ActionSheet
                                   ref={o => this.ActionSheet = o}
                                   title={"Options"}
                                   options={['Edit', 'Delete', 'Cancel']}
                                   destructiveButtonIndex={1}
                                   cancelButtonIndex={2}
                                   onPress={(buttonIndex) => {
                                       if (buttonIndex === 0) {
                                           Actions.NewQuote({ edit:true, quote })

                                       }
                                       else if (buttonIndex === 1) this.onDelete();
                                   }}
                               />
                           </View>

                       </View>
                   );
                 }
                 else { return null }
               }
               else {
                 return (
                     <View style={[styles.container]}>

                         <View style={[styles.wrapper, {backgroundColor: color, borderColor: color}]}>

                             <View style={{flexDirection: 'row'}}>
                               <View style={{alignSelf: 'flex-start', width: '85%'}}>
                                 <Text style={{fontWeight: "500", fontSize: 26, color: 'white'}}>
                                    {truncateD(code, 4)} {truncateD(number, 4)}
                                 </Text>
                               </View>
                               <View style={{alignSelf: 'flex-end'}}>
                                 {(user.uid === userId) && this.renderOptionButton()}
                               </View>
                             </View>

                             <View style={{flexDirection: 'row'}}>
                               <Text style={{marginLeft: 10, fontWeight: '200', fontSize: 22, color: 'white'}}>
                                 Location:
                               </Text>

                               <Text style={{marginLeft: 10, fontWeight: '300', fontSize: 22, color: 'white', flex: 1, flexWrap: 'wrap'}}>
                                  {truncateD(location, 50)}
                               </Text>
                             </View>

                             <View style={{flexDirection: 'row'}}>
                               <Text style={{marginLeft: 10, fontWeight: '200', fontSize: 22, color: 'white'}}>
                                 Time:
                               </Text>

                               <Text style={{marginLeft: 10, fontWeight: '300', fontSize: 22, color: 'white'}}>
                                 {this.getFormattedTime(group_time)}
                               </Text>
                             </View>

                             <View style={{flexDirection: 'row'}}>
                               <Text style={{marginLeft: 10, fontWeight: '200', fontSize: 22, color: 'white'}}>
                                 Date:
                               </Text>

                               <Text style={{marginLeft: 10, fontWeight: '300', fontSize: 22, color: 'white'}}>
                                 {selectedStartDate}
                               </Text>
                             </View>

                             <View style={{flexDirection: 'row', marginTop: 6}}>
                               <Text style={{marginLeft: 10, fontWeight: '200', fontSize: 22, color: 'white'}}>
                                 Description:
                               </Text>

                               <Text style={{marginLeft: 10, fontWeight: '300', fontSize: 22, color: 'white', flex: 1, flexWrap: 'wrap'}}>
                                 {truncateD(desc, 280)}
                               </Text>
                             </View>

                              <View style={styles.bottom}>

                                  <View style={styles.left}>
                                      <Text style={[styles.author]}>
                                          {author.name}
                                      </Text>
                                      <Text style={[styles.publishedAt]}>
                                          {moment(time).fromNow()}
                                      </Text>
                                  </View>

                                  <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>

                                       <View style={{backgroundColor: 'rgba(255, 255, 255, .7)',
                                                     borderRadius: 15,
                                                     width: 30,
                                                     justifyContent: 'center',
                                                     alignItems: 'center'
                                                   }}>
                                         <Text style={{fontSize: 20, color: color}}>{quote.loveCount}</Text>
                                       </View>
                                      {this.renderLoveButton()}
                                  </View>
                              </View>
                             <ActionSheet
                                 ref={o => this.ActionSheet = o}
                                 title={"Options"}
                                 options={['Edit', 'Delete', 'Cancel']}
                                 destructiveButtonIndex={1}
                                 cancelButtonIndex={2}
                                 onPress={(buttonIndex) => {
                                     if (buttonIndex === 0) {
                                         Actions.NewQuote({ edit:true, quote })

                                     }
                                     else if (buttonIndex === 1) this.onDelete();
                                 }}
                             />
                         </View>

                     </View>
                 );
               }
          }
          else {
            return null;
            /*<View style={styles.container}>
              <Text style={[styles.title], {color: '#aaa'}}> No Results Found </Text>
            </View> */
          }
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.authReducer.user,
        quotes: state.homeReducer.quotes
    }
}

export default connect(mapStateToProps, { deleteQuote, toggleLove })(Quote);
