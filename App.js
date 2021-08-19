import * as React from "react";
import {createSwitchNavigator,createAppContainer} from "react-navigation";
import firebase from 'firebase';
import {firebaseConfig} from './config.js';
import DashBoardScreen from './screens/dashBoardScreen'
import LoadingScreen from './screens/loadingScreen';
import LoginScreen from './screens/loginScreen'


export default function App() {
  return (
    <AppNavigator/>
  );
}
const appSwitchNavigator = createSwitchNavigator({
  LoadingScreen : LoadingScreen,
  LoginScreen: LoginScreen,
  DashBoardScreen:DashBoardScreen,
})
const AppNavigator = createAppContainer(appSwitchNavigator);