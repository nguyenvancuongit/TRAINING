import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [students, setStudents] = useState([
    { name: 'John', key: '1' },
    { name: 'Doe', key: '2' },
    { name: 'Jane', key: '3' },
    { name: 'Doe', key: '4' },
    { name: 'Jane', key: '5' },
    { name: 'Doe', key: '6' },
    { name: 'Jane', key: '7' },
    { name: 'Doe', key: '8' },
    { name: 'Jane', key: '9' },
    { name: 'Doe', key: '10' },
    { name: 'Jane', key: '11' },
    { name: 'Doe', key: '12' },
    { name: 'Jane', key: '13' },
    { name: 'Doe', key: '14' },
    { name: 'Jane', key: '15' },
    { name: 'Doe', key: '16' },
    { name: 'Jane', key: '17' },
    { name: 'Doe', key: '18' },
    { name: 'Jane', key: '19' },
    { name: 'Doe', key: '20' },
    { name: 'Jane', key: '21' },
    { name: 'Doe', key: '22' },
    { name: 'Jane', key: '23' },
    { name: 'Doe', key: '24' },
    { name: 'Jane', key: '25' },
    { name: 'Doe', key: '26' },
    { name: 'Jane', key: '27' },
    { name: 'Doe', key: '28' },
    { name: 'Jane', key: '29' },
    { name: 'Doe', key: '30' },
    { name: 'Jane', key: '31' },
    { name: 'Doe', key: '32' },
    { name: 'Jane', key: '33' },
    { name: 'Doe', key: '34' },
    { name: 'Jane', key: '35' },
    { name: 'Doe', key: '36' },
    { name: 'Jane', key: '37' },
  ]);

  return (
    <View style={styles.container}>
      
      <Text style={{
        marginTop: 50,
      }}>Students:</Text>

      <ScrollView>
        {students.map(item => {
          return (
            <View key={item.key} style={{
              padding: 30,
              backgroundColor: 'pink',
              marginBottom: 10
            }}>
              <Text>{item.name}</Text>
            </View>
          )
        })}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
