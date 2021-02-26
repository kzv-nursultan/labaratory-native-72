import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import axios from './axiosMeals';
import DishCard from './components/DishCard/DishCard';
import Modal from './components/Modal/Modal';

export default function App() {
  const [meals, setMeals] = useState({});
  const [cart, setCart] = useState(null);
  const [show, setShow] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get('meals/.json');
      setMeals(response.data);
    } catch (e) {
      console.log(e);
    };
  };
  

  useEffect(()=>{
    fetchData()
  },[]);

  const cardPress = id => {
    console.log(meals)
    if(cart === null) {
      setCart(prevState=>({
        ...prevState,
        order:{
          [id]:{meals:meals[id], counter:1}
        }
      }))
    } else if (cart.order[id]) {
      setCart (prevState=>({
        ...prevState,
        order:{
          ...cart.order,
            [id]: {
              ...cart.order[id],
              counter: cart.order[id].counter + 1
            }
          }
      }));
    } else {
      setCart(prevState=>({
        ...prevState,
        order:{ ...cart.order,
          [id]: {meals:meals[id], counter:1}
        }
      }));
    };
  };

  const orderHandler = () => {
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  const dishList = (
    Object.keys(meals).map(key=>(
        <DishCard
        key={key}
        src={meals[key]['image']}
        name={meals[key]['name']}
        price={meals[key]['price']}
        id={key}
        cardPress={cardPress}
        />
    ))
 );

    let totalPrice = 0;

    if (cart !== null) {
      totalPrice = Object.keys(cart.order).reduce((acc, key)=>{
          return (
            (cart.order[key]['counter'])*(cart.order[key]['meals']['price']) + acc
          )
      },0);
    };



  return (
    <View style={styles.outerContainer}>
      <Text style={styles.headerText}>
        Our Dishes
      </Text>
      <View style={styles.container}>
        {dishList}
      </View>
      <View style={styles.bottom}>
        <Text style={styles.totalPrice}>
          Total Price:
          {totalPrice}
        </Text>
        <Button title='check out'
        onPress={()=>orderHandler()}/>
      </View>
      <Modal show={show}
      close={()=>closeModal()}
      cart={cart}/>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    paddingTop:50,
    fontSize:20,
    color:'red',
    fontWeight:'bold'
  },
  outerContainer: {
    alignItems:'center',
  },
  container: {
    marginTop: 10,
    backgroundColor: '#fff',
  },
  bottom: {
    width:200,
    marginTop: 'auto',
  },
  totalPrice: {
    width:'auto',
    fontSize:20,
    paddingLeft:30
  }
});
