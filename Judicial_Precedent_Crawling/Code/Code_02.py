from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# 크롬드라이버 실행
driver = webdriver.Chrome()

# 크롬 드라이버에 url 주소 넣고 실행
driver.get('https://bigcase.ai/')

# WebDriverWait를 사용하여 검색어 창이 나타날 때까지 대기
search_box = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.CLASS_NAME, 'search-bar__input'))
)

# 검색어 입력
search_box.send_keys('임대차')
search_box.send_keys(Keys.RETURN)

data = []

for x in range(29) :
    if x != 0 :
        # x 다음페이지 클릭
        search_box = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//*[@id="__next"]/div/div[1]/div[2]/div/div[4]/div/div[3]/a/div/div/svg'))
        )
        search_box.click()
    else :
        pass
    
    for y in range(1, 11) :
        # y 리스트 (1~10) 클릭
        search_box = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, f'//*[@id="__next"]/div/div[1]/div[2]/div/div[3]/article[{y}]'))
        )
        search_box.click()

        # 판례 elements 셀렉트
        dataset_elements = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.XPATH, '//*[@id="__next"]/div/div[1]/div[3]/div/div/div[2]'))
        )

        # 데이터 출력
        for dataset in dataset_elements:
            print(dataset.text)
            # data.append(dataset.text)
        
        search_box = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//*[@id="__next"]/div/div[1]/div[3]/div/div/div[1]/div[2]/button/div/div/svg'))
        )
        search_box.click()
        
# 웹 드라이버 종료
driver.quit()

print(data)