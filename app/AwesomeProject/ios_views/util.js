import React, { Component } from 'react';
import {
    Dimensions,
    PixelRatio
} from 'react-native';

module.exports={
    size:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height
    },
    pixel:1/PixelRatio.get(),
    get:function (url, successCallback, failCallback) {
        fetch(url)
        .then((response) => response.text())
        .then((responseText) => {
          successCallback(JSON.parse(responseText))
        })
        .catch((error) => {
            failCallback(error);
        });
    }
}