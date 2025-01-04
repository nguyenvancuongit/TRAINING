import { StyleSheet, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
    
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
        marginTop: 40,
    },

    headerText: {
        width: '100%',
        textAlign: 'center',
        fontSize: 20,
    },
})

const AppHeader = () => {
    const navigation: any = useNavigation();

    return (
        <View style={styles.container}>
            <MaterialIcons 
                name="menu" 
                size={40}
                color="black"
                onPress={() => navigation.openDrawer()}
            />
            <Text style={styles.headerText}>Custom Header</Text>
        </View>
    );
}

export default AppHeader;