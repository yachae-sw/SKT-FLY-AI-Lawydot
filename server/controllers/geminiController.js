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

// 테스트중

module.exports.geminiall = async (req, res, next) => {
  try {
    async function async1() {
      try {
        // Gemini Model
        const genAI = new GoogleGenerativeAI('AIzaSyDehTvEZvwq1PsGcmWZk_WCrEzMuaBfqw4');
        const model = genAI.getGenerativeModel({ model: 'gemini-pro', generationConfig, safetySettings });

        // gemini에게 역할 부여 및 피해 상황 설정

        //관련 법 찾는 코드
        const casename_prompt = `당신은 사회 초년생들이 겪을 수 있는 이미 발생한 전세 사기 피해를 판단하는 법률 판례 분류기 입니다.

  **사용자 상황:**

  - ${buildingType} ${rentalType} 거래에서 ${perpetrator}에 의해 ${damageAmount} 피해 입음
  - ${briefSituation}
  
  **답변 시 반드시 포함할 내용:**

  * 사용자 상황에 맞는 관련 법들 중 제일 관련이 깊고 중요한 법 중요도 순으로 중복 안되게 법 세 개 출력 해주세요.
  * 답변시 법으로 끝나야 하며 한 단어야 합니다.
  * 실제로 있는 법만 말해주세요 지어내면 안됩니다.
  * 실제로 있는 법인지 한 번 더 체크해주세요.
  * 법 타이틀만 {예를 들면, xx법} 나오게 해주세요.
  * 실존하는 법 이름만 나오게 해주세요.
  * 사기방지법 이면 무슨 법인지 구체적으로 나오게 해주세요.
  * markdown이 아닌 text로 결과가 표출되고 콤마로 법들이 구분되었으면 좋겠어요
  `;

        // generate answer & response.text loading
        const casename = model.generateContent(casename_prompt);
        const casename_answer = (await casename).response.text();

        // GeminiResult Input Code //
        await updateLatestDocumentFields({ casename_answer: casename_answer });
        return casename_answer;
      } catch (ex) {
        console.error('An error occurred:', ex); // 오류를 콘솔에 출력;
      }
    }

    async function async2() {
      try {
        // Gemini Model
        const genAI = new GoogleGenerativeAI('AIzaSyBG3wgrn-eAoqyvgivAYe2UssA0BC5ZX8Q');
        const model = genAI.getGenerativeModel({ model: 'gemini-pro', generationConfig, safetySettings });

        // 절차 찾기 코드
        const procedure_prompt = `당신은 사회 초년생들이 당한 전세 사기 피해를 대응할 수 있게 도와주는 법률 자문인입니다. 피해 금액을 빠르게 되찾을 수 있게 친절하고 자세하게 설명해주세요.

  **사용자 상황:**

  - ${buildingType} ${rentalType} 거래에서 ${perpetrator}에 의해 ${damageAmount} 피해 입음
  - ${briefSituation} 상황

  **답변 예시:**

    **1. 사기 피해 신고**

    a. 신고처: 가까운 경찰서 또는 사이버 수사대(지역 사법경찰청)
    b. 피해 신고시 필요 서류: 피해 신고서, 신분증, 가짜 계약서 사본, 전세금 입금 영수증 및 내역서 사본

    **2. 사기 사건 접수 확인**

    a. 접수 확인 기한: 신고 후 3개월 이내로 사기 사건 접수 확인 통보 수령
    b. 확인 방식: 방문 또는 우편

    **3. 가처분 신청**

    a. 가처분 신청처: 피해 물件 소재지 법원
    b. 신청 기한: 1개월 이내 (사기 사건 접수 확인 통보일 포함)
    c. 가처분 신청 시 필요 서류: 가처분 신청서, 사기 피해 신고서 사본, 경찰 수사 결과 통보서 사본

    **4. 가처분 신청 심사**

    a. 심사 기간: 2~3개월
    b. 판결 방식: 가처분 인가 또는 기각

    **5. 가처분 인가시**

    a. 효력 기간: 6개월
    b. 피해 금액 회수: 6개월 이내에 입금 예정 계좌 전환 또는 가압류 신청
    c. 가압류 신청처: 가처분 신청처
    d. 가압류 신청 기한: 6개월 이내
    e. 가압류 신청 시 필요 서류: 가압류 신청서, 가처분 신청서 사본, 가처분 결정 사본

    **6. 가처분 기각시**

    a. 항고 신청: 2주 이내
    b. 항고 신청처: 가처분 신청처와 다른 지역 법원
    c. 항고 신청 시 필요 서류: 항고 신청서, 가처분 결정 사본

    **7. 항고 기각시**

    a. 상고 신청: 2주 이내
    b. 상고 신청처: 대법원
    c. 상고 신청 시 필요 서류: 상고 신청서, 항고 결정 사본
    
  **답변 시 반드시 포함할 내용:**

  * 사기 피해를 복구하기 위한 절차 (단계별 자세한 설명)
    * 피해 금액 및 피해 복구가 시급하다는 점 고려08
    * 어떠한 곳에 어떠한 서류나 행위를, 언제(몇개월 이내 이런식으로)까지 해야 하는지 명시
    * 예시: 가처분 신청 절차, 민사 소송 절차 등
    * 해당 구역에 맞는 특정 관할 구역 명시, 구역이 명시 되지 않으면 출력하지 않음
    * 단계 에서 피해금 회복은 제외
    * 여기는 한국이야, FBI, CIA와 같은 기관은 없어 절대 넣지 말아주세요
    * 출력 시 문단 번호는 숫자로만 표시해주세요.
    * 하위 문단의 번호는 tab 한 뒤 영문을 사용하게 해주세요.
    * 최종 출력은 markdown 형식으로 깔끔하게 보기 좋게 나오게 해주세요.
    * 같은 내용들이 여러줄에 걸쳐 중복으로 안나오게 해주세요.
    * 자체적으로 세 번 돌려서 보기 제일 정확하고 깔끔한 답변이 나오게 해주세요.
    * 법을 잘 모르는 사람도 자세하고 이해하기 쉽게 말해줘

  `;

        // generate answer & response.text loading
        const procedure = model.generateContent(procedure_prompt);
        const procedure_answer = (await procedure).response.text();

        // Gemini answer update to MongoDB Code
        await updateLatestDocumentFields({ procedure_answer: procedure_answer });
        return procedure_answer;
      } catch (ex) {
        console.error('An error occurred:', ex); // 오류를 콘솔에 출력;
      }
    }

    async function async3() {
      try {
        // Gemini Model
        const genAI = new GoogleGenerativeAI('AIzaSyDPUwfUAjwGHySEXF3xhDZVBmI_jyhfuxc');
        const model = genAI.getGenerativeModel({ model: 'gemini-pro', generationConfig, safetySettings });

        //필요 서류 코드
        const documentLists_prompt = `당신은 사회 초년생들이 겪을 수 있는 이미 발생한 전세 사기 피해를 대응할 수 있게 도와주는 법률 자문인입니다. 피해 금액을 빠르게 되찾을 수 있게 친절하고 자세하게 설명해주세요.

  **사용자 상황:**

  - ${buildingType} ${rentalType} 거래에서 ${perpetrator}에 의해 ${damageAmount} 피해 입음
  - ${briefSituation}

  **답변 예시 : **


    **1. 전세계약서 원본**
    * 이 서류 지참 없이는 피해 회복이 불가능합니다.
    * 가짜 계약으로 피해를 입은 후에라도 전세계약서 원본을 갖고 있으시다면, 경찰서에서 피해 신고를 할 수 있습니다.
    * 경찰서에서 피해 신고를 하면 사기 사건으로 조사가 시작되므로, 피해를 복구할 가능성이 높아집니다.
  
    ** 2. 전세금 영수증**
    * 전세금 입금을 증명하는 서류입니다.
    * 임대인이 전세금을 받은 사실을 입증할 수 있는 유일한 서류입니다.
    * 전세금 영수증은 원본보다는 사본으로도 인정이 쉽지만, 사본은 사기성이 있을 수 있으므로 가능하면 원본을 갖고 계시는 것이 좋습니다.
  
    **3. 입주 증거 서류**
    * 전세주택에 입주했다는 것을 증명하는 서류입니다.
    * 전기, 가스, 수도 요금 영수증, 우편물 주소지 확인서, 주민등록증 등이 입주 증거 서류로 인정될 수 있습니다.
    * 입주 증거 서류를 제출하면, 임대인이 전세금을 반환해야 할 책임이 있음을 증명할 수 있습니다.
  
    **4. 가짜 계약서**
    * 임대인이 가짜 계약서로 사기했다는 증거 서류입니다.
  
    **5. 은행 거래 내역서**
    * 전세금 입금 내역이 기록된 서류입니다.
    * 은행 거래 내역서를 제출하면, 전세금 입금 사실을 입증할 수 있습니다.
    * 은행 거래 내역서는 원본보다는 사본으로도 인정이 쉽지만, 사본은 사기성이 있을 수 있으므로 가능하면 원본을 갖고 계시는 것이 좋습니다.
  
    **6. 증인 진술서**
    * 증인이 전세 사기 피해를 목격했다는 내용이 기록된 서류입니다.
    * 증인 진술서는 경찰서에 피해 신고를 할 때 제출해야 합니다.
    * 증인 진술서는 사기 사건의 증거로 활용될 수 있습니다.
  
    **7. 녹음 파일**
    * 임대인과 전화 통화나 대면으로 대화한 내용을 녹음한 파일입니다.
    * 녹음 파일을 제출하면, 임대인이 사기 행위를 한 것을 증명할 수 있습니다.
    * 녹음 파일은 경찰서에 피해 신고를 할 때 제출해야 합니다.
    * 녹음 파일은 사기 사건의 증거로 활용될 수 있습니다. 
  
  
  **답변 시 반드시 포함할 내용:**

  * 피해 금액 복구를 위한 서류 목록 (번호 순으로 작성)
    * 전세 사기와 관련 없는 서류는 제외
    * 서류 작성 방법 자세히 설명
    * 출력 시 문단 번호는 숫자로만 표시해주세요.
    * 하위 문단의 번호는 영문을 사용하게 해주세요.
    * 최종 출력은 markdown 형식으로 깔끔하게 보기 좋게 나오게 해주세요.
    * 자체적으로 세 번 돌려서 보기 제일 정확하고 깔끔한 답변이 나오게 해주세요.
    * 서류 목록만 나오게 해야돼요.
    * 법을 잘 모르는 사람도 자세하고 이해하기 쉽게 말해줘
  
  **답변 시 반드시 제거해야할 내용:**

  * 피해 금액 복구를 위한 행동들 제거해주세요
    * 변호사와의 상담, 신청
    * 경찰서 방문 및 신고
    * 소송제기, 소송준비 같은 행위
    * 대출 회사 접촉 및 방문 같은 행위
    * 녹음이면 녹음 본, 녹음 파일로 명시
  `;

        // generate answer & response.text loading
        const documentLists = model.generateContent(documentLists_prompt);
        const documentLists_answer = (await documentLists).response.text();

        // Gemini answer update to MongoDB Code
        await updateLatestDocumentFields({ documentLists_answer: documentLists_answer });
        return documentLists_answer;
      } catch (ex) {
        console.error('An error occurred:', ex); // 오류를 콘솔에 출력;
      }
    }

    async function async4() {
      try {
        // Gemini Model
        const genAI = new GoogleGenerativeAI('AIzaSyCWRYO8wwrBwo6lWVkkG6A_DzzJ_qSdegM');
        const model = genAI.getGenerativeModel({ model: 'gemini-pro', generationConfig, safetySettings });

        const SituationSummary_prompt = `당신은 사회 초년생들이 겪을 수 있는 이미 발생한 전세 사기 상황 요약 봇입니다. 코사인 유사도로 실제 판례 비교분석 해볼건데 도와주세요.
    
      **사용자 상황:**
    
      - ${buildingType} ${rentalType} 거래에서 ${perpetrator}에 의해 ${damageAmount} 피해 입음
      - ${briefSituation}
    
      **답변 예시(형식만 참조): 신축 오피스텔 전세계약 금액 일부를 계약금으로 지급하고 연락이 두절되어 계약금을 반환받지 못하고 있으므로 법원을 통해 피해 회복을 요청**
      
      답변 예시처럼 요약된 한 문장만 나와야해요. ${buildingType} ${rentalType} ${perpetrator}${damageAmount} 항목들은 다 나오게 하고 ${briefSituation}은 상황에 맞게 요약해주세요.
      ** 그리고 특수문자가 없어야 하며 markdown 형식이 아닌 text 형식으로 결과를 보여줘.
      `;

        // generate answer & response.text loading
        const SituationSummary = model.generateContent(SituationSummary_prompt);
        const SituationSummary_answer = (await SituationSummary).response.text();

        // Gemini answer update to MongoDB Code
        await updateLatestDocumentFields({ SituationSummary_answer: SituationSummary_answer });
        return SituationSummary_answer;
      } catch (ex) {
        console.log('An error occurred:', ex); // 오류를 콘솔에 출력;
      }
    }
    // 테스트중

    // Update LastestDocument fieldsToUpdate COde
    async function updateLatestDocumentFields(fieldsToUpdate) {
      try {
        const updatedDocument = await GeminiResult.findOneAndUpdate(
          {}, // 검색 조건 없음: 모든 문서 대상
          { $set: fieldsToUpdate }, // 업데이트할 필드와 값
          { sort: { _id: -1 }, new: true } // _id를 이용해 가장 최근 문서를 찾아 업데이트
        );
      } catch (error) {
        console.error('Error updating document:', error);
      }
    }

    // front req.body data load
    const chatId = req.body.chatId;
    const { buildingType, rentalType, perpetrator, damageAmount, briefSituation } = req.body;
    const chatId_ = await GeminiResult.findOne({ chatId: chatId }).sort({ createdAt: -1 });

    const resultInstance = new GeminiResult({
      userId: chatId,
      createdAt: new Date(),
    });
    try {
      resultInstance.save();
      console.log('First Result saved to MongoDB');
    } catch (error) {
      console.error('Error saving result to MongoDB:', error);
    }

    async function runAsyncFunctionsConcurrently() {
      try {
        const results = await Promise.all([async1(), async2(), async3(), async4()]);

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

    const casename_answer = results[0];
    const procedure_answer = results[1];
    const documentLists_answer = results[2];
    const SituationSummary_answer = results[3];

    return res.json({
      chatId_: chatId_,
      userId: chatId,
      casename_answer: casename_answer,
      procedure_answer: procedure_answer,
      documentLists_answer: documentLists_answer,
      SituationSummary_answer: SituationSummary_answer,
      createdAt: new Date(),
    });
  } catch (ex) {
    next(ex);
  }
};
