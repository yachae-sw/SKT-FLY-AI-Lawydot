# 나만의 법률 개인 비서 (My own legal secretary)

<img src="https://github.com/yachae-sw/SKT-FLY-AI-Lawydot/assets/93850398/f1ca6842-b63e-40a4-91b3-a9f64c3e2aba" width="200">

### 🧑‍🤝‍🧑맴버 구성

|                                                                                   **채성원**                                                                                   |                                                                                   **김윤서**                                                                                    |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://github.com/yachae-sw/SKT-FLY-AI-Lawydot/assets/93850398/42c9e675-6126-473d-91b8-f59fcf165e08" width="120" > <br/> @yachae-sw](https://github.com/yachae-sw) | [<img src="https://github.com/yachae-sw/SKT-FLY-AI-Lawydot/assets/93850398/2761f43b-bad2-46bd-9bbf-735cb7fa8a1b" width="120"> <br/> @yoonseo111](https://github.com/yoonseo111) |

### 📅개발 기간

- 2024.01.02 - 2024.02.29

### :computer:시연 영상

[![Lawydot](https://github.com/yachae-sw/SKT-FLY-AI-Lawydot/assets/93850398/f1ca6842-b63e-40a4-91b3-a9f64c3e2aba)](https://github.com/yachae-sw/SKT-FLY-AI-Lawydot/assets/93850398/eb1f4f28-5ce0-4f2e-886e-35fce936e454)

## 👻프로젝트 소개

- 최근 사회 초년생에게 자주 발생하는 **부동산 사기** 문제
- 해결하기 위한 **가이드라인을 이해하기 쉽게** 제공해드립니다
  <br/>

  ### [특징]

  - 전세 사기는 전국민의 관심을 받을 만큼 심각한 사회 문제이며 아직까지도 많은 피해자가 발생하고 있다.
  - 기존의 법률 플랫폼에서 사용자는 "내가 처한 상황을 어떻게 얼마나 설명을 해야할까?"와 같은 고민을 한다.
  - 부동산 종류, 임대 유형, 가해자, 피해 금액, 간단한 상황 총 5가지의 고정 질문을 통해 사용자의 고민을 덜어주고자 한다.
  - 위 질문을 바탕으로 사용자에게 관련 법률, 상황 요약, 해결 절차, 필요 서류 목록, 유사 판례를 알 수 있다.

  ### [Lean Canvas]

  <img src="https://github.com/yachae-sw/SKT-FLY-AI-Lawydot/assets/93850398/f2a2e7ee-26b3-4398-a874-928cf6748094" width="900">

  - 주요 고객 : 부동산 사기를 당한 사회 초년생
  - 비즈니스 모델 : 법률 관련 광고와 사용자의 최종 분석 결과를 변호사에게 제공하여 수익 창출

  ### [ESG]

  - **Lawydot**은 사회적 책임을 실현하는 서비스
  - 어려운 법률 분야에 대한 접근성을 높여 **법률 지식의 격차를 해소**함
  - 사람들이 스스로 **법적 권리를 보호**할 수 있도록 함
  - 불투명한 법률 정보 시스템은 비효율성과 부정행위를 야기할 수 있기 때문에 서비스 운영의 **투명성을 강화**하기 위해 노력함

  <br/>

## :star:핵심 기술

- **Gemini Pro(LLM)** : Google DeepMind에서 개발한 다중 모드 대형 언어 모델이다. 텍스트, 오디오, 이미지, 영상 등 다양한 입력값을 원활하게 이해하고 받아 추론할 수 있으며, 기존 멀티모달 모델보다 훨씬 뛰어난 성능을 보여준다.
- **Chain of Thought(CoT)** : AI가 단순히 답을 내놓는 것이 아니라, 답에 도달하기까지 어떤 과정을 거쳤는지 설명할 수 있도록 한다.
- **Retrieval-Augmented Generation(RAG)** : 기존의 검색 기술과 생성 모델을 결합하여 보다 정확하고 유용한 법률 정보를 제공하도록 한다.
- **Bert** : 구글의 Devlin(2018)이 제안한 BERT는 사전 학습된 대용량의 레이블링 되지 않는(unlabeled) 데이터를 이용하여 언어 모델(Language Model)을 학습하고 이를 토대로 특정 작업( 문서 분류, 질의응답, 번역 등)을 위한 신경망을 추가하는 전이 학습 방법이다.
  - Token Embeddings : Word piece 임베딩 방식을 사용하여 가장 긴 길이의 sub-word를 하나의 단위로 만드는 과정
  - Segment Embeddings : 토큰으로 나누어진 단어들을 다시 하나의 문장으로 만드는 과정
  - Position Embeddings : 토큰의 순서를 인코딩하는 과정
- **Cosine Similarity** : 코사인 유사도는 두 벡터 간의 코사인 각도를 이용하여 구할 수 있는 두 벡터의 유사도를 의미한다.
  <br/>

  ### :hammer:개발 환경

  <img src="https://github.com/yachae-sw/SKT-FLY-AI-Lawydot/assets/93850398/7c0e7bd7-8d40-4c43-aba4-16e859421c6d" width="500">

  - Front-end : HTML, React, styled-components
  - Back-end : express, Node.js
  - Database : MongoDB
  - 인공지능(LLM api & prompt) : Python, JavaScript
  - UI/UX : Figma
  - 버전 및 이슈관리 : Github, Github Issues, Github organizations
  - 협업 툴 : Notion, Discord, Github

  <br/>

  ### 🔍시스템 구성도

  <img src="https://github.com/yachae-sw/SKT-FLY-AI-Lawydot/assets/93850398/5e6acc9d-791d-459d-906f-990e68e3e3ac" width="900">

  <br/>

## :dart:향후 활용 방향

1. **정확도 개선 :** 사용자에게 더 정확한 결과를 제공하기 위해 LLM prompt를 조정하고 유사도 모델의 성능을 개선해야 합니다.

2. **서비스 확장 :** 부동산 사기만 한정하는 것이 아니라 교통사고, 근로 등 다양한 법률 분야를 추가하여 이용자를 넓힐 수 있습니다.

3. **다양한 상황 대처 기능 :** 현재는 질문이 미리 설정되어 있지만, LLM 기반으로 상세 질문을 유동적으로 생성하면 다양한 상황에 대처할 수 있게 됩니다.

4. **음성 서비스 기능 :** TTS와 STT 같은 음성 서비스 기능을 추가하여 사용자가 더 편리하게 서비스를 이용할 수 있도록 할 것입니다.

<br/>

## :memo:프로젝트 후기

### :cactus: 채성원

플랫폼 서비스를 개발하면서 팀 프로젝트에서 깃헙을 통한 협업을 경험했습니다. 이를 통해 자연어 처리와 대형 언어 모델을 활용하고 API를 다루는 등 많은 것을 배웠습니다. 그러나 인공지능 이외의 다른 영역은 새로 배워야 하는 부분이 많아 공부해야 할 필요성을 느꼈습니다. 프로젝트를 진행하면서 개발만큼이나 비즈니스 모델과 ESG 등을 고려해야 한다는 것을 깨달았습니다. 앞으로는 더 다양한 프로젝트에 참여하고, 함께 노력한 팀원들에게 감사의 인사를 전하고 싶습니다.

### :cherries: 김윤서

지난 2개월 동안 SKT Fly AI를 통해 많은 것을 배우고, 좋은 사람들과 즐거운 시간을 보낼 수 있었습니다. 특히 TF-IDF와 Bert 모델을 사용하여 임베딩을 수행하고, Jaccard, 백터 내적, Cosine 계산법을 통해 문장 간의 유사도를 측정하는 과정에서 작지만 하나의 알고리즘을 설계해 보았습니다. 이를 바탕으로 하나의 문제를 해결해 나가는 데 도움이 될 것이라고 생각합니다. 개발 과정에서 어려움도 있었지만, 그만큼 값진 경험이었습니다.
