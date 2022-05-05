import { StyleSheet, Text, View, Image} from 'react-native';
import {useEffect, useState} from 'react';
import Bullet from './theBullet';
import EnemyBullet from './enemyBullet';
import {newGameAlert} from '../shared/alerts';
const bigEnemies = require('../assets/enemies/space-ship.png');
const smallEnemies = require('../assets/enemies/alien2.png');
const shieldImage = require('../assets/player/shield.png');
const bulletImage = require('../assets/player/bullet.png');




export default function TheGameView({playerPosition, enemies, isShooting, setIsShooting, setEnemies, enemyShooting, setEnemyShooting, playerLive, setPlayerLive, score, setScore}) {
    const [justStarted, setJustStarted]=useState(true)
    
    useEffect(()=>{
        let timeout=setTimeout(()=>{
            newGameAlert(setJustStarted)
        }, 10);

        return ()=>{
            clearTimeout(timeout)
        }
    }, [])
    const playerIcon = function(left, bottom, live, fullLive) {
        return {
            width: "9%",
            height: "9%",
            position: "absolute",
            left: left,
            bottom: bottom,
            opacity: live/fullLive
        }
    }
    const bigEnemyIcon = function(live, fullLive) {
        return {
            width: "10%",
            height: 40,
            opacity: live/fullLive,
            zIndex: 5,
        }
    }
    
    
    const [gameView, setGameView]=useState({})
    
    
    useEffect(()=>{
        let interval=setInterval(()=>{
            let enemyStack=["10%", "25%", "42%", "58%", "75%", "90%"]
            let random=Math.floor(Math.random()*5)
            
                if((enemies[3][random].live>0)){

                    
                    setEnemyShooting({
                        ...enemyShooting,
                        active: true,
                        left: enemyStack[random],
                        starting: 160
                    })
                }else if((enemies[3][random].live==0)&&(enemies[2][random].live>0)){
                    setEnemyShooting({
                        ...enemyShooting,
                        active: true,
                        left: enemyStack[random],
                        starting: 120
                    })
                }else if((enemies[2][random].live==0)&&(enemies[1][random].live>0)){
                    setEnemyShooting({
                        ...enemyShooting,
                        active: true,
                        left: enemyStack[random],
                        starting: 80
                    })
                }else if((enemies[1][random].live==0)&&(enemies[0][random].live>0)){
                    setEnemyShooting({
                        ...enemyShooting,
                        active: true,
                        left: enemyStack[random],
                        starting: 40
                    })
                }
            
            
            
        }, 3000)
        return ()=>{
            clearInterval(interval)
        }
    }, [enemyShooting])
    
    
    
    
    return (
    <View style={styles.theGameView} onLayout={(event)=>{
        let {width, height}=event.nativeEvent.layout
        setGameView({
            width, height
        })
    }}>
        
        
        <View style={styles.enemyRow}>
            <Image source={bigEnemies} style={bigEnemyIcon(enemies[0][0].live, enemies[0][0].fullLive,)}/>
            <Image source={bigEnemies} style={bigEnemyIcon(enemies[0][1].live, enemies[0][1].fullLive)}/>
            <Image source={bigEnemies} style={bigEnemyIcon(enemies[0][2].live, enemies[0][2].fullLive)}/>
            <Image source={bigEnemies} style={bigEnemyIcon(enemies[0][3].live, enemies[0][3].fullLive)}/>
            <Image source={bigEnemies} style={bigEnemyIcon(enemies[0][4].live, enemies[0][4].fullLive)}/>
            <Image source={bigEnemies} style={bigEnemyIcon(enemies[0][5].live, enemies[0][5].fullLive)}/>
        </View>
        <View style={styles.enemyRow}>
            <Image source={bigEnemies} style={bigEnemyIcon(enemies[1][0].live, enemies[1][0].fullLive,)}/>
            <Image source={bigEnemies} style={bigEnemyIcon(enemies[1][1].live, enemies[1][1].fullLive)}/>
            <Image source={bigEnemies} style={bigEnemyIcon(enemies[1][2].live, enemies[1][2].fullLive)}/>
            <Image source={bigEnemies} style={bigEnemyIcon(enemies[1][3].live, enemies[1][3].fullLive)}/>
            <Image source={bigEnemies} style={bigEnemyIcon(enemies[1][4].live, enemies[1][4].fullLive)}/>
            <Image source={bigEnemies} style={bigEnemyIcon(enemies[1][5].live, enemies[1][5].fullLive)}/>
        </View>
        <View style={styles.enemyRow}>
            <Image source={smallEnemies} style={bigEnemyIcon(enemies[2][0].live, enemies[2][0].fullLive,)}/>
            <Image source={smallEnemies} style={bigEnemyIcon(enemies[2][1].live, enemies[2][1].fullLive)}/>
            <Image source={smallEnemies} style={bigEnemyIcon(enemies[2][2].live, enemies[2][2].fullLive)}/>
            <Image source={smallEnemies} style={bigEnemyIcon(enemies[2][3].live, enemies[2][3].fullLive)}/>
            <Image source={smallEnemies} style={bigEnemyIcon(enemies[2][4].live, enemies[2][4].fullLive)}/>
            <Image source={smallEnemies} style={bigEnemyIcon(enemies[2][5].live, enemies[2][5].fullLive)}/>
        </View>
        <View style={styles.enemyRow}>
            <Image source={smallEnemies} style={bigEnemyIcon(enemies[3][0].live, enemies[3][0].fullLive,)}/>
            <Image source={smallEnemies} style={bigEnemyIcon(enemies[3][1].live, enemies[3][1].fullLive)}/>
            <Image source={smallEnemies} style={bigEnemyIcon(enemies[3][2].live, enemies[3][2].fullLive)}/>
            <Image source={smallEnemies} style={bigEnemyIcon(enemies[3][3].live, enemies[3][3].fullLive)}/>
            <Image source={smallEnemies} style={bigEnemyIcon(enemies[3][4].live, enemies[3][4].fullLive)}/>
            <Image source={smallEnemies} style={bigEnemyIcon(enemies[3][5].live, enemies[3][5].fullLive)}/>
        </View>

        {/* <View style={styles.shieldRow}>
            <Image source={shieldImage} style={shieldIcon(shield[0].live, shield[0].fullLive)} />
            <Image source={shieldImage} style={shieldIcon(shield[1].live, shield[1].fullLive)} />
            <Image source={shieldImage} style={shieldIcon(shield[2].live, shield[2].fullLive)} />
            <Image source={shieldImage} style={shieldIcon(shield[3].live, shield[3].fullLive)} />
        </View> */}
        {/* <Image source={bulletImage} style={styles.bulletIcon}/> */}
        
        <EnemyBullet enemyShooting={enemyShooting} setEnemyShooting={setEnemyShooting} playerPosition={playerPosition} enemies={enemies} setEnemies={setEnemies} gameView={gameView} playerLive={playerLive} setPlayerLive={setPlayerLive}/>
        
        <Bullet isShooting={isShooting} setIsShooting={setIsShooting} playerPosition={playerPosition} enemies={enemies} setEnemies={setEnemies} gameView={gameView} score={score} setScore={setScore}/>

        
        
        <Image source={require("../assets/player/space.png")} style={playerIcon(playerPosition.left, playerPosition.bottom, playerLive.live, playerLive.fullLive)}/>
    
    </View>
    );
}


const styles=StyleSheet.create({
    theGameView: {
        width: "100%",
        height: "60%"
    },
    // playerIcon: {
    //     width: 30,
    //     height: 30,
    //     position: "absolute",
    //     left: playerPositionStyle.left,
        
    // },
    enemyRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        marginHorizontal: "5%",
        marginVertical: 5
    },
    shieldRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "85%",
        marginHorizontal: "7.5%",
        position: "absolute",
        bottom: 70
    },
    bulletIcon:{
        width: 3,
        height: 10,
        position: "absolute",
        left: 180,
        bottom: 90
    }
    
})