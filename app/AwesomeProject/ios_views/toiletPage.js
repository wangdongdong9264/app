import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';

import TWebView from './webview';

const nearByUrl='http://127.0.0.1:5500/html/nearby.html';
class ToiletPage extends Component{
    render(){
        return(
            <View style={styles.container}>
                <TWebView url={nearByUrl} isNearBy={true}></TWebView>
                {/* <TWebView url='https://cn.bing.com'></TWebView> */}
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1
    }
})

module.exports=ToiletPage;