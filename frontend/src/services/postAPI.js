import axios from "axios";

const url='http://localhost:3000/api'

function loginUser(){
    return axios.post(`${url}/auth/login`);
}

export default loginUser; 
