import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface DogFavoriteButtonProps {
  isFavorite: boolean;
  onPress: () => void;
}

export function DogFavoriteButton({ isFavorite, onPress }: DogFavoriteButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, isFavorite ? styles.buttonActive : styles.buttonInactive]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.icon}>{isFavorite ? '★' : '☆'}</Text>
      <Text style={styles.label}>{isFavorite ? 'Favorited' : 'Add to favorites'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  buttonInactive: {
    backgroundColor: '#eff6ff',
  },
  buttonActive: {
    backgroundColor: '#fde68a',
  },
  icon: {
    fontSize: 16,
    color: '#0066cc',
    fontWeight: '700',
  },
  label: {
    fontSize: 12,
    color: '#1f2937',
    fontWeight: '600',
  },
});
