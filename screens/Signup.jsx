import React, { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import Bg from "../assets/bg.jpg";

const Signup = () => {
  const [data, setData] = useState({ email: "", password: "", username: "" });
  const [showPass , setShowPass] = useState(false)

  const validateUserName = (name) => {
    return name.length < 10;
  };

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
    return password.length >= 8; // Minimum 6 characters
  };
  return (
    <ImageBackground source={Bg} style={styles.container}>
      {/* login header container */}
      <View style={styles.loginHeaderContainer}>
        {/* login header */}
        <Text style={styles.loginHeader}>Signup</Text>
        {/* subtext */}
        <Text style={styles.loginSubText}>
          Signup to start your exiciting journey
        </Text>
      </View>

      {/* form container */}
      <View style={styles.loginFormContainer}>
        <View>
          <TextInput
            label={"User Name"}
            left={<TextInput.Icon icon="account" />}
            style={styles.loginInput}
            value={data.username}
            onChangeText={(text) =>
              setData((prev) => ({ ...prev, username: text }))
            }
          />
          <HelperText
            type="error"
            style={{
              display: !validateUserName(data.username) ? "flex" : "none",
            }}
          >
            User Name Should be Atmost 10 letters
          </HelperText>
        </View>
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
          <HelperText
            type="error"
            style={{
              display: !validateEmail(data.email) ? "flex" : "none",
            }}
          >
            Email is not valid
          </HelperText>
        </View>

        <View>
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
          <HelperText
            type="error"
            style={{
              display: !validatePassword(data.password) ? "flex" : "none",
            }}
          >
            Password Should be of atleast 6 letters
          </HelperText>
        </View>
        <Button mode="contained" style={[styles.loginInput, styles.loginBtn]}>
          Signup
        </Button>
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
});

export default Signup;
