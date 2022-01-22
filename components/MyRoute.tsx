import { Button, StyleSheet, Text, View } from "react-native";
import { useApp } from "../providers/AppProvider";


export default function MyRoute({ navigation }: any) {
    const { user } = useApp();

  return (
    <View style={styles.container}>
        <Text>My Route</Text>
        <Button
          title="Go to History"
          onPress={() => navigation.navigate('History')}
        />
        <Button title="Go back" onPress={() => navigation.goBack()} />
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