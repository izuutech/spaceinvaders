import { Button, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants'
import { useEffect, useState} from 'react';
import {endGameAlert} from '../shared/alerts';
import * as asyncData from '../shared/data/dataFunctions';


export default function Scores({playerLive, setPlayerLive, setEnemies, score, setScore, setPlayerPosition}){
    const [playerName, setPlayerName]=useState(null);
    const [playerHighScore, setPlayerHighScore]=useState("0")
    const [globalHigh, setGlobalHigh]=useState("0")


   
    useEffect(()=>{
        asyncData.getString("playerScore").then((value)=>{
            if(value){
                setPlayerHighScore(value)
            }else{
                setPlayerHighScore("0")
            }
            
          })
          .catch((e)=>{
            setPlayerHighScore("...")
          })
        return ()=>{
            value=false;
        }
    }, [])
    useEffect(()=>{
        asyncData.getString("globalHigh").then((value)=>{
            if(value){
                setGlobalHigh(value)
            }else{
                setGlobalHigh("0")
            }
            
          })
          .catch((e)=>{
            setPlayerHighScore("...")
          })
        return ()=>{
            value=false
        }
    }, [])

    useEffect(()=>{
        asyncData.getString("username")
        .then((username)=>{
            if(username){
                setPlayerName(`${username}`)
            }
        })
        .catch((err)=>{
            let me="err"
        })
        return ()=>{
            username=false
        }
    }, [])
    
    
    useEffect(()=>{
        if(playerLive.live==0){
            asyncData.getString("playerScore")
            .then((value)=>{
                if((value!==null)&&(score>Number(value))){
                    asyncData.storeString("playerScore", `${score}`)
                    .then((valuee)=>{
                        endGameAlert(setPlayerLive, setEnemies, score, setScore, setPlayerPosition)
                    })
                    
                }else if(!value){
                    asyncData.storeString("playerScore", `${score}`)
                    .then((valuee)=>{
                        endGameAlert(setPlayerLive, setEnemies, score, setScore, setPlayerPosition)
                    })
                }else{
                    endGameAlert(setPlayerLive, setEnemies, score, setScore, setPlayerPosition)
                }
            })
            .catch((err)=>{
                let me="err"
            })
        }
        return ()=>{
            value=false
        }
    }, [playerLive])
    
    return (
            <View style={styles.gameStatsContainer}>
                <View style={styles.gameStats}>
                    <View style={styles.gameTitle}>
                        <Text style={styles.gameTitleTxt}>Space Invaders</Text>
                    </View>
                    <View style={styles.scores}>
                        <View style={styles.eachScoreContainer}>
                            <Text style={styles.scoreTitle}>HighScore</Text>
                            <Text style={styles.theScore}>{playerHighScore}</Text>
                        </View>
                        <View style={styles.eachScoreContainer}>
                            <Text style={styles.scoreTitle}>Score</Text>
                            <Text style={styles.theScore}>{score}</Text>
                        </View>
                        <View style={styles.eachScoreContainer}>
                            <Text style={styles.scoreTitle}>Lives</Text>
                            <Text style={styles.theScore}>{playerLive.live}/{playerLive.fullLive}</Text>
                        </View>
                        <View style={styles.eachScoreContainer}>
                            <Text style={styles.scoreTitle}>Global HighScore</Text>
                            <Text style={styles.theScore}>{globalHigh}</Text>
                        </View>
                    </View>
                    <View style={styles.userTitle}>
                        {(playerName)&&(<Text style={styles.userTitleTxt}>
                            Player: {playerName}
                            </Text>)}
                    </View>
                </View>
            </View>
    )
}





const styles = StyleSheet.create({
    gameStatsContainer: {
        backgroundColor: "#cc5500",
        height:"20%",
        width: "100%",
        paddingTop: Constants.statusBarHeight,
        position: "relative",
        zIndex: 5
    },
    gameStats: {
        width: "100%",
        height: "100%"
    },
    gameTitle: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        height: "20%",
    },
    gameTitleTxt:{
        fontSize: 16,
        fontWeight: "bold"
    },
    scores: {
        flexDirection: 'row',
        height: "60%",
    },
    eachScoreContainer: {
        width: "25%",
        height: "100%",
        flex: 1,
        flexDirection: "column",
        alignItems:"center",
        justifyContent: "center",
    },
    scoreTitle: {
        textAlign: "center"
    },
    userTitle: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        height: "20%"
    },
    userTitleTxt:{
        fontSize: 16,
        fontWeight: "bold"
    },
    
  });