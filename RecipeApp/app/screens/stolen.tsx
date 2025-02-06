import { Text, View, StyleSheet } from 'react-native';

//the screen that will display content saved from OTHER users
export default function StolenScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Stolen screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
