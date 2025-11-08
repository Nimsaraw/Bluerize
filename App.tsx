import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { SplashScreen } from './src/Splash';
import { SignInScreen } from './src/screens/SignInScreen';
import { SignUpScreen } from './src/screens/SignUpScreen';
import { HomeScreen } from './src/screens/Home';
import { AddTaskScreen } from './src/screens/AddTask';


export type RootParamList = {
  Splash: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
   Home: { uname: string; };
  AddTask: { userName: string; };

  
}

const Stack = createNativeStackNavigator<RootParamList>();

export default function App() {
  return (

    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen name='Splash' component={SplashScreen} options={{headerShown:false}}/>
        <Stack.Screen name='SignInScreen' component={SignInScreen} options={{title:"SignInScreen"}}/>
        <Stack.Screen name='SignUpScreen' component={SignUpScreen} options={{title:"SignUpScreen"}}/>
        <Stack.Screen name='Home' component={HomeScreen} options={{title:"HomeScreen"}}/>
        <Stack.Screen name='AddTask' component={AddTaskScreen} options={{title:"AddTaskScreen"}}/>
        
        
        
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
