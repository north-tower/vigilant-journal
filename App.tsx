import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import Account from './components/Account'
import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { PaperProvider } from 'react-native-paper';
import But from './components/But'
import { NavigationContainer } from "@react-navigation/native"
import StackNavigator from './components/StackNavigator'

export default function App() {
  

  return (
  
      // <View>
      //   {session && session.user ?
      //    <Account key={session.user.id} 
      //    session={session} /> : <But />}
      // </View>
      <NavigationContainer>
         <StackNavigator />     
      </NavigationContainer>
  )
}