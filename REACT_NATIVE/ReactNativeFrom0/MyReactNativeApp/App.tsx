import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

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

  return (
    <View style={styles.container}>
      
     {/* header */}
      <View>
        <Text style={styles.header}>TODO APP</Text>
      </View>

      {/* form */}
      <View>
        <TextInput 
          value={todo}
          style={styles.todoInput}
          onChangeText={(text) => setTodo(text)}
        />
        <Button
          title="Add TODO"
          onPress={() => {
            setListTodo([...listTodo, {id: randomInteger(2,1000000), name: todo}]);
            setTodo("");
          }}
        />
      </View>

      {/* list */}
      <View style={styles.body}>
        <FlatList
          data={listTodo}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <Text>{item.name}</Text>
          )}
        />
      </View>

    </View>
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
    marginBottom: 20,
  },

  todoItem: {
    fontSize: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    marginBottom: 10,
    padding: 10,
  }
});
