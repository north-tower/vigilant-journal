import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  View, Text, SafeAreaView, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView, Alert, StyleSheet,
} from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { TextInput, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RootStackParamList } from '../components/StackNavigator';
import { Dropdown } from 'react-native-element-dropdown';

export type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Demo'>;


interface Category {
  label: string;
  value: string;
}


const JournalScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://postgres-js.vercel.app/getCategory');
      if (response.ok) {
        const data = await response.json();
        const formattedCategories = data.map((cat: any) => ({ label: cat.category, value: cat.category }));
        setCategories(formattedCategories);
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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          category: value,
          date: date.toISOString().split('T')[0], // format the date to 'YYYY-MM-DD'
        }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Journal entry saved successfully!');
        navigation.goBack();
      } else {
        Alert.alert('Error', data.message || 'An error occurred');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while saving the journal entry');
    }
  };

  return (
    <SafeAreaView style={tw`bg-[#E5962D] flex-1`}>
      <TouchableOpacity style={tw`flex-row items-center p-5`} onPress={navigation.goBack}>
        <Ionicons name="arrow-back" size={50} color="white" />
        <Text style={tw`text-white`}>Go Back</Text>
      </TouchableOpacity>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={tw`flex-1`}>
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
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={categories}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Category"
                searchPlaceholder="Search..."
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
                renderLeftIcon={() => (
                  <Ionicons name="list" size={24} color="#E5962D" />
                )}
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

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
