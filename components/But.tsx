import React, { useState } from 'react';
import { View, Text, TouchableOpacity, AppState, Alert, TextInput } from 'react-native';
import tw from 'twrnc';
import { supabase } from '../lib/supabase';

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

function But() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { data: { session }, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <View style={tw`mx-auto my-10 max-w-md rounded-xl border px-4 py-10 bg-white shadow-lg sm:px-8`}>
      <View style={tw`mb-8 flex justify-between`}>
        <Text style={tw`font-bold`}>
          <View style={tw`inline-block h-3 w-3 bg-blue-600`}></View> Journal
        </Text>
        {/* <Text>
          Have account?{' '}
          <Text style={tw`font-medium text-blue-600 hover:underline`}>Log in</Text>
        </Text> */}
      </View>
      <Text style={tw`mb-5 text-lg font-medium`}>  Welcome Back to Your Personal Journal</Text>
      <Text style={tw`mb-6 text-sm`}>
    
      Record your thoughts, capture your memories, and keep track of your daily experiences. Log in to continue your journey of self-reflection and growth.
      </Text>
      <View style={tw`mb-6`}>
        <View style={tw`focus-within:border-b-blue-500 relative mb-3 flex overflow-hidden border-b-2 transition`}>
          <TextInput
            style={tw`w-full flex-1 border-blue-300 bg-white px-4 py-2 text-base text-gray-700 focus:outline-none`}
            placeholder="Email"
            placeholderTextColor="black"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
        <View style={tw`focus-within:border-b-blue-500 relative mb-3 flex overflow-hidden border-b-2 transition`}>
          <TextInput
            style={tw`w-full flex-1 border-blue-300 bg-white px-4 py-2 text-base text-gray-700 focus:outline-none`}
            placeholder="Password"
            placeholderTextColor="black"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
        </View>
      </View>
      <TouchableOpacity disabled={loading} onPress={() => signInWithEmail()} style={tw`mb-6 rounded-xl bg-blue-600 px-8 py-3`}>
        <Text style={tw`font-medium text-white text-center`}>Log in</Text>
      </TouchableOpacity>
      <Text>
        New to the app?
        <Text style={tw`whitespace-nowrap font-medium text-gray-900 hover:underline`}>
          Sign Up</Text>
      </Text>
    </View>
  );
}

export default But;
