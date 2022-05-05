import {StyleSheet, View, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function MyButton({text, onPress}){
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#cc5500",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 6,
    },
    text: {
        color: "white",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: 16,
        textAlign: "center"
    }
})