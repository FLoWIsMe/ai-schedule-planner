// screens/Onboarding/WelcomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useTypedNavigation } from '@/types/navigation';

const WelcomeScreen: React.FC = () => {
  const navigation = useTypedNavigation<'Welcome'>();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the club</Text>
      <Button
        title="Import Google Calendar"
        onPress={() => navigation.navigate('GoogleCalendarIntegration')}
      />
      <Button
        title="Skip to Home"
        onPress={() => navigation.replace('Home')}
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
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default WelcomeScreen;