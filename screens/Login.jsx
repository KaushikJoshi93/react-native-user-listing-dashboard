import React, { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import Bg from "../assets/bg.jpg";

const Login = ({ navigation }) => {
  const [data, setData] = useState({ email: "", password: "" });
  const [showPass , setShowPass] = useState(false)

  const validateEmail = (email) => {
    if (email.trim() !== "") {
      // Basic email validation, you can replace it with your desired validation logic
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    return true;
  };

  const validatePassword = (password) => {
    // Basic password validation, you can replace it with your desired validation logic
    return password.length >= 6; // Minimum 6 characters
  };

  return (
    <ImageBackground source={Bg} style={styles.container}>
      {/* login header container */}
      <View style={styles.loginHeaderContainer}>
        {/* login header */}
        <Text style={styles.loginHeader}>Login</Text>
        {/* subtext */}
        <Text style={styles.loginSubText}>Please sign in to continue</Text>
      </View>

      {/* form container */}
      <View style={styles.loginFormContainer}>
        <View>
          <TextInput
            label={"Email"}
            left={<TextInput.Icon icon="email" />}
            style={styles.loginInput}
            value={data.email}
            onChangeText={(text) =>
              setData((prev) => ({ ...prev, email: text }))
            }
          />
          <HelperText type="error" style={{display:!validateEmail(data.email) ? "flex":"none"}}>
            Email Address is Invalid
          </HelperText>
        </View>
        <TextInput
          label={"Password"}
          left={<TextInput.Icon icon="lock" />}
          right={showPass ? <TextInput.Icon icon="eye" onPress={()=>setShowPass(false)}/>:<TextInput.Icon icon="eye-off"  onPress={()=>setShowPass(true)}/>}
          secureTextEntry = {!showPass}
          style={styles.loginInput}
          value={data.password}
          onChangeText={(text) =>
            setData((prev) => ({ ...prev, password: text }))
          }
        />

        <Button mode="contained" style={[styles.loginInput, styles.loginBtn]}>
          Login
        </Button>
      </View>

      {/* form footer container */}
      <View style={styles.loginFormFooterContainer}>
        <Text style={[styles.loginSubText]}>Don't have an account?</Text>
        <Text
          style={[styles.loginSubText, styles.loginFormFooterSignupText]}
          onPress={() => navigation.navigate("Signup")}
        >
          Signup Now
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    gap: 20,
  },
  loginHeaderContainer: {
    display: "flex",
    gap: 12,
    justifyContent: "flex-start",
    paddingLeft: 40,
  },
  loginHeader: {
    fontSize: 40,
    fontWeight: "700",
  },
  loginSubText: {
    color: "gray",
    fontWeight: "400",
  },
  loginFormContainer: {
    display: "flex",
    gap: 22,
    marginTop: 20,
    paddingLeft: 40,
  },
  loginInput: {
    width: "95%",
  },
  loginBtn: {
    padding: 8,
  },
  loginFormFooterContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  loginFormFooterSignupText: {
    color: "#d857f8",
  },
});

export default Login;
