import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import { Ionicons } from '@expo/vector-icons'
import ActionRow from '../components/ActionRow'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../components/StackNavigator'
import { useNavigation } from '@react-navigation/native'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;


const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])


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
    <SafeAreaView style={tw`flex-1 bg-gray-100 relative`}> 
    <ScrollView>
        <TouchableOpacity 
        onPress={() => navigation.navigate("Paywall")}
        
        style={tw`absolute z-50 top-5 right-10 items-center mb-6`}>
            <Ionicons name="person-circle" size={24} color="#E5962D" />
            <Text style={tw`text-center text-[#E5962D]`}>{username}</Text>
        </TouchableOpacity>
     
    
        <View style={tw`mx-5 pt-15`}>
        <View style={tw`flex-row justify-between space-x-2`}>


        <ActionRow 
        title="Add Journal"
        screen="Journal"
        color="#E5962D"
        icon="add-circle-outline"
        vertical
        />

        
        <ActionRow 
        title="Add a Category"
        screen="Category"
        color="#8AC926"
        icon="add-circle"
        vertical
        />
        </View>
        
        <ActionRow 
        title="Browse Journals"
        screen="Table"
        color="#1982C4"
        icon="search-outline"
        vertical
        />
        <ActionRow 
        title="Browse journals with timeframes"
        screen="DataTime"
        color="#F44174"
        icon="search-circle-outline"
        />
       
          {/* <ActionRow 
        title="Create a Routine"
        screen="Demo"
        color="#C03221"
        icon="md-time"
        requiresPro
        />
          <ActionRow 
        title="Join Challenges"
        screen="Demo"
        color="#23967F"
        icon="trophy"
        requiresPro
        /> */}
        </View>
        
    
</ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen