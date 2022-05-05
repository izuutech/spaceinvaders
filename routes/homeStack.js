import { createStackNavigator } from '@react-navigation/stack';
import Home from "../screens/home";
import Game from "../screens/game";
import Header from '../shared/header';

const screenOptions={
    headerTintColor: "#444",
    headerStyle: {backgroundColor: "#eee", height: 80, },
    headerTitleContainerStyle: { width: "100%", left: -15}
}

const options={
   headerTitle: () => <Header title="Space Invaders" />
}

const Stack = createStackNavigator();



export default function HomeStack(navigation) {
  
  return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Home Stack" component={Home} options={options}/>
        <Stack.Screen name="Game" component={Game} options={{headerShown: false}} />
      </Stack.Navigator>

  );
}
