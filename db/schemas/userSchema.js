// userSchema: 사용자 정보를 저장하는 MongoDB 스키마 정의
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true, 
            required: false, // 선택 필드
            match: /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/ // 정규식을 사용한 이메일 형식 체크
        },
        name: {
            type: String,
            validate: [
                function (name) {
                    return name.length < 12; // 이름 길이 12자 미만 유효성 검사
                },
                'long name' // 에러 코드 확정 후 수정 예정
            ],
            required: true, // 필수 필드
        },
        id: {
            type:String,
            required: true
        },
        password: String,
        phone: String,//phone Number 아니면 String으로 해야할지... TO 수종
    },
    {
        versionKey: false,
        timestamps: true,
        collection: "user" // 몽고디비 컬렉션 이름 설정
    }
);

module.exports = mongoose.model('user', userSchema);