import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { TextInput, Button } from 'react-native-paper';
import { RootStackParamList } from '../components/StackNavigator';

export type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Category">;

const CategoryScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://postgres-js.vercel.app/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          category,
        })
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Category entry saved successfully!');
        navigation.goBack();
      } else {
        Alert.alert('Error', data.message || 'An error occurred');
      }
    } catch (error) {
      Alert.alert('Error'|| 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={tw`bg-[#8AC926] flex-1`}>
      <TouchableOpacity style={tw`flex-row items-center p-5`} onPress={navigation.goBack}>
        <Ionicons name="arrow-back" size={50} color="white" />
        <Text style={tw`text-white`}>Go Back</Text>
      </TouchableOpacity>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={tw`flex-1`}>
        <ScrollView contentContainerStyle={tw`px-4 py-10`}>
          <View style={tw`mx-auto my-10 max-w-md rounded-xl bg-[#8AC926] px-4 py-10 shadow-lg sm:px-8`}>
            <Text style={tw`text-white text-2xl font-bold mb-6`}>New Category Entry</Text>
            <Text style={tw`text-white mb-5`}>
              Record your thoughts, capture your memories, and keep track of your daily experiences. Start a new entry to continue your journey of self-reflection and growth.
            </Text>
            <View style={tw`mb-6`}>
              <TextInput
                label="Category"
                value={category}
                onChangeText={setCategory}
                style={tw`mb-4 bg-[#8AC926] text-white`}
                underlineColor="white"
                activeUnderlineColor="white"
              />
            </View>
            {loading ? (
              <ActivityIndicator size="large" color="#FFFFFF" />
            ) : (
              <Button mode="contained" onPress={handleSubmit} style={tw`bg-white`}>
                <Text style={tw`text-[#8AC926]`}>Save Entry</Text>
              </Button>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CategoryScreen;
