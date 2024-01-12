import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import Logout from '../screens/auth/Logout';
import ForgotPassword from '../screens/auth/ForgotPassword';
import ConfirmOTP from '../screens/auth/ConfirmOTP';
import ResetPassword from '../screens/auth/ResetPassword';

const Stack = createStackNavigator();


export const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Logout" component={Logout} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ConfirmOTP" component={ConfirmOTP} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />

        </Stack.Navigator>
    );
}

