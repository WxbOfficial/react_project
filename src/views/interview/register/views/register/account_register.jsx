import {
	useRef,
	useImperativeHandle,
	forwardRef,
} from "react";

import CheckAccount from './check_account.jsx';
import CheckPhoneNumber from './check_phone_number.jsx';


// 感觉需求实现和代码的结构的审美总是有冲突，只能尽力去平衡
// 账号密码注册里也有手机号注册, 不复用, 重复代码, 难看, 复用嘛, 结构关系总感觉不舒服
// 另外就是，用户名重复检测是在注册请求前执行的, 手机号重复检测好像是在注册请求之后执行, 所以代码的结构维护, 是从设计需求到写代码一个整体的结果,
// 任何一个环节的不协调, 都会导致代码在实现需求和结构维护之间权衡
const AccountRegister = forwardRef((props, ref)=>{

	const
		checkAccountRef = useRef(null),
		checkPhoneNumberRef = useRef(null);


	useImperativeHandle( ref, () => {
		return {

			checkRegisterMessage(){

				return Promise.all([
					checkPhoneNumberRef.current?.checkRegisterMessage(),
					checkAccountRef.current?.checkRegisterMessage()
				]).then((results)=>{

					return !(results.some( (result)=>{
						return result === false;
					} ));
				})
			},

			getRegisterMessage(){
				return {
					...checkPhoneNumberRef.current?.getRegisterMessage(),
					...checkAccountRef.current?.getRegisterMessage()
				}
			}
		};
	}, [] );

	return (
		<div className="account-register">
			<CheckAccount ref={checkAccountRef}/>
			<CheckPhoneNumber ref={checkPhoneNumberRef}/>
		</div>
	);
})

export default AccountRegister;