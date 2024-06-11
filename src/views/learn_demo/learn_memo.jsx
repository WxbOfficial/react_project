import { useState, memo } from "react";


const Child = memo(() => {
	console.log("Child 渲染了");
	return <div>子组件</div>;
});


export default function Parent(){
	const [count, setCount] = useState(0);
	const increment = () => setCount(count + 1);

	console.log("Parent 渲染了");

	return (
		<div>
			<button onClick={increment}>点击次数：{count}</button>
			<Child />
		</div>
	);
};

