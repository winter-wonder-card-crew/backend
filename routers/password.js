const express = require("express");
const nodemailer = require("nodemailer");
const User = require("../db/schemas/userSchema");
const HmacConvert = require("../modules/commons/passwordConvert");
const router = express.Router();

// Nodemailer를 사용하여 이메일 전송을 구성
const transporter = nodemailer.createTransport({
	service: "Gmail", // 예: 'Gmail', 'Outlook' 등
	auth: {
		user: "jongseungim5348@gmail.com", // 여러분의 이메일 주소
		pass: "tzep aygf gago djlz", // 여러분의 이메일 비밀번호
	},
});

// 이메일 전송 함수
function sendEmail(to, newPassword) {
	return new Promise((resolve, reject) => {
		const mailOptions = {
			from: "jongseungim5348@gmail.com",
			to: to,
			subject: "비밀번호 재설정",
			text: `새로운 비밀번호는 다음과 같습니다: ${newPassword}`,
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(error);
				reject(error);
			} else {
				console.log(`이메일 전송됨: ${info.response}`);
				resolve();
			}
		});
	});
}

// 새로운 비밀번호 생성 함수
function generateNewPassword() {
	// 이 예시에서는 임의의 8자리 숫자로 생성합니다.
	const newPassword = Math.random().toString(36).substring(2, 10);
	return newPassword;
}

// POST 엔드포인트를 통한 비밀번호 재설정
router.post("/", async (req, res) => {
	const { email } = req.body;

	try {
		// 이메일을 통해 사용자를 데이터베이스에서 찾습니다
		const user = await User.findOne({ email });

		if (!user) {
			return res
				.status(404)
				.json({ message: "사용자를 찾을 수 없습니다" });
		}

		// 새 비밀번호를 생성합니다
		const newPassword = generateNewPassword();

		// 새 비밀번호를 사용자의 이메일로 전송합니다
		try {
			await sendEmail(user.email, newPassword);
			console.log("새로운 비밀번호 발급 완료");
		} catch (error) {
			return res
				.status(500)
				.json({ message: "이메일 전송에 실패했습니다" });
		}

		// 새로운 비밀번호를 해싱합니다
		const hashedPassword = HmacConvert(newPassword);

		// 사용자의 비밀번호를 업데이트합니다
		user.password = hashedPassword;
		await user.save();

		return res
			.status(200)
			.json({ message: "비밀번호 재설정이 성공적으로 완료되었습니다" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "서버 오류" });
	}
});

module.exports = router;
