import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-todo-f7f3d.firebaseio.com/'
    });

export default instance
