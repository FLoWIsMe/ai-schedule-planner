// screens/Calendar/GoogleCalendarIntegrationScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useTypedNavigation } from '@/types/navigation';

const GoogleCalendarIntegrationScreen: React.FC = () => {
  const navigation = useTypedNavigation<'GoogleCalendarIntegration'>(); // Typed navigation hook

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Google Calendar Integration Screen</Text>
      <Button
        title="Go Back"
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

export default GoogleCalendarIntegrationScreen;