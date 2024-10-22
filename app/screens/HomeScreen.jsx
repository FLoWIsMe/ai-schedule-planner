// WelcomeScreen.jsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform 
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

const HomeScreen = () => {
  const [selectedView, setSelectedView] = useState('week'); // 'day', 'week', 'month'
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchGoogleCalendarEvents();
  }, [selectedDate]);

  const fetchGoogleCalendarEvents = async () => {
    try {
      // TODO: Implement Google Calendar API integration
      // This is where you'll fetch events from Google Calendar
      console.log('Fetching events...');
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color={COLORS.primaryText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calendar</Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color={COLORS.primaryText} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle" size={24} color={COLORS.primaryText} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderViewSelector = () => (
    <View style={styles.viewSelector}>
      <TouchableOpacity 
        style={[styles.viewOption, selectedView === 'day' && styles.selectedView]}
        onPress={() => setSelectedView('day')}
      >
        <Text style={styles.viewOptionText}>Day</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.viewOption, selectedView === 'week' && styles.selectedView]}
        onPress={() => setSelectedView('week')}
      >
        <Text style={styles.viewOptionText}>Week</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.viewOption, selectedView === 'month' && styles.selectedView]}
        onPress={() => setSelectedView('month')}
      >
        <Text style={styles.viewOptionText}>Month</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFloatingActionButton = () => (
    <TouchableOpacity style={styles.fab} onPress={() => console.log('Add event')}>
      <Ionicons name="add" size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {renderHeader()}
      {renderViewSelector()}
      
      <Calendar
        style={styles.calendar}
        theme={{
          backgroundColor: COLORS.background,
          calendarBackground: COLORS.background,
          textSectionTitleColor: COLORS.primaryText,
          selectedDayBackgroundColor: COLORS.accent,
          selectedDayTextColor: '#ffffff',
          todayTextColor: COLORS.accent,
          dayTextColor: COLORS.primaryText,
          textDisabledColor: COLORS.secondaryText,
          monthTextColor: COLORS.primaryText,
        }}
        onDayPress={(day) => setSelectedDate(new Date(day.timestamp))}
      />

      <ScrollView style={styles.eventsList}>
        {/* TODO: Render events list here */}
        <Text style={styles.noEventsText}>No events scheduled</Text>
      </ScrollView>

      {renderFloatingActionButton()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.primaryText,
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
  },
  menuButton: {
    padding: 8,
  },
  searchButton: {
    padding: 8,
    marginRight: 8,
  },
  profileButton: {
    padding: 8,
  },
  viewSelector: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  viewOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  selectedView: {
    backgroundColor: COLORS.accent,
  },
  viewOptionText: {
    color: COLORS.primaryText,
  },
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  eventsList: {
    flex: 1,
  },
  noEventsText: {
    color: COLORS.secondaryText,
    textAlign: 'center',
    padding: 20,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: COLORS.accent,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default HomeScreen;