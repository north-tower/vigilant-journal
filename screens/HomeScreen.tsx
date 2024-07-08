import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { Ionicons } from '@expo/vector-icons'
import ActionRow from '../components/ActionRow'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../components/StackNavigator'
import { useNavigation } from '@react-navigation/native'

export type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;


const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100 relative`}> 
    <ScrollView>
        <TouchableOpacity 
        onPress={() => navigation.navigate("Paywall")}
        
        style={tw`absolute z-50 top-5 right-10 items-center`}>
            <Ionicons name="person-circle" size={24} color="#E5962D" />
            <Text style={tw`text-center text-[#E5962D]`}>User</Text>
        </TouchableOpacity>
     
      <Image 
        source={{ uri: "https://i.postimg.cc/zB2Hs1SP/e14NE49.png" }} 
        style={tw`w-full h-64`}
        onLoad={() => console.log('Image loaded')} 
        onError={() => console.log('Image failed to load')} 
        />
        <View style={tw`mx-5`}>
        <View style={tw`flex-row justify-between space-x-2`}>


        <ActionRow 
        title="Track Workout"
        screen="Demo"
        color="#E5962D"
        icon="fitness"
        vertical
        />

        <ActionRow 
        title="Browse Workouts"
        screen="Demo"
        color="#1982C4"
        icon="library"
        vertical
        />
        </View>
        

        <ActionRow 
        title="Connect with Friends"
        screen="Demo"
        color="#F44174"
        icon="share-social"
        />
        <ActionRow 
        title="Add an Exercise"
        screen="Demo"
        color="#8AC926"
        icon="add-circle"
        requiresPro
        />
          <ActionRow 
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
        />
        </View>
        
    
</ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen