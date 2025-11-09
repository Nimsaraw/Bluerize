import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { RootParamList } from "../../App";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type HomeNavigationProps = NativeStackNavigationProp<RootParamList, "Home">;
type HomeRouteProps = RouteProp<RootParamList, "Home">;

export function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProps>();
  const route = useRoute<HomeRouteProps>();

  
  const [lastName, setLastName] = useState<string>("");

  useEffect(() => {
    if (route.params?.uname) {
      
      
      setLastName(route.params.uname || "");

      AsyncStorage.setItem(
        "user",
        JSON.stringify({
         
          last_name: route.params.uname || "",
        })
      );
    } else {
      const loadUser = async () => {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
         
          setLastName(parsed.last_name || "");
        }
      };
      loadUser();
    }
  }, [route.params]);

  // Handle logout
  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    navigation.replace("SignInScreen"); 
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>~ BLURIZE ~</Text>
        {lastName ? <Text style={styles.lastNameText}>{lastName}</Text> : null}
      </View>

      

      {/* Show My Tasks */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>📋 Show My Tasks</Text>
      </TouchableOpacity>

      {/* Add New Task */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("AddTask", { userName: lastName })
        }
      >
        <Text style={styles.buttonText}>➕ Add a New Task</Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>↩ Log Out</Text>
      </TouchableOpacity>

      {/* Footer */}
      <TouchableOpacity style={styles.linkButton}>
        <Text style={styles.linkText}>
          Provided by Zeus software company.
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#1e1e2f",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 60,
    width: "100%",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  lastNameText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffdd57",
  },
  welcomeText: {
    fontSize: 20,
    color: "#ffdd57",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 100,
  },
  button: {
    backgroundColor: "#ffdd57",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#1e1e2f",
    fontSize: 16,
  },
  linkButton: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    color: "#ffdd57",
    fontSize: 14,
    bottom: -150,
  },
});
