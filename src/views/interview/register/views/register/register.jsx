import {
	useState,
	useCallback,
	useRef,
} from "react";
import { Tabs, message, Button, Checkbox } from "antd";

import CheckPhoneNumber from './check_phone_number.jsx';
import AccountRegister from './account_register.jsx'

import { serviceMobileRegister, serviceAccountRegister } from "../../service/user.js";

import "./register.scss";

const RegisterType = {
	Mobile: 0,
	Account: 1,
};

// 参考 https://account.aliyun.com/register/qr_register.html
// ......我已经有点后悔选择参考这个了
export default function Register() {
	const
		[registerType, setRegisterType] = useState(RegisterType.Mobile),
		[isAgree, setIsAgree] = useState(false),
		[agreeError, setAgreeError] = useState(''),

		mobileRegisterRef = useRef(null),
		accountRegisterRef = useRef(null),

		register = useCallback(()=>{

			let canRegister = true;

			if( !isAgree ){
				setAgreeError('请勾选同意协议');
				canRegister = false;
			}

			if( registerType === RegisterType.Mobile ){

				if( !mobileRegisterRef.current?.checkRegisterMessage() ){

					canRegister = false;
				}

				if( canRegister ){

					serviceMobileRegister(
						mobileRegisterRef.current?.getRegisterMessage().phoneNumber
					).then(()=>{

						message.success({
							key: "注册成功",
							content: "注册成功",
						});
					}).catch(( reason )=>{

						message.error({
							key: reason,
							content: reason,
						});
					})
				}
			}else if( registerType === RegisterType.Account ){

				accountRegisterRef.current?.checkRegisterMessage().then((result)=>{

					if( result ){

						serviceAccountRegister(
							accountRegisterRef.current?.getRegisterMessage()
						).then(()=>{
							message.success({
								key: "注册成功",
								content: "注册成功",
							});
						}).catch(( reason )=>{

							message.error({
								key: reason,
								content: reason,
							});
						})
					}
				});
			}
		}, [registerType, isAgree]);


	return (
		<div className="register">
			<Tabs
				defaultActiveKey={RegisterType.Mobile}
				items={[
					{
						key: RegisterType.Mobile,
						label: "手机号注册",
						children: (
							<div className="mobile-register">
								<div className="mobile-register-tip">未注册手机号验证通过后将自动注册</div>
								<CheckPhoneNumber ref={mobileRegisterRef}/>
							</div>
						),
					},
					{
						key: RegisterType.Account,
						label: "账号密码注册",
						children: <AccountRegister ref={accountRegisterRef}/>,
					},
				]}
				onChange={(type) => {
					setRegisterType(type);
				}}
			/>
			<div className="register-agreement-wrap">
				<Checkbox onChange={(e)=>{

					setIsAgree(e.target.checked);
					setAgreeError('');
				}}/>
				<div className="register-agreement register-item-error">
					我已阅读并同意 <a href="https://github.com/officialBusiness/resume" target="_blank" rel="noreferrer">这个和注册无关的链接</a>
				</div>
			</div>
			<div className="register-item-error">{agreeError}</div>
			<div className="register-button">
				<Button type="primary" block
					onClick={register}>
					注册
				</Button>
			</div>
		</div>
	);
}
