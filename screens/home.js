import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';



const startGame=(navigation)=>{
  navigation.navigate("Game")
}
export default function Home({navigation}){
    return (
        <View style={styles.container}>
            
            <Text style={styles.welcomeText}>Welcome to Space Invaders</Text>
            <Button title="NEW GAME" color="#cc5500" onPress={()=>startGame(navigation)}/>
            <StatusBar style="auto" />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    welcomeText: {
      marginBottom: 30,
      fontSize: 24
    }
    
  });