import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

interface CategoryCardProps {
  id: number;
  imgUrl: string;
  title: string;
  rating: number;
  genre: string;
  short_description: string;
  dishes: string[];
  long: number;
  lat: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  imgUrl,
  title,
  rating,
  genre,

  short_description,
  dishes,
  long,
  lat,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={tw`relative mr-2`}
      // onPress={() => {
      //   navigation.navigate("Restaurant", { id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat });
      // }}
    >
      <Image
        source={{ uri: imgUrl }}
        style={tw`h-20 w-20 rounded`}
      />
      <Text style={tw`absolute bottom-1 left-1 text-white font-bold`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default CategoryCard;

const styles = StyleSheet.create({});
