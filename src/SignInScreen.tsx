import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Switch,
} from "react-native";
import { RootParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SignInScreenNavigationProps = NativeStackNavigationProp<
  RootParamList,
  "SignInScreen"
>;

const PUBLIC_URL = "https://4f49a9cf17f9.ngrok-free.app";

export function SignInScreen() {
  const navigation = useNavigation<SignInScreenNavigationProps>();
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    loadCredentials();
  }, []);

  const loadCredentials = async () => {
    const savedEmail = await AsyncStorage.getItem("email");
    const savedPassword = await AsyncStorage.getItem("password");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  };

  const handleLogin = async () => {
    if (!getEmail || !getPassword) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Missing Fields",
        textBody: "Please enter both email and password.",
      });
      return;
    }

    try {
      const loginDetails = {
        email: getEmail,
        password: getPassword,
      };

      const response = await fetch(PUBLIC_URL + "/Blurize/SignIn", {
        method: "POST",
        body: JSON.stringify(loginDetails),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const json = await response.json();
        if (json.status) {
          // Save or clear credentials
          if (rememberMe) {
            await AsyncStorage.setItem("email", getEmail);
            await AsyncStorage.setItem("password", getPassword);
          } else {
            await AsyncStorage.removeItem("email");
            await AsyncStorage.removeItem("password");
          }

          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: "Congrats! Login successfully",
          });

          
          setTimeout(() => {
            navigation.navigate("Home", {
              
              uname: json.last_name,
              
            });
          }, 1000);
        } else {
          Toast.show({
            type: ALERT_TYPE.WARNING,
            title: "Warning",
            textBody: json.message || "Login failed",
          });
        }
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: "Server error. Try again later.",
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "Something went wrong!",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={getEmail}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      {/* Password */}
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          style={[styles.input, { flex: 1 }]}
          value={getPassword}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.toggle}>{showPassword ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>

      {/* Remember Me */}
      <View style={styles.rememberContainer}>
        <Text style={{ color: "#fff" }}>Remember Me</Text>
        <Switch value={rememberMe} onValueChange={setRememberMe} />
      </View>

      {/* Sign In Button */}
      <View>
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>
      </View>

      {/* Go to Sign Up */}
      <TouchableOpacity style={styles.linkButton}>
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate("SignUpScreen")}
        >
          Don't have an account? Sign Up
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#fff",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#ffdd57",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
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
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  toggle: {
    marginLeft: 10,
    color: "blue",
  },
  rememberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    alignItems: "center",
  },
});
