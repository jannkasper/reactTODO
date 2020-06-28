import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import TodoApp from './TodoApp'
import * as serviceWorker from './serviceWorker';
// import Clock from './Clock'

// ReactDOM.render(
//   // <React.StrictMode>
//   //   <App />
//   // </React.StrictMode>,
//     <TodoApp title={"TODO App"} />,
//   document.getElementById('root')
// );
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        console.log('DidMount');
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        console.log('WillUnmount');
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                <h1>Witaj, świecie!</h1>
                <h2>Aktualny czas: {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

ReactDOM.render(
    <TodoApp date={new Date()}/>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
