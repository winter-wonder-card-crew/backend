// userSchema: 사용자 정보를 저장하는 MongoDB 스키마 정의
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
        id: {
			type: String,
			required: true,
			unique: true
		},
        //이메일은 선택사항입니다. 비밀번호 찾기시 비밀번호를 이메일로 찾게 되는 데 이부분은 생각하고 처리 해야할듯 합니다.
        email: {
            type: String,
            required: false, // 선택 필드
            match: /^[\w._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // 정확한 이메일 형식 체크
        },
        
		name: {
			type: String,
			validate: [
				function (name) {
					return name.length < 12; // 이름 길이 12자 미만 유효성 검사
				},
				"long name", // 에러 코드 확정 후 수정 예정
			],
			required: true, // 필수 필드
		},
		password: String
	},
	{
		versionKey: false,
		timestamps: true,
		collection: "user", // 몽고디비 컬렉션 이름 설정
	}
);

module.exports = mongoose.model("user", userSchema);
