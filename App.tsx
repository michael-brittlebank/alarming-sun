/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import { Component } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Moment from 'moment';
import SystemSetting from 'react-native-system-setting'

interface State {
    currentTime: string;
    tick: boolean;
}

type Props = {};
export default class App extends Component<Props, State> {

    private interval: any;

    constructor(props: any) {
        super(props);
        this.state = {
            currentTime: '',
            tick: false
        };
    }

    componentDidMount() {
        this.interval = setInterval(
            () => {
                this.setState({
                    currentTime: Moment().format('HH:mm:ss'),
                    tick: !this.state.tick
                });
                console.log(parseInt(Moment().format('ss'), 10));
                //get the current brightness
                SystemSetting.getBrightness().then((brightness: any)=>{
                    console.log('Current brightness is ' + brightness);
                });

//change the brightness & check permission
                SystemSetting.setBrightnessForce(this.state.tick ? 1.0 : 0.0).then((success: any)=>{
                    !success && Alert.alert('Permission Deny', 'You have no permission changing settings',[
                        {'text': 'Ok', style: 'cancel'},
                        {'text': 'Open Setting', onPress:()=>SystemSetting.grantWriteSettingPremission()}
                    ])
                });

// save the value of brightness and screen mode.
                SystemSetting.saveBrightness();
            },
            1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.currentTime}>{this.state.currentTime}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    currentTime: {
        fontSize: 100,
        textAlign: 'center',
        margin: 10,
        color: 'white'
    }
});
