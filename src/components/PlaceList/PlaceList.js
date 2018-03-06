import React from 'react';
import { View, StyleSheet, FlatList, ScrollView, Keyboard } from 'react-native';

import ListItem from '../ListItem/ListItem';

const placeList = props => {
    return (
        <FlatList style={styles.listContainer}
        data={props.places}
        renderItem={(info) => (
            <ListItem 
              placeName={info.item.name}/*retreive by 'value' name key*/
              placeImage={info.item.image}
              onItemPressed={() => props.onItemSelected(info.item.key)}
         />
        )}
        onScroll={Keyboard.dismiss()}
        >{console.log("trying to display list!")}</FlatList>
    );
};

const styles = StyleSheet.create({
    listContainer: {
      width: "100%",
      flex: 1,
    },
});

export default placeList;