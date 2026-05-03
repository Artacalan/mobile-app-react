import { Stack } from 'expo-router';
import { DogProvider } from '../provider/DogProvider';

export default function RootLayout() {
  return (
    <DogProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="[id]" options={{ headerShown: true }} />
      </Stack>
    </DogProvider>
  );
}
