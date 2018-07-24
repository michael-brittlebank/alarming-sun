import React from 'react'
import { Component } from 'react';
import { Alert, Animated, StyleSheet, Text, View } from 'react-native';
import Moment from 'moment';
import SystemSetting from 'react-native-system-setting'
import Value = Animated.Value;

enum backgroundColours {
    // order is important for transitioning between enum values
    RED,
    ORANGE,
    YELLOW
}

interface State {
    currentTime: string;
    tick: boolean;
    animations: {
        opacity: Value;
        backgroundColor: Value;
    }
}

type Props = {};
export default class App extends Component<Props, State> {

    private interval: any;
    private transitionPeriod: number = 5000; // todo, replace with 10 minutes

    constructor(props: any) {
        super(props);
        this.state = {
            currentTime: '',
            tick: false,
            animations: {
                opacity: new Animated.Value(0),
                backgroundColor: new Animated.Value(backgroundColours.RED)
            }
        };
    }

    componentDidMount() {
        Animated.sequence([
            Animated.timing(
                this.state.animations.opacity,
                {
                    toValue: 1,
                    duration: 5000, // todo, update to 30 seconds
                    delay: 5000 // todo, determine if this is a transition period
                }
            ),
            Animated.timing(
                this.state.animations.backgroundColor,
                {
                    toValue: backgroundColours.YELLOW,
                    duration: this.transitionPeriod * (Object.keys(backgroundColours).length - 1),
                    delay: this.transitionPeriod
                }
            )
        ]).start();
        this.interval = setInterval(
            () => {
                this.setState({
                    currentTime: Moment().format('HH:mm:ss'),
                    // tick: !this.state.tick
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
                <Animated.View
                    style={{
                        ...styles.underlay,
                        opacity: this.state.animations.opacity,
                        backgroundColor: this.state.animations.backgroundColor.interpolate({
                            inputRange: [backgroundColours.RED, backgroundColours.ORANGE, backgroundColours.YELLOW],
                            outputRange: ['rgb(231,58,46)', 'rgb(252,114,61)', 'rgb(254,226,94)']
                        })
                    }}></Animated.View>
                <Text style={styles.currentTime}>{this.state.currentTime}</Text>
            </View>
        );
    }
}

const styles: any = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    underlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0
    },
    currentTime: {
        flex: 2,
        fontSize: 100,
        textAlign: 'center',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    // colors
    yellow: {
        backgroundColor: '#fee25e'
    },
    orange: {
        backgroundColor: '#fc723d'
    },
    red: {
        backgroundColor: '#e73a2e'
    }
});
