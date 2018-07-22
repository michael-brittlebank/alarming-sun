/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Moment from 'moment';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

interface State {
    currentTime: string;
}

type Props = {};
export default class App extends Component<Props, State> {

    private interval: any;

    constructor(props: any) {
        super(props);
        this.state = {
            currentTime: Moment().format('HH:mm:ss')
        };
    }

    componentDidMount() {
        this.interval = setInterval(
            () => {
                this.setState({
                    currentTime: Moment().format('HH:mm:ss')
                });
            },
            1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>{this.state.currentTime}</Text>
                <Text style={styles.instructions}>To get started, edit App.js</Text>
                <Text style={styles.instructions}>{instructions}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
