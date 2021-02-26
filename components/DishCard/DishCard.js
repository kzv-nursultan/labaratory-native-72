import React from "react";
import { View, Text, Image, StyleSheet, Button } from 'react-native';

const DishCard = props => {


    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{uri:(props.src)}}
                style={{width: 150, height: 100}}/> 
            </View>
            <View style={styles.innerContainer}>
                <Text>Name:{props.name}</Text>
                <Text>Price:{props.price}</Text>
                <Button title='order' onPress={()=>props.cardPress(props.id)}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        borderWidth:2,
        margin:4,
        width:300,
        borderColor:'grey',
        flexDirection:'row',
        padding:5,
        
    },
    imageContainer: {
        borderWidth:2
    },
    innerContainer: {
        justifyContent: 'center',
        paddingLeft:10
    },
})

export default DishCard;