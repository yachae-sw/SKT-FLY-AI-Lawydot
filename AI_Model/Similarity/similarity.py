import os
import json
from sentence_transformers import SentenceTransformer
import pandas as pd
import numpy as np
import json

# BERT 모델 불러오기
model = SentenceTransformer('distiluse-base-multilingual-cased')

# JSON 파일로부터 사건의 사실 내용과 사건 번호를 추출하는 함수
def load_data_from_json(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
        # 'facts' -> 'bsisFacts' 경로를 따라 사건의 사실 내용 추출 및 문자열로 결합
        case_description = " ".join(data['facts']['bsisFacts'])
        case_number = " ".join(data['info']['caseNo'])
    return case_description, case_number

# 특정 디렉토리 내의 모든 JSON 파일로부터 데이터 로딩
def load_cases_from_directory(directory_paths):
    cases = []
    for directory_path in directory_paths:
        for root, _, files in os.walk(directory_path):
            for filename in files:
                if filename.endswith('.json'):
                    file_path = os.path.join(root, filename)
                    case_description, case_number = load_data_from_json(file_path)
                    cases.append((case_description, case_number))
    return cases

# directory_paths는 여러 디렉토리를 포함하는 리스트입니다.
directory_paths = ['./civil',
                   './criminal']
cases_all = load_cases_from_directory(directory_paths)

sentences = [case[0] for case in cases_all]  # 판례 문장들
sentence_embeddings = model.encode(sentences)

from sklearn.metrics.pairwise import cosine_similarity

# 사용자 입력 문장의 임베딩(임의로 설정)
user_input_embedding = model.encode(["B라는 사람을 통해 신축 오피스텔 분양 계약을 했는데, B가 건설사나 신탁회사가 아닌 제3자로서 계약금만 받고 사라져서 분양을 받지 못한 상황. 계약금을 돌려받고 싶지만, B가 연락이 두절되어 돌려받지 못하고 있는 상황."])

# 사용자 입력 문장과 각 판례 문장 간의 코사인 유사도 계산
similarities = cosine_similarity(sentence_embeddings, user_input_embedding.reshape(1, -1))

# 상위 3개 유사한 사건의 인덱스 찾기
top_indices = np.argsort(similarities.flatten())[-3:][::-1]

# 상위 3개 유사한 사건 출력
for idx in top_indices:
    case_no = cases_all[idx][1]  # 사건 번호
    similarity = similarities[idx]  # 유사도
    case_description = cases_all[idx][0]  # 사건 내용
    print(f'CaseNo: {case_no}, Similarity: {similarity}')
    print(f'Case Description: {case_description}\n')
