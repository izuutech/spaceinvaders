import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from "./homeStack";
import AboutStack from "../screens/about";
import HighScore from '../screens/highScore';


const Drawer = createDrawerNavigator();


//use screen options to turn off drawer nav header
const screenOptions={
   headerShown: false
}
export default function MyDrawer() {
    return (
      <NavigationContainer>
        <Drawer.Navigator useLegacyImplementation={true} initialRouteName="Home" screenOptions={screenOptions}>
          <Drawer.Screen name="Home" component={HomeStack} />
          <Drawer.Screen name="Update High Score" component={HighScore} />
          <Drawer.Screen name="About" component={AboutStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
