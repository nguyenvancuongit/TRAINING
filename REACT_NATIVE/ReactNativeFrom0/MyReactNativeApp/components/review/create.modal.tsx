import React from "react";
import { Button, Modal, TextInput } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface IProps {
    modalVisible: boolean;
    setModalVisible: (modalVisible: boolean) => void;
}

const CreateModal = (props: IProps) => {
    const { modalVisible, setModalVisible } = props;

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
                        onPress={() => setModalVisible(false)}
                        name="close" size={24} color="black" />

                </View>

                {/* body */}
                <View>
                    <View style={styles.groupInput}>
                        <Text style={styles.text}>Nội dung</Text>
                        <TextInput style={styles.input} />
                    </View>
                    <View>
                        <Text style={styles.text}>Rating</Text>
                        <TextInput style={styles.input} />
                    </View>
                </View>

                {/* footer */}
                <View>
                    <View style={{ marginTop: 20 }}>
                        <Button title="Add" />
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