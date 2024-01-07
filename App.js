import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import HeaderLogOutButton from './components/HeaderLogOutButton';
import { Button } from 'react-native-paper';
import AddUser from './screens/AddUser';

const Stack = createNativeStackNavigator();

export default function App() {

  
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='Home' screenOptions = {{animation:"fade_from_bottom",statusBarColor:"purple"}}>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{title:"Dashboard",headerRight:HeaderLogOutButton}}
          />
        <Stack.Screen
          name='Login'
          component={Login}
          options={{title:"Login" , headerShown:false , statusBarColor:"#d0a1dd"}}

          />
        <Stack.Screen
          name='Signup'
          component={Signup}
          options={{title:"Signup" , headerShown:false , statusBarColor:"#d0a1dd"}}
          />
        <Stack.Screen
          name='AddUser'
          component={AddUser}
          options={{title:"Add User", statusBarColor:"#d0a1dd"}}
          />
          
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
