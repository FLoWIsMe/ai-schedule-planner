// services/schedulingService.js
import axios from 'axios';
import { getTasks } from './storageService';  // Existing storage service for tasks
import { getCalendarEvents } from './calendarService';  // Service to fetch Google Calendar events

const OPENAI_API_KEY = 'your-openai-api-key';  // Securely store this using SecureStore or environment variables
const OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';  // Example endpoint

// Function to get OpenAI's scheduling suggestion
export const getOptimizedSchedule = async () => {
  try {
    // Fetch task and calendar data
    const tasks = await getTasks();
    const calendarEvents = await getCalendarEvents(); // Assume this fetches events from Google Calendar

    // Prepare data payload for OpenAI API
    const prompt = generatePrompt(tasks, calendarEvents);

    // Call OpenAI API
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'text-davinci-003',  // Choose appropriate model
        prompt: prompt,
        max_tokens: 1000,  // Adjust token limit as necessary
        temperature: 0.7,  // Adjust based on desired creativity
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Extract and return the optimized schedule from OpenAI's response
    return response.data.choices[0].text.trim();

  } catch (error) {
    console.error('Error fetching optimized schedule:', error);
    throw error;
  }
};

// Function to generate a prompt for OpenAI API
const generatePrompt = (tasks, calendarEvents) => {
  let taskDetails = tasks.map(task => `Task: ${task.name}, Due: ${task.dueDate}, Duration: ${task.duration} minutes, Priority: ${task.priority}`).join('\n');
  let eventDetails = calendarEvents.map(event => `Event: ${event.summary}, Start: ${event.start.dateTime}, End: ${event.end.dateTime}`).join('\n');

  return `Based on the following tasks and calendar events, create an optimized schedule that balances tasks and existing events:\n\nTasks:\n${taskDetails}\n\nCalendar Events:\n${eventDetails}\n\nProvide a new schedule that efficiently organizes tasks within the available time slots.`;
};