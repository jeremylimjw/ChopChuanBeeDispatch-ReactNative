import React from 'react';
import { StyleSheet, View } from 'react-native';
import SignatureScreen from "react-native-signature-canvas";
import { useApp } from '../providers/AppProvider';


export default function Signature({ route, navigation }: any) {
    const { recordSignature } = useApp();

    const { order } = route.params;

    const handleSignature = (signature: any) => {
        recordSignature(order, signature)
            .then(() => navigation.pop(2))
            .catch(console.log)
    };

    return (
        <View style={styles.container}>
            <SignatureScreen
                onOK={handleSignature}
                autoClear={false}
                descriptionText="Signature"
            />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "#FFF",
    padding: 30,
  },
});
