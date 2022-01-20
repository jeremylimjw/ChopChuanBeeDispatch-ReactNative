import { StyleSheet, Text, View } from "react-native";


export default function Footer() {
    return (
      <View style={styles.container}>
          <Text>Footer</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
        position: "absolute", 
        bottom: 0, 
        left: 0, 
        width: '100%', 
        padding: 20,
        zIndex: 1,
        backgroundColor: '#fff',
    },
  });