import { RouteProp, useRoute } from '@react-navigation/native';
import { View, Text, SafeAreaView, StyleSheet, Button } from 'react-native'
import Modal from 'react-native-modal';
import { RootStackParamList } from './StackNavigator';


interface JournalEntry {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
}

type ModalRouteProp = RouteProp<RootStackParamList, 'Modal'>;
const Modals = ({ navigation }: any) => {
  const route = useRoute<ModalRouteProp>();
  const { JournalEntry } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Modal isVisible={true}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>This is a modal!{JournalEntry.title}</Text>
          <Button title="Close Modal" onPress={() => navigation.goBack()} />
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default Modals

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
    modalText: {
      marginBottom: 20,
    },
  });