import { View, Text, SafeAreaView, StyleSheet, Button } from 'react-native'
import Modal from 'react-native-modal';

const Modals = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <Modal isVisible={true}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>This is a modal!</Text>
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