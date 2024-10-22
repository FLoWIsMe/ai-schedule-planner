/**
 * @file AddEventModal.jsx
 * @description Modal component for adding new events to the calendar application.
 * Provides form inputs for event details including name, date, duration, and priority.
 */

import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from '../constants/theme';

/**
 * AddEventModal Component
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.visible - Controls modal visibility
 * @param {Function} props.onClose - Callback function to close the modal
 * @param {Function} props.onSave - Callback function to save the new event
 * @returns {JSX.Element} Rendered AddEventModal component
 */
const AddEventModal = ({ visible, onClose, onSave }) => {
  /**
   * State Management
   * @state {string} name - Event name
   * @state {Date} dueDate - Event due date
   * @state {string} hoursNeeded - Number of hours needed for the event
   * @state {('low'|'medium'|'high')} priority - Event priority level
   * @state {boolean} showDatePicker - Controls date picker visibility
   */
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [hoursNeeded, setHoursNeeded] = useState('');
  const [priority, setPriority] = useState('medium');
  const [showDatePicker, setShowDatePicker] = useState(false);

  /**
   * Handles saving the new event
   * Creates event object and passes it to onSave callback
   */
  const handleSave = () => {
    onSave({
      id: Date.now().toString(),
      name,
      dueDate: dueDate.toISOString(),
      hoursNeeded: parseFloat(hoursNeeded),
      priority,
      createdAt: new Date().toISOString()
    });
    resetForm();
    onClose();
  };

  /**
   * Resets form fields to default values
   */
  const resetForm = () => {
    setName('');
    setDueDate(new Date());
    setHoursNeeded('');
    setPriority('medium');
  };

  /**
   * Renders a priority selection button
   * @param {('low'|'medium'|'high')} level - Priority level
   * @param {string} label - Button label
   * @returns {JSX.Element} Rendered priority button
   */
  const renderPriorityButton = (level, label) => (
    <TouchableOpacity
      style={[
        styles.priorityButton,
        priority === level && styles.selectedPriority,
        { backgroundColor: level === 'high' ? '#FF453A' : 
                          level === 'medium' ? '#FFB340' : 
                          '#34C759' }
      ]}
      onPress={() => setPriority(level)}
    >
      <Text style={styles.priorityButtonText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Event</Text>
          
          <Text style={styles.label}>Event Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter event name"
            placeholderTextColor={COLORS.secondaryText}
          />

          <Text style={styles.label}>Due Date</Text>
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateButtonText}>
              {dueDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setDueDate(selectedDate);
                }
              }}
            />
          )}

          <Text style={styles.label}>Hours Needed</Text>
          <TextInput
            style={styles.input}
            value={hoursNeeded}
            onChangeText={setHoursNeeded}
            placeholder="Enter hours needed"
            keyboardType="numeric"
            placeholderTextColor={COLORS.secondaryText}
          />

          <Text style={styles.label}>Priority</Text>
          <View style={styles.priorityContainer}>
            {renderPriorityButton('low', 'Low')}
            {renderPriorityButton('medium', 'Medium')}
            {renderPriorityButton('high', 'High')}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.saveButton]} 
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

/**
 * @typedef {Object} EventFormData
 * @property {string} id - Unique identifier for the event
 * @property {string} name - Event name
 * @property {string} dueDate - ISO string of event due date
 * @property {number} hoursNeeded - Hours needed for the event
 * @property {('low'|'medium'|'high')} priority - Event priority level
 * @property {string} createdAt - ISO string of creation timestamp
 */

/**
 * Component styles
 * @constant styles
 * @type {Object}
 * @property {Object} modalContainer - Main modal container styles
 * @property {Object} modalContent - Modal content wrapper styles
 * @property {Object} modalTitle - Modal title text styles
 * @property {Object} label - Input label styles
 * @property {Object} input - Text input styles
 * @property {Object} dateButton - Date picker button styles
 * @property {Object} dateButtonText - Date button text styles
 * @property {Object} priorityContainer - Priority buttons container styles
 * @property {Object} priorityButton - Priority button styles
 * @property {Object} selectedPriority - Selected priority button styles
 * @property {Object} priorityButtonText - Priority button text styles
 * @property {Object} buttonContainer - Action buttons container styles
 * @property {Object} button - Base button styles
 * @property {Object} cancelButton - Cancel button styles
 * @property {Object} saveButton - Save button styles
 * @property {Object} buttonText - Button text styles
 */

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: COLORS.background,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primaryText,
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: COLORS.primaryText,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#2C2C2E',
    borderRadius: 10,
    padding: 12,
    color: COLORS.primaryText,
    marginBottom: 16,
  },
  dateButton: {
    backgroundColor: '#2C2C2E',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  dateButtonText: {
    color: COLORS.primaryText,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  priorityButton: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  selectedPriority: {
    opacity: 1,
  },
  priorityButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#2C2C2E',
  },
  saveButton: {
    backgroundColor: COLORS.accent,
  },
  buttonText: {
    color: COLORS.primaryText,
    fontWeight: 'bold',
  },
});

export default AddEventModal;