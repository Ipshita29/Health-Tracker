import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import SignUp from './components/SignUp';
import Login from "./components/Login";
import Calender from './components/Calender';
import Profile from './components/Profile';
import Meditaton from './components/Meditation'
import WaterIntake from './components/WaterIntake';
import AiChatbot from './components/AiChatbot';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen" >
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Calender" component={Calender} options={{ headerShown: false }}/>
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
        <Stack.Screen name="Meditation" component={Meditaton} options={{ headerShown: false }}/>
        <Stack.Screen name="WaterIntake" component={WaterIntake} options={{ headerShown: false }} />
        <Stack.Screen name="AiChatbot" component={AiChatbot} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}