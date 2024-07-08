import { NavigationContainer } from "@react-navigation/native"
import StackNavigator from './components/StackNavigator'
import { PaperProvider } from 'react-native-paper';
export default function App() {
  

  return (
  
      // <View>
      //   {session && session.user ?
      //    <Account key={session.user.id} 
      //    session={session} /> : <But />}
      // </View>
     

<NavigationContainer>

         <StackNavigator />     
     

      </NavigationContainer>
     
  )
}