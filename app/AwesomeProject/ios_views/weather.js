import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import TWebView from './webview';
const url = 'http://127.0.0.1:5500/html/weather.html';
class WeatherView extends Component{
    render(){
        return(
            <TWebView url={url} isWeather={true}></TWebView>
        )
    }
}
var styles=StyleSheet.create({
})

module.exports=WeatherView;