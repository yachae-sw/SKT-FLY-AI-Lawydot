import pandas as pd
from transformers import ElectraTokenizer, ElectraForSequenceClassification, Trainer, TrainingArguments
from torch.utils.data import Dataset, DataLoader
import torch

# Check if GPU is available
device = 'cuda' if torch.cuda.is_available() else 'cpu'

# File loading might need to be adjusted if running in a different environment than originally specified
file_path = 'C:/dev/project/classification/reduced_lawsuit_type.csv'  # Make sure to update this to the correct path
data = pd.read_csv(file_path, encoding='UTF-8')  # Adjust encoding if necessary

class LawsuitDataset(Dataset):
    def __init__(self, texts, labels, tokenizer, max_len):
        self.texts = texts
        self.labels = labels
        self.tokenizer = tokenizer
        self.max_len = max_len

    def __len__(self):
        return len(self.texts)

    def __getitem__(self, item):
        text = str(self.texts[item])
        label = self.labels[item]

        encoding = self.tokenizer.encode_plus(
          text,
          add_special_tokens=True,
          max_length=self.max_len,
          return_token_type_ids=False,
          padding='max_length',
          return_attention_mask=True,
          return_tensors='pt',
          truncation=True
        )

        return {
          'text': text,
          'input_ids': encoding['input_ids'].flatten().to(device),
          'attention_mask': encoding['attention_mask'].flatten().to(device),
          'labels': torch.tensor(label, dtype=torch.long).to(device)
        }

MAX_LEN = 128
BATCH_SIZE = 32
tokenizer = ElectraTokenizer.from_pretrained("google/electra-small-discriminator")

ds = LawsuitDataset(
    texts=data['Question'].to_numpy(),
    labels=data['Label'].to_numpy(),
    tokenizer=tokenizer,
    max_len=MAX_LEN
)
model = ElectraForSequenceClassification.from_pretrained("google/electra-small-discriminator", num_labels=data['Label'].nunique())
model.to(device)  # Move model to GPU if available

training_args = TrainingArguments(
    output_dir='./model_results',  # 필요에 따라 경로 조정
    num_train_epochs=5,
    per_device_train_batch_size=4,
    per_device_eval_batch_size=4,
    warmup_steps=500,
    weight_decay=0.1,
    logging_dir='./logs',  # 필요에 따라 경로 조정
    logging_steps=10,
)


trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=ds,
    # eval_dataset could be added here if you have a dataset for evaluation
)


trainer.train()

def predict(text):
    model.eval()  # Put model in evaluation mode
    inputs = tokenizer(text, padding=True, truncation=True, max_length=MAX_LEN, return_tensors="pt").to(device)
    with torch.no_grad():
        outputs = model(**inputs)
    probs = outputs[0].softmax(1)
    return probs.argmax().item()

new_text = "사람을 찔렀습니다."
predict(new_text)
