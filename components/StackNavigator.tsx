import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import Account from './Account';

import But from './But';
import SignUp from './SignUp';
import Success from './Success';
import Home from './Home';
import HomeScreen from '../screens/HomeScreen';
import DemoScreen from '../screens/DemoScreen';
import Paywall from '../screens/Paywall';
import JournalScreen from '../screens/JournalScreen';
import CategoryScreen from '../screens/CategoryScreen';

export type RootStackParamList = {
    Account: { session: Session | null };
    Signup: undefined;
    Signin: undefined;
    Success: undefined;
    Home: undefined;
    Paywall: undefined;
    Demo: undefined;
    Category: undefined;

    


  };



const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Stack.Navigator>
      {session && session.user ? (
        <>
  

         <Stack.Screen
          name="Home"
          component={HomeScreen}
      
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Demo"
          component={DemoScreen}
      
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="Paywall"
          component={Paywall}
      
          options={{
            headerShown: false,
          }}
        />
          <Stack.Screen
          name="Account"
          component={Account}
      
         
        />
         <Stack.Screen
          name="Journal"
          component={JournalScreen}
          options={{
            headerShown: false,
          }}
        />
          <Stack.Screen
          name="Category"
          component={CategoryScreen}
          options={{
            headerShown: false,
          }}
        />
        </>
       
      ) : (
        <>
        <Stack.Screen name="Signin" component={But} options={{
            headerShown: false,
          }} />
          <Stack.Screen name="Signup" component={SignUp} options={{
            headerShown: false,
          }} />

<Stack.Screen name="Success" component={Success} />   
                
           
        </>
        
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
