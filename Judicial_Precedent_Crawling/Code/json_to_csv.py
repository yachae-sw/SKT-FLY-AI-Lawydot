import json
import csv
import os

# CSV 파일을 작성할 경로 및 헤더
output_file_path = "C:/dev/project/Crawling/Dataset/civil_affairs/law.csv"
csv_header = ["fact_one", "caseNm", "courtNm", "judmnAdjuDe" ,"caseNo"]

# JSON 파일이 있는 폴더 경로
law_folder_path = "C:/dev/project/Crawling/Dataset/civil_affairs/law/0"

# 함수를 정의하여 JSON 파일에서 데이터를 읽고 CSV 파일에 작성하는 과정을 재사용할 수 있습니다.
def write_json_to_csv(json_folder):
    json_files = []
    for filename in os.listdir(json_folder):
        if filename.endswith(".json"):
            json_files.append(os.path.join(json_folder, filename))
    
    with open(output_file_path, mode="a", newline="") as file:
        writer = csv.writer(file)
        cnt = 0
        for json_file in json_files:
            with open(json_file, "r", encoding="utf-8") as json_data:
                data = json.load(json_data)
                bsisFacts = data["facts"]["bsisFacts"]
                caseNm = data["info"]["caseNm"]
                courtNm = data["info"]["courtNm"]
                judmnAdjuDe = data["info"]["judmnAdjuDe"]
                caseNo = data["info"]["caseNo"]

                fact_one = ["".join(bsisFacts)][0]

                writer.writerow([fact_one, caseNm, courtNm, judmnAdjuDe ,caseNo])
                cnt += 1
                print(cnt)

# CSV 파일을 생성하기 전에 파일을 초기화합니다.
with open(output_file_path, mode="w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(csv_header)

# 민사 부분을 CSV 파일에 작성합니다.
write_json_to_csv(law_folder_path)

print("CSV 파일이 생성되었습니다.")
