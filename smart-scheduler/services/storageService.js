// Example usage in a component
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { getTasks, saveTask } from './storageService';  // Adjust the import path based on your component's location

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const storedTasks = await getTasks();
      setTasks(storedTasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleAddTask = () => {
    const newTask = { name: 'New Task', dueDate: '2024-09-12', duration: 60, priority: 'High' };
    saveTask(newTask).then(fetchTasks);
  };

  return (
    <View>
      <Button title="Add Task" onPress={handleAddTask} />
      {tasks.map(task => (
        <Text key={task.id}>{task.name}</Text>
      ))}
    </View>
  );
};

export default TaskList;