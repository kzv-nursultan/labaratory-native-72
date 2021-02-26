import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ShowCart = props => {
    return (
    <View style={styles.container}>
        <Text style={styles.name}>
            Name:{props.name} x {props.counter}
        </Text>
        <Text style={styles.price}>
            Price:{props.price}
        </Text>
        <Button title='remove' onPress={props.delete} style={styles.removeBtn}/>
    </View>
    );
};

export default ShowCart;

const styles = StyleSheet.create({
    container: {
        width: 250,
        borderWidth: 2,
        margin: 3,
    },
    name: {
        fontSize: 20
    },
    price: {
        fontSize: 20
    },
    removeBtn: {
        width:100
    }
})