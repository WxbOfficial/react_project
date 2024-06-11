// 感觉有点慌啊，正则应该不会漏吧?
const
	hasLetterRegex = /[a-zA-Z]+/, //是否有字母
	hasNumRegex = /[0-9]+/, //是否有数字
	hasPunctuationRegex = /[\p{P}\n\r=+$￥<>^`~|]+/, //是否有除空格外的标签符号
	hasOtherRegex = /[^a-zA-Z0-9\p{P}\n\r=+$￥<>^`~|]+/; // (包含字母、数字以及标点符号(除空格)) 外的字符

// 密码规范验证
export default function validatePassword(username, password) {
	const
		hasOther = hasOtherRegex.test(password),
		hasLetter = hasLetterRegex.test(password) ? 1 : 0,
		hasNum = hasNumRegex.test(password) ? 1 : 0,
		hasPunctuation = hasPunctuationRegex.test(password) ? 1 : 0;

	return [
		{
			message: "6-20个字符串, 且密码不能是相同的用户名",
			result: username !== password && password.length >= 6 && password.length <= 20,
		},
		{
			message: "只能包含字母、数字以及标点符号(除空格)",
			result: !hasOther,
		},
		{
			message: "字母、数字和标点符号至少包含2种",
			result: hasLetter + hasNum + hasPunctuation >= 2,
		},
	];
}
