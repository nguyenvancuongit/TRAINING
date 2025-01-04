import { View, Button, StyleSheet, Text } from "react-native";
import { OPENSAN_REGULAR } from "../../utils/const";
import { NavigationProp, RouteProp, useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';

const styles = StyleSheet.create({
    review: {
        fontSize: 20,
        fontFamily: OPENSAN_REGULAR,
    }
})

const DetailScreen = () => {

    const natigation: NavigationProp<RootStackParamList> = useNavigation();
    const route: RouteProp<RootStackParamList, "review-detail"> = useRoute();

    return (
        <View>
            <Text style={styles.review}>ID: {route.params?.id}</Text>
            <Text style={styles.review}>Title: {route.params?.title}</Text>
            <Text style={styles.review}>Rating: {route.params?.star}</Text>
            <Button
                title="Back to Home"
                onPress={() => natigation.navigate("home")}
            />
        </View>
    );
};

export default DetailScreen;