import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen Here</Text>
      <Button
        title="Go to New Task"
        onPress={() => router.push('/screens/Home/NewTaskScreen')}
      />
    </View>
  );
}

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