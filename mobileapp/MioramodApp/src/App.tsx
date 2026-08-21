import "./styles/global.css";
import { FontLoader } from "@/components";
import { Text } from "@/ui";
import { I18nManager, StatusBar, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";


I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function App() {
  return (
    <FontLoader>
        <HomeScreen />
        <StatusBar barStyle={"dark-content"} />
    </FontLoader>
  );
}
