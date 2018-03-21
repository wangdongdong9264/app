import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  NavigatorIOS,
  RefreshControl,
  ActivityIndicator
} from 'react-native';

import Recommend from './read/recommend';
import Category from './read/category';
import Search from './read/search';
import Topic from './read/topic';
import Util from './util'

class ReadView extends Component{
    constructor(props){
        super(props);
        this.state={
            isShow:false,
            refreshing:false,
            recommendTopic:null,
            hotTopic:null,
            category:null,
            other:null
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <Search
                    navigator={this.props.navigator}
                >
                </Search>
                {
                    this.state.isShow?
                    (
                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                >
                                </RefreshControl>
                            }
                            style={[styles.container,{paddingTop:20}]}
                        >
                            <Topic
                                data={this.state.recommendTopic}
                                navigator={this.props.navigator}
                                type='manager'
                            ></Topic>
                            <HrLine></HrLine>
                            <Recommend
                                title='热门推荐'
                                data={this.state.hotTopic}
                                navigator={this.props.navigator}
                                type='it'
                            ></Recommend>
                            <HrLine></HrLine>
                            <Category
                                data={this.state.category} 
                                navigator={this.props.navigator}
                            ></Category>
                            <Recommend
                                title="清新一刻" 
                                data={this.state.other} 
                                navigator={this.props.navigator} 
                                type="sanwen"
                            >
                            </Recommend>
                            <Space></Space>
                        </ScrollView>
                    )
                    :
                    (
                        <ActivityIndicator
                            animating={true}
                            style={[{height:80}]}
                            size='large'
                        >    
                        </ActivityIndicator>
                    )
                }
            </View>
        )
    }
    componentDidMount(){
        this._fetchData();
    }
    _fetchData(callback){
        var self=this;
        Util.get('http://172.0.0.1:3001/data/read?type=config',
            function (data) {
                if(data.status===1){
                    let obj=data.data;
                    self.setState({
                        isShow:true,
                        recommendTopic:obj.recommendTopic,
                        hotTopic:obj.hotTopic,
                        category:obj.category,
                        other:obj.other,
                        refreshing:false
                    })
                }else{
                    alert('服务异常,正在紧急修复,请耐心等待');
                }
            },
            function (err) {
                alert(err);
                alert('服务异常,正在紧急修复,请耐心等待2');
            }
        )
    }
    _onRefresh(){
        var self=this;
        this.setState({
            refreshing:true
        });
        this._fetchData();
    }
}
class HrLine extends Component{
    render(){
        return (
            <View style={styles.hr}></View>
        )
    }
}

class Read extends Component{
    render(){
        return(
            <NavigatorIOS
                style={styles.container}>
                initialRoute={{
                    component: ReadView,
                    title: '阅读',
                    navigationBarHidden:true
        }}
            </NavigatorIOS>
        )
    }
}
class Space extends Component{
    render(){
        return(
            <View style={styles.space}></View>
        )
    }
}

var styles=StyleSheet.create({
    container:{
        flex:1
    },
    hr:{
        borderWidth: Util.pixel,
        borderColor: '#ccc',
        marginTop:20,
        marginBottom:10
    },
    space:{
        height:70
      }
})

module.exports=ReadView;