import React, { useState,  useEffect } from 'react';
import { TouchableOpacity,Text, Button, } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Modal, Portal, PaperProvider } from 'react-native-paper';
import Modals from './Modal';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './StackNavigator';
import { useNavigation } from '@react-navigation/native';

interface JournalEntry {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string; // Assuming date is a string; adjust as per your backend schema
}


export type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Table">;
const Datatable = () => {
  const navigation = useNavigation<NavigationProp>();

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([5, 10, 15]); // Adjust as needed
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[0]);
  const [items, setItems] = useState<any[]>([]); // Initialize with empty array
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const handleEdit = (entry: JournalEntry) => {
    setSelectedEntry(entry); // Set the selected entry to open the modal
  };

  const handleSave = (updatedEntry: JournalEntry) => {
    // Implement logic to update the entry using API
    console.log('Updated Entry:', updatedEntry);
    // Ideally, update the state or make API call to update the backend
  };

  const handleCloseModal = () => {
    setSelectedEntry(null); // Clear selected entry to close the modal
  };
  // Example API endpoint URLs
  const apiUrl = 'https://postgres-js.vercel.app/journal';

  // Function to fetch journal entries from API
  const fetchJournalEntries = async () => {
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        setItems(data); // Update items state with fetched data
      } else {
        console.error('Failed to fetch journal entries');
      }
    } catch (error) {
      console.error('Error fetching journal entries:', error);
    }
  };

  useEffect(() => {
    fetchJournalEntries(); // Fetch data when component mounts
  }, []);

  useEffect(() => {
    setPage(0); // Reset page to 0 when itemsPerPage changes
  }, [itemsPerPage]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  // Function to delete a journal entry
  const deleteJournalEntry = async (id: number) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Update items state after deletion
        setItems(items.filter(item => item.id !== id));
        console.log('Journal entry deleted successfully');
      } else {
        console.error('Failed to delete journal entry');
      }
    } catch (error) {
      console.error('Error deleting journal entry:', error);
    }
  };

  // Function to edit a journal entry
  const editJournalEntry = async (id: number, updatedData: any) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        // Update items state after edit
        const updatedItems = items.map(item =>
          item.id === id ? { ...item, ...updatedData } : item
        );
        setItems(updatedItems);
        console.log('Journal entry updated successfully');
      } else {
        console.error('Failed to update journal entry');
      }
    } catch (error) {
      console.error('Error updating journal entry:', error);
    }
  };

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Title</DataTable.Title>
        <DataTable.Title numeric>Content</DataTable.Title>
        <DataTable.Title numeric>Category</DataTable.Title>
        <DataTable.Title numeric>Date</DataTable.Title>
        <DataTable.Title numeric>Actions</DataTable.Title>
      </DataTable.Header>

      {items.map(item => (
        <DataTable.Row key={item.id}>
          <DataTable.Cell>{item.title}</DataTable.Cell>
          <DataTable.Cell numeric>{item.content}</DataTable.Cell>
          <DataTable.Cell numeric>{item.category}</DataTable.Cell>
          <DataTable.Cell numeric>{item.date}</DataTable.Cell>
          <DataTable.Cell numeric>
            <TouchableOpacity onPress={() => deleteJournalEntry(item.id)}>
              <Text>Delete</Text>
            </TouchableOpacity>{' '}
            |{' '}
           
            <Button title="Open Modal" onPress={() => navigation.navigate('Modal')} />
          
          </DataTable.Cell>
        </DataTable.Row>
      ))}

      {/* Example Pagination */}
    </DataTable>
  );
};

export default Datatable;
