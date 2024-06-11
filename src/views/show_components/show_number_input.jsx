import { useState, useCallback } from 'react';

import CNumberInput from '../../components/number_input/number_input.jsx';

export default function ShowNumberInput(){

	const
		[state, setState] = useState({
			defaultValue: 1,
			min: -10,
			max: 10,
			step: 0.01,
		}),

		updateState = useCallback((newState = state)=>{
			if( newState !== state ){
				Object.assign(state, newState);
			}
			setState({...state});
		}, [state]),

		resetProps = useCallback(()=>{
			console.log('resetProps')

			updateState({
				min: -1,
				max: 1,
				step: 0.001,
				defaultValue: 0.3,
			})
		}, [updateState]);



	return (
		<div style={{
			padding: '1rem',
			backgroundColor: '#ff0000',
		}}
			onClick={resetProps}>
			<CNumberInput {...state}/>
		</div>
	)
}