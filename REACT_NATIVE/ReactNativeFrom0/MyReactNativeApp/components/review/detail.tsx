import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
    review: {
        fontSize: 20,
        fontFamily: 'OpenSans-Regular',
    }
})

const DetailScreen = () => {
    return (
        <Text style={styles.review}>This is text is Detail Screen</Text>
    );
};

export default DetailScreen;