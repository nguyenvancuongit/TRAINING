import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Button, FlatList, Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';

import {AntDesign} from '@expo/vector-icons';

interface Todo {
  id: number;
  name: string;
}

export default function App() {

  const [todo, setTodo] = useState("");

  const [listTodo, setListTodo] = useState<Todo[]>([]);

  function randomInteger(min: number, max: number) { 
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleAddTodo = () =>{
    if(!todo) {
      // alert("Please enter a todo");
      Alert.alert("Empty", "Please enter a todo", 
        [
          {
            text: "Confirm",
            onPress: () => console.log("OK Pressed")
          }
        ]
      )
      return;
    }
    setListTodo([...listTodo, {id: randomInteger(2,1000000), name: todo}]);
    setTodo("");
  }

  const deleteTodo = (id: number) => {
    setListTodo(listTodo.filter((item) => item.id !== id));
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>

      <View style={styles.container}>
        
        {/* header */}
        <View >
          <Text style={styles.header}>Todo App</Text>
        </View>

        {/* form */}
        <View style={styles.form}>
          <TextInput 
            placeholder="Enter a todo"
            value={todo}
            onChangeText={(text) => setTodo(text)}
          />
          <Button title="Add Todo" onPress={handleAddTodo}/>
        </View>

        {/* list todo */}
        <View style={styles.todo}>
          <FlatList 
            data={listTodo}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
              <Pressable onPress={() => deleteTodo(item.id)}>
                <View style={styles.grouptodo}>
                  <Text>{item.name}</Text>
                  <AntDesign name="close" size={24} color="black" />
                </View>
              </Pressable>
            )}
          />
        </View>
  
      </View>

    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  header: {
    marginTop: 50,
    backgroundColor: 'lightblue',
    padding: 10,
    textAlign: 'center',
  },

  form: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 10,
    margin: 10,
  },

  todo: {
    margin: 15,
  },

  grouptodo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});
