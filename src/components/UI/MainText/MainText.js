// main text component in the app that can wrap all other components 
// to have styling default from here
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const mainText = props => (
    <Text style={styles.mainText}>{props.children}</Text>
);

const styles = StyleSheet.create({
    mainText: {
        color: "#000",
        backgroundColor: "transparent"
    }
});

export default mainText;