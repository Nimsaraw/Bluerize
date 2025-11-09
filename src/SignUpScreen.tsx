import React, { useEffect, useState } from "react";
import { Button, Image, Pressable, ScrollView, Text, View, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
//import * as ImagePicker from 'expo-image-picker';
import { Picker } from "@react-native-picker/picker";
import { ALERT_TYPE, AlertNotificationRoot, Dialog, Toast } from "react-native-alert-notification";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";

type SignUpScreennNavigationProps = NativeStackNavigationProp<RootParamList, "SignUpScreen">;

const PUBLIC_URL = "https://4f49a9cf17f9.ngrok-free.app";

export function SignUpScreen() {
  //const [image, setImage] = useState<string | null>(null);
  const [selectedAge, setSelectedAge] = useState('');
  const [getAges, setAges] = React.useState<{ id: number; name: string }[]>(
    []
  );

  const navigation = useNavigation<SignUpScreennNavigationProps>();
  const [getFullName, setFullName] = React.useState("");
  const [getUserName, setUserName] = React.useState("");
  const [getEmail, setEmail] = React.useState("");
  const [getPassword, setPassword] = React.useState("");
  const [getConfirmPassword, setConfirmPassword] = React.useState("");

  useEffect(() => {
    const loadCities = async () => {
      const response = await fetch(PUBLIC_URL + "/Blurize/LodeAge");
      if (response.ok) {
        const json = await response.json();
        setAges(json.ageList);
        //console.log(json.cityList);
      } else {
        console.error("Age Difference loading failed!")
      }
    };
    loadCities();
  }, []);



  return (

    <AlertNotificationRoot>
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>




        <View style={styles.inputContainer}>
          
          <TextInput placeholder="Insert your full name" style={styles.input} onChangeText={setFullName} value={getFullName} />
        </View>

        <View style={styles.inputContainer}>
          
          <TextInput placeholder="Insert your username" style={styles.input} onChangeText={setUserName} value={getUserName} />
        </View>

        <View style={styles.inputContainer}>
          
          <TextInput placeholder="Insert your email" style={styles.input} keyboardType="email-address" onChangeText={setEmail} value={getEmail} />
        </View>

        <View style={styles.inputContainer}>
          
          <TextInput placeholder="Create new password" style={styles.input} secureTextEntry onChangeText={setPassword} value={getPassword} />
        </View>

        <View style={styles.inputContainer}>
          
          <TextInput placeholder="Confirm your password" style={styles.input} secureTextEntry onChangeText={setConfirmPassword} value={getConfirmPassword} />
        </View>

        <View style={styles.inputContainer}>
          
          <View style={styles.pickerContainer}>
            <Picker selectedValue={selectedAge} style={styles.picker} onValueChange={(itemValue) => setSelectedAge(itemValue)}>
              <Picker.Item label="Select Age Difference" value={''} />
              {getAges.map((city) => (
                <Picker.Item key={city.id} label={city.name} value={city.id} />
              ))}
            </Picker>
          </View>
        </View>

        


          <Pressable style={styles.button} onPress={async () => {
          
            let formData = new FormData();
            formData.append("fullName", getFullName);
            formData.append("userName", getUserName);
            formData.append("email", getEmail);
            formData.append("password", getPassword);
            formData.append("confirmPassword", getConfirmPassword);
            formData.append("age", selectedAge);



            const response = await fetch(PUBLIC_URL + "/Blurize/NewAccount", {
              method: "POST",
              body: formData,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            if (response.ok) {
              const json = await response.json();
              if (json.status) {
                Toast.show({
                  type: ALERT_TYPE.SUCCESS,
                  title: 'Success',
                  textBody: 'Congrats! Account created successfully',
                });

                setFullName("");
                setUserName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setSelectedAge("");
              } else {
                Toast.show({
                  type: ALERT_TYPE.WARNING,
                  title: 'Warning',
                  textBody: json.message,
                });
              }
            } else {
              Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Warning',
                textBody: 'Something went wrong. Account creation failed!',
              });
            }
          }}>
            <Text style={styles.buttonText}>Create Account</Text>
          </Pressable>
          <Text style={styles.linkText} onPress={() => navigation.navigate("SignInScreen")}>Already have an account? Sign In</Text>
      
        </View>
        

    </AlertNotificationRoot>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#1e1e2f",
    marginTop: -80,
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#2a2a2aff",
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  picker: {
    height: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  backButton: {
    width: "40%",
    backgroundColor: 'transparent',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#999999",
  },
  backButtonText: {
    color: "#0b0b0bff",
    fontSize: 16,
    fontWeight: "bold",
  },
  saveButton: {
    width: "55%",
    backgroundColor: "#4A90E2",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fbfbfbff",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 5,
  },

  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000ff",
    marginBottom: 8,
  },

  form: {
    flex: 1,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  imageUploader: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#3f3e3eff",
    borderStyle: "dashed",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  imagePlaceholder: {
    alignItems: "center",
  },
  imageText: {
    fontSize: 36,
    color: "#999999",
    marginBottom: 5,
  },
  imageLabel: {
    fontSize: 14,
    color: "#666666",
  },

  scrollcontent: {
    flexGrow: 1,
    padding: 40,
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 22,
  }
});