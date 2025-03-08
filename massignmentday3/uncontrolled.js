import React, { Component } from 'react';

export default class AddTwoNumbers extends Component {
    constructor(props) {
        super(props);
        this.num1 = React.createRef(); 
        this.num2 = React.createRef(); 
        this.state = { sum: null }; 
    }
    handeladd=(event)=>{
        event.preventDefault();
        const number1=parseFloat(this.num1.current.value);
        const number2=parseFloat(this.num2.current.value);
        this.setState({sum:number1+number2});
    }
    render(){
        return(
            <div>
                <h1>add two numbers</h1>
                <form onSubmit={this.handeladd}>
                    <label>enter first number:</label>
                    <input type="number" ref={this.num1}/>
                    <input type="number" ref={this.num2}/>
                    <button type="submit">Add</button>
                </form>
                {this.state.sum !== null && <h2>Result: {this.state.sum}</h2>}
            </div>
        );
    }
}