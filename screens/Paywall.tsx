import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/StackNavigator';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import UserProfile from '../components/UserProfile';



export type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Paywall">;


const Paywall = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScrollView style={tw`bg-[#1A2F44] flex-1`}>
    <View style={tw`m-10 space-y-2`}>
        <Text style={tw`text-2xl text-center uppercase text-white font-bold`}>
            User Profile
        </Text>
       
    </View>

    <TouchableOpacity style={tw`absolute top-0 right-0 p-5`} onPress={navigation.goBack}>
        <Ionicons name="close-circle-sharp" size={32} color="#E5962D" />
        {/* <Ionicons name="person-circle" size={24} color="#E5962D" /> */}

    </TouchableOpacity>

    {/* <View style={tw`items-center`}>
      <MaterialCommunityIcons name='trophy-award' size={150} color="#E5962D" />
    </View>

    <View style={tw`space-y-5 px-10 py-5`}>
      <View style={tw`flex-row space-x-10 items-center`}>
        <Ionicons name="key" size={32} color="#E5962D" />
        <View style={tw`flex-1`}>
          <Text style={tw`text-white font-bold text-lg`}>
            Access
          </Text>

          <Text style={tw`text-white text-sm font-extralight`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, laborum, officia iste, quo adipisci porro cupiditate explicabo sequi accusamus accusantium excepturi maiores laudantium expedita commodi ducimus repellat reprehenderit vitae voluptatem?
          </Text>
        </View>
      </View>
      <View style={tw`flex-row space-x-10 items-center`}>
        <Ionicons name="key" size={32} color="#E5962D" />
        <View style={tw`flex-1`}>
          <Text style={tw`text-white font-bold text-lg`}>
            Access
          </Text>

          <Text style={tw`text-white text-sm font-extralight`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, laborum, officia iste, quo adipisci porro cupiditate explicabo sequi accusamus accusantium excepturi maiores laudantium expedita commodi ducimus repellat reprehenderit vitae voluptatem?
          </Text>
        </View>
      </View> */}
      <UserProfile />


   
  </ScrollView>
  )
}

export default Paywall