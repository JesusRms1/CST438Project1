import React from 'react'; 
import { Text, View, StyleSheet, TextInput, Button, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
// import Checkbox from '@react-native-community/checkbox';
import { CheckBox } from 'react-native-elements';
//idk
import RecipeComponent from '@/components/recipe_component';
import { recipes } from '@/data/temp_recipe';




const SearchPage =  ({ navigation }: any) => {
  const [number, onChangeNumber] = React.useState('');
  // const [checked, setChecked] = React.useState(true); 
  const [checkedItems, setCheckedItems] = React.useState<Record<string, boolean>>({});
  const items: string[] = ["American", "Mexican", "Japanese"];
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null); // Store the selected value

  const CollapseFilter = () => { //stuff that go inside the Panel?
    const [isOpen, setIsOpen] = React.useState(false);
    const togglePanel = () => setIsOpen(!isOpen);
    
    const [selectedIndex, setIndex] = React.useState<number | null>(null); // For radio selection
    const [checkedItems, setCheckedItems] = React.useState<Record<string, boolean>>({});
    const [number, setNumber] = React.useState(""); //for user input?
    //search stuff---
    const onChangeNumber =(text:string) =>{
      setNumber(text);
    }
    const handleSubmit =()=>{
      console.log("User input: ", number);
    }
    //checkbox/radio stuff---
    const handleRadioSelect = (index: number, title: string) => {
      setIndex(index); 
      setSelectedValue(title); 
      console.log('Radio button selected:', title);

      // if (title === "Mexican") {
      //   Alert.alert("Selection", "You selected Mexican!", [{ text: "OK" }]);
      // }
      
      setCheckedItems({
        [title]: true, 
      });
    };
    
    const clearFilters = () => {
      setCheckedItems(items.reduce((acc, item) => ({ ...acc, [item]: false }), {})); // Uncheck all
      setIndex(null); // Reset radio button selection
      setSelectedValue(null); // Clear stored value
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
                  handleRadioSelect(index,item) // filter has to be clicked twice to work...
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
            onPress={() => {
              // make thing to take the filter and text input for search results
              if (number.trim() !== "") {
                Alert.alert(
                  `Entered recipe: ${number}\n` +
                  `Filter: ${selectedValue || 'None'}\n`
                );
              } else if(selectedValue !==null){
                Alert.alert(`Filter: ${selectedValue}\n`)
              }
              else{
                Alert.alert("Please enter a recipe name!");
              }
            }}
          />
        </View>
        {/* Render CollapseFilter component */}
        <CollapseFilter />
        <ScrollView>
                {recipes.map((recipe, index) => (
                  <RecipeComponent key={index} recipe={recipe} index={index} />
                ))}
              </ScrollView> 
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
    bottom: 20, 
    right: 20, 
    borderRadius: 30, 
    overflow: 'hidden', 
  }
});

export default SearchPage;
