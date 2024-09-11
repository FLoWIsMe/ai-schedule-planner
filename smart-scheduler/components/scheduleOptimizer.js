// components/ScheduleOptimizer.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { getOptimizedSchedule } from '../services/schedulingService';

const ScheduleOptimizer = () => {
  const [schedule, setSchedule] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const optimizedSchedule = await getOptimizedSchedule();
      setSchedule(optimizedSchedule);
    } catch (error) {
      console.error('Failed to fetch schedule:', error);
      setSchedule('Failed to generate schedule. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  return (
    <View>
      <Button title="Fetch Optimized Schedule" onPress={fetchSchedule} />
      {loading ? <ActivityIndicator size="large" color="#4A90E2" /> : <Text>{schedule}</Text>}
    </View>
  );
};

export default ScheduleOptimizer;