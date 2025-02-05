import React from 'react'; 
import { Text, View, StyleSheet, TextInput, Button, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
// import Checkbox from '@react-native-community/checkbox';
import { CheckBox } from 'react-native-elements';




const SearchPage = () => {
  const [number, onChangeNumber] = React.useState('');
  // const [checked, setChecked] = React.useState(true); 
  const [checkedItems, setCheckedItems] = React.useState<Record<string, boolean>>({});


  const items: string[] = ["American", "Mexican", "Japanese"];

  const CollapseFilter = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const togglePanel = () => setIsOpen(!isOpen);
    
    const [selectedIndex, setIndex] = React.useState<number | null>(null); // For radio button selection
    const handleCheckboxPress = (title: string) => {
      console.log('Checkbox clicked:', title);
    };
    const toggleCheckbox = (name:string) => { //react n expo equivalent of checkbox value
      setCheckedItems((prev)=> ({
        ...prev,
        [name]:!prev[name],
      }));
    }
    // const [checkedItems, setCheckedItems] = React.useState<Record<string, boolean>>(
    //   items.reduce((acc, item) => ({ ...acc, [item]: false }), {})
    // );
    
    const clearFilters = () => {
      setCheckedItems(items.reduce((acc, item) => ({ ...acc, [item]: false }), {}));
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
            <Text>Collapsible Panel Content{"\n"}</Text>
            <Text>This is the content inside the collapsible panel. {"\n"}</Text>
            <View style={styles.floatingButton}>
            <Button 
            title="Clear Filters"
            onPress={()=>clearFilters()}
            />
            </View>

            {/* Looping through items to render checkboxes */}
            {/* does NOT close when switching to other tabs (Home,about,settings) */}
            {items.map((item, index) => (
              <CheckBox
                key={index}
                checked={selectedIndex === index}
                onPress={() => 
                  {setIndex(index);
                  handleCheckboxPress(item);
                  // toggleCheckbox(item);//this causes panel to close
                }}
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="red"
                title={item} 
                
              />
            ))}
          </View>
        )}
          {/* Debugging: Show selected values */}
        <Text style={styles.text}>Selected: {JSON.stringify(checkedItems, null, 2)}</Text>
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
    backgroundColor: 'blue', 
    paddingVertical: 12,     
    paddingHorizontal: 20,     
    borderRadius: 5,           
    margin: 10,               
    alignItems: 'center',  
  },
  fakeText:{
    color: 'white',            
    fontSize: 16,             
    fontWeight: 'bold',       
    textAlign: 'center', 
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20, // Adjust distance from bottom
    right: 20, // Adjust distance from right
    borderRadius: 30, // Optional: rounded corners
    overflow: 'hidden', // Ensures button styling stays clean
  }
});

export default SearchPage;
