// screens/Home/NewTaskScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useTypedNavigation } from '@/types/navigation';

const NewTaskScreen: React.FC = () => {
  const navigation = useTypedNavigation<'NewTask'>(); // Typed navigation hook

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hey App Devlopment Club</Text>
      <Button
        title="Go Back to Home"
        onPress={() => navigation.goBack()}
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

export default NewTaskScreen;