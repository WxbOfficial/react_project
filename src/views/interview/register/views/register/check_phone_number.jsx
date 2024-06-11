import {
	useState,
	useCallback,
	useImperativeHandle,
	forwardRef,
} from "react";
import { Input, message,} from "antd";
import validatePhoneNumber from "../../utils/validate_phone_number.js";
import {
	serviceSendVerificationCode
} from "../../service/user.js";


// 有点犹豫, 要不要把这里的 checkRegisterMessage 也改成 Promise, 这样应该更协调一点
const CheckPhoneNumber = forwardRef((props, ref) => {
	const
		[phoneNumber, setPhoneNumber] = useState( props.phoneNumber ? props.phoneNumber : ""),
		[phoneNumberError, setPhoneNumberError] = useState(""),
		[disabledSend, setDisabledSend] = useState(true),
		[verificationCode, setVerificationCode] = useState(""),
		[serviceVerificationCode, setServiceVerificationCode] = useState(""),
		[verificationCodeError, setVerificationCodeError] = useState(""),

		checkPhoneNumber = useCallback(() => {
			if (phoneNumber.length === 0) {

				setPhoneNumberError("请输入手机号");
				setDisabledSend(true);
				return false;
			} else if (!validatePhoneNumber(phoneNumber)) {

				setPhoneNumberError("手机号格式错误");
				setDisabledSend(true);
				return false;
			}

			setDisabledSend(false);
			return true;
		}, [phoneNumber]),

		checkVerificationCode = useCallback(()=>{

			if( serviceVerificationCode.length === 0 ){

				setVerificationCodeError('还未请求验证码');
				return false;
			} else if( verificationCode.length === 0 ){

				setVerificationCodeError('请输入验证码');
				return false;
			} else if( verificationCode !== serviceVerificationCode ){

				setVerificationCodeError('验证码出错');
				return false;
			}

			setVerificationCodeError('');
			return true;
		}, [verificationCode, serviceVerificationCode]),

		sendVerificationCode = useCallback(()=>{

			if (!validatePhoneNumber(phoneNumber)) {
				return;
			} else if (serviceVerificationCode) {
				message.warning({
					key: "已发送验证码",
					content: "已发送验证码",
				});
				return;
			}

			serviceSendVerificationCode(phoneNumber).then((code) => {
				setVerificationCodeError('');
				setServiceVerificationCode(code);
			}).catch((reason)=>{
				message.error({
					key: 'serviceSendVerificationCodeError',
					content: reason,
				});
			});
		}, [phoneNumber, serviceVerificationCode]);

	useImperativeHandle( ref, () => {
		return {
			checkRegisterMessage(){

				return checkPhoneNumber() && checkVerificationCode();
			},
			getRegisterMessage(){
				return {
					phoneNumber
				};
			}
		};
	}, [checkPhoneNumber, checkVerificationCode, phoneNumber] );

	return (
		<div className="check-phone-number">
			<Input
				defaultValue={phoneNumber}
				placeholder={"输入手机号"}
				style={{ width: "100%" }}
				onChange={(e) => {
					setPhoneNumber(e.target.value);
				}}
				onBlur={(e) => {
					checkPhoneNumber();
				}}
				onFocus={(e) => {
					setPhoneNumberError("");
				}}
			/>
			<div className="register-item-error">{phoneNumberError}</div>
			<Input
				disabled={disabledSend}
				addonAfter={
					<span style={{ cursor: disabledSend ? "inherit" : "pointer", }}
						onClick={ sendVerificationCode }
					>
						发送验证码
					</span>
				}
				onBlur={(e)=>{
					checkVerificationCode();
				}}
				onChange={(e) => {
					setVerificationCode(e.target.value);
				}}
			/>
			<div className="register-item-error">{verificationCodeError} {serviceVerificationCode ? '验证码:(由于是纯前端, 所以就放这了)' + serviceVerificationCode : ''}</div>
		</div>
	);
});

export default CheckPhoneNumber;

