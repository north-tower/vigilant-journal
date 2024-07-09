import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';

interface JournalEntry {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string; // Assuming date is a string; adjust as per your backend schema
}

const DataTime = () => {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([5, 10, 15]); // Adjust as needed
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[0]);
  const [items, setItems] = useState<JournalEntry[]>([]); // Initialize with empty array
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);

  const apiUrl = 'https://postgres-js.vercel.app/journal';

  
  const fetchJournalEntries = async () => {
    try {
      let url = apiUrl;

      if (startDate && endDate) {
        url += `?start=${format(startDate, 'yyyy-MM-dd')}&end=${format(endDate, 'yyyy-MM-dd')}`;
      }

      const response = await fetch(url);
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
    fetchJournalEntries(); // Fetch data when component mounts or when dates change
  }, [startDate, endDate]);



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
    <View style={styles.container}>
      <View style={styles.datePickerContainer}>
        <TouchableOpacity onPress={() => setOpenStartDatePicker(true)}>
          <Text style={styles.datePickerText}>
            {startDate ? format(startDate, 'yyyy-MM-dd') : 'Select Start Date'}
          </Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={openStartDatePicker}
          date={startDate || new Date()}
          onConfirm={(date) => {
            setOpenStartDatePicker(false);
            setStartDate(date);
          }}
          onCancel={() => setOpenStartDatePicker(false)}
        />
        <TouchableOpacity onPress={() => setOpenEndDatePicker(true)}>
          <Text style={styles.datePickerText}>
            {endDate ? format(endDate, 'yyyy-MM-dd') : 'Select End Date'}
          </Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={openEndDatePicker}
          date={endDate || new Date()}
          onConfirm={(date) => {
            setOpenEndDatePicker(false);
            setEndDate(date);
          }}
          onCancel={() => setOpenEndDatePicker(false)}
        />
      </View>
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
              <TouchableOpacity onPress={() => editJournalEntry(item.id, { /* updated fields */ })}>
                <Text>Edit</Text>
              </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        
      </DataTable>
    </View>
  );
};

export default DataTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  datePickerText: {
    fontSize: 16,
    color: 'blue',
  },
});
