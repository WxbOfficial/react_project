import React from 'react'

import './number_input.scss';


function _snap(number, step){
	const r = Math.round( number / step ) * step;
	return parseFloat( r.toPrecision( 15 ) );
}

function _clamp(min, max, number){
	if ( number < min ) {
		number = min;
	}
	if ( number > max ) {
		number = max;
	}
	return number;
}

function checkProps(props){
	const {
		defaultValue, min, max, step
	} = props;

	if( typeof defaultValue !== 'number' || isNaN(defaultValue) ){
		console.warn('NumberInput 组件中 defaultValue 参数不是数字类型');
		return;
	}

	if( typeof min !== 'number' || isNaN(min) ){
		console.warn('NumberInput 组件中 min 参数不是数字类型');
		return;
	}

	if( typeof max !== 'number' || isNaN(max) ){
		console.warn('NumberInput 组件中 max 参数不是数字类型');
		return;
	}

	if( typeof step !== 'number' || isNaN(step) ){
		console.warn('NumberInput 组件中 step 参数不是数字类型');
		return;
	}

	if( min > max ){
		console.warn('NumberInput 组件中 min 大于 max');
		return;
	}
}

export default class NumberInput extends React.Component{

	inputRef = null;

	preScreenX = null;
	preScreenY = null;

	constructor(props = {
		defaultValue: '未设置初始值',
		min: -Infinity, max: Infinity, step: 0.01,
		onChange: ()=>{}
	}){
		// console.log('NumberInput constructor');
		super(props);

		checkProps(props);

		this.inputRef = React.createRef();
		this.state = {
			number: this.dealNumber(props.defaultValue),
		}

		this.onInput = this.onInput.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.startMove = this.startMove.bind(this);
		this.pointMoving = this.pointMoving.bind(this);
		this.endMove = this.endMove.bind(this);
	}

	setNumber(number, changeState = true, changeInput = true, triggerOnChange = true){

		if( changeState ){

			this.setState({ number });
		}

		if( changeInput ){

			this.inputRef.current.value = number;
		}

		if( this.props.onChange && triggerOnChange ){
			this.props.onChange();
		}
	}

	dealNumber(number){
		// console.log('NumberInput dealNumber');
		// console.log('number:', number);

		return _clamp( this.props.min, this.props.max, _snap( number, this.props.step ) );
	}

	onInput(e){
		// console.log('NumberInput onInput');
		// console.log('e:', e);

		const value = parseFloat( e.target.value );

		if ( isNaN( value ) ){
			return;
		}

		this.setNumber( this.dealNumber(value), true, false, true );
	}

	onBlur(e){
		// console.log('NumberInput onBlur');
		// console.log('e:', e);

		this.setNumber( this.state.number, false, true, true );
	}

	onKeyDown(e){
		// console.log('NumberInput onKeyDown');
		// console.log('e:', e);

		if( e.key === 'ArrowUp' || e.key === 'w' ){

			e.preventDefault();

			this.setNumber( this.dealNumber( this.state.number + this.props.step ), true, true, true);
		}else if( e.key === 'ArrowDown' ||  e.key === 's' ){

			e.preventDefault();

			this.setNumber( this.dealNumber( this.state.number - this.props.step ), true, true, true);
		}else if( e.key === 'Enter' ){

			this.inputRef.current.blur();
		}
	}

	startMove(e){
		// console.log('startMove');
		// console.log('e:', e);

		document.body.style.cursor = 'ns-resize';
		document.body.requestPointerLock();

		this.preScreenX = e.screenX;
		this.preScreenY = e.screenY;


		document.addEventListener( 'mousemove', this.pointMoving );
		document.addEventListener( 'mouseup', this.endMove );
	}

	// Pointer Lock 和 mouse move 两种类型
	pointMoving(e){
		// console.log('windowMove');
		// console.log('e:', e);

		e.preventDefault();

		const
				// movementX = e.movementX       ||
				// 						e.mozMovementX    ||
				// 						e.webkitMovementX ||
				// 						0,
				movementY = e.movementY       ||
										e.mozMovementY    ||
										e.webkitMovementY ||
										0;

		// console.log("movementX=" + movementX, "movementY=" + movementY);

		const dy = movementY * this.props.step * (e.shiftKey ? 10 : 1);

		// const dy = ( e.screenY - this.preScreenY ) * this.props.step * (e.shiftKey ? 10 : 1);

		this.setNumber( this.dealNumber( this.state.number - dy ), true, true, true );

		this.preScreenX = e.screenX;
		this.preScreenY = e.screenY;
	}

	endMove(){
		// console.log('endMove');

		document.body.style.cursor = '';

		document.exitPointerLock();

		document.removeEventListener( 'mousemove', this.pointMoving );
		document.removeEventListener( 'mouseup', this.endMove );
	}

	componentDidUpdate(prevProps, prevState){
		// console.log('componentDidUpdate');

		if( prevProps !== this.props ){
			// console.log('props 更新了');

			this.setNumber( this.dealNumber( this.props.defaultValue ), true, true, false );
		}
	}

	render(){
		// console.log('NumberInput render');

		return (
			<input className="c-number_input fill"
				ref={this.inputRef}
				autoComplete="off"
				type="text" name="number"
				defaultValue={this.state.number}
				onInput={this.onInput}
				onBlur={this.onBlur}
				onKeyDown={this.onKeyDown}
				onMouseDown={this.startMove}/>
		)
	}
}