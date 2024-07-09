import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';


const Success = () => {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-xl font-bold`}>Sign Up Successful!</Text>
      <Text style={tw`mt-4 text-base`}>Please check your email for verification.</Text>

    </View>
  );
};

export default Success;
