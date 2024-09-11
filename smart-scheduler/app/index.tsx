// Serves as the entrypoint to the app
import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/home" />;
}