import { useState, useCallback, useEffect } from 'react';

export default function LearnState1(){
	console.log('LearnReact');

	const
		[state, setState] = useState({
			t1: 0,
			t2: 1,
		}),

		addT1 = useCallback(()=>{
			state.t1++;
			setState({...state})
		}, [state]),

		addT2 = useCallback(()=>{
			state.t2++;
			setState({...state})
		}, [state]);

	useEffect(()=>{
		console.log('useEffect');

		window.addT1Window = ()=>{
			console.log('addT1Window');
			state.t1++;
			setState({...state})
		};
	}, [state]);

	return (
		<div id="learn_react1">
			<button onMouseDown={addT1}>t1+</button>
			<div>{state.t1}</div>
			<button onMouseDown={addT2}>t2+</button>
			<div>{state.t2}</div>
		</div>
	)
}