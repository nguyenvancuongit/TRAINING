import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);

  return (
    <View style={styles.container}>
      
      <View >
        <Text style={{ fontSize: 40, fontWeight: "600" }}>Name: {name}</Text>

        <TextInput
          multiline
          style={styles.text_input}
          onChangeText={setName}
        />
      </View>
      
      <View>
        <Text style={{ fontSize: 40, fontWeight: "600" }}>Age: {age}</Text>

        <TextInput
          keyboardType="numeric"
          style={styles.text_input}
          onChangeText={text => setAge(parseInt(text))}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_input: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 15
  }
});
