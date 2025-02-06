import React from 'react'; 
import { Text, View, StyleSheet,TextInput, Button, Alert } from 'react-native';
import { SafeAreaView,SafeAreaProvider } from 'react-native-safe-area-context';

const SearchPage =()=>{
  const [text, onChangeText] = React.useState('Useless Text');
  const [number,onChangeNumber]= React.useState('');

  return(
    <SafeAreaProvider>
      <SafeAreaView  style={styles.barContainer}>
        <TextInput
           style={styles.input}
           onChangeText={onChangeNumber}
           value={number}
           placeholder="Search Here!"
           keyboardType="numeric"
        />
        <View style={styles.buttContainer}>
        <Button
       title="Search"
       onPress={() => Alert.alert('Simple Button pressed')}
      />
        </View>
  
      </SafeAreaView>

    </SafeAreaProvider>

  );
};
const styles = StyleSheet.create({
  barContainer: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  buttContainer:{
    marginHorizontal: 12,
  },
  container:{
    flex: 1,
    backgroundColor: '#25292e',
    alignItems:'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fcf7e8',
  },
});

export default SearchPage;