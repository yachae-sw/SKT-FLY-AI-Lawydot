import React, { useState, useEffect, useRef } from 'react';
import ChatInput from './ChatInput';
import styled from 'styled-components';
import Logout from './Logout';
import axios from 'axios';
import chatlogo from '../assets/lawydot_logo.png';
import { sendMessageRoute, sendOptionRoute, sendCosinRoute } from '../utils/APIRoutes';
import Markdown from 'markdown-to-jsx';
import { BiRefresh } from 'react-icons/bi';

const questions = [
  '어떤 종류의 건물입니까?',
  '임대 형식은 무엇입니까?',
  '가해자는 누구입니까?',
  '본 사건으로 인한 피해 금액은 얼마입니까?',
  '간략한 상황을 말씀해 주세요!',
  '분석을 시작할까요?',
];

const options = [
  ['아파트', '빌라', '원룸', '투룸', '상가주택', '오피스텔', '기숙사', '게스트하우스', '고시원'],
  ['월세', '전세', '반전세', '장기임대', '단기임대', '공공임대'],
  [
    '건설사',
    '공인중개사',
    '임대인',
    '금융기관',
    '공동주택 관리사무소',
    '법률 서비스 제공자',
    '금융 컨설턴트',
    '대출 브로커',
    '세입자',
  ],
  [],
  [
    '전세 보증금을 가로채기 당한 경우',
    '제공된 정보가 거짓인 경우',
    '보증금이 제때 반환되지 않는 경우',
    '가짜 계약서로 사기를 당한 경우',
    '보증금 반환을 위한 추가 비용 요구를 받은 경우',
    '부당한 이유로 계약 해지를 요구하는 경우',
    '소유권 불분명 매물로 인한 사기를 당한 경우',
    '계약 갱신 요구 무시 및 퇴거 강요를 받은 경우',
  ],
  ['예', '아니요'],
];

