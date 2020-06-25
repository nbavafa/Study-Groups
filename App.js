import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import Router from './app/config/routes'
import store from './app/redux/store';

function cacheFonts(fonts) {
    return fonts.map(font => Font.loadAsync(font));
}

export default class App extends Component<{}> {
    constructor() {
        super();
        this.state = {
            loading: true,
            isReady: false,
        }
    }
    // async componentDidMount() {
    //    await Font.loadAsync({
    //      // 'Roboto': require('native-base/Fonts/Roboto.ttf'),
    //      // 'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    //      'RobotoExtraBold': require('./app/assets/fonts/Raleway-Black.ttf'),
    //      'RobotoBold': require('./app/assets/fonts/Raleway-Bold.ttf'),
    //      'RobotoMedium': require('./app/assets/fonts/Raleway-Medium.ttf'),
    //      'RobotoRegular': require('./app/assets/fonts/Raleway-Regular.ttf'),
    //      'RobotoLight': require('./app/assets/fonts/Raleway-Light.ttf'),
    //      'RobotoThinItalic': require('./app/assets/fonts/Raleway-ThinItalic.ttf'),
    //    })
    //    this.setState({ loading: false })
    //  }

    async _loadAssetsAsync() {
        /*const fontAssets = cacheFonts([
            {RobotoExtraBold: require('./app/assets/fonts/Roboto-Black.ttf')},
            {RobotoBold: require('./app/assets/fonts/Roboto-Bold.ttf')},
            {RobotoMedium: require('./app/assets/fonts/Roboto-Medium.ttf')},
            {RobotoRegular: require('./app/assets/fonts/Roboto-Regular.ttf')},
            {RobotoLight: require('./app/assets/fonts/Roboto-Light.ttf')},
            {RobotoThinItalic: require('./app/assets/fonts/Roboto-ThinItalic.ttf')}

        ]);*/

        const fontAssets = cacheFonts([
            {RobotoExtraBold: require('./app/assets/fonts/Raleway-Black.ttf')},
            {RobotoBold: require('./app/assets/fonts/Raleway-Bold.ttf')},
            {RobotoMedium: require('./app/assets/fonts/Raleway-Medium.ttf')},
            {RobotoRegular: require('./app/assets/fonts/Raleway-Regular.ttf')},
            {RobotoLight: require('./app/assets/fonts/Raleway-Light.ttf')},
            {RobotoThinItalic: require('./app/assets/fonts/Raleway-ThinItalic.ttf')}

        ]);

        await Promise.all([...fontAssets]);
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => this.setState({isReady: true})}
                    onError={console.warn}
                />
            );
        }

        return (
            <Provider store={store}>
                    <Router/>
            </Provider>
        );
    }
}
