import React from 'react'; 
import { Text, View, StyleSheet, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
// import Checkbox from '@react-native-community/checkbox';
import { CheckBox } from 'react-native-elements';



const SearchPage = () => {
  const [number, onChangeNumber] = React.useState('');
  const items: string[] = ["Apple", "Banana", "Cherry"];


  //check box
  const [checked, setChecked] = React.useState(true);
  const toggleCheckbox = () => setChecked(!checked);


  const CollapseFilter = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const togglePanel = () => setIsOpen(!isOpen);
    const [checked, setChecked] = React.useState(false);
    return (
      <View>
        <TouchableOpacity onPress={togglePanel} style={styles.fakeButton}>
          <Text style={styles.fakeText}>{isOpen ? 'Close Filter Panel' : 'Open Filter Panel'}</Text>
        </TouchableOpacity>
        {isOpen && (
          <View style={{ marginTop: 10, borderWidth: 1, borderColor: '#000', padding: 10, margin:12, backgroundColor:'#c2ecff',  }}>
            <Text>Collapsible Panel Content</Text>
            <Text>This is the content inside the collapsible panel.</Text>
            <CheckBox
           checked={checked}
           onPress={toggleCheckbox}
           // Use ThemeProvider to make change for all checkbox
           iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank-outline"
           checkedColor="red"
         />
          </View>
        )}
        
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.barContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Enter Recipe name!"
          keyboardType="default"
        />
        <View style={styles.buttContainer}>
          <Button
            title="Search"
            onPress={() => Alert.alert('Simple Button pressed')}
          />
        </View>
        
        <CollapseFilter />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  buttContainer: {
    marginHorizontal: 12,
    margin: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    margin:12,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fcf7e8',
  },
  fakeButton:{
    backgroundColor: 'blue',  // Set button background color
    paddingVertical: 12,       // Vertical padding for spacing
    paddingHorizontal: 20,     // Horizontal padding for spacing
    borderRadius: 5,           // Rounded corners
    margin: 10,                // Space between buttons
    alignItems: 'center',  
  },
  fakeText:{
    color: 'white',            // Text color (button text)
    fontSize: 16,              // Font size for the button text
    fontWeight: 'bold',        // Bold text
    textAlign: 'center', 
  },
});

export default SearchPage;
