import { Text, View, StyleSheet } from 'react-native';
import CardComponent from '@/components/card_component';

//screen will display content made by CURRENT user
export default function OwnerScreen() {
 

  const items: string[]=["first","second","Third"];

  return (
    
    <View style={styles.container1} >
    
      {items.map((item: string, index: number) => ( 
        <CardComponent key={index} index={index} />
      ))}
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
  container1: {
    flex: 1,
    backgroundColor: '#25292e',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
