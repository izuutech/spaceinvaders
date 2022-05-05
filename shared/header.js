import {StyleSheet, View, Text} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';



export default function Header({title}){
    const navigation = useNavigation();
    const openMenu=()=>{
        navigation.dispatch(DrawerActions.openDrawer())
    }

    return (
        <View style={styles.header}>
        <MaterialIcons name="menu"  size={28} onPress={openMenu} style={styles.icon}/>
            <Text style={styles.headerTxt}>{title}</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    header: {
        flex:1,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        width: "109%"
    },
    headerTxt: {
        fontSize: 20,
        letterSpacing: 1,
        fontWeight: 'bold'
    },
    icon: {
        position: 'absolute',
        left: 5
    }
})