import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { RootParamList } from "../App";
import { useNavigation } from "@react-navigation/native";


type SplashNavigationProps = NativeStackNavigationProp<RootParamList,"Splash">;

export  function SplashScreen() {

  const navigator = useNavigation<SplashNavigationProps>();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}> ~ BLURIZE ~</Text>
      </View>

      {/* Card Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Welcome </Text>
        <Text style={styles.cardText}>
          "Learn. Plan. Achieve — One Task at a Time!"
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={()=>{navigator.navigate("SignInScreen")}}>Get Started</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="light" />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e2f",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    position: "absolute",
    top: 60,
    width: "100%",
    alignItems: "center",
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  card: {
    backgroundColor: "#2e2e3f",
    borderRadius: 16,
    padding: 24,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffdd57",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ffdd57",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e1e2f",
  },
});
