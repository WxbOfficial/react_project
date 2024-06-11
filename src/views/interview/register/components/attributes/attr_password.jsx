import { Input } from "antd";

export default function AttrPassword(props) {
	const { target, keyName, options } = props;

	return (
		<Input.Password
			key={target[keyName]}
			{...options}
			defaultValue={target[keyName]}
			onChange={(e) => {
				target[keyName] = e.currentTarget.value;
				if (options.onChange) {
					options.onChange(e.currentTarget.value);
				}
			}}
		/>
	);
}
