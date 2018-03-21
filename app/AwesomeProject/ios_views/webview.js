import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';

class TWebView extends Component{
    constructor(props){
        super(props);
        this.state={
            url:this.props.url,
            isMargin:this.props.isMargin,
            isShowErrorPage:false
        }
    }
    render(){
        let url={uri:this.state.url}
        return(
            <View style={styles.container}>
                {
                    this.state.isShowErrorPage?
                        <View style={styles.textView}>
                            <Text style={styles.text}>不好意思,请检查网络连接情况或者报告错误</Text>
                        </View>
                    :
                    <WebView 
                    onError={this._showError.bind(this)}
                    startInLoadingState={true}
                    source={url}
                    style={[{marginTop:this.state.isMargin||-20},styles.container]}
                    startInLoadingState={true}
                    >
                    </WebView>
                }
            </View>
            
        )
    }
    _showError(){
        this.setState({
            isShowErrorPage:true
        })
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1
    },
    text:{
        fontSize:16,
        fontWeight:'300'
    },
    textView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
module.exports=TWebView;