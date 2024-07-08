import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { TextInput, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RootStackParamList } from '../components/StackNavigator';
import { Checkbox } from 'react-native-paper';

export type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Demo">;

const JournalScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://postgres-js.vercel.app/getCategory');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.map((category: any) => category.category)); // Assuming category objects have a 'name' field
      } else {
        Alert.alert('Error', 'Failed to fetch categories');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while fetching categories');
    }
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://postgres-js.vercel.app/journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          content,
          category,
          date: date.toISOString().split('T')[0] // format the date to 'YYYY-MM-DD'
        })
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Journal entry saved successfully!');
        navigation.goBack();
      } else {
        Alert.alert('Error', data.message || 'An error occurred');
      }
    } catch (error) {
      Alert.alert('Error' || 'An error occurred');
    }
  };

  return (
    <SafeAreaView style={tw`bg-[#E5962D] flex-1`}>
      <TouchableOpacity style={tw`flex-row items-center p-5`} onPress={navigation.goBack}>
        <Ionicons name="arrow-back" size={50} color="white" />
        <Text style={tw`text-white`}>Go Back</Text>
      </TouchableOpacity>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={tw`flex-1`}>
        <ScrollView contentContainerStyle={tw`px-4 py-10`}>
          <View style={tw`mx-auto my-10 max-w-md rounded-xl bg-[#E5962D] px-4 py-10 shadow-lg sm:px-8`}>
            <Text style={tw`text-white text-2xl font-bold mb-6`}>New Journal Entry</Text>
            <Text style={tw`text-white mb-5`}>
              Record your thoughts, capture your memories, and keep track of your daily experiences. Start a new entry to continue your journey of self-reflection and growth.
            </Text>
            <View style={tw`mb-6`}>
              <TextInput
                label="Title"
                value={title}
                onChangeText={setTitle}
                style={tw`mb-4 bg-[#E5962D] text-white`}
                underlineColor="white"
                activeUnderlineColor="white"
              />
              <TextInput
                label="Content"
                value={content}
                onChangeText={setContent}
                multiline
                numberOfLines={4}
                style={tw`mb-4 bg-[#E5962D] text-white`}
                underlineColor="white"
                activeUnderlineColor="white"
              />
              <TextInput
                label="Category"
                value={category}
                onChangeText={setCategory}
                style={tw`mb-4 bg-[#E5962D] text-white`}
                underlineColor="white"
                activeUnderlineColor="white"
              />
               
           
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={tw`mb-4 bg-[#E5962D]`}>
                <TextInput
                  label="Date"
                  value={date.toDateString()}
                  editable={false}
                  style={tw`bg-[#E5962D] text-white`}
                  underlineColor="white"
                  activeUnderlineColor="white"
                />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onChangeDate}
                />
              )}
            </View>
            <Button mode="contained" onPress={handleSubmit} style={tw`bg-white`}>
              <Text style={tw`text-[#E5962D]`}>Save Entry</Text>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default JournalScreen;
