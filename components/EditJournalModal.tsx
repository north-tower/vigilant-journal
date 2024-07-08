import React, { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
interface JournalEntry {
    id: number;
    title: string;
    content: string;
    category: string;
    date: string; // Assuming date is a string; adjust as per your backend schema
  }
  
interface EditJournalModalProps {
  journalEntry: JournalEntry | null;
  onSave: (updatedEntry: JournalEntry) => void;
  onClose: () => void;
}

const EditJournalModal: React.FC<EditJournalModalProps> = ({ journalEntry, onSave, onClose }) => {
  const [editedEntry, setEditedEntry] = useState<JournalEntry | null>(null);

  // Initialize the form with the selected journal entry
  React.useEffect(() => {
    setEditedEntry(journalEntry);
  }, [journalEntry]);

  const handleSave = () => {
    if (editedEntry) {
      onSave(editedEntry);
      onClose(); // Close the modal after saving
    }
  };

  return (
    <Modal visible={!!journalEntry} animationType="slide">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Edit Journal Entry</Text>
          <TextInput
            placeholder="Title"
            value={editedEntry?.title}
            onChangeText={(text) => setEditedEntry({ ...editedEntry, title: text })}
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
          />
          <TextInput
            placeholder="Content"
            value={editedEntry?.content}
            onChangeText={(text) => setEditedEntry({ ...editedEntry, content: text })}
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
          />
          <TextInput
            placeholder="Category"
            value={editedEntry?.category}
            onChangeText={(text) => setEditedEntry({ ...editedEntry, category: text })}
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
          />
          <TouchableOpacity onPress={handleSave} style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={{ marginTop: 10 }}>
            <Text style={{ color: 'blue', textAlign: 'center' }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EditJournalModal;
