import {useState, useEffect} from "react";
import "./Input.css";

import {ReactComponent as ErrIcon} from "../Assets/icons/err_icon.svg";

export default function Input({type, placeholder, errMsg, throwErr, onChange, value, autocomplete}) {
	const [isFocused, setIsfocused] = useState(false);
	const [className, setClassName] = useState("");

	useEffect(() => {
		if (isFocused) setClassName("input__input-wrapper input__input-focus");
		else if (throwErr) setClassName("input__input-wrapper input__input-err");
		else setClassName("input__input-wrapper");
	}, [throwErr, isFocused]);

	return (
		<div className="input">
			<div className={className}>
				<input
					type={type}
					placeholder={placeholder}
					onFocus={() => setIsfocused(true)}
					onBlur={() => setIsfocused(false)}
					onChange={(e) => {
						onChange && onChange(e);
					}}
					value={value && value}
					autoComplete={autocomplete}
				/>
				{throwErr && (
					<div className="input__err-icon">
						<ErrIcon />
					</div>
				)}
			</div>
			{throwErr && <span className="input__err-msg">{errMsg}</span>}
		</div>
	);
}
