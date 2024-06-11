// 模拟接口函数，非 export 的就是由于纯前端模拟而多出来的代码
// 感觉可以把这些模拟的代码提出来，到另外一个文件里
// 诶呀，时间来不及了。规范嘛，本来就是慢慢完善的，有这个意识就好了，下次一定，下次一定


let preTime = null;

const interval = 6000;

export function serviceSendVerificationCode(phoneNumber) {

	return new Promise((resolve, reject) => {

		const now = Date.now();

		if( preTime !== null ){

			let wait = now - preTime;

			if( wait > interval ){

				resolve(Math.random().toFixed(6).slice(-6));
				preTime = now;
			}else{

				reject(`请求的太频繁了, 请再等${(interval - wait) / 1000}秒吧`)
			}
		}else{

			resolve(Math.random().toFixed(6).slice(-6));
			preTime = now;
		}
	});
}


let userId = -1;

export const UserGender = new Map();

UserGender.set(-1, '保密');
UserGender.set(0, '女');
UserGender.set(1, '男');

const userList = [
	{
		id: -1,
		username: '123456',
		nickname: '测试昵称',
		phoneNumber: '15967561791',
		gender: -1,
	},
	{
		id: -2,
		username: '测试登录名',
		nickname: '测试昵称',
		phoneNumber: '测试手机号',
		gender: -1,
	},
	{
		id: -3,
		username: '测试登录名',
		nickname: '测试昵称',
		phoneNumber: '测试手机号',
		gender: -1,
	},
	{
		id: -4,
		username: '测试登录名',
		nickname: '测试昵称',
		phoneNumber: '测试手机号',
		gender: -1,
	},
	{
		id: -5,
		username: '测试登录名',
		nickname: '测试昵称',
		phoneNumber: '测试手机号',
		gender: -1,
	},
	{
		id: -6,
		username: '测试登录名',
		nickname: '测试昵称',
		phoneNumber: '测试手机号',
		gender: -1,
	},
	{
		id: -7,
		username: '测试登录名',
		nickname: '测试昵称',
		phoneNumber: '测试手机号',
		gender: -1,
	},
	{
		id: -8,
		username: '测试登录名',
		nickname: '测试昵称',
		phoneNumber: '测试手机号',
		gender: -1,
	},
	{
		id: -9,
		username: '测试登录名',
		nickname: '测试昵称',
		phoneNumber: '测试手机号',
		gender: -1,
	},
	{
		id: -10,
		username: '测试登录名',
		nickname: '测试昵称',
		phoneNumber: '测试手机号',
		gender: -1,
	},
	{
		id: -11,
		username: '测试登录名',
		nickname: '测试昵称',
		phoneNumber: '测试手机号',
		gender: -1,
	}
]

function createUserByPhoneNumber( phoneNumber ){

	return {

		id: ++userId,
		phoneNumber,
		username: null,
		password: null,
		gender: -1,
	}
}

function createUserByAccount( account ){

	return {

		id: ++userId,
		gender: -1,
		...account,
	}
}

export function serviceMobileRegister( phoneNumber ){

	return new Promise((resolve, reject) => {

		if( userList.some((user)=>{
			return user.phoneNumber === phoneNumber
		}) ){

			reject('该手机号已注册过');
		}else{

			const user = createUserByPhoneNumber(phoneNumber);

			userList.push( user );

			resolve(user);
		}
	});
}

export function serviceAccountRegister( param ){

	return new Promise((resolve, reject) => {

		if( userList.some((user)=>{
			return user.phoneNumber === param.phoneNumber
		}) ){

			reject('该手机号已注册过');
		}else{

			const user = createUserByAccount(param);

			userList.push( user );

			resolve(user);
		}
	});
}

export function serviceCheckUserName(username){

	return new Promise((resolve, reject)=>{

		if( userList.some((user)=>{
			return user.username === username
		}) ){

			reject('账号名已经被占用，请更换账号名重试');
		}else{

			resolve();
		}
	});
}

export function serviceGetUserList(param){

	return new Promise((resolve, reject)=>{

		const
			{ pageIndex, pageSize } = param,
			total = userList.length;

		const start = (pageIndex - 1) * pageSize;

		if( start > total ) {

			reject('查询超出列表范围');
		}else {

			resolve({
				data: userList.slice( start, start + pageSize ),
				pageIndex,
				pageSize,
				total: userList.length,
			})
		}
	});
}

export function serviceUpdateUser( param ){

	return new Promise((resolve, reject)=>{

		const user = userList.find((user)=>{
			return user.id === param.id;
		});

		if( user ){

			Object.assign( user, param );

			resolve();
		}else{

			reject('找不到该用户');
		}

	});
}

export function serviceUpdateUserPhoneNumber( id, phoneNumber ){

	return new Promise((resolve, reject)=>{

		if( userList.some((user)=>{
			return user.phoneNumber === phoneNumber
		}) ){

			reject('该手机号已注册过');
		}else{

			const user = userList.find((user)=>{
				return user.id === id;
			});

			if( user ){

				user.phoneNumber = phoneNumber;

				resolve();
			}else{

				reject('找不到该用户');
			}
		}

	});
}


export function serviceDeleteUserById( id ){

	return new Promise((resolve, reject)=>{

		const user = userList.find((user)=>{
			return user.id === id;
		});

		if( user ){

			userList.splice( userList.indexOf(user), 1 );

			resolve();
		}else{

			reject('找不到该用户');
		}
	});

}
