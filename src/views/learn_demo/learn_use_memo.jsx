import { useState, useMemo, memo } from "react";


const Child = memo(function(props){
	const { userInfo } = props;
	console.log("Child 渲染了", userInfo);

	return (
		<div>
			<div>名字： {userInfo.name}</div>
			<div>年龄：{userInfo.age}</div>
		</div>
	);
});




export default function LearnUseMemo(){
	const [count, setCount] = useState(0);

	const increment = () => setCount(count + 1);
	const userInfo = useMemo(()=>{
		return { name: "小明", age: 18 };
	}, []);

	return (
		<div>
			<button onClick={increment}>点击次数：{count}</button>
			<Child userInfo={userInfo} />
		</div>
	);
};

