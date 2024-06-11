import { useRef, useMemo, useCallback } from 'react';
import { Modal } from 'antd';

import CheckPhoneNumber from '../register/check_phone_number.jsx';



export default function UpdatePhoneNumber( props ){
	const
		{ editorUser, onOk, onClose } = props,
		mobileRegisterRef = useRef(null),
		user = useMemo(()=>{
			return {
				...editorUser,
			}
		}, [editorUser]),


		handleOnOk = useCallback(()=>{

			if( mobileRegisterRef?.current?.checkRegisterMessage() ){
				onOk( user, mobileRegisterRef?.current?.getRegisterMessage() );
			}
		}, [onOk, user]);




	return (
		<Modal
			title="手机号更新"
			open={ editorUser !== null }
			onOk={ handleOnOk }
			onCancel={onClose}>
			<div className="edit-user">
				<CheckPhoneNumber
					key={user.id}
					phoneNumber={user.phoneNumber}
					ref={mobileRegisterRef}
					/>
			</div>
		</Modal>
	)
}