# SKT FLY AI 4th

👨‍⚖️ **Lawydot Project**\
🤖 **법률 챗봇 서비스 개발을 위해 필요한 AI 모델 구현**

## Classfication

- 사용자의 입력의 민사/형사 사건 구분을 위한 분류 모델 구현

1. **BERT**
   - 2018년에 Google이 도입한 마스킹된 언어 모델
   - 트랜스포머를 이용하여 구현되었으며 레이블이 없는 텍스트 데이터로 사전 훈련된 언어 모델
2. **KoBERT**
   - 구글 BERT의 한국어 성능 한계 극복
3. **ELECTRA**
   - 학습의 효율성에 주목한 모델
   - 빠르고 효과적으로 학습

## OpenAI

- OpenAI에서 제공하는 LLM 모델을 활용하여 사용자 입력에 따른 적절한 답변 제공
- Chain-of-Thought & Retrieval-Augmented Generation 기술을 활용하여 prompt 조정

1. **ChatGPT**
   - 2018년에 OpenAI가 선보인 LLM
   - GPT-3.5 사용
2. **KoGPT**
   - 주로 한국어 텍스트로 학습한 LLM
3. **Gemini**
   - 2023년에 Goolge이 선보인 LLM
   - OpenAI의 GPT-4의 경쟁자로 자리매김

📍 가장 좋은 성능을 보인 Gemini를 사용하기로 결정  
📍 API KEY 사용이 무료라는 점에서 경제적으로 사용 가능

## Similarity

- 기존 판례 데이터의 판시 상황(Facts)과 사용자 입력의 유사도를 계산하여 유사도가 높은 상위 3개의 판례 데이터 제시
- 판시 상황(Facts)과 사용자 입력(Input)의 기본적인 전처리 진행(문자 및 특수기호 제거) ➡️ 문장 임베딩 ➡️ 문장 간 유사도 계산법 적용 ➡️ 유사도 구하기

1. **Embedding**
   - TF-IDF
   - BERT
   - RoBERT
2. **Similarity**
   - 벡터 내적
   - Cosine
   - Jaccard

📍 가장 좋은 성능을 보인 BERT + Cosine 방법으로 유사도 구하기로 결정  
📍 0.56까지 유사도 성능을 높였고 사용자 입력과 유사한 기존 판례 데이터가 나오는 것을 확인해 볼 수 있음
