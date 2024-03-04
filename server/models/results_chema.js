const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  casename_answer: { type: String }, // 카테고리
  procedure_answer: { type: String }, // 절차
  documentLists_answer: { type: String }, // 필요 서류
  SituationSummary_answer: { type: String }, // 상황 요약
  createdAt: {
    type: Date,
    default: Date.now, // 현재 시간을 기본 값으로 설정
  },
  situationSummary_result: [
    {
      caseNm: { type: String, default: '' },
      courtNm: { type: String, default: '' },
      judmnAdjuDe: { type: String, default: '' },
      caseNo: { type: String, default: '' },
      facts: { type: String, default: '' },
    },
  ],
});

module.exports = mongoose.model('Result', resultSchema);
