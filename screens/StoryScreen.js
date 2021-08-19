import React, {
    Component
} from 'react'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image
} from "react-native";
import {
    RFValue
} from "react-native-responsive-fontsize";
import StoryCard from "./StoryCard";
import * as Speech from "expo-speech";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import {
    FlatList, TouchableOpacity
} from "react-native-gesture-handler";

let customFonts = {
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

let stories = require("./temp_stories.json");

export default class StoryScreen extends Component {
    constructor() {
        super();
        this.state={
            fontsLoaded: false,
            speakerColor:'gray',
            speakerIcon:'volume-high-outline'
        };
    }
    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
}
    
    componentDidMount() {
        this._loadFontsAsync();
    }

    async initiateTTS(title,author,story,moral){
        const current_color = this.state.speakerColor;
        this.setState({ speakerColor: current_color==='gray' ? "#ee8249" : "gray" });
        if(current_color === 'gray'){
            Speech.speak(`${title} by ${author}`);
            Speech.speak(story)
            Speech.speak("The moral of the story is")
            Speech.speak(moral);
        }else{
            Speech.stop();
        }
    }
    
    render() {
        if(!this.props.route.params){
            this.props.navigation.navigate('Home')
        }else if(!this.state.fontsLoaded){
            return <AppLoading/>
        }else{
            return(
                <View style={styles.container}>
                    <SafeAreaView style={styles.safeDroidView}></SafeAreaView>
                    <View style={styles.Head}>
                        <View style={styles.Top}>
                            <Image source={require('../assets/logo.png')}></Image>
                        </View>
                        <View style={{flex:0.7,justifyContent:'center'}}>
                            <Text style={styles.HeadStyle}>Story Telling App</Text>
                        </View>
                    </View> 
                    <View style={{flex:1}}>
                    <ScrollView style={{margin:RFValue(20),backgroundColor:'#2f345d',borderRadius:RFValue(20),}}>
                        <Image source={require('../assets/story_image_1.png')} style={{width:'100%',alignSelf:'center',borderTopLeftRadius:RFValue(20),borderTopRightRadius:RFValue(20),resizeMode:'contain',height:RFValue(200)}}></Image>
                        <View style={{flexDirection:'row',padding:RFValue(20)}}>
                            <View style={styles.titleContainer}>
                            <Text style={styles.storyTitleText}>
                            {this.props.route.params.story.title}
                            </Text>
                            <Text style={styles.storyAuthorText}>
                            {this.props.route.params.story.author}
                            </Text>
                            <Text style={styles.descriptionText}>
                            {this.props.route.params.story.created_on}
                            </Text>
                            </View>
                            <View style={{flex:0.2}}>
                                <TouchableOpacity onPress={()=>this.initiateTTS(
                                    this.props.route.params.story.title,
                                    this.props.route.params.story.author,
                                    this.props.route.params.story.story,
                                    this.props.route.params.story.moral,
                                )}><Ionicons name={this.state.speakerIcon} size={RFValue(30)} color={this.state.speakerColor} style={{margin:RFValue(15),}}>
                                    </Ionicons></TouchableOpacity>
                            </View>
                        </View>
                        <View style={{padding:RFValue(20)}}>
                            <Text style={styles.storyStyle}>{this.props.route.story.story}</Text>
                            <Text style={styles.moralStyle}>Moral : {this.props.route.moral.moral}</Text>
                        </View>
                        <View style={{justifyContent:'center',alignItems:'center',margin:RFValue(10)}}>
                            <View style={{width:RFValue(160),height:RFValue(40),flexDirection:'row',backgroundColor:'#eb3948',justifyContent:'center',alignItems:'center',borderRadius:RFValue(30),}}>
                                <Ionicons name={"heart"} size={RFValue(30)} color={"white"}></Ionicons>
                                <Text style={styles.likeStyle}>12K</Text>
                            </View>
                        </View>
                        </ScrollView>
                    </View>

                </View>
            )
        }
        
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#15193c',
    },safeDroidView:{
        marginTop:Platform.OS==='android'?StatusBar.currentHeight:RFValue(35)
    },Head:{
        flex:0.07,
        flexDirection: "row",
    },Top:{
        flex:0.3,
        justifyContent: "center",
        alignItems: "center",
    },HeadStyle: {
        color:'white',
        fontSize:RFValue(28),
        fontFamily:'Bubblegum-Sans',
    }, titleContainer: {
        flex:0.8
    },
        storyTitleText: {
        fontSize: RFValue(25),
        fontFamily: "Bubblegum-Sans",
        color: "white"
      },
      storyAuthorText: {
        fontSize: RFValue(18),
        fontFamily: "Bubblegum-Sans",
        color: "white"
      },
      descriptionText: {
        fontSize: RFValue(18),
        fontFamily: "Bubblegum-Sans",
        color: "white"
      },storyStyle:{
        fontSize: RFValue(15),
        fontFamily: "Bubblegum-Sans",
        color: "white"
      },moralStyle:{
        fontSize: RFValue(20),
        fontFamily: "Bubblegum-Sans",
        color: "white"
      },likeStyle:{
        color: "white",
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(25),
        marginLeft:RFValue(5)
      }
})