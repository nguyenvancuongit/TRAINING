import { View, Button, StyleSheet, Text, Image } from "react-native";
import { OPENSAN_REGULAR } from "../../utils/const";
import { NavigationProp, RouteProp, useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import startIcon from "../../assets/images/star.png";

const styles = StyleSheet.create({
    review: {
        fontSize: 20,
        fontFamily: OPENSAN_REGULAR,
    }
})

const DetailScreen = () => {

    const natigation: NavigationProp<RootStackParamList> = useNavigation();
    const route: RouteProp<RootStackParamList, "review-detail"> = useRoute();

    console.log(route.params);

    return (
        <View>
            <Text style={styles.review}>ID: {route.params?.id}</Text>
            <Text style={styles.review}>Title: {route.params?.title}</Text>
            <Text style={styles.review}>Rating: {route.params?.rating}</Text>
            <View style={{flexDirection: "row"}}>
                <Image
                    source={startIcon} 
                    style={{width: 50, height: 50}} 
                />
                <Image
                    style={{width: 50, height: 50}}
                    source={require('../../assets/images/star.png')}
                />
                <Image
                    style={{width: 50, height: 50}}
                    source={require('../../assets/images/star.png')}
                />
                <Image
                    style={{width: 50, height: 50}}
                    source={require('../../assets/images/star.png')}
                />
                <Image
                    style={{width: 50, height: 50}}
                    source={require('../../assets/images/star.png')}
                />
            </View>
        </View>
    );
};

export default DetailScreen;