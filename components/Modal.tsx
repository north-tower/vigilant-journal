import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import { RootStackParamList } from './StackNavigator';
import tw from 'twrnc';
import { TextInput, Button } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface JournalEntry {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
}

type ModalRouteProp = RouteProp<RootStackParamList, 'Modal'>;
export type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Modal">;


const Modals = () => {
  const route = useRoute<ModalRouteProp>();
  const { JournalEntry } = route.params;
  const [title, setTitle] = useState(JournalEntry.title);
  const [content, setContent] = useState(JournalEntry.content);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await fetch(`https://postgres-js.vercel.app/journal/${JournalEntry.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          category: JournalEntry.category, // If category needs to be edited, add a field for it.
          date: JournalEntry.date, // If date needs to be edited, add a field for it.
        }),
      });

      if (response.ok) {
        const updatedEntry = await response.json();
        console.log('Journal entry updated:', updatedEntry);
        navigation.navigate('Home');
      } else {
        console.error('Failed to update journal entry');
      }
    } catch (error) {
      console.error('Error updating journal entry:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal isVisible={true}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={tw`flex-1`}
        >
          <ScrollView contentContainerStyle={tw`px-4 py-10`}>
            <View
              style={tw`mx-auto my-10 max-w-md rounded-xl bg-[#8AC926] px-4 py-10 shadow-lg sm:px-8`}
            >
              <Text style={tw`text-white text-2xl font-bold mb-6`}>Edit Journal Entry</Text>
              <Text style={tw`text-white mb-5`}>
                Update your journal entry details below.
              </Text>
              <View style={tw`mb-6`}>
                <TextInput
                  label="Title"
                  value={title}
                  onChangeText={setTitle}
                  style={tw`mb-4 bg-[#8AC926] text-white`}
                  underlineColor="white"
                  activeUnderlineColor="white"
                />
                <TextInput
                  label="Content"
                  value={content}
                  onChangeText={setContent}
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

        {/* <View style={styles.modalContent}>
          <Button title="Close Modal" onPress={() => navigation.goBack()} />
        </View> */}
      </Modal>
    </SafeAreaView>
  );
};

export default Modals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});
