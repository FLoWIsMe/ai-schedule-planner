import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native';

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1C1C1E' }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </SafeAreaView>
  );
}