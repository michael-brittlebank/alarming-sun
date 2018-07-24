import React from 'react'
import { Component } from 'react';
import { Alert, Animated, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
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
    alarm: {
        brightnessActivated: boolean
    };
    animations: {
        opacity: Value;
        backgroundColor: Value;
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
        fontFamily: "Eczar",
        fontSize: 100,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        padding: 25
    },
    // buttons
    buttonSleep: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: 200,
        height: 100,
        backgroundColor: 'red'
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

export default class App extends Component<{}, State> {

    private interval: any;
    private transitionPeriod: number = 5000; // todo, replace with 10 minutes
    private sunriseAnimation: any;

    constructor(props: any) {
        super(props);
        this.state = {
            currentTime: Moment().format('HH:mm:ss'),
            alarm: {
                brightnessActivated: false
            },
            animations: {
                opacity: new Animated.Value(0),
                backgroundColor: new Animated.Value(backgroundColours.RED)
            }
        };
        this._onPressSleep = this._onPressSleep.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(
            () => {
                let timeToWakeUp: boolean = true; // todo, replace with timer setting
                if (timeToWakeUp && !this.state.alarm.brightnessActivated) {
                    // only activate brightness once
                    this._activateScreenBrightness();
                    // start sunrise animations
                    this.sunriseAnimation = Animated.sequence([
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
                    this.setState({
                        currentTime: Moment().format('HH:mm:ss'),
                        alarm: {
                            ...this.state.alarm,
                            brightnessActivated: true
                        }
                    });
                } else {
                    this.setState({
                        currentTime: Moment().format('HH:mm:ss'),
                    });
                }
            },
            1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        // todo, add brightness/light off/on button
        // todo, add route for setting alarm time
        return (
            <View style={styles.container}>
                {/*sunrise*/}
                <Animated.View
                    style={{
                        ...styles.underlay,
                        opacity: this.state.animations.opacity,
                        backgroundColor: this.state.animations.backgroundColor.interpolate({
                            inputRange: [backgroundColours.RED, backgroundColours.ORANGE, backgroundColours.YELLOW],
                            outputRange: ['rgb(231,58,46)', 'rgb(252,114,61)', 'rgb(254,226,94)']
                        })
                    }}/>
                {/*clock face*/}
                <Text style={styles.currentTime}
                      adjustsFontSizeToFit
                      numberOfLines={1}>{this.state.currentTime}</Text>
                {/* sleep button */}
                <TouchableNativeFeedback
                    onPress={this._onPressSleep}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={styles.buttonSleep}>
                        <Text>Button</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }

    private _activateScreenBrightness(): void {
        //get the current brightness
        SystemSetting.getBrightness().then((brightness: any)=> {
            console.log('Current brightness is ' + brightness);
        });
        //change the brightness & check permission
        // todo, animate over 30 seconds
        SystemSetting.setBrightnessForce(1.0)
            .then((success: boolean) => {
                !success && Alert.alert('Permission Deny', 'You have no permission changing settings',[
                    {'text': 'Ok', style: 'cancel'},
                    {'text': 'Open Setting', onPress:()=>SystemSetting.grantWriteSettingPremission()}
                ]);
                // save the value of brightness and screen mode.
                return SystemSetting.saveBrightness();
            })
            .then(() => {
                // log new brightness
                SystemSetting.getBrightness().then((brightness: any)=>{
                    console.log('new brightness is ' + brightness);
                });
            });
    }

    private _onPressSleep(): void {
        if (this.state.alarm.brightnessActivated) {
            // stop animations
            this.state.animations.backgroundColor.stopAnimation();
            this.state.animations.opacity.stopAnimation();
            // reset initial colour
            this.setState({
                animations: {
                    opacity: new Animated.Value(0),
                    backgroundColor: new Animated.Value(backgroundColours.RED)
                }
            })
        }
    }
}
