from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import json

# 브라우저 설정
chrome_options = Options()
chrome_options.add_experimental_option("prefs", {
    "profile.default_content_setting_values.popups": 0,
    "profile.default_content_setting_values.notifications": 2,
    "profile.managed_default_content_settings.images": 2,
    "profile.default_content_setting_values.cookies": 2,
    "profile.default_content_setting_values.javascript": 1,
    "profile.default_content_setting_values.plugins": 1,
    "profile.default_content_setting_values.popups": 2,
    "profile.default_content_setting_values.geolocation": 2,
    "profile.default_content_setting_values.media_stream": 2,
})

# 웹드라이버 초기화 및 웹사이트 접속
driver = webdriver.Chrome(options=chrome_options)
driver.get('https://glaw.scourt.go.kr/wsjo/panre/sjo050.do#1706146869017')
time.sleep(1)

# 검색 입력 필드를 찾고 "교통사고" 키워드 입력
search_input_selector = '#search > div.input_area_wrap > fieldset > input'
search_input = driver.find_element(By.CSS_SELECTOR, search_input_selector)
search_input.send_keys("교통")

# 검색 버튼 클릭 또는 엔터 키를 사용하여 검색
search_input.send_keys(Keys.RETURN)
time.sleep(0.5)

# 검색 결과 순회 및 상세 데이터 수집
for _ in range(1):  # 4페이지까지 탐색 (현재 1페이지만 설정)
    for i in range(0, 3):  # 페이지당 링크 탐색 (현재 첫 번째 링크만 설정)
        main_window_handle = driver.current_window_handle
        try:
            link_selector = f"#ln{i} > td:nth-child(2) > dl > dt > a:nth-child(1) > strong > strong"
            link = driver.find_element(By.CSS_SELECTOR, link_selector)
            link.click()
            time.sleep(0.5)

            window_handles = driver.window_handles
            for handle in window_handles:
                if handle != main_window_handle:
                    driver.switch_to.window(handle)
                    break

            bmun_start_h2_tag = driver.find_element(By.XPATH, '//*[@id="bmunStart"]/h2')
            bmun_start_p_tag = driver.find_element(By.XPATH, '//*[@id="bmunStart"]/p')

            split_text = bmun_start_h2_tag.text.split()
            split_text2 = bmun_start_p_tag.text.split('[')

            second_last_element = split_text[-2]
            second_last_element2 = split_text[0]
            second_last_element3 = split_text2[1].rstrip(']')
            second_last_element4 = ' '.join(split_text[1:4])

            # JSON 데이터 구조 생성 및 'info' 섹션에 데이터 추가
            json_data = {
                "info": {
                     "사건번호(caseNo)": second_last_element,
                     "분류이름(caseNm)": second_last_element3,
                     "법원이름(courtNm)": second_last_element2,
                     "판결날짜(judmnAdjuDe)": second_last_element4
                },
                "concerned": {},
                "org": {},
                "disposal": {},
                "mentionedItems": {},
                "assrs": {},
                "facts": {
                    "basisFacts": []
                },
                "dcss": {
                    "courtDcss": []
                },
                "close": {
                    "cnclsns": []
                }
            }

            # 'facts' 및 'close' 섹션에 데이터 추가
            reason_strong_tag = driver.find_element(By.XPATH, '//*[@id="Reason"]')
            parent_p_tag = reason_strong_tag.find_element(By.XPATH, '..')
            following_p_tags_xpath = "following-sibling::p"
            following_p_tags = parent_p_tag.find_elements(By.XPATH, following_p_tags_xpath)

            for p_tag in following_p_tags[:-2]:
                json_data["dcss"]["courtDcss"].append(p_tag.text)

            for p_tag in following_p_tags[-2:]:
                json_data["close"]["cnclsns"].append(p_tag.text)

            # JSON 파일로 저장
            file_name = f"사건번호_{second_last_element}.json"
            with open(file_name, 'w', encoding='utf-8') as file:
                json.dump(json_data, file, ensure_ascii=False, indent=4)

            driver.close()
            driver.switch_to.window(main_window_handle)
            time.sleep(0.1)

        except Exception as e:
            print(f"Error occurred: {e}")
            driver.switch_to.window(main_window_handle)

    try:
        next_page_link = driver.find_element(By.CSS_SELECTOR, '#tabwrap > div > div > div.tab_util > div.list_option > div > fieldset > p > a:nth-child(3) > img')
        next_page_link.click()
        time.sleep(0.5)
    except Exception as e:
        print("No more pages or error navigating to the next page.")
        break

# 필요 시 브라우저 닫기
# driver.quit()