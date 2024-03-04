const GeminiResult = require('../models/results_chema'); // db 저장
const CosinSummary = require('./summaryController'); // CosinSummary Code
const { MongoClient } = require('mongodb');
const { spawn } = require('child_process');
const path = require('path'); // 경로 설정

// MongoDB 접속 URI 설정
const chatUri = 'mongodb://localhost:27017/chat';
const chatClient = new MongoClient(chatUri);

const pythonScriptPath = path.join(__dirname, '..', 'controllers', 'cosinController', 'similarity_final.py');

// MongoDB 클라이언트 연결 및 닫기 함수
async function connectMongoClient() {
  await chatClient.connect();
}

async function closeMongoClient() {
  await chatClient.close();
}

// 최신 situationSummary 가져오기 함수
async function fetchLatestSituationSummary() {
  const db = chatClient.db('chat');
  const collection = db.collection('results');
  const latestDocument = await collection.findOne({}, { sort: { _id: -1 } });

  if (latestDocument) {
    return {
      userId: latestDocument._id,
      situationSummaryAnswer: latestDocument.SituationSummary_answer,
    };
  } else {
    console.log('No documents found.');
    return '';
  }
}

// Python 스크립트 실행 함수
function executePythonScript(userId, situationSummaryAnswer, res, next) {
  const command = `set PYTHONIOENCODING=utf-8 && python "${pythonScriptPath}" --user_input_text="${situationSummaryAnswer}"`;
  const pythonProcess = spawn(command, { encoding: 'utf8', shell: true });

  pythonProcess.stdout.on('data', async (data) => {
    const pythontojson_or = JSON.parse(data);
    const pythontojson = pythontojson_or.flat();
    const cosinsummaryResult = await CosinSummary(pythontojson);
    try {
      const chatDataupdate = await GeminiResult.findOneAndUpdate(
        userId,
        { situationSummary_result: cosinsummaryResult },
        { new: true }
      );

      res.json({ situationSummary_result: chatDataupdate });
    } catch (err) {
      next(err);
    }
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    next(new Error(data));
  });

  pythonProcess.on('error', (error) => {
    console.error(`exec error: ${error}`);
    next(error);
  });
}

module.exports.cosin = async (req, res, next) => {
  try {
    await connectMongoClient();
    const { userId, situationSummaryAnswer } = await fetchLatestSituationSummary();
    await executePythonScript(userId, situationSummaryAnswer, res, next);
  } catch (ex) {
    next(ex);
  } finally {
    await closeMongoClient();
  }
};
