import React, { useState, useCallback } from 'react'


export default function LearnClass(){

	const
		[name, setName] = useState(0),
		addName = useCallback(()=>{

			setName((name)=>{
				return ++name;
			});
		}, []);

	return (
		<div>
			<button onClick={addName}>addName</button>
			<ClassComponent name={name} />
		</div>
	)
}

export class ClassComponent extends React.Component{

	constructor(props){
		super(props);

    this.countRef = React.createRef();
    this.nameRef = React.createRef();

		this.state = {
			count: 0,
		}

		console.log('constructor 初始化 *********');
	}

	componentDidMount(){
		console.log('componentDidMount');
		console.log('this.props.name:', this.props.name);
		console.log('this.state.count:', this.state.count);
		console.log('this.nameRef.current.innerText:', this.nameRef.current.innerText);
		console.log('this.countRef.current.innerText:', this.countRef.current.innerText);

	}

	static getDerivedStateFromProps(){
		console.log('getDerivedStateFromProps *********');

		return false;
	}

	shouldComponentUpdate(){
		console.log('shouldComponentUpdate *********');
		console.log('this.props.name:', this.props.name);
		console.log('this.state.count:', this.state.count);
		console.log('this.nameRef.current.innerText:', this.nameRef.current.innerText);
		console.log('this.countRef.current.innerText:', this.countRef.current.innerText);


		// return false;
		return true;
	}

	getSnapshotBeforeUpdate(){
		console.log('getSnapshotBeforeUpdate *********');
		console.log('this.props.name:', this.props.name);
		console.log('this.state.count:', this.state.count);
		console.log('this.nameRef.current.innerText:', this.nameRef.current.innerText);
		console.log('this.countRef.current.innerText:', this.countRef.current.innerText);

		return false;
		// return true;
	}

	componentDidUpdate(){
		console.log('componentDidUpdate *********');
		console.log('this.props.name:', this.props.name);
		console.log('this.state.count:', this.state.count);
		console.log('this.nameRef.current.innerText:', this.nameRef.current.innerText);
		console.log('this.countRef.current.innerText:', this.countRef.current.innerText);


	}

	componentWillUnmount(){
		console.log('componentWillUnmount *********');
		console.log('this.props.name:', this.props.name);
		console.log('this.state.count:', this.state.count);
		console.log('this.nameRef.current.innerText:', this.nameRef.current.innerText);
		console.log('this.countRef.current.innerText:', this.countRef.current.innerText);


	}


	addCount = ()=>{
		let count = this.state.count;
		++count;
		this.setState({ count })
	}

	render(){
		console.log('render *********');
		console.log('this.props.name:', this.props.name);
		console.log('this.state.count:', this.state.count);
		console.log('this.nameRef.current.innerText:', this.nameRef.current?.innerText);
		console.log('this.countRef.current.innerText:', this.countRef.current?.innerText);


		return (
			<div>
				<div ref={this.nameRef}>name: { this.props.name }</div>
				<button onClick={this.addCount}>addCount</button>
				<div ref={this.countRef}>count: { this.state.count }</div>
			</div>
		)
	}
}