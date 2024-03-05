import pandas as pd
import numpy as np
import torch
from sklearn.model_selection import train_test_split
from transformers import BertTokenizer, BertForSequenceClassification, Trainer, TrainingArguments
from torch.utils.data import Dataset

# 데이터 로드
file_path = './lawsuit_type.csv'  # 데이터셋 경로를 지정하세요.
data = pd.read_csv(file_path, encoding='cp949')

# 데이터 전처리
# 필요한 경우 추가 데이터 전처리를 수행하세요.

# BERT 토크나이저와 모델 로드
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)  # num_labels는 클래스의 개수에 따라 조정하세요.

# 데이터셋 클래스 정의
class LawsuitDataset(Dataset):
    def __init__(self, texts, labels, tokenizer, max_token_len=512):
        self.texts = texts
        self.labels = labels
        self.tokenizer = tokenizer
        self.max_token_len = max_token_len

    def __len__(self):
        return len(self.texts)

    def __getitem__(self, item_index):
        text = self.texts[item_index]
        label = self.labels[item_index]

        encoding = self.tokenizer.encode_plus(
            text,
            add_special_tokens=True,
            max_length=self.max_token_len,
            return_token_type_ids=False,
            padding='max_length',
            truncation=True,
            return_attention_mask=True,
            return_tensors='pt'
        )

        return {
            'input_ids': encoding['input_ids'].flatten(),
            'attention_mask': encoding['attention_mask'].flatten(),
            'labels': torch.tensor(label, dtype=torch.long)
        }

# 데이터셋 준비
X_train, X_val, y_train, y_val = train_test_split(data['Question'], data['Label'], test_size=0.1, random_state=42)
train_dataset = LawsuitDataset(X_train.tolist(), y_train.tolist(), tokenizer)
val_dataset = LawsuitDataset(X_val.tolist(), y_val.tolist(), tokenizer)

# 학습 파라미터 설정
training_args = TrainingArguments(
    output_dir='./results',
    num_train_epochs=3,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=64,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir='./logs',
    logging_steps=10,
)

# 트레이너 생성 및 학습
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=val_dataset
)

trainer.train()

def predict(text):
    inputs = tokenizer(text, padding=True, truncation=True, max_length=512, return_tensors="pt")
    outputs = model(**inputs)
    probs = outputs[0].softmax(1)
    return probs.argmax().item()

new_text = "우리 회사 어떤 직원이 나와의 계약을 어겼어."
print(predict(new_text))