import { Text, View, StyleSheet } from 'react-native';

//screen will display content made by CURRENT user
export default function OwnerScreen() {
  //reload gun

  const renderedItems = []; //'hard-coded' to see display, change later with DataBase data
  for (let i = 0; i < 5; i++) {
    renderedItems.push(
      <div key={i}>
        <ul >

          <div className="card" >
            <h5 className="card-header" >
              Ya boi {"#: " + i}
              <div className='card-body'>
                <h5 className='card-title'>
                  info....
                </h5>
              </div>
            </h5>

          </div>
        </ul>
      </div>


    )
  }
  return (
    //shoot gun
    <View style={styles.container1} >
      {renderedItems}
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
