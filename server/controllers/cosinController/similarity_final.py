import os
import pandas as pd
from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import argparse
import json

# 현재 스크립트 파일의 디렉토리 경로를 가져옵니다.
script_dir = os.path.dirname(__file__)

# argparse를 사용하여 커맨드 라인 인자를 파싱합니다.
parser = argparse.ArgumentParser()
parser.add_argument("--user_input_text", type=str, required=True)
args = parser.parse_args()

user_input_text = args.user_input_text  # 커맨드 라인에서 받은 텍스트

# BERT 모델 불러오기
model = SentenceTransformer('distiluse-base-multilingual-cased')

# CSV 파일의 상대 경로 설정
csv_file_path = os.path.join(script_dir, 'law_output_100.csv')

# CSV 파일을 불러옵니다.
data = pd.read_csv(csv_file_path)

# 'sentence_embeddings' 열을 문자열(string)에서 리스트로 변환
data['sentence_embeddings'] = data['sentence_embeddings'].apply(eval)

# 사용자 입력의 임베딩 계산
user_input_embedding = model.encode([user_input_text])

# 문장 임베딩 데이터프레임으로 변환
sentence_embeddings = np.vstack(data['sentence_embeddings'])

# 유사도 계산
similarities = cosine_similarity(sentence_embeddings, user_input_embedding)

# 상위 3개 유사한 사건의 인덱스 찾기
top_indices = similarities.flatten().argsort()[-3:][::-1]

# 상위 3개 유사한 사건 정보 저장
situationSummary_result = [
    {'caseNm': data.loc[idx, 'caseNm'], 'courtNm': data.loc[idx, 'courtNm'], 'judmnAdjuDe':data.loc[idx, 'judmnAdjuDe'], 'caseNo': data.loc[idx, 'caseNo'], 'facts': data.loc[idx, 'fact_one']} for idx in top_indices
]
# JSON 형식으로 출력
print(json.dumps(situationSummary_result))
