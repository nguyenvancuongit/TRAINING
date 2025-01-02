import { View, Button, Text } from "react-native";

const HomeScreen = (props: any) => {

    const { navigation } = props;

    return (
        <View>
            <Text>This is text is Home Screen</Text>
            <Button 
                title="View Detail" 
                onPress={() => navigation.navigate("review-detail")}
            />
        </View>
    );
};

export default HomeScreen;