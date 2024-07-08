import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import tw from "twrnc"
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../components/StackNavigator';
import Datatable from '../components/DataTable';
import DataTime from '../components/DataTime';
export type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Demo">;


const DemoScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={tw`bg-[#1982C4] flex-1`}>
      <TouchableOpacity style={tw`flex-row items-center p-5`} onPress={navigation.goBack}>
        <Ionicons name="arrow-back" size={50} color="white" />
        <Text style={tw`text-white`}>Go Back</Text>
      </TouchableOpacity> 

     <DataTime />

    </SafeAreaView>
  )
}

export default DemoScreen