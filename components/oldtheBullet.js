import { useRef, useEffect, useState} from 'react';
import {View, Animated } from 'react-native';



export default function Bullet({isShooting, setIsShooting, playerPosition, enemies, setEnemies, gameView}){
    let movement = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
    //movement.addListener(({value}) => movement._value = value);
    
    let left=`${Number(playerPosition.left.slice(0, -1))+4.5}%`;
    let bottom=(Number(playerPosition.bottom.slice(0, -1))*gameView.height/100)+90
    let bulletPosition={
            left: left,
            bottom: bottom,
    }
    let gameViewPlayerSpace=gameView.height-160;
    const [enemyPosition, setEnemyPosition]=useState([
        [{width: 10, rightSpace: 8, killWidthL: 0, killWidthR: 10, killHeight: gameViewPlayerSpace+126}, {width: 10, rightSpace: 8, killWidthL: 18, killWidthR: 28, killHeight: gameViewPlayerSpace+126}, {width: 10, rightSpace: 8, killWidthL: 36, killWidthR: 46, killHeight: gameViewPlayerSpace+126}, {width: 10, rightSpace: 8, killWidthL: 54, killWidthR: 64, killHeight: gameViewPlayerSpace+126}, {width: 10, rightSpace: 8, killWidthL: 72, killWidthR: 82, killHeight: gameViewPlayerSpace+126}, {width: 10, rightSpace: 8, killWidthL: 90, killWidthR: 100, killHeight: gameViewPlayerSpace+126}],
        [{width: 10, rightSpace: 8, killWidthL: 0, killWidthR: 10, killHeight: gameViewPlayerSpace+84}, {width: 10, rightSpace: 8, killWidthL: 18, killWidthR: 28, killHeight: gameViewPlayerSpace+84}, {width: 10, rightSpace: 8, killWidthL: 36, killWidthR: 46, killHeight: gameViewPlayerSpace+84}, {width: 10, rightSpace: 8, killWidthL: 54, killWidthR: 64, killHeight: gameViewPlayerSpace+84}, {width: 10, rightSpace: 8, killWidthL: 72, killWidthR: 82, killHeight: gameViewPlayerSpace+84}, {width: 10, rightSpace: 8, killWidthL: 90, killWidthR: 100, killHeight: gameViewPlayerSpace+84}],
        [{width: 10, rightSpace: 8, killWidthL: 0, killWidthR: 10, killHeight: gameViewPlayerSpace+42}, {width: 10, rightSpace: 8, killWidthL: 18, killWidthR: 28, killHeight: gameViewPlayerSpace+42}, {width: 10, rightSpace: 8, killWidthL: 36, killWidthR: 46, killHeight: gameViewPlayerSpace+42}, {width: 10, rightSpace: 8, killWidthL: 54, killWidthR: 64, killHeight: gameViewPlayerSpace+42}, {width: 10, rightSpace: 8, killWidthL: 72, killWidthR: 82, killHeight: gameViewPlayerSpace+42}, {width: 10, rightSpace: 8, killWidthL: 90, killWidthR: 100, killHeight: gameViewPlayerSpace+42}],
        [{width: 10, rightSpace: 8, killWidthL: 0, killWidthR: 10, killHeight: gameViewPlayerSpace}, {width: 10, rightSpace: 8, killWidthL: 18, killWidthR: 28, killHeight: gameViewPlayerSpace}, {width: 10, rightSpace: 8, killWidthL: 36, killWidthR: 46, killHeight: gameViewPlayerSpace}, {width: 10, rightSpace: 8, killWidthL: 54, killWidthR: 64, killHeight: gameViewPlayerSpace}, {width: 10, rightSpace: 8, killWidthL: 72, killWidthR: 82, killHeight: gameViewPlayerSpace}, {width: 10, rightSpace: 8, killWidthL: 90, killWidthR: 100, killHeight: gameViewPlayerSpace}],
    ])
    const [rowKilled, setRowKilled]=useState([
        {status: false, height: 200},
        {status: false, height: 215},
        {status: false, height: 220},
        {status: false, height: 240},
    ])
    const [changedRowkilled, setChangedRowkilled]=useState(false);
    if(changedRowkilled){
        setRowKilled([
            {status: false, height: 200},
            {status: false, height: 215},
            {status: false, height: 220},
            {status: false, height: 240},
        ])
        setChangedRowkilled(false)
    }

    const [bulletRange, setBulletRange]=useState(180)
    let bulletHeight=()=>{
        if(rowKilled[0].status){
            return rowKilled[0].height
        }else if(rowKilled[1].status){
            return rowKilled[1].height
        }else if(rowKilled[2].status){
            return rowKilled[2].height
        }else if(rowKilled[3].status){
            return rowKilled[3].height
        }else{
            return 180
        }
    }
    const [finishedShooting, setFinishedShooting]=useState(false)
    //console.log(bulletRange)
    useEffect(()=>{
        
        if(isShooting.active==true){
            //check if bullet is touching
            //an enemy killwidth
            // console.log(enemyPosition)
            // //console.log(enemies)
            // console.log(bulletPosition)
            
            let bulletTarget=Number(left.slice(0,-1))
            //console.log(bulletTarget)
            for(let i=0; i<enemyPosition.length; i++){
                //console.log(enemyPosition[0][i].killWidthL)
                for(let x=0; x<enemyPosition[i].length; x++){
                    
                    // if(enemyPosition[i][x].killHeight){

                    // }
                    //console.log("bullet is " + bulletPosition.bottom)
                    //if it touches enemy deplete live
                    if((bulletTarget>=enemyPosition[i][x].killWidthL)&&(bulletTarget<=enemyPosition[i][x].killWidthR)){
                        
                        let j=i+1;
                        
                        if(j<5){
                           
                            
                            if(enemies[i][x].live>0&&((j==4)||enemies[j][x].live==0)){
                                //console.log(enemies[i][x].live)
                                console.log("m", finishedShooting)
                                //if(movement._value==gameView.height){
                                console.log("k",movement._value)
                                if(finishedShooting){
                                setEnemies([
                                    ...enemies,
                                    enemies[i][x].live-=1
                                ])
                                }
                                //}
                            //let newRowKilled=rowKilled.filter
                            setRowKilled([
                                ...rowKilled,
                                rowKilled[i].status=true,
                            ])
                            setChangedRowkilled(true);
                            //console.log(rowKilled)
                           
                            }
                            
                            setBulletRange(bulletHeight())
                            
                            // else if(enemies[3][x].live>0){
                            //     setEnemies([
                            //         ...enemies,
                            //         enemies[3][x].live-=1
                            // ])
                            // }
                        }
                    }
                    // else{
                    //     console.log("missed")
                    // }
                }
            }
            
            Animated.timing(movement, {
                toValue: gameView.height,
                duration: 2000,
                useNativeDriver: false
                }
            ).start(({finished})=>{
                console.log(finished)
               
                    setIsShooting({
                        active: !isShooting.active,
                        previous: !isShooting.previous,
                    })
                    setFinishedShooting(true)
            }, movement.resetAnimation());
            
        }
        return () => {
            // cancel the subscription
            isShooting.active = false;
            
        };
    }, [isShooting.active])
    
    
        return (
        
        
            <View>
            {(isShooting.active) && (<Animated.View                 // Special animatable View
                style={{
                    width: 3,
                    height: 10,
                    backgroundColor: "white",
                    position: "relative",
                    left: bulletPosition.left,
                    bottom: bulletPosition.bottom,
                    
                // opacity: movement.interpolate({
                //     inputRange: [0, 90, 100],
                //     outputRange: [0, 0.9, 1]
                // }),  
                //transform: [{translateY: movement}],
                transform: [{
                    translateY: movement.interpolate({
                    inputRange: [0, 100],
                    //280, -120
                    //250, 220, 215, 200
                    outputRange: [280, bulletRange]
                    })     
                }]   // Bind opacity to animated value
                }}
            />
            )}
        </View>

        );
    
  }
