import React from 'react'

import './number_slider.scss';



function checkProps(props){
	const {
		defaultValue, sliderStart, sliderEnd
	} = props;

	if( typeof defaultValue !== 'number' || isNaN(defaultValue) ){
		console.warn('NumberInput 组件中 defaultValue 参数不是数字类型');
		return;
	}

	if( typeof sliderStart !== 'number' || isNaN(sliderStart) ){
		console.warn('NumberInput 组件中 sliderStart 参数不是数字类型');
		return;
	}

	if( typeof sliderEnd !== 'number' || isNaN(sliderEnd) ){
		console.warn('NumberInput 组件中 max 参数不是数字类型');
		return;
	}

	if( sliderStart > sliderEnd ){
		console.warn('NumberInput 组件中 sliderStart 大于 sliderEnd');
		return;
	}
}

export default class NumberSlider extends React.Component{

	isMoving = false;

	constructor(props = {
		defaultValue: '未设置初始值',
		sliderStart: -100, sliderEnd: 100,
		onChange: ()=>{}
	}){
		// console.log('NumberSlider constructor');
		super(props);

		checkProps(props);

		this.sliderRef = React.createRef();

		this.state = {
			number: this.dealNumber(props.defaultValue),
		};

		this.onMouseDown = this.onMouseDown.bind(this);
	}

	dealNumber(number){
		// console.log('NumberSlider dealNumber');
		// console.log('number:', number);

		return Math.min( this.props.sliderEnd, Math.max( this.props.sliderStart, number ) );
	}

	onMouseDown(){

	}

	render(){
		// console.log('NumberSlider render');

		return (
			<div className="c-number_slider fill"
				ref={this.sliderRef}
				onMouseDown={this.onMouseDown}>
				<div className="slider-bar">
					<div className="slider"
						style={{
							left: `calc(${Math.max(0, Math.min(((this.state.number - this.props.sliderStart) / (this.props.sliderEnd - this.props.sliderStart) * 100).toFixed(2), 100))}% - 0.05rem)`,
						}}></div>
				</div>
			</div>
		)
	}
}