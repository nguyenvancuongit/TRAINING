

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flex: 1,
        borderWidth: 1,
        borderColor: 'red',
        justifyContent: 'center',
    },

    item1: {
        backgroundColor: 'violet',
        padding: 30,
        flex : 1,
    },

    item2: {
        backgroundColor: 'orange',
        padding: 30,
    },

    item3: {
        backgroundColor: 'cyan',
        padding: 30,
    },

    item4: {
        backgroundColor: 'green',
        padding: 30,
    },
});

const FlexBox = () => {
    return (
        <View style={styles.container}>
            <View style={styles.item1}>
                <Text>1</Text>
            </View>
            <View style={styles.item2}>
                <Text>2</Text>
            </View>
            <View style={styles.item3}>
                <Text>3</Text>
            </View>
            <View style={styles.item4}>
                <Text>4</Text>
            </View>
        </View>
    );
}

export default FlexBox;