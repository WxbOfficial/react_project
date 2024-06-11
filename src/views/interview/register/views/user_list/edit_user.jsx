import { useMemo } from 'react';
import { Modal } from 'antd';

import AttrText from '../../components/attributes/attr_text.jsx';
import AttrSelect from '../../components/attributes/attr_select.jsx';


export default function EditUser( props ){

	const
		{ editorUser, onOk, onClose } = props,
		user = useMemo(()=>{
			return {
				...editorUser,
			}
		}, [editorUser]);

	return (
		<Modal
			title="用户编辑"
			open={ editorUser !== null }
			onOk={()=>{
				onOk(user);
			}}
			onCancel={onClose}>
			<div className="edit-user">
        {/* attribute 属性编辑的话, 核心思想主要是
            在 target 或者 keyName 更新的时候，触发 react 更新, 把数据赋给 dom 完成同步更新,
            单纯 dom 操作的时候，不触发 react 更新, 根据 dom 操作进行数据同步更新

            实际实现的时候加上了 key, 所以触发 react 更新的时, 添加 target[keyName] 的判断
        */}
				<div className="user-attr-item">
					<AttrText
						title={'昵称'}
						target={user}
						keyName={'nickname'}
						/>
				</div>
				<div className="user-attr-item">
					<AttrSelect
						title={'性别'}
						target={user}
						keyName={'gender'}
						options={{
							options: [
								{ value: -1, label: "保密" },
								{ value: 0, label: "女" },
								{ value: 1, label: "男" },
							]
						}} />
				</div>
			</div>
		</Modal>
	)
}