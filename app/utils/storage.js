// utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const EVENTS_KEY = '@events';

export const saveEvent = async (event) => {
  try {
    const existingEvents = await getEvents();
    const updatedEvents = [...existingEvents, event];
    await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(updatedEvents));
    return true;
  } catch (error) {
    console.error('Error saving event:', error);
    return false;
  }
};

export const getEvents = async () => {
  try {
    const events = await AsyncStorage.getItem(EVENTS_KEY);
    return events ? JSON.parse(events) : [];
  } catch (error) {
    console.error('Error getting events:', error);
    return [];
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const existingEvents = await getEvents();
    const updatedEvents = existingEvents.filter(event => event.id !== eventId);
    await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(updatedEvents));
    return true;
  } catch (error) {
    console.error('Error deleting event:', error);
    return false;
  }
};