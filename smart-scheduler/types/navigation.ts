// types/navigation.ts
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

// Define the param list for your stack navigator
export type RootStackParamList = {
  Home: undefined;
  NewTask: undefined;
  GoogleCalendarIntegration: undefined;
  Welcome: undefined;
  // Add more screens here if needed
};

// Create a typed hook for stack navigation
export const useTypedNavigation = <T extends keyof RootStackParamList>() => {
  return useNavigation<StackNavigationProp<RootStackParamList, T>>();
};