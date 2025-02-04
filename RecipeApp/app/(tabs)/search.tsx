import React from 'react'; 
import { Text, View, StyleSheet, TextInput, Button, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
// import Checkbox from '@react-native-community/checkbox';
import { CheckBox } from 'react-native-elements';




const SearchPage = () => {
  const [number, onChangeNumber] = React.useState('');
  const [checked, setChecked] = React.useState(true); // For single checkbox state
  const toggleCheckbox = () => setChecked(!checked);
  const items: string[] = ["Apple", "Banana", "Cherry"];

  const CollapseFilter = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const togglePanel = () => setIsOpen(!isOpen);
    //radio
    const [selectedIndex, setIndex] = React.useState(0);
    const handleCheckboxPress = (title: string) => {
      console.log('Checkbox clicked:', title);
    };

    

    return (
      <ScrollView>
        <TouchableOpacity onPress={togglePanel} style={styles.fakeButton}>
          <Text style={styles.fakeText}>{isOpen ? 'Close Filter Panel' : 'Open Filter Panel'}</Text>
        </TouchableOpacity>
        {isOpen && (
          <View style={{ marginTop: 10, borderWidth: 1, borderColor: '#000', padding: 10, margin: 12, backgroundColor: '#c2ecff',
            flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'
           }}>
            <Text>Collapsible Panel Content</Text>
            <Text>This is the content inside the collapsible panel.</Text>
            

            {/* Looping through items to render checkboxes */}
            {items.map((item, index) => (
              <CheckBox
                key={index}
                checked={selectedIndex === index}
                onPress={() => {setIndex(index);
                  handleCheckboxPress(item);
                }}
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="red"
                title={item}  // Dynamically setting the title
                
              />
            ))}
          </View>
        )}
      </ScrollView>
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
        {/* Render CollapseFilter component */}
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
