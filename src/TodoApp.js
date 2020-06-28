import React, {Component} from 'react'
import TodoInsert from './TodoInsert'
import TodoElement from './TodoElement'
import './App.css';
import Aux from './hoc/Aux'
import WithClass from './hoc/WithClass'
import App from "./App";
import axios from './axios-database';

class TodoApp extends Component {
    state = {
        inputText : '',
        todos: []
    };

    updateInput(event) {
        // console.log(event.target.value);
        let newText = event.target.value;
        this.setState({inputText: newText})
    }

    insertTodo(element) {
        let listTodo = this.state.todos;
        var element = {id: listTodo.length, task: this.state.inputText, edit: false, lineThrough: false};
        listTodo.push(element);
        this.setState({todos: listTodo, inputText : ''});
        // console.log(this);
        this.insertDatabase(element);
    }

    editElement(event, index) {
        let listTodo = this.state.todos;
        listTodo[index].task = event.target.value;
        this.setState({todos: listTodo});
        // this.updateDatabase(listTodo[index])
    }

    deleteElement(id) {
        const listTodo = this.state.todos;
        let index = listTodo.findIndex(element => element.id == id)
        const keyURL = listTodo[index].keyURL;
        listTodo.splice(index, 1);
        this.setState({todos: listTodo});
        // console.log(this.state.todos);
        this.deleteDatabase(keyURL);
    }

    changeModeElement(index) {
        let listTodo = this.state.todos;
        listTodo[index].edit = !listTodo[index].edit;
        this.setState({todos: listTodo});
        this.updateDatabase(listTodo[index])
    }

    changeTextDecorationElement(index) {
        let listTodo = this.state.todos;
        listTodo[index].lineThrough = !listTodo[index].lineThrough;
        this.setState({todos: listTodo});
        this.updateDatabase(listTodo[index])
    }

    readDatabase() {
        axios.get('/todo.json')
            .then(response => {
                this.initialTodoList(response);
            })
            .catch(error => {this.initialTodoList(error)})
    }

    initialTodoList(response) {
        if (response.status == 200) {
            let databaseList = [];
            for (let key in response.data) {
                if (response.data.hasOwnProperty(key)) {
                    response.data[key].keyURL = key;
                    // response.data[key].edit = false;
                    databaseList.push(response.data[key])
                    console.log(response.data[key])
                }
            }
            this.setState({todos: databaseList})
        } else {
            this.setState({
                todos: [
                    {id: 0, task: 'Make groceries', edit: false, lineThrough: false},
                    {id: 1, task: 'Share items for sell', edit: false, lineThrough: false},
                    {id: 2, task: 'Write an article on Reddit', edit: false, lineThrough: false},
                    {id: 3, task: 'Edit some pictures', edit: false, lineThrough: false},
                    {id: 4, task: 'Go to cinema', edit: false, lineThrough: false},]
            })
        }
    }

    insertDatabase(element){
        const dataElement = {
            id: element.id,
            task: element.task,
            edit: element.edit,
            lineThrough: element.lineThrough
        };
        axios.post('/todo.json', dataElement)
            .then(response => {
                console.log('SUCCESS');
                element.keyURL = response.data.name;
            })
            .catch(error => {console.log('ERROR')})
    }

    updateDatabase(element){
        axios.put(`/todo/${element.keyURL}.json`,{edit: element.edit, id: element.id, lineThrough: element.lineThrough, task: element.task})
            .then(response => {console.log(response)})
            .catch(error => console.log(error))
    }

    deleteDatabase(keyURL){
        axios.delete(`/todo/${keyURL}.json`)
            .then(response => {console.log(response)})
            .catch(error => {console.log(error)})
    }

    componentDidMount () {
        this.readDatabase();
    }

    insertExamples () {
        if (this.state.todos.length == 0) {
            {
                let todos = [
                    {id: 0, task: 'Make groceries', edit: false, lineThrough: false},
                    {id: 1, task: 'Share items for sell', edit: false, lineThrough: false},
                    {id: 2, task: 'Write an article on Reddit', edit: false, lineThrough: false},
                    {id: 3, task: 'Edit some pictures', edit: false, lineThrough: false},
                    {id: 4, task: 'Go to cinema', edit: false, lineThrough: false},];
                todos.forEach(elem => this.insertDatabase(elem));
                this.setState({todos: todos})
            }
        }
    }


    render() {
        let todoList = (<div>{this.state.todos.map((element, index) => { return (<TodoElement
            task={element.task}
            textDecoration={element.lineThrough}
            edit={element.edit}
            key={element.id}
            index={index}
            onEdit={this.editElement.bind(this)}
            onDelete={() => this.deleteElement(element.id)}
            changeMode={() => this.changeModeElement(index)}
            changeTextDecoration={() => this.changeTextDecorationElement(index)}

        />)})}</div>);

        return (
            <div className="App">
                <TodoInsert
                    onSubmit={this.insertTodo.bind(this)}
                    onInsertExamples={this.insertExamples.bind(this)}
                    onChange={this.updateInput.bind(this)}
                    sizeList={this.state.todos.length}
                    value={this.state.inputText}/>
                {todoList}

            </div>
        )
    }
}
export default TodoApp
