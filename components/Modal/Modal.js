import React, {useState, useEffect} from 'react';
import { Modal,
    Text, 
    View, 
    StyleSheet,
    Button,
    TextInput} from 'react-native';
import axios from '../../axiosMeals';
import ShowCart from '../showCart/ShowCart';

const ModalWindow = props => {
    const [orders, setOrders] = useState(null);
    const [inputs, setInputs] = useState({
        name:'',
        phone:'',
        address: ''
    });

    useEffect(()=>{
        setOrders(props.cart);
    },[props.cart]);

    const nameInput = value => {
        setInputs({...inputs, name:value});
    };

    const phoneInput = value => {
        setInputs({...inputs, phone:value});
    };

    const addressInput = value => {
        setInputs({...inputs, address:value})
    }

    const deleteHandler = id => {
        const ordersCopy = {...orders};
        if (ordersCopy['order'][id]['counter'] > 1) {
            setOrders(prevState=>({
                ...prevState,
                order: {
                    ...orders.order,
                    [id]: {
                        ...orders.order[id],
                        counter: orders.order[id].counter - 1
                    }
                }
            }));
        } else {
            delete ordersCopy['order'][id];
            setOrders(ordersCopy);
        };
    };

    const postData = async () => {
        const message = {
            orders: orders.order,
            data: inputs
        };
        await axios.post('requests/.json', message);
        setOrders(null);
        setInputs({
            name:'',
            phone:'',
            address: ''
        });
    };


    let carts = '';

    if ((orders) !== null) {
        let cart = orders.order;
        carts = (
            Object.keys((cart)).map(key=>(
                <ShowCart 
                key = {key}
                name={cart[key]['meals']['name']}
                price={(cart[key]['counter'])*(cart[key]['meals']['price'])}
                counter={cart[key]['counter']}
                delete={()=>deleteHandler(key)}/>
            ))
        )
    };

    let totalPrice = '';
    if (orders !== null) {
        totalPrice = (
            Object.keys(orders.order).reduce((acc, key)=>{
                return (orders.order[key]['counter'])*(orders.order[key]['meals']['price']) + acc
            },0)
        );
    };

      return (
         <View
         style = {{
             display: (props.show) ? 'block' : 'none',
             alignItems: 'center',
             backgroundColor: 'rgba(52, 52, 52, 0.8)',
             padding: 10,
             width:'100%',
             height:'100%',
             position:'absolute'}}>

            <Modal animationType = {"slide"} transparent = {true}>
               
               <View style = {styles.modal}>
                  <Text style = {styles.text}>Your Order</Text>
                    <View>
                        <Text>
                         {carts}
                        </Text> 
                    </View>
                    <View>

                        <TextInput style={styles.inputs} placeholder='Name'
                        value={inputs.name} 
                        onChangeText={value=>nameInput(value)}/>

                        <TextInput style={styles.inputs} placeholder='Phone'
                        value={inputs.phone} 
                        onChangeText={value=>phoneInput(value)}/>

                        <TextInput style={styles.inputs} placeholder='Address'
                        value={inputs.address} 
                        onChangeText={value=>addressInput(value)}/>

                    </View>
                    <Text style={styles.price}>
                        Total Price:{totalPrice}    
                    </Text>                 
                    <View>
                        <Button title='close modal' onPress={props.close}/> 
                        <View style={styles.disabledBtn}>
                            <Button title='order'  onPress={()=>postData()}
                            disabled={orders === null}/>
                        </View>
                    </View>
               </View>
            </Modal>
         </View>
      )
}
export default ModalWindow;

const styles = StyleSheet.create ({
   modal: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 100,
      paddingTop:20
   },
   text: {
      color: '#3f2949',
      marginTop: 10
   },
   price: {
       fontSize:30
   },
   inputs: {
       width: 200,
       margin: 3,
       padding: 5,
       borderWidth: 2
   },
   disabledBtn: {
       margin: 5
   }
});