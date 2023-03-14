import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '@screens/Auth/Login';
import CreateInvoice from '@screens/Main/CreateInvoice';
import InvoiceList from '@screens/Main/InvoiceList';
import React from 'react';
import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { DEFAULT_DARK_THEME, DEFAULT_LIGHT_THEME, useTheme } from '../theme';
const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="InvoiceList"
    >
      <Stack.Screen name="InvoiceList" component={InvoiceList} />
      <Stack.Screen name="CreateInvoice" component={CreateInvoice} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  const accessToken = useSelector(state => state.user.accessToken);

  const colorScheme = useColorScheme();
  let { setTheme } = useTheme();

  React.useEffect(() => {
    if (colorScheme == 'dark') {
      //If the mobile has dark mode on
      setTheme(DEFAULT_DARK_THEME);
    } else {
      //If the mobile has dark mode off
      setTheme(DEFAULT_LIGHT_THEME);
    }
  }, [colorScheme]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {accessToken ? (
          //If the user is logged in
          <Stack.Screen name="AppStack" component={AppStack} />
        ) : (
          //If the user is not logged in
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
