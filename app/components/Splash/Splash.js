import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';

import styles from './styles'

//const LOGO = require("../../assets/images/logo_small.png")
const LOGO = require("../../assets/images/logo_splash.png")

export default class extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Image style={styles.image} source={LOGO}/>
                    <Text style={styles.title}>Study Groups</Text>
                </View>
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            </View>
        );
    }
}
