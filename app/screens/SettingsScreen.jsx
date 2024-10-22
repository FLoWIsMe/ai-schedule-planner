// screens/SettingsScreen.jsx
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  SafeAreaView 
} from 'react-native';
import { deleteAllEvents } from '../utils/storage';
import { COLORS } from '../constants/theme';

const SettingsScreen = ({ navigation }) => {
  const handleDeleteAllEvents = async () => {
    Alert.alert(
      "Delete All Events",
      "Are you sure you want to delete all events? This cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const success = await deleteAllEvents();
            if (success) {
              Alert.alert("Success", "All events have been deleted");
              navigation.navigate('Home');
            } else {
              Alert.alert("Error", "Failed to delete events");
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={handleDeleteAllEvents}
        >
          <Text style={styles.deleteButtonText}>Delete All Events</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;