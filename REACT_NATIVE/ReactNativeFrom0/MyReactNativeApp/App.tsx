import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Button, FlatList, Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import FlexBox from './components/flex.box';

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
        
        <FlexBox />
  
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
    backgroundColor: 'orange',
    padding: 20,
    alignItems: 'center',
    marginTop: 30,
    textAlign: 'center',
  },

  todoInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'green',
    padding: 10,
    margin: 10,
  },

  body: {
    paddingHorizontal: 20,
    margin: 20,
  },

  todoItem: {
    fontSize: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    marginBottom: 10,
    padding: 10,
  }
});
