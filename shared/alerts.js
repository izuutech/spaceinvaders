import {Alert} from 'react-native';


export const newGameAlert = (setJustStarted) =>{
    Alert.alert(
    "Space Invaders",
    "Welcome to Space Invaders By Joshua Izu. Your goal is to kill every alien about to invade our planet! At intervals, the lives of these aliens replenish and you are only allowed to shoot one bullet at a time because your spaceship needs repair which can only be done on Earth. So, it's up to you now soldier. Save the Earth and return home!",
    [
        { 
            text: "START",
            onPress: () => setJustStarted(false) 
        }
    ]
    );
}


export const endGameAlert = (setPlayerLive, setEnemies, score, setScore, setPlayerPosition) =>{
    Alert.alert(
    "Space Invaders",
    `You have been defeated and aliens have been allowed to conquer Earth. your score is ${score}`,
    [
        { 
            text: "RESTART",
            onPress: () => {
                setScore(0)
                setPlayerLive({
                    live: 9, fullLive: 9
                })
                setEnemies([
                    [{live: 4, fullLive: 4}, {live: 4, fullLive: 4},{live: 4, fullLive: 4},{live: 4, fullLive: 4},{live: 4, fullLive: 4},{live: 4, fullLive: 4}],
                    [{live: 4, fullLive: 4}, {live: 4, fullLive: 4},{live: 4, fullLive: 4},{live: 4, fullLive: 4},{live: 4, fullLive: 4},{live: 4, fullLive: 4}],
                    [{live: 2, fullLive: 2},{live: 2, fullLive: 2},{live: 2, fullLive: 2}, {live: 2, fullLive: 2},{live: 2, fullLive: 2}, {live: 2, fullLive: 2} ],
                    [{live: 2, fullLive: 2},{live: 2, fullLive: 2},{live: 2, fullLive: 2}, {live: 2, fullLive: 2},{live: 2, fullLive: 2}, {live: 2, fullLive: 2} ],
                ])
                setPlayerPosition({
                    left: "45%",
                    bottom: "0%"
                })
                
            } 
        }
    ]
    );
}



export const errorAlert=(message)=>{
    Alert.alert(
        "Space Invaders",
        `${message}`,
        [
            { 
                text: "OK",
                onPress: () => {let m="me"}
            }
        ]
        );
}



