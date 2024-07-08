import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import tw from "twrnc"
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../components/StackNavigator';
export type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Demo">;


const DemoScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={tw`bg-[#E5962D] flex-1`}>
      <TouchableOpacity style={tw`flex-row items-center p-5`} onPress={navigation.goBack}>
        <Ionicons name="arrow-back" size={50} color="white" />
        <Text style={tw`text-white`}>Go Back</Text>
      </TouchableOpacity> 

      <View style={tw`flex-1 items-center justify-center px-10`}>
        <Text style={tw`text-white text-2xl font-extrabold`}>Horray!</Text>
        <Text style={tw`text-white text-2xl font-extrabold mb-20`}>
          You have access
        </Text>
        <Ionicons name='build-outline' size={200} color="white" />
        <View style={tw`-mt-16 -ml-8`}>
          <Ionicons name="checkmark-circle-sharp" size={60} color="#96F550" />

        </View>
        <Text style={tw`text-white mt-10 flex-1 font-bold text-center`}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit deserunt labore facilis aliquam vel inventore illo magni amet similique sequi. Deserunt corrupti quasi incidunt doloribus blanditiis facere perspiciatis rerum sed.
        </Text>
      </View>

    </SafeAreaView>
  )
}

export default DemoScreen