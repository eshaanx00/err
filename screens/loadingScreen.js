import React, { Component } from 'react'
import {View,Text,} from 'react-native';
import firebase from 'firebase';

export default class LoadingScreen extends Component {
    componentDidMount() {
        this.checkIfLoggedIn();
    }
    checkIfLoggedIn=()=>{
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                this.props.navigation.navigate('DashBoardScreen')
            }else{
                this.props.navigation.navigate('LoginScreen');
            }
        })
    }
    render() {
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text></Text>
            </View>
        )
    }
}
