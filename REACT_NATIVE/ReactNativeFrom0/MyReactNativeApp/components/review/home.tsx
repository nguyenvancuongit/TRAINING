import { useState } from "react";
import { View, Button, Text, FlatList } from "react-native";

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

    return (
        <View>
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
        </View>
    );
};

export default HomeScreen;