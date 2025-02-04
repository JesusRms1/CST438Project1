import { Text, View, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import { Tabs } from 'expo-router';
import React from "react";

export default function Index() {
  //this file is in 'void' bc DaHouse replaced it's spot in Tabs

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>

      {(() => {
        const items = [];
        for (let i = 0; i < 5; i++) {
          items.push(<Text style={styles.text} key={i}>Item {i}</Text>);
        }
        return items;
      })()}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
})