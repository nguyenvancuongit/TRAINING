import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

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
      alert("Please enter a todo");
      return;
    }
    setListTodo([...listTodo, {id: randomInteger(2,1000000), name: todo}]);
    setTodo("");
  }

  const deleteTodo = (id: number) => {
    setListTodo(listTodo.filter((item) => item.id !== id));
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
            handleAddTodo();
          }}
        />
      </View>

      {/* list */}
      <View style={styles.body}>
        <FlatList
          data={listTodo}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => {
            return (
              <Pressable
                onPress={() => {
                  deleteTodo(item.id);
                }}
              >
                <Text style={styles.todoItem}>{item.name}</Text>
              </Pressable>  
            )
          }}
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
