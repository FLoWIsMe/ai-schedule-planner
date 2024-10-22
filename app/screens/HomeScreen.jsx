/**
 * @file HomeScreen.jsx
 * @description Main calendar application screen that displays events in both month and day views.
 * Allows users to add new events, navigate between views, and access settings.
 */

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
import { saveEvent, getEvents, deleteEvent } from '../utils/storage';
import AddEventModal from '../components/AddEventModal';

/**
 * HomeScreen Component
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.navigation - Navigation object provided by React Navigation
 * @returns {JSX.Element} Rendered HomeScreen component
 */
const HomeScreen = ({ navigation }) => {
  // State Management
  /**
   * @state {string} selectedView - Controls the current view ('month' or 'day')
   * @state {Date} selectedDate - Tracks the currently selected date
   * @state {boolean} isModalVisible - Controls the visibility of the Add Event modal
   * @state {Array<Event>} events - Stores all calendar events
   */
  const [selectedView, setSelectedView] = useState('month');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [events, setEvents] = useState([]);

  // Effects and Event Management
  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    fetchGoogleCalendarEvents();
  }, [selectedDate]);

  /**
   * Loads saved events from storage and updates state
   * @async
   */
  const loadEvents = async () => {
    const savedEvents = await getEvents();
    setEvents(savedEvents);
  };

  /**
   * Fetches events from Google Calendar API
   * @async
   * @todo Implement Google Calendar API integration
   */
  const fetchGoogleCalendarEvents = async () => {
    try {
      console.log('Fetching events...');
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  /**
   * Saves a new event and refreshes the events list
   * @async
   * @param {Event} newEvent - The event object to be saved
   */
  const handleSaveEvent = async (newEvent) => {
    const success = await saveEvent(newEvent);
    if (success) {
      await loadEvents();
    }
  };

  /**
   * Renders the header component with title and navigation buttons
   * @returns {JSX.Element}
   */
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color={COLORS.primaryText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calendar</Text>
      </View>
      <TouchableOpacity 
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Settings')}
      >
        <Ionicons name="settings-outline" size={24} color={COLORS.primaryText} />
      </TouchableOpacity>
    </View>
  );

  /**
   * Renders the view selector for switching between month and day views
   * @returns {JSX.Element}
   */
  const renderViewSelector = () => (
    <View style={styles.viewSelector}>
      <TouchableOpacity 
        style={[styles.viewOption, selectedView === 'month' && styles.selectedView]}
        onPress={() => setSelectedView('month')}
      >
        <Text style={styles.viewOptionText}>Month</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.viewOption, selectedView === 'day' && styles.selectedView]}
        onPress={() => setSelectedView('day')}
      >
        <Text style={styles.viewOptionText}>Day</Text>
      </TouchableOpacity>
    </View>
  );

  /**
   * Renders the list of events for the selected day
   * @returns {JSX.Element}
   */
  const renderEventsList = () => {
    const dayEvents = events.filter(event => {
      const eventDate = event.dueDate.split('T')[0];
      return eventDate === selectedDate;
    });

    if (dayEvents.length === 0) {
      return <Text style={styles.noEventsText}>No events scheduled</Text>;
    }

    return (
      <ScrollView style={styles.eventsList}>
        {dayEvents.map((event) => (
          <View key={event.id} style={styles.eventItem}>
            <Text style={styles.eventTitle}>{event.name}</Text>
            <View style={styles.eventDetails}>
              <Text style={styles.eventTime}>
                {new Date(event.dueDate).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </Text>
              <View style={[
                styles.priorityIndicator, 
                { backgroundColor: event.priority === 'high' ? '#FF453A' : 
                                 event.priority === 'medium' ? '#FFB340' : '#34C759' }
              ]} />
            </View>
          </View>
        ))}
      </ScrollView>
    );
  };

  /**
   * Renders the floating action button for adding new events
   * @returns {JSX.Element}
   */
  const renderFloatingActionButton = () => (
    <TouchableOpacity 
      style={styles.fab} 
      onPress={() => setIsModalVisible(true)}
    >
      <Ionicons name="add" size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );

  /**
   * Creates an object of marked dates for the calendar
   * Maps events to dates with corresponding priority colors
   */
  const markedDates = events.reduce((acc, event) => {
    try {
      const dateString = event.dueDate.split('T')[0];
      acc[dateString] = { 
        marked: true, 
        dotColor: event.priority === 'high' ? '#FF453A' : 
                  event.priority === 'medium' ? '#FFB340' : '#34C759'
      };
    } catch (error) {
      console.warn('Invalid date in event:', event);
    }
    return acc;
  }, {});

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {renderHeader()}
      {renderViewSelector()}
      
      {selectedView === 'month' ? (
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
          markedDates={markedDates}
          onDayPress={(day) => setSelectedDate(new Date(day.timestamp))}
          current={new Date().toISOString().split('T')[0]}
          hideExtraDays={true}
        />
      ) : (
        renderEventsList()
      )}

      {renderFloatingActionButton()}
      <AddEventModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveEvent}
      />
    </SafeAreaView>
  );
};

/**
 * @typedef {Object} Event
 * @property {string} id - Unique identifier for the event
 * @property {string} name - Name of the event
 * @property {string} dueDate - ISO string of the event date and time
 * @property {number} hoursNeeded - Number of hours needed for the event
 * @property {('low'|'medium'|'high')} priority - Priority level of the event
 * @property {string} createdAt - ISO string of creation timestamp
 */

/**
 * Component styles
 */
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
  headerTitle: {
    color: COLORS.primaryText,
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
  },
  menuButton: {
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
  eventItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  eventTitle: {
    color: COLORS.primaryText,
    fontSize: 16,
    fontWeight: '500',
  },
  eventTime: {
    color: COLORS.secondaryText,
    fontSize: 14,
    marginTop: 4,
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
  eventDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  priorityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  settingsButton: {
    padding: 8,
  },
});

export default HomeScreen;