import { StyleSheet, Text } from "react-native";
import { OPENSAN_REGULAR } from "../../utils/const";

const styles = StyleSheet.create({
    review: {
        fontSize: 20,
        fontFamily: OPENSAN_REGULAR,
    }
})

const DetailScreen = () => {
    return (
        <Text style={styles.review}>This is text is Detail Screen</Text>
    );
};

export default DetailScreen;