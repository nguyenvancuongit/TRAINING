import { StyleSheet, Text } from "react-native";
import { globalStyles } from "../../utils/const";

const styles = StyleSheet.create({
    about: {
        fontSize: 20,
    }
})

const AboutScreen = () => {
    return (
        <Text style={[styles.about, globalStyles.globalFont]}>This is text is About Screen</Text>
    );
};

export default AboutScreen;