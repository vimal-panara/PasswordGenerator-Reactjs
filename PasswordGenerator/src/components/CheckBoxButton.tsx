type ButtonProps = {
	buttonLabel: string,
	buttonKey: string,
	checked: boolean,
	setChecked: any,
}

export default function CheckBoxButton({ buttonLabel, buttonKey, checked, setChecked }: ButtonProps) {
	return (
		<>
			<div className="flex items-center gap-x-1">
				<input
					type="checkbox"
					defaultChecked={checked}
					id={buttonKey}
					onChange={() => setChecked((prev: boolean) => !prev)}
				/>
				<label htmlFor={buttonKey}>{buttonLabel}</label>
			</div>
		</>
	)
}