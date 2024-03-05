# selenium의 webdriver를 사용하기 위한 import
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
# 페이지 로딩을 기다리는데에 사용할 time 모듈 import
import time

# 크롬드라이버 실행
driver = webdriver.Chrome()

# 크롬 드라이버에 url 주소 넣고 실행
driver.get('https://www.kca.go.kr/odr/cm/in/exmplPgItem.do#none')

# WebDriverWait를 사용하여 특정 요소가 나타날 때까지 대기
search_box = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.XPATH, '//*[@id="listForm"]/div[3]/div/div/div[2]/table/tbody/tr[1]/td[2]/a'))
)
search_box.click()

# WebDriverWait를 사용하여 특정 요소가 나타날 때까지 대기
dataset_elements = WebDriverWait(driver, 10).until(
    EC.presence_of_all_elements_located((By.XPATH, '//*[@id="content"]/div'))
)

# 데이터 출력
for dataset in dataset_elements:
    print(dataset.text)

# 웹 드라이버 종료
driver.quit()