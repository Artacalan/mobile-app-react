import { Stack } from 'expo-router';
import { DogProvider } from '../provider/DogProvider';

export default function RootLayout() {
  return (
    <DogProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </DogProvider>
  );
}
