import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import Account from './Account';

import But from './But';
import SignUp from './SignUp';

export type RootStackParamList = {
    Account: { session: Session | null };
    SignUp: undefined;
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
        <Stack.Screen
          name="Account"
          component={Account}
      
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <>
        <Stack.Screen name="But" component={But} options={{
            headerShown: false,
          }} />
          <Stack.Screen name="Signup" component={SignUp} options={{
            headerShown: false,
          }} />
        </>
        
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
