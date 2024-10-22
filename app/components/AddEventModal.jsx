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

const AddEventModal = ({ visible, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [hoursNeeded, setHoursNeeded] = useState('');
  const [priority, setPriority] = useState('medium'); // low, medium, high
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    onSave({
      id: Date.now().toString(), // Simple unique ID
      name,
      dueDate: dueDate.toISOString(),
      hoursNeeded: parseFloat(hoursNeeded),
      priority,
      createdAt: new Date().toISOString()
    });
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setName('');
    setDueDate(new Date());
    setHoursNeeded('');
    setPriority('medium');
  };

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