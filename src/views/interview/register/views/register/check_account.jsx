import {
	useState,
	useRef,
	useCallback,
	useImperativeHandle,
	forwardRef,
	useMemo,
} from "react";
import { Input, Popover } from "antd";

import validatePassword from '../../utils/validate_password.js';
import { serviceCheckUserName } from "../../service/user.js";


const CheckAccount = forwardRef((props, ref)=>{
	const
		[username, setUsername] = useState(""),
		[usernameError, setUsernameError] = useState(""),

		[password, setPassword] = useState(""),
		[passwordError, setPasswordError] = useState(""),

		[twoPassword, setTwoPassword] = useState(""),
		[twoPasswordError, setTwoPasswordError] = useState(""),

		passwordRef = useRef(null),

		checkUsername = useCallback(()=>{

			if( username.length === 0 ){

				setUsernameError('输入登录名');
				return Promise.resolve(true);
			}else if( username.length < 5 ){

				setUsernameError('5-25字符, 可以包含字母或者汉字');
				return Promise.resolve(true);
			}else{

				return serviceCheckUserName( username )
					.then(()=>{
						return true
					})
					.catch((reason)=>{

						setUsernameError(reason);
						return false;
					});
			}
		}, [username]),

		checkPassword = useCallback(()=>{

			if( password.length === 0 ){

				setPasswordError('请输入密码');
				return false;
			}else if( passwordRef.current?.getRules().some((rule)=>{
				return rule.result === false;
			}) ){

				setPasswordError('密码设置不符合要求');
				return false;
			}

			return true;
		}, [password]),

		checkTwoPassword = useCallback(()=>{

			if( password !== twoPassword ){

				setTwoPasswordError('两次输入的密码不一致，请重新输入');
				return false;
			}else if( twoPassword.length === 0 ){

				setTwoPasswordError('请输入密码');
				return false;
			}

			return true;
		}, [twoPassword, password]);


	useImperativeHandle( ref, () => {
		return {

			checkRegisterMessage(){

				return Promise.all([
					checkUsername(),
					checkPassword(),
					checkTwoPassword(),
				]).then((results)=>{

					return !(results.some( (result)=>{
						return result === false;
					} ));
				});
			},

			getRegisterMessage(){
				return {
					username, password
				}
			}
		};
	}, [checkUsername, checkPassword, checkTwoPassword, username, password] );

	return (
		<div className="check-account">
			{/* 没实际作用, 单纯用于防止弹出警告 */}
			<form >
				<Input
					defaultValue={username}
					placeholder={"输入登录名"}
					style={{ width: "100%" }}
					onChange={(e) => {
						setUsername(e.target.value);
					}}
					onBlur={(e) => {
						checkUsername();
					}}
					onFocus={(e) => {
						setUsernameError("");
					}}
				/>
				<div className="register-item-error">{usernameError}</div>

				<Password
					ref={passwordRef}
					username={username} password={password}
					setPassword={setPassword}
					checkPassword={checkPassword}
					setPasswordError={setPasswordError}
					passwordError={passwordError}/>

				<Password
					username={username} password={twoPassword}
					setPassword={setTwoPassword}
					checkPassword={checkTwoPassword}
					setPasswordError={setTwoPasswordError}
					passwordError={twoPasswordError}/>
			</form>
		</div>
	)
});

const Password = forwardRef( (props, ref)=>{

	const
		{
			username, password,
			setPassword, checkPassword, setPasswordError, passwordError
		} = props,
		rules = useMemo(()=>{

			return validatePassword( username, password );
		}, [username, password]);

	useImperativeHandle( ref, ()=>{

		return {
			getRules(){

				return rules;
			}
		}
	}, [ rules ] );

	return (
		<>
			<Popover trigger="focus" placement="bottom"
				content={()=>{
					return (
						<div className="password-popover">
							{
								rules.map(( rule )=>{
									return (
										<div className="rule"
											data-error={!rule.result}
											key={rule.message}>
											<div className="rule-result">
												{ rule.result ? '√' : '×' }
											</div>
											<div className="rule-message">{ rule.message }</div>
										</div>
									)
								})
							}
						</div>
					)
				}}>
				<Input.Password
					autoComplete="off"
					style={{ width: "100%" }}
					placeholder={"输入登录密码"}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					onBlur={(e) => {
						checkPassword();
					}}
					onFocus={(e) => {
						setPasswordError("");
					}}
				/>
			</Popover>
			<div className="register-item-error">{passwordError}</div>
		</>
	)
});


export default CheckAccount;