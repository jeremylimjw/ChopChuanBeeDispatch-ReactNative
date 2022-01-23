import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useApp } from "../providers/AppProvider";


export default function History({ navigation }: any) {
    const { user } = useApp();

    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text>History</Text>
            <Button mode="contained" onPress={() => navigation.goBack()}>Go back</Button>
        </View>
    );
}