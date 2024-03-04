const responses = require('../models/geminiModel'); // db 저장
const geminiController = require('../controllers/geminiController'); // 데이터 전송

module.exports.addMessage = async (req, res, next) => {
  try {
    // 클라이언트로부터 받은 데이터 추출
    const { chatId, buildingType, rentalType, perpetrator, damageAmount, briefSituation, timestap } = req.body;
    // 받은 데이터를 기반으로 새로운 Gemini 인스턴스 생성
    const newGemini = new responses({
      chatId: chatId,
      buildingType: buildingType,
      rentalType: rentalType,
      perpetrator: perpetrator,
      damageAmount: damageAmount,
      briefSituation: briefSituation,
    });

    // MongoDB에 저장
    const savedGemini = await newGemini.save();

    res.status(201).json(savedGemini); // 성공적으로 저장되었음을 클라이언트에 응답
  } catch (error) {
    console.error('메시지 추가 실패: ', error);
    res.status(500).json({ error: '서버 오류: 메시지를 추가할 수 없습니다.' });
  }
};
