import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Button, Headline, Avatar, Caption } from "react-native-paper";
import { User } from "../models/User";
import { useApp } from "../providers/AppProvider";


export default function Login({ navigation }: any) {
  const { login } = useApp();

  const [form, setForm] = useState({ username: "alice", password: "password" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function onSubmit() {
    setSubmitting(true);

    login(form.username, form.password)
      .then((user: User) => {
      })
      .catch((err: any) => {
        setError(err);
        setSubmitting(false);
      });
  }

  return (
    <View style={styles.container}>

      <Headline>Chop Chuan Bee</Headline>

      <Avatar.Icon style={styles.icon} size={120} icon="van-utility" color="#808080" />

      <TextInput style={styles.input} 
        placeholder="Username" 
        value={form.username} 
        onChangeText={(text) => setForm({ ...form, username: text })} 
      />

      <TextInput style={styles.input} 
        placeholder="Password" 
        value={form.password} 
        onChangeText={(text) => setForm({ ...form, password: text })} secureTextEntry 
      />

      {error !== "" && <Caption>{error}</Caption>}

      <Button color="#3f51b5" labelStyle={{ color: 'white' }} style={styles.button} mode="contained" onPress={onSubmit} disabled={submitting} loading={submitting}>
        Login
      </Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: "#FFF",
    padding: 30,
  },
  icon: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#fafafa",
    borderColor: '#f8f8f8',
    borderWidth: 2,
  },
  input: {
    marginBottom: 5,
    padding: 10,
    height: 40,
    width: "100%",
    borderColor: '#f8f8f8',
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: "#fafafa",
  },
  button: {
    marginTop: 20,
    width: "100%",
  }
});