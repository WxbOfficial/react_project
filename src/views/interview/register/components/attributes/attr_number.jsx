import { InputNumber } from "antd";

export default function AttrNumber(props) {
	const { target, keyName, options } = props;

	return (
		<InputNumber
			key={target[keyName]}
			{...options}
			defaultValue={target[keyName]}
			onChange={(number) => {
				target[keyName] = number;
				if (options.onChange) {
					options.onChange(number);
				}
			}}
		/>
	);
}
