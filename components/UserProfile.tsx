import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert, Button } from 'react-native';
import tw from 'twrnc';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './StackNavigator';

export type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Paywall">;


const UserProfile = () => {
    const [session, setSession] = useState<Session | null>(null);
  const navigation = useNavigation<NavigationProp>();


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [website, setWebsite] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <View style={tw`m-10 max-w-sm bg-[#E5962D]`}>
      <View style={tw`rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg`}>
        <View style={tw`relative mx-auto w-36 rounded-full`}>
          <View style={tw`absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2`}></View>
          <Image
            style={tw`mx-auto h-auto w-full rounded-full`}
            source={{ uri: avatarUrl }}
          />
        </View>
        <Text style={tw`my-1 text-center text-xl font-bold leading-8 text-gray-900`}>{username}</Text>
         {/* <Text style={tw`font-lg text-semibold text-center leading-6 
        text-gray-600`}>Marketing Exec. at Denva Corp</Text> */}
        <Text style={tw`text-center text-sm leading-6 text-gray-500 
        hover:text-gray-600`}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto,
         placeat!</Text>
        <View style={tw`mt-3 divide-y rounded bg-gray-[#E5962D] py-2 px-3 text-gray-600 shadow-sm
             hover:text-gray-700 hover:shadow`}>
        <Button title="Edit Profile" onPress={() => navigation.navigate("Account", { session })} />
       
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      
        </View>
      </View>
    </View>
  );
};

export default UserProfile;
