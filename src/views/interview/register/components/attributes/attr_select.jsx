import { Select } from "antd";

export default function AttrSelect(props) {
	const { title, target, keyName, options } = props;

	return (
		<div className="attr attr-select">
			<div className="attr-title">{title}:</div>
			<Select
				key={target[keyName]}
				{...options}
				defaultValue={target[keyName]}
				style={{
					width: 0,
					flex: 1,
				}}
				onChange={(value) => {

					target[keyName] = value;
					if (options.onChange) {
						options.onChange(value);
					}
				}}
			/>
		</div>
	);
}
