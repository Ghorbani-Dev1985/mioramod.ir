import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";

type SpiralLoadingProps = {
  dots?: number;
  radius?: number;
  size?: number;
  color?: string;
};

const SpiralLoading = ({
  dots = 8,
  radius = 20,
  size = 60,
  color = "#4A4A4A",
}: SpiralLoadingProps) => {
  const dotSize = (size * 1) / dots;

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
      style={{ width: size, height: size }}
    >
      {Array.from({ length: dots }, (_, index) => {
        const angle = (index / dots) * (2 * Math.PI);
        const centerX = 50 + radius * Math.cos(angle);
        const centerY = 50 + radius * Math.sin(angle);
        const delay = (index / dots) * 1500;

        return (
          <Dot
            key={index}
            centerX={centerX}
            centerY={centerY}
            dotSize={dotSize}
            color={color}
            delay={delay}
          />
        );
      })}
    </View>
  );
};

type DotProps = {
  centerX: number;
  centerY: number;
  dotSize: number;
  color: string;
  delay: number;
};

const Dot = ({ centerX, centerY, dotSize, color, delay }: DotProps) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 750, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 750, easing: Easing.inOut(Easing.ease) })
        ),
        -1
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: progress.value }],
    opacity: progress.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: `${centerX}%`,
          top: `${centerY}%`,
          width: dotSize,
          height: dotSize,
          borderRadius: dotSize / 2,
          backgroundColor: color,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
        },
        animatedStyle,
      ]}
      accessibilityElementsHidden
    />
  );
};

export { SpiralLoading };
