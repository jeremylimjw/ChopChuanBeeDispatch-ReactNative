import { Button, StyleSheet, Text, View } from "react-native";
import { useApp } from "../providers/AppProvider";


export default function Home({ navigation }: any) {
  const { logout } = useApp();

  return (
    <View style={styles.container}>
        <Text>Home</Text>
        <Button
          title="Go to my route"
          onPress={() => navigation.navigate('MyRoute')}
        />
        <Button
          title="Go to History"
          onPress={() => navigation.navigate('History')}
        />
        <Button
          title="Logout"
          onPress={logout}
        />
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