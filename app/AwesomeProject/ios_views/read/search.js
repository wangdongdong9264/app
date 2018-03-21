import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

import Util from './../util';
import List from './list';
class Search extends Component{
    render(){
        return(
            <View style={styles.container}>
                 <TextInput
                    style={styles.search_input}
                    placeholder="搜索"
                    onSubmitEditing={this._onSubmitEditing.bind(this)}
                    returnKeyType='search'
                    placeholderTextColor='#494949'
                    autoFocus={false}
                    onChangeText={this._onChangeText}
                />
            </View>
        )
    }
    _onChangeText(){

    }
    _onSubmitEditing(){
        this.props.navigator.push({
            component: List,
            title: '互联网资讯',
            passProps: {
                type:'it'
            },
            barTintColor:'#fff'
        })
    }
}
var styles=StyleSheet.create({
    container:{
        height:70, 
        borderBottomWidth:Util.pixel,
        borderColor:'#ccc'
    },
    search_input:{
        marginLeft: 10,
        marginRight: 10,
        height: 35,
        borderWidth: Util.pixel,
        borderColor: '#ccc',
        borderRadius:3,
        marginTop:25,
        paddingLeft:10,
        fontSize:15
    }
    
})

module.exports=Search;