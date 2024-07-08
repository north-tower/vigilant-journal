import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './StackNavigator';
import { useNavigation } from '@react-navigation/native';

export type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

type Props = {
    title: string;
    screen: any;
    color: string;
    requiresPro?: boolean;
    icon?: any;
    vertical?: boolean;
}

const ActionRow = ({
    title,
    screen,
    color,
    requiresPro,
    icon,
    vertical
}: Props) => {

  const navigation = useNavigation<NavigationProp>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(screen)}
    style={[tw`flex m-2 flex-1 justify-center items-center py-6 rounded-lg
    space-x-2 ${ vertical ? "flex-col" : "flex-row"}`, { backgroundColor: color }]}>
      {icon && <Ionicons name={icon} size={30} color="white" />}
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}

export default ActionRow;