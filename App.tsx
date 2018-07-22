/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Moment from 'moment';

interface State {
    currentTime: string;
}

type Props = {};
export default class App extends Component<Props, State> {

    private interval: any;

    constructor(props: any) {
        super(props);
        this.state = {
            currentTime: ''
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
        backgroundColor: '#F5FCFF',
    },
    currentTime: {
        fontSize: 100,
        textAlign: 'center',
        margin: 10
    }
});
