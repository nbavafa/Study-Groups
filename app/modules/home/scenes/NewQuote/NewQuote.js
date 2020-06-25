import React from 'react';
import { View,
        TextInput,
        ScrollView,
        TouchableHighlight,
        Text,
        TouchableOpacity } from 'react-native';

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Picker from '@gregfrench/react-native-wheel-picker'
import styles from "./styles"
import CalendarPicker from 'react-native-calendar-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';


const colors = [
    "#EB623A", "#FF553F", "#4F6384", "#F7CDC2",
    "#4E57D4", "#E6A78C",
    "#FE7D72", "#5096CF", "#F99B70", "#646A6A",
]

class NewQuote extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            code: (props.edit) ? props.quote.code : "",
            number: (props.edit) ? props.quote.number : "",
            color: (props.edit) ? props.quote.color : colors[0],
            selectedStartDate: (props.edit) ? props.quote.selectedStartDate : "",

            desc: (props.edit) ? props.quote.desc : "",
            location: (props.edit) ? props.quote.location : "",
            group_time: (props.edit) ? props.quote.group_time : "",

            showCalender: false,
            showTime: false,
        };

        this.onDateChange = this.onDateChange.bind(this);
        this.onChangeNumber = this.onChangeNumber.bind(this);
        this.onChangeCode = this.onChangeCode.bind(this);
        this.onSelectColor = this.onSelectColor.bind(this);

        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
        this.onSelectTime = this.onSelectTime.bind(this);

    }

    componentDidMount() {
        Actions.refresh({showButton: false});
    }

    validSend() {
      const {number, code, selectedStartDate, showCalender, desc, location, group_time} = this.state;

      return ((number.trim().length > 0) && (code.toString().length > 0) &&
              (selectedStartDate.toString().length > 0) )


              // && (desc.trim().length > 0)
              //(location.trim().length > 0) && (group_time.trim().length > 0))
    }

    onChangeCode(code) {
      const {number, selectedStartDate, showCalender, color, desc, location, group_time} = this.state;
      const edit = (this.props.edit); //check if in edit mode
      code = code.replace(/\s/g, '').toUpperCase();

      //if (edit) { data['code'] = this.props.code; }

      this.setState({code: code});
      let data = {code, number, selectedStartDate, showCalender, color, edit, desc, location, group_time}

      var showButton = true
      if (!edit) {
        showButton = this.validSend()
      }

      Actions.refresh({showButton, data});
    }

    onChangeNumber(number) {
        const {code, selectedStartDate, showCalender, color, desc, location, group_time} = this.state;
        const edit = (this.props.edit); //check if in edit mode
        number = number.replace(/\s/g, '').toUpperCase();


        //if (edit) { data['number'] = this.props.quote.number; }

        this.setState({number: number});

        let data = {code, number, selectedStartDate, showCalender, color, edit, desc, location, group_time}

        var showButton = true
        if (!edit) {
          showButton = this.validSend()
        }
        Actions.refresh({showButton, data});

    }

    onSelectColor(color) {
      const {code, number, showCalender, selectedStartDate, desc, location, group_time} = this.state;
      const edit = (this.props.edit); //check if in edit mode

      //if (edit) { data['color'] = this.props.color; }

      this.setState({color: color});
      let data = {code, number, selectedStartDate, showCalender, color, edit, desc, location, group_time}

      var showButton = true
      if (!edit) {
        showButton = this.validSend()
      }

      Actions.refresh({showButton, data});
    }

    onDateChange(selectedStartDateArr) {
      this.setState({showCalender: !this.state.showCalender})

      const {code, number, showCalender, color, desc, location, group_time} = this.state;
      const edit = (this.props.edit); //check if in edit mode

      var selectedStartDate = this.getDate(selectedStartDateArr.toString())

      //if (edit) { data['selectedStartDate'] = this.props.selectedStartDate; }

      this.setState({
        selectedStartDate: selectedStartDate
      });

      let data = {code, number, selectedStartDate, showCalender, color, edit, desc, location, group_time}

      var showButton = true
      if (!edit) {
          showButton = this.validSend()
      }
      Actions.refresh({showButton, data});
    }

    onSelectTime(time) {
        this.setState({showTime: !this.state.showTime})
        const {code, number, showCalender, color, desc, location, selectedStartDate} = this.state;
        const edit = (this.props.edit); //check if in edit mode

        var group_time = this.getTime(time.toString())


        //if (edit) { data['group_time'] = this.props.group_time; }

        this.setState({
          group_time: group_time
        })

        let data = {code, number, selectedStartDate, showCalender, color, edit, desc, location, group_time}

        var showButton = true
        if (!edit) {
            showButton = this.validSend()
        }

        Actions.refresh({showButton, data});
    }

    onDescriptionChange(desc) {
      const {code, number, showCalender, color, group_time, location, selectedStartDate} = this.state;
      const edit = (this.props.edit); //check if in edit mode

      //if (edit) { data['desc'] = this.props.desc; }

      this.setState({desc: desc})
      let data = {code, number, selectedStartDate, showCalender, color, edit, desc, location, group_time}

      var showButton = true
      if (!edit) {
        showButton = this.validSend()
      }
      Actions.refresh({showButton, data})
    }

    onLocationChange(location) {
      const {code, number, showCalender, color, group_time, desc, selectedStartDate} = this.state;
      const edit = (this.props.edit); //check if in edit mode

      //if (edit) { data['location'] = this.props.location; }

      this.setState({location: location})
      let data = {code, number, selectedStartDate, showCalender, color, edit, desc, location, group_time}

      var showButton = true
      if (!edit) {
        showButton = this.validSend()
      }
      Actions.refresh({showButton, data})

    }

    getTime(str) {
      var arr = str.split(' ')
      return arr[4];
    }

    getDate(str) {
        var arr = str.split(' ')
        var toReturn = ""
        var i = 0
        for (i; i < 4; i++) {
          if (i === 0 || i === 2) { toReturn += arr[i] + ", " }
          else { toReturn += arr[i] + " " }
        }
        return toReturn.toString();
    }

    render() {
        const { selectedStartDate, group_time} = this.state

        return (
            <ScrollView style={styles.container}>

                <View style={styles.topContainer}>
                    <TouchableOpacity
                      onPress={() => this.setState({showTime: !this.state.showTime})}
                      title="Pick Time"
                      style={styles.date_button}
                    >
                      <View><Text style={{fontWeight: "300", color: "white", fontSize: 18}}> Pick a Time </Text></View>
                    </TouchableOpacity>


                    <DateTimePicker
                        isVisible={this.state.showTime}
                        onConfirm={this.onSelectTime}
                        mode={'time'}
                        minuteInterval={15}
                        onCancel={() => this.setState({showTime: !this.state.showTime})}
                    />

                    <View>
                      <Text style={styles.date}>Selected Time: {group_time}</Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => this.setState({showCalender: !this.state.showCalender})}
                      title="Pick Date"
                      style={styles.date_button}
                    >
                      <View><Text style={{fontWeight: "300", color: "white", fontSize: 18}}> Pick a Date </Text></View>

                    </TouchableOpacity>


                    <DateTimePicker
                        isVisible={this.state.showCalender}
                        onConfirm={this.onDateChange}
                        mode={'date'}
                        onCancel={() => this.setState({showCalender: !this.state.showCalender})}
                    />

                    <View>
                    <Text style={styles.date}>Selected Date: {selectedStartDate}</Text>
                    </View>

                    <TextInput
                        multiline={false}
                        onChangeText={this.onChangeCode}
                        placeholder={"Subject Code"}
                        style={styles.textInput}
                        value={this.state.code}
                        autoCorrect={false}
                        spellCheck={false}

                        //autoFocus={true}
                        placeholderTextColor={"#ccc"}
                    />

                    <TextInput
                        multiline={false}
                        onChangeText={this.onChangeNumber}
                        placeholder={"Class Number"}
                        style={styles.textInput}
                        value={this.state.number}
                        autoCorrect={false}
                        spellCheck={false}

                        //autoFocus={true}
                        placeholderTextColor={"#ccc"}
                    />

                    <TextInput
                        multiline={false}
                        onChangeText={this.onLocationChange}
                        placeholder={"Location"}
                        style={styles.textInput}
                        value={this.state.location}
                        autoCorrect={false}
                        spellCheck={false}

                        //autoFocus={true}
                        placeholderTextColor={"#ccc"}
                    />

                    <TextInput
                        multiline={true}
                        onChangeText={this.onDescriptionChange}
                        placeholder={"Description"}
                        style={styles.textInput}
                        value={this.state.desc}
                        //autoFocus={true}
                        placeholderTextColor={"#ccc"}
                    />



                </View>

                <View style={styles.bottomContainer}>
                    <ScrollView contentContainerStyle={{alignItems:"center"}}
                                horizontal showsHorizontalScrollIndicator={false}>
                        {
                            colors.map((color, idx) => {
                                return (
                                    <TouchableHighlight
                                        key={idx}
                                        underlayColor={"transparent"}
                                        onPress={() => this.onSelectColor(color)}>
                                        <View style={[
                                            styles.color,
                                            {backgroundColor: color},
                                            (this.state.color === color) && {borderWidth: 3, borderColor: "white"}
                                        ]}>
                                        </View>
                                    </TouchableHighlight>
                                )
                            })
                        }
                    </ScrollView>
                </View>

                <KeyboardSpacer />

            </ScrollView>
        );
    }
}

export default connect(null, {})(NewQuote);
