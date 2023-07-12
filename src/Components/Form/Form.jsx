import {useState, forwardRef, useImperativeHandle} from "react";
import "./Form.css";

import {useForm} from "react-hook-form";
import Input from "./Input";
import ErrAlert from "../ErrAlert";

export default forwardRef(function Form({inputs, onSubmit, submitText}, ref) {
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm({mode: "onSubmit", reValidateMode: "onSubmit"});
	const [err, setErr] = useState(null);

	useImperativeHandle(ref, () => ({
		setErr: (e) => setErr(e),
	}));

	return (
		<form className="form" onSubmit={handleSubmit(onSubmit)}>
			{inputs.map(
				(input) =>
					input.visible !== false && (
						<Input
							type={input.type || "text"}
							placeholder={input.placeholder}
							name={input.name}
							register={register}
							options={input.required ? {required: `${input.placeholder} is required`, ...input.options} : {...input.options}}
							err={errors[input.name]?.message}
						/>
					),
			)}
			{err && <ErrAlert text={err} />}
			<button className="primary-button form__button" type="submit">
				{submitText}
			</button>
		</form>
	);
});
