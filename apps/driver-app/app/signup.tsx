import SignUpForm from "@/components/sign-up-form";
import React from "react";
import { StyleSheet, View } from "react-native";

const SignUp: React.FC = () => {
  return (
    <View style={styles.container}>
      <SignUpForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default SignUp;