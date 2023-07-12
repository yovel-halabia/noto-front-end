import {useState, useRef} from "react";
import "./Login.css";

import {useNavigate} from "react-router-dom";

import {useAuthMutation} from "../../Redux/Services/authApi";

import Form from "../../Components/Form/Form";

export default function Login() {
	const navigate = useNavigate();
	const [showLogin, setShowLogin] = useState(true);
	const formRef = useRef(null);
	const [auth] = useAuthMutation();

	const onSubmit = (data) => {
		formRef.current.setErr(null);
		auth({url: showLogin ? "login" : "signup", data})
			.unwrap()
			.then((res) => {
				if (res.success) navigate("/");
				else if (typeof res.alertMessage === "string") formRef.current.setErr(res.alertMessage);
			});
	};

	return (
		<div className="login page">
			<h1 className="login__title">NOTO</h1>
			<div className="login__main-wrapper">
				<Form
					ref={formRef}
					inputs={[
						{
							placeholder: "Full Name",
							name: "fullName",
							required: true,
							visible: !showLogin,
						},
						{
							placeholder: "Email",
							name: "email",
							required: true,
							options: {
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: "invalid email address",
								},
							},
						},
						{
							type: "password",
							placeholder: "Password",
							name: "password",
							required: true,
							options: !showLogin ? {minLength: {value: 8, message: "Password must contain at least 8 characters"}} : {},
						},
					]}
					onSubmit={onSubmit}
					submitText={showLogin ? "Login" : "Register"}
				/>
				<button
					onClick={() => {
						setShowLogin(!showLogin);
						formRef.current.setErr(null);
					}}
					className="primary-button login__secondry-button"
				>
					{showLogin ? "Register" : "Back"}
				</button>
			</div>
		</div>
	);
}
