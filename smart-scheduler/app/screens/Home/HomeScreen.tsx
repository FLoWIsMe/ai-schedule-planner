// screens/Home/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useTypedNavigation } from '@/types/navigation';

const HomeScreen: React.FC = () => {
  const navigation = useTypedNavigation<'Home'>();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Button
        title="Go to New Task"
        onPress={() => navigation.navigate('NewTask')}  // Make sure 'NewTask' matches exactly with the registered name
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
  },
  text: {
    color: '#E5E5E7',
    fontSize: 18,
  },
});

export default HomeScreen;