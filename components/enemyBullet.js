import { useRef, useEffect, useState} from 'react';
import {View, Animated } from 'react-native';

//start here to code tomorrow. Make this bullet 
//fit for enemies
//let enemies only access once in some secs
//let it randomly choose which enemy will fire

export default function EnemyBullet({enemyShooting, setEnemyShooting, playerPosition, playerLive, setPlayerLive, gameView}){
    let movement = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
   
    let gameViewPlayerSpace=gameView.height-160;
   
    useEffect(()=>{
        
        if(enemyShooting.active==true){
            
            Animated.timing(movement, {
                toValue: 100,
                duration: 2000,
                useNativeDriver: false
                }
            ).start(({finished})=>{
               
                
                //check if bullet is touching
            //a player
            if(finished){
                let playerLeft=Number(playerPosition.left.slice(0, -1));
                let playerWidth=playerLeft+9;
                let enemyLeft=Number(enemyShooting.left.slice(0, -1));
    
                
                if((enemyLeft>=playerLeft)&&(enemyLeft<=playerWidth)){
                
                    if(playerLive.live>0){
                        setPlayerLive({
                            ...playerLive,
                            live: playerLive.live-=1
                        })
                        
                    }
                }
                    
                    
                    setEnemyShooting({
                        ...enemyShooting,
                        active: false,
                    })
                }
            }, movement.resetAnimation());
        
        }
        return () => {
            // cancel the subscription
            enemyShooting.active = false;
            
        }
        
    }, [enemyShooting.active])

  
    
        return (
        
        
            <View>
            {(enemyShooting.active) && (<Animated.View                 // Special animatable View
                style={{
                    width: 3,
                    height: 10,
                    backgroundColor: "#cc5500",
                    position: "relative",
                    left: enemyShooting.left,
                    bottom: 160,
                    
                transform: [{
                    translateY: movement.interpolate({
                    inputRange: [0, 100],
                    //280, -120
                    //235, 220, 210, 200
                    outputRange: [enemyShooting.starting, 390]
                    })     
                }]   // Bind opacity to animated value
                }}
            />
            )}
        </View>

        );
    
  }
