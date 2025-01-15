import React, { useState } from "react";
import { View, Button, Text, FlatList } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import CreateModal from "./create.modal";

interface IReview {
    id: number;
    title: string;
    rating: number;
}

const HomeScreen = (props: any) => {

    const { navigation } = props;

    const [reviews, setReviews] = useState<IReview[]>([
        { id: 1, title: 'Zelda, Breath of Fresh Air', rating: 5 },
        { id: 2, title: 'Gotta Catch Them All (again)', rating: 4 },
        { id: 3, title: 'Not So "Final" Fantasy', rating: 3 }
    ]);

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <Text style={{ fontSize: 30, padding:10 }}>Review list:</Text>

            <View style={{ alignItems: "center" }}>
                <AntDesign
                    onPress={() => setModalVisible(true)}
                    name="pluscircleo" size={24} color="black" />
            </View>

            <FlatList
                data={reviews}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Button
                        title={item.title}
                        onPress={() => navigation.navigate('review-detail', item)}
                    />
                )}
            />

            <CreateModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </View>
    );
};

export default HomeScreen;