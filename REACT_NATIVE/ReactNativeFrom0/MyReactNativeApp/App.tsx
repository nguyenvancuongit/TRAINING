import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Text in style header</Text>
        <Text style={styles.parent}>Text in style parent</Text>
      </View>
      <Text style={styles.hello1}>Text in style hello1</Text>
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
  hello1: {
    color: 'red',
    fontSize: 60,
    borderColor: 'green',
    borderWidth: 2,
    padding: 10,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  parent: {
    fontSize: 60,
    color: 'green',
  },
  child: {
    fontSize: 30,
    color: 'pink',
  },
});
