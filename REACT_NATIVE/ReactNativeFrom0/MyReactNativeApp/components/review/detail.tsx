import { View, Button, StyleSheet, Text } from "react-native";
import { OPENSAN_REGULAR } from "../../utils/const";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
    review: {
        fontSize: 20,
        fontFamily: OPENSAN_REGULAR,
    }
})

const DetailScreen = () => {

    const natigation: NavigationProp<RootStackParamList> = useNavigation();

    return (
        <View>
            <Text style={styles.review}>This is text is Detail Screen</Text>
            <Button
                title="Back to Home"
                onPress={() => natigation.navigate("home")}
            />
        </View>
    );
};

export default DetailScreen;