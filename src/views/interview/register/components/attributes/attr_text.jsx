import { Input } from "antd";

export default function AttrText(props) {
	const { title, target, keyName, options = {} } = props;

	return (
		<div className="attr attr-text">
			<div className="attr-title">{title}:</div>
			<Input
				key={target[keyName]}
				{...options}
				style={{
					width: 0,
					flex: 1,
				}}
				defaultValue={target[keyName]}
				onChange={(e) => {
					target[keyName] = e.currentTarget.value;

					if (options.onChange) {
						options.onChange(e.currentTarget.value);
					}
				}}
			/>

		</div>
	);
}
