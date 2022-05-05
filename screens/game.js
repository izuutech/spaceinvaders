
import { useState} from 'react';
import {StyleSheet, View} from 'react-native';


import Buttons from '../components/buttons';
import Scores from '../components/scores';
import TheGameView from '../components/theGameView';






export default function Game(){
    const [isShooting, setIsShooting]=useState({
        active: false,
        previous: true,
        amount: 0,
        left: ["46%"]
    })
   
    const [playerLive, setPlayerLive]=useState({
        live: 9, fullLive: 9
    });
    const [score, setScore]=useState(0);
    const [playerPosition, setPlayerPosition]=useState({
        left: "45%",
        bottom: "0%"
    });
    const [enemyShooting, setEnemyShooting]=useState({
        active: true,
        previous: true,
        
        //left-->10,25, 42, 58, 75, 90  
        left: "75%",
        //starting==-->40, 80, 120, 160
        starting: 160
    })
    
    const [enemies, setEnemies]=useState([
        [{live: 4, fullLive: 4}, {live: 4, fullLive: 4},{live: 4, fullLive: 4},{live: 4, fullLive: 4},{live: 4, fullLive: 4},{live: 4, fullLive: 4}],
        [{live: 4, fullLive: 4}, {live: 4, fullLive: 4},{live: 4, fullLive: 4},{live: 4, fullLive: 4},{live: 4, fullLive: 4},{live: 4, fullLive: 4}],
        [{live: 2, fullLive: 2},{live: 2, fullLive: 2},{live: 2, fullLive: 2}, {live: 2, fullLive: 2},{live: 2, fullLive: 2}, {live: 2, fullLive: 2} ],
        [{live: 2, fullLive: 2},{live: 2, fullLive: 2},{live: 2, fullLive: 2}, {live: 2, fullLive: 2},{live: 2, fullLive: 2}, {live: 2, fullLive: 2} ],
    ]);

    
    
    

    const goRight=()=>{
        let num=Number(playerPosition.left.slice(0, -1));
        if(num<=94){
            setPlayerPosition({
                        ...playerPosition,
                        left: `${num+=1}%`
            });
        }
    }
    const goLeft=()=>{
        let num=Number(playerPosition.left.slice(0, -1));
        if(num>2){
            setPlayerPosition({
                        ...playerPosition,
                        left: `${num-=1}%`
            });
        }
    }

    const goUp=()=>{
        let num=Number(playerPosition.bottom.slice(0, -1));
        if(num<=40){
            setPlayerPosition({
                        ...playerPosition,
                        bottom: `${num+=1}%`
            });
        }
    }
    const goDown=()=>{
        let num=Number(playerPosition.bottom.slice(0, -1));
        if(num>2){
            setPlayerPosition({
                        ...playerPosition,
                        bottom: `${num-=1}%`
            });
        }
    }
    

    const goRightLong=()=>{
        let num=Number(playerPosition.left.slice(0, -1));
        if((num<=94)&&(num+4<=94)){
            setPlayerPosition({
                        ...playerPosition,
                        left: `${num+=4}%`
            });
        }
    }



    const goLeftLong=()=>{
        let num=Number(playerPosition.left.slice(0, -1));
        if((num>2)&&(num-4>2)){
            setPlayerPosition({
                        ...playerPosition,
                        left: `${num-=4}%`
            });
        }
    }



    

    
    return (
        <View style={styles.container}>
            <Scores playerLive={playerLive} setPlayerLive={setPlayerLive} setEnemies={setEnemies} score={score} setScore={setScore} setPlayerPosition={setPlayerPosition}/>
            <TheGameView playerPosition={playerPosition} playerLive={playerLive} setPlayerLive={setPlayerLive} enemies={enemies} isShooting={isShooting} setIsShooting={setIsShooting} setEnemies={setEnemies} enemyShooting={enemyShooting} setEnemyShooting={setEnemyShooting} score={score} setScore={setScore}/>
            <Buttons goRight={goRight} goUp={goUp} goLeft={goLeft} goDown={goDown} goLeftLong={goLeftLong} goRightLong={goRightLong} setIsShooting={setIsShooting} isShooting={isShooting} playerPosition={playerPosition} />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#36454F',
      justifyContent: 'space-between'
    },
    
  });