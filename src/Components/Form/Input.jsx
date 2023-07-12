import { useState, useEffect } from "react";
import "./Input.css";

import { ReactComponent as ErrIcon } from "../../Assets/icons/err_icon.svg";

export default function Input({ type, placeholder, register, name, options, err, autocomplete }) {
	const [isFocused, setIsfocused] = useState(false);
	const [className, setClassName] = useState("");

	useEffect(() => {
		if (isFocused) setClassName("input__input-wrapper input__input-focus");
		//else if (throwErr) setClassName("input__input-wrapper input__input-err");
		else setClassName("input__input-wrapper");
	}, [isFocused]);

	return (
		<div className="input">
			<div className={className}>
				<input
					{...register(name, options)}
					type={type}
					placeholder={placeholder}
					onFocus={() => setIsfocused(true)}
					onBlur={() => setIsfocused(false)}
					autoComplete={autocomplete}
				/>
				{err && (
					<div className="input__err-icon">
						<ErrIcon />
					</div>
				)}
			</div>
			{err && <span className="input__err-msg">{err}</span>}
		</div>
	);
}
