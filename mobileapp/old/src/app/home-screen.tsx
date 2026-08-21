import { View } from 'react-native';
import { Text } from '@/ui';

export default function HomeScreen() {
  return (
    <View className="bg-background flex-1 items-center justify-center px-8">
      <Text variant="h2">خوش آمدید</Text>
      <Text variant="muted" className="mt-2">
        به بیمارستان فردا خوش آمدید
      </Text>
    </View>
  );
}
