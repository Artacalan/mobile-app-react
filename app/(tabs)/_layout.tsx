import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0066cc',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          borderTopColor: '#e5e7eb',
          backgroundColor: '#fff',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dogs',
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
        }}
      />
    </Tabs>
  );
}
