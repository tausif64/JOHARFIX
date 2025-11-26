import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './navigatores/AuthNavigator';
import BottomNavigator from './navigatores/MainNavigator';


const Stack = createStackNavigator();

const MainNavigator = () => {
    return (
      <Stack.Navigator
        initialRouteName="main"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="auth" component={AuthNavigator} />
        <Stack.Screen name="main" component={BottomNavigator} />
      </Stack.Navigator>
    );
}

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <MainNavigator />
        </NavigationContainer>
    )
}

export default RootNavigator