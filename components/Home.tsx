import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Searchbar } from 'react-native-paper';
import tw from 'twrnc';
import Nav from './Nav';
import J from './J';
import Categories from './Categories';
import Datatable from './DataTable';

const Home = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
  return (
    <SafeAreaView style={tw`bg-white pt-5`}>
       <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />




<Datatable />
    <Nav />
    </SafeAreaView>
  )
}

export default Home