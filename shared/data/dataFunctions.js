import AsyncStorage from '@react-native-async-storage/async-storage';
import { errorAlert } from '../alerts';

export const storeString = async (storageKey, value) => {
    try {
      await AsyncStorage.setItem(`${storageKey}`, value)
    } catch (e) {
      errorAlert(e)
    }
}

  
export const getString = async (storageKey) => {
    try {
      const value = await AsyncStorage.getItem(storageKey)
      if(value !== null) {
        return value
      }
    } catch(e) {
        errorAlert(e)
    }
    
}

