import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { CheckBox } from 'react-native-elements';
import RecipeComponent from '@/components/recipe_component';
import api from './apiServices';

const SearchPage = () => {
  const [number, setNumber] = useState('');
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<any[]>([]);

  const fetchMealsByCategory = async (category: string) => {
    try {
      const response = await api.getMealsByCategory(category);
      setRecipes(response.meals);
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  const handleSearch = async () => {
    if (selectedValue) {
      await fetchMealsByCategory(selectedValue);
    } else {
      Alert.alert("Please select a category!");
    }
  };

  const CollapseFilter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setIndex] = useState<number | null>(null);
    const items: string[] = [
                              "Beef",
                              "Chicken",
                              "Dessert",
                              "Lamb",
                              "Miscellaneous",
                              "Pasta",
                              "Pork",
                              "Seafood",
                              "Side",
                              "Starter",
                              "Vegan",
                              "Vegetarian",
                              "Breakfast",
                              "Goat"
                            ]
;

    const handleRadioSelect = (index: number, title: string) => {
      setIndex(index);
      setSelectedValue(title);
      fetchMealsByCategory(title);
    };

    const clearFilters = () => {
      setSelectedValue(null);
      setIndex(null);
      setRecipes([]);
    };

    return (
      <ScrollView>
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.fakeButton}>
          <Text style={styles.fakeText}>{isOpen ? 'Close Filter Panel' : 'Open Filter Panel'}</Text>
        </TouchableOpacity>
        {isOpen && (
          <View style={styles.filterPanel}>
            <Button title="Clear Filters" onPress={clearFilters} />
            {items.map((item, index) => (
              <CheckBox
                key={index}
                checked={selectedIndex === index}
                onPress={() => handleRadioSelect(index, item)}
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="red"
                title={item}
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
          onChangeText={setNumber}
          value={number}
          placeholder="Enter Recipe Name!"
          keyboardType="default"
        />
        <View style={styles.buttContainer}>
          <Button title="Search" onPress={handleSearch} />
        </View>
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
  text: {
    color: '#fff',
    margin: 12,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fcf7e8',
  },
  fakeButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
  fakeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  filterPanel: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    margin: 12,
    backgroundColor: '#c2ecff',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  }
});

export default SearchPage;
