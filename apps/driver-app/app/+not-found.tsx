import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text>This screen doesn't exist.</Text>
        <Link href="/map" style={styles.link}>
          <Text>Go to Map!</Text>
        </Link>

        <Link href="/signup" style={styles.link}>
          <Text>Go to SignUp!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