function ChatContainer() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [isAnalysisStarted, setIsAnalysisStarted] = useState(false);
  const [isCosinStarted, setIsCosinStarted] = useState(false);

  const messagesEndRef = useRef(null);
  const analysisContainerRef = useRef(null);
  const analysisResultsRef = useRef(null);

  const [casename_answer, setcasename_answer] = useState('');
  const [procedure_answer, setProcedure_answer] = useState('');
  const [documentLists_answer, setdocumentLists_answer] = useState('');
  const [SituationSummary_answer, setSituationSummary_answer] = useState('');
  const [situationSummary_result1, setSituationSummary_result1] = useState('');
  const [situationSummary_result2, setSituationSummary_result2] = useState('');
  const [situationSummary_result3, setSituationSummary_result3] = useState('');

  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const userDataString = localStorage.getItem('chat-app-user');
      if (userDataString) {
        try {
          const data = JSON.parse(userDataString);
          setCurrentUserName(data.username);
          setCurrentUserImage(data.avatarImage);
        } catch (error) {
          // Handle error if parsing fails
          console.error('Error parsing user data:', error);
        }
      }
    };

    fetchData();
  }, []);

  // 함수형 컴포넌트 내에서 리셋 함수 정의
  const resetChatContainer = () => {
    setCurrentQuestionIndex(0);
    setAnswers(Array(questions.length).fill(''));
    setIsAnalysisStarted(false);
    setIsCosinStarted(false);
    setcasename_answer('');
    setProcedure_answer('');
    setdocumentLists_answer('');
    setSituationSummary_answer('');
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [answers]);

  const handleAnswerUpdate = (answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = answer;
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 현재 질문이 마지막 질문일 때
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      console.log('Reached the end of questions. Submitting answers...');
      startAnalysis();
    }
  };

  const handleSendMsg = (msg) => {
    handleAnswerUpdate(msg);
  };

  const handleOptionClick = (option) => {
    handleAnswerUpdate(option);
  };

  const startAnalysis = async () => {
    setIsAnalysisStarted(true);

    // 모든 질문과 답변을 서버로 전송
    try {
      const user = JSON.parse(localStorage.getItem('chat-app-user'));
      const message = {
        chatId: user._id,
        buildingType: answers[0],
        rentalType: answers[1],
        perpetrator: answers[2],
        damageAmount: answers[3],
        briefSituation: answers[4],
        timestamp: new Date(),
      };
      // 답변만을 전송
      await axios.post(sendMessageRoute, message);
    } catch (error) {
      console.error('메시지 저장 실패: ', error);
    }
    try {
      const user = JSON.parse(localStorage.getItem('chat-app-user'));
      const message = {
        chatId: user._id,
        buildingType: answers[0],
        rentalType: answers[1],
        perpetrator: answers[2],
        damageAmount: answers[3],
        briefSituation: answers[4],
        timestamp: new Date(),
      };
      const geminiResult = await axios.post(sendOptionRoute, message);
      const { casename_answer, procedure_answer, documentLists_answer, SituationSummary_answer } = geminiResult.data;
      // 분석 결과를 상태로 설정하는 함수
      const fetchGeminiResult = async () => {
        try {
          // 분석 결과를 상태로 설정
          setcasename_answer(casename_answer);
          setProcedure_answer(procedure_answer);
          setdocumentLists_answer(documentLists_answer);
          setSituationSummary_answer(SituationSummary_answer);
        } catch (error) {
          console.error('분석 결과 상태 설정 실패: ', error);
        }
      };
      // 분석 결과를 가져오는 함수 호출
      await fetchGeminiResult();
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } catch (error) {
      console.error('메시지 저장 실패: ', error);
    }
    startCosin();
  };

  const startCosin = async () => {
    setIsCosinStarted(true);
    // cosine similarity
    try {
      setCurrentQuestionIndex(currentQuestionIndex + 10);
      const cosinResult = await axios.get(sendCosinRoute);
      const { situationSummary_result } = cosinResult.data.situationSummary_result;

      if (Array.isArray(situationSummary_result) && situationSummary_result.length >= 3) {
        setSituationSummary_result1(situationSummary_result[0]);
        setSituationSummary_result2(situationSummary_result[1]);
        setSituationSummary_result3(situationSummary_result[2]);
      } else {
        console.error('분석 결과 배열의 길이가 예상과 다릅니다.');
      }
    } catch (error) {
      console.error('코사인 유사도 메시지 저장 실패: ', error);
    }
    setCurrentQuestionIndex(Infinity);
  };

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
          </div>
          <div className="username">
            <h2>{currentUserName}</h2>
          </div>
        </div>
        <div className="chat-controls">
          <button onClick={resetChatContainer}>
            <i class="bx bx-reset"></i>
          </button>
        </div>
      </div>
      <div className="chat-container">
        <div className="chat-messages">
          {questions.map((question, index) => (
            <div key={index} className="question-answer">
              {index <= currentQuestionIndex && (
                <div className="question-container">
                  <div className="question">{question}</div>
                </div>
              )}
              {index <= currentQuestionIndex && (
                <div className="answer-container">
                  <div className="answer">{answers[index]}</div>
                </div>
              )}
              {index === currentQuestionIndex && options[index].length > 0 && (
                <div className="options">
                  {options[index].map((option, optionIndex) => (
                    <button key={optionIndex} onClick={() => handleOptionClick(option)}>
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="scroll1" ref={messagesEndRef} />
        </div>
        <div className="analysis-container" ref={analysisContainerRef}>
          {isAnalysisStarted && <div className="analysis-message">분석을 시작하겠습니다...</div>}
        </div>
        {currentQuestionIndex > 6 && (
          <div className="analysis-results">
            <div className="result-item gemini">
              <div className="part-context">
                <span>
                  <strong>1. 관련 법률</strong>
                </span>
                <p>{casename_answer}</p>
              </div>
            </div>
            <div className="result-item gemini">
              <div className="part-context">
                <span>
                  <strong>2. 상황 요약</strong>
                </span>
                <p>{SituationSummary_answer}</p>
              </div>
            </div>
            <div className="result-item gemini">
              <div className="part-context">
                <span>
                  <strong>3. 해결 절차</strong>
                </span>
                <p>
                  <Markdown>{procedure_answer}</Markdown>
                </p>
              </div>
            </div>
            <div className="result-item gemini">
              <div className="part-context">
                <span>
                  <strong>4. 서류 목록</strong>
                </span>
                <p>
                  <Markdown>{documentLists_answer}</Markdown>
                </p>
              </div>
            </div>
          </div>
        )}
        {currentQuestionIndex > 16 && (
          <div className="analysis-results">
            <div className="result-item gemini" ref={analysisResultsRef}>
              <div className="sim-context">
                <span>
                  <strong>5. 유사 판례</strong>
                </span>

                <div className="sim-name">
                  <span>
                    {situationSummary_result1.courtNm} ({situationSummary_result1.caseNo})
                  </span>
                  <p>{situationSummary_result1.facts}</p>
                </div>
                <div className="sim-name">
                  <span>
                    {situationSummary_result2.courtNm} ({situationSummary_result2.caseNo})
                  </span>
                  <p>{situationSummary_result2.facts}</p>
                </div>
                <div className="sim-name">
                  <span>
                    {situationSummary_result3.courtNm} ({situationSummary_result3.caseNo})
                  </span>
                  <p>{situationSummary_result3.facts}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {currentQuestionIndex < questions.length && <ChatInput handleSendMsg={handleSendMsg} />}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  left: 88px;
  grid-template-rows: 15% 70% 15%;
  gap: 0.1rem;
  overflow: hidden;
  margin-right: 50px;

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    border-bottom: 2px solid #ababab; /* 밑줄 스타일 추가 */
    margin-bottom: 30px; /* 선택적으로 헤더와의 간격을 조정할 수 있습니다. */
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 40px;
          margin: 3px;
        }
      }
      .username {
        h2 {
          color: black;
        }
      }
    }
  }

  .chat-container {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    height: 100%;
    overflow-y: auto;
    .chat-messages {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1rem;
      .answer-container {
        display: flex;
        justify-content: flex-end;
        .answer {
          align-items: center;
          background-color: #1a18b8;
          color: #fff;
          font-size: 20px;
          padding: 10px;
          border-radius: 13px 0px 13px 13px;
          font-weight: 400;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
      }
      .question-container {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 1rem;
        .question {
          align-items: center;
          background-color: #ffffff;
          padding: 10px;
          font-size: 20px;
          border-radius: 0px 13px 13px 13px;
          font-weight: 600;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
      }
      .options {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: flex-start;
        margin-top: 1rem;
        button {
          padding: 8px 12px;
          font-size: 0.8rem;
          color: #ffffff;
          background-color: #5374e6;
          border: 1px solid #5374e6;
          border-radius: 15px;
          font-size: 20px;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }
        button:hover {
          background-color: #fca808;
          border: 1px solid pink;
        }
        button:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(33, 37, 41, 0.1);
        }
      }
    }
    .analysis-container {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 3rem;
      backdrop-filter: blur(8px); /* 흐림 효과 적용 */
      .analysis-message {
        align-items: center;
        background-color: #ffffff;
        padding: 10px;
        font-size: 20px;
        border-radius: 0px 13px 13px 13px;
        font-weight: 600;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
    }
  }
  .sim-context {
    display: inline-block;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    padding: 15px;
    font-size: 22px;
    border-radius: 0px 13px 13px 13px;
    font-weight: 500;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin-bottom: 20px;
    span {
      padding: 10px;
      font-size: 22px;
    }
    .sim-name {
      margin-top: 18px;
      align-items: center;
      justify-content: center;
      color: black;
      padding: 20px;
      font-size: 22px;
      border-radius: 13px;

      margin-bottom: 1rem;
      border: 2px solid #1a18b8;
      span {
        font-size: 20px;
        padding: 10px;
        margin-bottom: 20px;
        font-weight: 600;
      }
      p {
        font-size: 18px;
        padding: 10px;
        margin: 0;
      }
    }
  }

  .result-item {
    margin-bottom: 1rem;
  }
  .part-context {
    display: inline-block;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    padding: 15px;
    font-size: 22px;
    border-radius: 0px 13px 13px 13px;
    font-weight: 500;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin-bottom: 20px;
    span {
      padding: 10px;
      font-size: 22px;
    }
    p {
      font-size: 18px;
      padding: 15px;
      margin: 0;
    }
  }

  .analysis-results strong {
    color: black;
  }

  .chat-controls {
    display: flex;
    align-items: center;
  }

  .chat-controls button {
    border: none;
    background-color: #e7effa;
  }
  .chat-controls .bx-reset {
    font-size: 30px;
    color: #ababab;
  }
  /* 스크롤바 스타일 */
  .chat-container::-webkit-scrollbar,
  .chat-messages::-webkit-scrollbar {
    width: 8px; /* 스크롤바 너비 */
  }

  .chat-container::-webkit-scrollbar-thumb,
  .chat-messages::-webkit-scrollbar-thumb {
    background-color: #d4d4d4; /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 모양 */
  }

  .chat-container::-webkit-scrollbar-track,
  .chat-messages::-webkit-scrollbar-track {
    background-color: #f0f0f0; /* 스크롤바 트랙 색상 */
  }
`;

export default ChatContainer;
