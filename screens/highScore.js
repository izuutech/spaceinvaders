import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

import {Formik} from 'formik';
import * as yup from 'yup';


import * as asyncData from '../shared/data/dataFunctions';
import MyButton from '../components/myButton';
import Header from '../shared/header';

const userSchema=yup.object({
  email: yup.string()
          .required()
          .min(4),
  password: yup.string()
          .required()
          .min(6),
})


export default function HighScore(){

    const [playerHighScore, setPlayerHighScore]=useState("")
    const [apiMessage, setApiMessage]=useState("")
    const [allScores, setAllScores]=useState([]);
    const [playerName, setPlayerName]=useState(null)
      


    useEffect(()=>{
      
      asyncData.getString("username")
      .then((username)=>{
          if(username){
              setPlayerName(username)
          }
      })
      .catch((err)=>{
          let me="err"
      })
      return ()=>{
        false
    }
    }, [playerName])
  
      asyncData.getString("playerScore").then((value)=>{
        setPlayerHighScore(value)
      })
      .catch((e)=>{
        setPlayerHighScore("Loading...")
      })
      
      
    const [modalOpen, setModalOpen]=useState(false)

    const openModal=()=>{
      setApiMessage("")
      setModalOpen(true)
    }
    const closeModal=()=>{
      setApiMessage("")
      setModalOpen(false)
    }


    const sendScore=(values)=>{
      //function to send score to the server
      
      fetch('https://spaceinvadersbackend.herokuapp.com/update', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          score: playerHighScore,
        })
      })
      .then((res)=>res.json())
      .then((data)=>{
        if(data.message){
          
          asyncData.storeString("username", `${values.email.split("@")[0]}`)
          .then((valuee)=>{
            setApiMessage(data.message)
            setPlayerName(values.email.split("@")[0])
          })
          .catch((err)=>{
            let me="err"
        })
        }else{
          setApiMessage("Please Try Again Later!")
        }
      })
      .catch((err)=>{
        setApiMessage(err.err)
      })
    

    }

    useEffect(()=>{
      
      fetch("https://spaceinvadersbackend.herokuapp.com/all")
      .then((res)=>res.json())
      .then((data)=>{
        if(data){
          
          setAllScores(data.message)
        }else{
         
          setAllScores([])
        }
      })
      .catch((err)=>{
        let msg="err"
      })
      return ()=>{
        false
      }
    },[modalOpen])
   
      
    return (
        <View style={styles.container}>
            
            <View style={styles.header}>
            <Header title="High Score"/>
            </View>
            <Text style={styles.scoreText}>Your Username: {playerName}</Text>
            <Text style={styles.scoreText}>Current High Score: {playerHighScore}</Text>
            
            <TouchableOpacity onPress={openModal}>
              <View style={styles.update}><Text style={styles.updateText}>Update Highscore</Text></View>
            </TouchableOpacity>
            <Text style={styles.explainText}>By tapping the button above, you will be sending your score to the global server and updating it.</Text>

            <View style={styles.scoresContainer}>
                <Text style={styles.scoresHead}>High Scores</Text>
                {allScores.map(score=>(
                  <View key={score._id} style={styles.usersContainer} >
                  <Text style={styles.eachScore}>
                      {score.email.split("@")[0]}
                  </Text>
                  <Text style={styles.eachScore}>
                     {score.score}
                  </Text>
                </View>
                ))}
                {(!allScores[0])&&(<Text style={styles.eachScore}>
                    Loading...
                  </Text>)}
            </View>
            {(modalOpen)&&(<View style={styles.modalStyle}>
              <MaterialIcons name="cancel" size={40} color="#cc5500" style={styles.cancel} onPress={closeModal} />
              <View style={styles.space}>
                  <Formik 
                      initialValues={{
                          email: "",
                          password: ""
                      }}
                      validationSchema={userSchema}
                      onSubmit={(values, actions)=>{
                          actions.resetForm();
                          sendScore(values);
                      }}
                  >
                  {(props)=>(
                  <View>
                    <TextInput 
                      style={styles.input}
                      placeholder="Email"
                      onChangeText={props.handleChange("email")}
                      value={props.values.email}
                    />
                    <Text style={styles.errorText}>{props.touched.email && props.errors.email}</Text>
                    <TextInput 
                      style={styles.input}
                      placeholder="Password"
                      onChangeText={props.handleChange("password")}
                      value={props.values.password}
                    />
                    <Text style={styles.errorText}>{props.touched.password && props.errors.password}</Text>
                    <Text style={styles.apiText}>{apiMessage}</Text>
                    <MyButton text="Update" onPress={props.handleSubmit}/>
                    
                  </View>
                  )}
                  </Formik>
                  </View>
                  
            </View>
            )}
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
    update: {
      padding: 5,
      marginTop: 30,
      backgroundColor: "#cc5500",
      alignItems: "center",
      justifyContent: "center",
      width: "80%",
      alignSelf: "center"
    },
    updateText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 20
    },
    scoreText: {
      fontSize: 18,
    },
    explainText: {
      fontSize: 18,
      marginTop: 10
    },
    scoresContainer: {
      marginTop: 20,
    },
    scoresHead: {
      fontSize: 20,
      alignSelf: "center"
    },
    usersContainer: {
      flexDirection: "row",
      justifyContent: "space-around"
    },
    eachScore: {
      fontSize: 18,
    },
    modalStyle: {
        top: Constants.statusBarHeight,
        position: "absolute",
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        zIndex: 4,
        alignSelf: "center",
        paddingTop: 40,
    },
    cancel: {
      display: 'flex',
      alignSelf: "center"
    },
    space: {
      paddingTop: 50
    },
    input: {
      
      backgroundColor: "white",
      height: 50,
      paddingHorizontal: 15,
      borderColor: "#cc5500",
      borderStyle: "solid",
      borderWidth: 1
    },
    errorText: {
      color: "red",
      marginBottom: 20
    },
    apiText: {
      color: "#cc5500",
      marginBottom: 20,
      marginTop: 0,
      alignSelf: "center"
    }
    
  });