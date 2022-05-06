import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, TextInput, Linking } from 'react-native';
import Constants from 'expo-constants';
import Header from '../shared/header';


export default function About(){

    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <Header title="About"/>
            </View>
            <Text style={styles.bodyText}>This game was created by Joshua Izu. It was done to practice gaming with react native. You can visit my website on 
              <Text style={{color: "#cc5500"}}
                    onPress={()=>Linking.openURL("http://www.joshuaizu.vercel.app")}
              > www.joshuaizu.vercel.app 
              </Text> 
             {" "}or access all my links via 
            <Text style={{color: "#cc5500"}}
                  onPress={()=>Linking.openURL("http://beacons.ai/joshuaizu")}
            > beacons.ai/joshuaizu 
            </Text>
            . If you have issues or bugs that you would like me to fix, kindly contact me via my website and i will try to do that as soon as I have time. Thanks
            </Text>
            <StatusBar style="auto" />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: Constants.statusBarHeight,
      paddingHorizontal: 10
    },
    header: {
      width: "104%",
      height: 50,
      backgroundColor: "#eee",
      left: -7
    },
    bodyText: {
      marginTop: 20,
      fontSize: 18
    }
    
  });