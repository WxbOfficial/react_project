import { useState, useCallback } from 'react';

export default function LearnCallback() {
	const [count1, setCount1] = useState(0);
	const [count2, setCount2] = useState(0);

	// 使用 useCallback 缓存 handleClick 函数
	const handleClick1 = useCallback(() => {
		setCount1(count1 + 1);
	}, [count1]);

	const handleClick2 = useCallback(() => {
		setCount2(count2 + 1);
	}, [count2]);

	console.log('handleClick1:', handleClick1 === window.handleClick1);
	if( handleClick1 !== window.handleClick1 ){
		window.handleClick1 = handleClick1;
	}

		console.log('handleClick2:', handleClick2 === window.handleClick2);
	if( handleClick2 !== window.handleClick2 ){
		window.handleClick2 = handleClick2;
	}

	return (
		<div>
			<div>You clicked {count1} times</div>
			{/* 在按钮上使用缓存的 handleClick 函数 */}
			<button onClick={handleClick1}>Click me</button>
			<div>You clicked {count2} times</div>
			{/* 在按钮上使用缓存的 handleClick 函数 */}
			<button onClick={handleClick2}>Click me</button>
		</div>
	);
}