import { View, Button, Text } from "react-native";

const HomeScreen = () => {
    return (
        <View>
            <Text>This is text is Home Screen</Text>
            <Button title="Go to Detail Screen" onPress={() => alert("me")} />
        </View>
    );
};

export default HomeScreen;