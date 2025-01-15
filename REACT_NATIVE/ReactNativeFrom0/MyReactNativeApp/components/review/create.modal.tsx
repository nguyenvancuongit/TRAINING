import React from "react";
import { Button, Modal, TextInput } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface IProps {
    modalVisible: boolean;
    setModalVisible: (modalVisible: boolean) => void;
    addNew: any;
}

const CreateModal = (props: IProps) => {
    const { modalVisible, setModalVisible, addNew } = props;
    const [title, setTitle] = React.useState("");
    const [star, setStar] = React.useState("");

    function randonInteger(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const handleSubmit = () => {
        if (title === "" || star === "") {
            alert("Please fill all fields");
            return;
        }

        addNew({
            id: randonInteger(1, 1000),
            title,
            rating: parseInt(star),
        });

        setModalVisible(false);
        setStar("");
        setTitle("");
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.container}>
                {/* header */}
                <View style={styles.header}>
                    <Text style={{ fontSize: 25 }}>Create a review</Text>
                    <AntDesign
                        onPress={() => {
                            setModalVisible(false);
                            setTitle("");
                            setStar("");
                        }}
                        name="close" size={24} color="black" />
                </View>

                {/* body */}
                <View>
                    <View style={styles.groupInput}>
                        <Text style={styles.text}>Nội dung</Text>
                        <TextInput
                            value={title}
                            style={styles.input}
                            onChangeText={(v) => setTitle(v)}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Rating</Text>
                        <TextInput
                            keyboardType="numeric"
                            style={styles.input}
                            value={star}
                            onChangeText={(v) => setStar(v)}
                        />
                    </View>
                </View>

                {/* footer */}
                <View>
                    <View style={{ marginTop: 20 }}>
                        <Button
                            title="Add"
                            onPress={handleSubmit}
                        />
                    </View>
                </View>

            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        paddingVertical: 10,
        marginBottom: 20,
    },

    groupInput: {
        marginBottom: 15,
    },

    text: {
        fontSize: 20,
        fontWeight: '400',
    },

    input: {
        borderWidth: 1,
        borderColor: 'gray',
        marginVertical: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});

export default CreateModal;