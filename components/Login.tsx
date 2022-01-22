import { Button, StyleSheet, Text, View } from "react-native";
import { useApp } from "../providers/AppProvider";


export default function Login({ navigation }: any) {
  const { login } = useApp();

    return (
      <View style={styles.container}>
          <Text>Login</Text>
          <Button title="Login" onPress={() => login("a", "b")} />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
        width: '100%', 
        padding: 20,
        zIndex: 1,
        backgroundColor: '#fff',
    },
  });