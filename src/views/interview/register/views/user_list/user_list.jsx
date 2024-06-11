import { useState, useEffect, useCallback } from 'react';
import { Table, Pagination, message } from 'antd';

import { serviceGetUserList, UserGender, serviceUpdateUser, serviceDeleteUserById, serviceUpdateUserPhoneNumber } from "../../service/user.js";
import EditUser from './edit_user.jsx'
import UpdatePhoneNumber from './update_phone_number.jsx'

import './user_list.scss';


export default function UserList() {

	const
		[userList, setUserList] = useState([]),
		[pageIndex, setPageIndex] = useState(1),
		[pageSize, setPageSize] = useState(10),
		[total, setTotal] = useState(-1),

		getUserList = useCallback((index = pageIndex, size = pageSize)=>{

			serviceGetUserList({
				pageIndex: index,
				pageSize: size
			}).then((res)=>{
				const { data, pageIndex, pageSize, total } = res;

				setUserList(data);
				setPageIndex(pageIndex);
				setPageSize(pageSize);
				setTotal(total);
			})

		}, [pageIndex, pageSize]),

		deleteUser = useCallback((user)=>{

			serviceDeleteUserById(user.id)
				.then(()=>{
					getUserList();
				});

		}, [getUserList]),


		[editUser, setEditUser] = useState(null),

		updateUser = useCallback((user)=>{

			serviceUpdateUser(user)
				.then(()=>{

					setEditUser(null);
					getUserList();
				})

		}, [getUserList]),


		[editPhoneNumberUser, setEditPhoneNumberUser] = useState(null),

		updatePhoneNumber = useCallback((user, phoneNumber)=>{

			serviceUpdateUserPhoneNumber(user.id, phoneNumber)
				.then(()=>{

					setEditPhoneNumberUser(null);
					getUserList();
				})
				.catch((reason)=>{

					message.error({
						key: reason,
						content: reason,
					});
				});
		}, [getUserList]);


	useEffect(()=>{

		getUserList();
		// eslint-disable-next-line
	}, []);

	return (
		<div className="user-list">
			<EditUser
				editorUser={editUser}
				onClose={()=>{ setEditUser(null) }}
				onOk={ updateUser }/>

			<UpdatePhoneNumber
				editorUser={editPhoneNumberUser}
				onClose={()=>{ setEditPhoneNumberUser(null) }}
				onOk={ updatePhoneNumber }/>

			<div className="user-list-main">
				<div className="user-list-table-wrap">
					<Table
						pagination={false}
						sticky={true}
						rowKey={'id'}
						columns={[
							{
								title: 'id',
								dataIndex: 'id',
								width: 60,
								ellipsis: true,
							},
							{
								title: '登录名',
								dataIndex: 'username',
								width: 150,
								ellipsis: true,
							},
							{
								title: '手机号',
								dataIndex: 'phoneNumber',
								width: 140,
								ellipsis: true,
							},
							{
								title: '昵称',
								dataIndex: 'nickname',
								width: 150,
								ellipsis: true,
							},
							{
								title: '性别',
								dataIndex: 'gender',
								width: 100,
								render: ( gender ) => {
									return UserGender.get( gender );
								}
							},
							{
								title: '操作',
								dataIndex: 'id',
								render(text, record, index){

									return (
										<div className="antd-table_buttons">
											<div className="button"
												onMouseDown={()=>{
													setEditUser( record );
												}} >
												编辑
											</div>
											<div className="button"
												onMouseDown={()=>{
													setEditPhoneNumberUser( record );
												}}>
												更新手机号
											</div>
											<div className="button"
												onMouseDown={()=>{
													deleteUser( record );
												}}>
												删除
											</div>
										</div>
									)
								},
							}
						]}
						dataSource={userList}
						/>
				</div>
			</div>
			<div className="user-list-foot">
				<Pagination
					showSizeChanger
					defaultCurrent={pageIndex}
					pageSize={pageSize}
					total={total}

					onShowSizeChange={getUserList}
					onChange={getUserList}
					/>
			</div>
		</div>
	);
}
