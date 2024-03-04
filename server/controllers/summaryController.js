const { GoogleGenerativeAI } = require('@google/generative-ai'); // gemini 불러오기
const { HarmBlockThreshold, HarmCategory } = require('@google/generative-ai');
const GeminiResult = require('../models/results_chema'); // db 저장

const generationConfig = {
  stopSequences: ['red'],
  maxOutputTokens: 2048,
  temperature: 0.3,
  topP: 1,
  topK: 1,
};

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
];

async function CosinSummary(pythontojson) {
  try {
    async function async1(pythontojson) {
      try {
        // Gemini Model
        const genAI = new GoogleGenerativeAI('AIzaSyB5DM40-WwUi2DXL2eZFFrKGdlJ7ptzvv4');
        const model = genAI.getGenerativeModel({ model: 'gemini-pro', generationConfig, safetySettings });

        // gemini에게 역할 부여 및 피해 상황 설정

        //관련 법 찾는 코드
        const fact1_prompt = `당신은 사회 초년생들이 겪기 쉬운 전세사기 관련 판례 중 사실 부분에 대한 데이터를 읽어들여 법을 잘 모르는 사람도 알 수 있게 용어를 쉽게 바꾸고 한 문장으로 정리해주는 법률 용어 요약 봇입니다.
                                
        ** 전세사기 판례 중 사실에 관한 데이터 **
        ${pythontojson[0]['facts']}

        
        * 요약된 한 문장만 나와야해요.
        * 법을 잘 모르는 사람도 자세하고 이해하기 쉽게 말해줘
        * 그리고 특수문자가 없어야 하며 markdown 형식이 아닌 text 형식으로 결과를 보여줘.
      `;

        // generate answer & response.text loading
        const fact1 = model.generateContent(fact1_prompt);
        const fact1_answer = (await fact1).response.text();

        // Json Update field value
        pythontojson[0]['facts'] = fact1_answer;
        return pythontojson[0];
      } catch (ex) {
        console.error('An error occurred:', ex); // 오류를 콘솔에 출력;
      }
    }

    async function async2(pythontojson) {
      try {
        // Gemini Model
        const genAI = new GoogleGenerativeAI('AIzaSyBIV4r4NwHW0TCmIv9Vecxaj65BLZuxWVE');
        const model = genAI.getGenerativeModel({ model: 'gemini-pro', generationConfig, safetySettings });

        // 절차 찾기 코드
        const fact2_prompt = `당신은 사회 초년생들이 겪기 쉬운 전세사기 관련 판례 중 사실 부분에 대한 데이터를 읽어들여 법을 잘 모르는 사람도 알 수 있게 용어를 쉽게 바꾸고 한 문장으로 정리해주는 법률 용어 요약 봇입니다.
                                
        ** 전세사기 판례 중 사실에 관한 데이터 **
        ${pythontojson[1]['facts']}

        * 요약된 한 문장만 나와야해요.
        * 법을 잘 모르는 사람도 자세하고 이해하기 쉽게 말해줘
        * 그리고 특수문자가 없어야 하며 markdown 형식이 아닌 text 형식으로 결과를 보여줘.
        `;

        // generate answer & response.text loading
        const fact2 = model.generateContent(fact2_prompt);
        const fact2_answer = (await fact2).response.text();

        // Json Update field value
        pythontojson[1]['facts'] = fact2_answer;
        return pythontojson[1];
      } catch (ex) {
        console.error('An error occurred:', ex); // 오류를 콘솔에 출력;
      }
    }

    async function async3(pythontojson) {
      try {
        // Gemini Model
        const genAI = new GoogleGenerativeAI('AIzaSyAp0yoZTfr-BVUS5YVqZRyGWf8EdQIMWRY');
        const model = genAI.getGenerativeModel({ model: 'gemini-pro', generationConfig, safetySettings });

        //필요 서류 코드
        const fact3_prompt = `당신은 사회 초년생들이 겪기 쉬운 전세사기 관련 판례 중 사실 부분에 대한 데이터를 읽어들여 법을 잘 모르는 사람도 알 수 있게 용어를 쉽게 바꾸고 한 문장으로 정리해주는 법률 용어 요약 봇입니다.
                                
        ** 전세사기 판례 중 사실에 관한 데이터 **
        ${pythontojson[2]['facts']}
        
        * 요약된 한 문장만 나와야해요.
        * 법을 잘 모르는 사람도 자세하고 이해하기 쉽게 말해줘
        * 그리고 특수문자가 없어야 하며 markdown 형식이 아닌 text 형식으로 결과를 보여줘.
      `;

        // generate answer & response.text loading
        const fact3 = model.generateContent(fact3_prompt);
        const fact3_answer = (await fact3).response.text();

        // Json Update field value
        pythontojson[2]['facts'] = fact3_answer;
        return pythontojson[2];
      } catch (ex) {
        console.error('An error occurred:', ex); // 오류를 콘솔에 출력;
      }
    }

    async function runAsyncFunctionsConcurrently() {
      try {
        const results = await Promise.all([async1(pythontojson), async2(pythontojson), async3(pythontojson)]);

        // 모든 함수가 true를 반환하는지 확인
        const allTrue = results.every((result) => result === true);

        if (allTrue) {
          console.log('모든 비동기 함수가 true를 반환했습니다. 프로세스를 종료합니다.');
          process.exit(0);
        }
        return results;
      } catch (error) {
        console.error('에러 발생:', error);
      }
    }

    const results = await runAsyncFunctionsConcurrently();
    return results;
  } catch (ex) {
    next(ex);
  }
}

module.exports = CosinSummary;
