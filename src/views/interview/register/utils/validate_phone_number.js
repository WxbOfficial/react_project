
const phoneRegex = /^1[34578]\d{9}$/;

// 手机号规范验证
export default function validatePhoneNumber(phoneNumber) {

	if (phoneRegex.test(phoneNumber)) {
		return true;
	} else {
		return false;
	}
}
