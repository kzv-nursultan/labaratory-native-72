import axios from 'axios';

const instance = axios.create({
    baseURL:'https://forhomework-c9acf-default-rtdb.firebaseio.com/'
});

export default instance;