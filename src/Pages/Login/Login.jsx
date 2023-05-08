import {useState, useReducer} from "react";
import "./Login.css";

import {useNavigate} from "react-router-dom";

import {useAuthUserMutation} from "../../Redux/Services/authApi";

import Input from "../../Components/Input";
import EditAvatar from "../../Components/EditAvatar";
import ErrAlert from "../../Components/ErrAlert";

const initialState = {
	fullName: {val: "", errText: "", trhowErr: false},
	email: {val: "", errText: "", trhowErr: false},
	password: {val: "", errText: "", trhowErr: false},
};

const reducer = (state, action) => {
	switch (action.type) {
		case "updateState":
			return {...state, ...action.payload};
		case "initState":
			return initialState;
		case "hideErrors":
			return {
				...state,
				fullName: {...state.fullName, trhowErr: false},
				email: {...state.email, trhowErr: false},
				password: {...state.password, trhowErr: false},
			};
		default:
			console.error("error in login reducer");
	}
};

export default function Login() {
	const navigate = useNavigate();
	const [showLogin, setShowLogin] = useState(true);
	const [errMssg, setErrMssg] = useState();
	const [inputState, inputDispatch] = useReducer(reducer, initialState);
	const [authUser] = useAuthUserMutation();

	const handleRegister = () => {
		setErrMssg("");
		inputDispatch({type: "hideErrors"});
		authUser({
			url: "signup",
			body: {
				fullName: inputState.fullName.val,
				email: inputState.email.val,
				password: inputState.password.val,
			},
		})
			.unwrap()
			.then((data) => {
				if (data.updatedData) {
					navigate("/");
				}
			})
			.catch(({data}) => {
				if (data.inputsError) {
					if (typeof data.inputsError === "string") setErrMssg(data?.inputsError);
					else {
						Object.keys(data.inputsError).forEach((key) => {
							inputDispatch({
								type: "updateState",
								payload: {[key]: {...inputState[key], errText: data.inputsError[key].message, trhowErr: true}},
							});
						});
					}
				}
			});
	};

	const handleLogin = () => {
		setErrMssg(undefined);
		authUser({
			url: "login",
			body: {
				email: inputState.email.val,
				password: inputState.password.val,
			},
		})
			.unwrap()
			.then((data) => {
				if (data.updatedData) {
					navigate("/");
				}
			})
			.catch(({data}) => {
				setErrMssg(data?.inputsError);
			});
	};

	return (
		<div className="login page">
			<h1 className="login__title">NOTO</h1>
			<div className="login__main-wrapper">
				{!showLogin && (
					<>
						<EditAvatar />
						<Input
							type="text"
							placeholder="Full Name"
							errMsg={inputState.fullName.errText}
							throwErr={inputState.fullName.trhowErr}
							onChange={(e) => inputDispatch({type: "updateState", payload: {fullName: {...inputState.fullName, val: e.target.value}}})}
							value={inputState.fullName.val}
						/>
					</>
				)}
				<Input
					type="email"
					placeholder="Email"
					errMsg={inputState.email.errText}
					throwErr={inputState.email.trhowErr}
					onChange={(e) => inputDispatch({type: "updateState", payload: {email: {...inputState.email, val: e.target.value}}})}
					value={inputState.email.val}
				/>
				<Input
					type="password"
					placeholder="Password"
					errMsg={inputState.password.errText}
					throwErr={inputState.password.trhowErr}
					onChange={(e) => inputDispatch({type: "updateState", payload: {password: {...inputState.password, val: e.target.value}}})}
					value={inputState.password.val}
				/>
				<button
					className="primary-button login__primary-button"
					onClick={() => {
						showLogin ? handleLogin() : handleRegister();
					}}>
					{showLogin ? "Login" : "Register"}
				</button>
				{errMssg !== undefined && <ErrAlert text={errMssg} />}
				<button onClick={() => setShowLogin(!showLogin)} className="primary-button login__secondry-button">
					{showLogin ? "Register" : "Back"}
				</button>
			</div>
		</div>
	);
}
