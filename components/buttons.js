import { Button, StyleSheet, Text, View, Animated } from 'react-native';
import {AntDesign, Entypo} from '@expo/vector-icons';




export default function Buttons({goRight, goUp, goDown, goLeft, goLeftLong, goRightLong, setIsShooting, isShooting, playerPosition}){
    
    const shootBullet=()=>{
        
        let left=isShooting.left
        left.push(playerPosition.left)
       
        let amm=()=>{
            if(isShooting.amount<3){
                return isShooting.amount+=1
            }else{
                return 1
            }
        }
        if(isShooting.active==false){
            setIsShooting({
                active: !isShooting.active,
                previous: !isShooting.previous,
                amount: 1,
                left: left,
               
            })
            
        }else{
            let ammm=amm();
            setIsShooting({
                // active: !isShooting.active,
                // previous: !isShooting.previous,
                ...isShooting,
                amount: ammm,
                left: left,
                
            })
            
        }
        
    }
    return (
        <View style={styles.buttonContainer}>
            <View style={styles.buttonGroup}>
                <View style={styles.topButton}>
                    <AntDesign name='upcircle' size={30} color="#cc5500" onPress={goUp}/>
                </View>
                <View style={styles.middleButton}>
                    <AntDesign name='leftcircle' size={30} color="#cc5500" onPress={goLeft} onLongPress={goLeftLong}/>
                    <Entypo name='qq-with-circle' size={30} color="#cc5500" onPress={shootBullet} />
                    <AntDesign name='rightcircle' size={30} color="#cc5500" onPress={goRight} onLongPress={goRightLong}/>
                </View>
                <View style={styles.bottomButton}>
                    <AntDesign name='downcircle' size={30} color="#cc5500" onPress={goDown}/>
                </View>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    buttonContainer: {
        width: "100%",
        height: "18%",
        alignItems: "center",
        justifyContent: "center",
        borderTopColor:"white",
        borderTopWidth: 2
    },
    buttonGroup: {
        width: "50%",
        height: "90%",
    },
    topButton: {
        width: "100%",
        height: "33%",
        alignItems: "center",
        justifyContent: "center"
    },
    middleButton: {
        width: "100%",
        height: "33%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    bottomButton: {
        width: "100%",
        height: "33%",
        alignItems: "center",
        justifyContent: "center"
    }
})