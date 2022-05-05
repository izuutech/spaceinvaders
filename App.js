import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

import Navigator from './routes/drawer';
import Home from './screens/home'

export default function App() {
  return (
    <View style={styles.container}>
      <Navigator/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
