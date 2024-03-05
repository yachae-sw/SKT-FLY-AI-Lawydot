from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import os
import json
import re

# json 파일 형태 설정
json_data = {
    "info": {
        "caseField": "",
        "detailField": "",
        "trailField": "",
        "caseNm": "",
        "courtNm": "",
        "judmnAdjuDe": "",
        "caseNo": "",
        "relateLaword": [],
        "qotatPrcdnt": []
    },
    "concerned": {
        "acusr": "",
        "dedat": ""
    },
    "org": {
        "orgJdgmnCourtNm": "",
        "orgJdgmnAdjuDe": "",
        "orgJdgmnCaseNo": ""
    },
    "disposal": {
        "disposalform": "",
        "disposalcontent": []
    },
    "mentionedItems": {
        "rqestObjet": []
    },
    "assrs": {
        "acusrAssrs": [],
        "dedatAssrs": []
    },
    "facts": {
        "bsisFacts": []
    },
    "dcss": {
        "courtDcss": []
    },
    "close": {
        "cnclsns": []
    }
}

chrome_options = Options()
# 브라우저 설정: 팝업, 알림, 이미지, 쿠키, 자바스크립트 등을 관리
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

# 웹드라이버 초기화 및 웹사이트 접속(상세 검색)
driver = webdriver.Chrome(options=chrome_options)
driver.get('https://glaw.scourt.go.kr/wsjo/panre/sjo060.do')
time.sleep(0.3)

# 상세 검색 찾고 클릭 -> 민사 box 찾아서 클릭
search_box = driver.find_element(By.XPATH, '//*[@id="checkbox3_2"]')
search_box.click()

# 검색 입력 필드를 찾고 "소송" 키워드 입력
keyword = "소송"
legal_subject = "civil"
search_input_selector = '#search > div.input_area_wrap > fieldset > input'
search_input = driver.find_element(By.CSS_SELECTOR, search_input_selector)
search_input.send_keys(keyword)

# 검색 버튼 클릭 또는 엔터 키를 사용하여 검색
search_input.send_keys(Keys.RETURN)
time.sleep(0.7)


# 검색 결과를 순회하고 각 링크를 클릭하여 상세 데이터 수집
cnt = -1
for a in range(9,100):  # 10페이지까지 탐색
    try:
        # 다음 페이지로 이동
        cnt = cnt + 1
        trans_folder_num = int(a) + 1 
        new_value = str(int(trans_folder_num) + 1)
        page_input_path = '//*[@id="tabwrap"]/div/div/div[2]/div[3]/div[2]/div/fieldset/input'
        try:
            input_element = driver.find_element(By.XPATH, page_input_path)
            driver.execute_script(f'arguments[0].value = "{new_value}";', input_element)
            print('페이지 번호: ' + str(trans_folder_num))
        except Exception as e:
            print(f"에러 발생: {e}")

        next_page_link = driver.find_element(By.XPATH, '//*[@id="tabwrap"]/div/div/div[2]/div[3]/div[2]/div/fieldset/a')
        next_page_link.click()
        time.sleep(0.7)
    except Exception as e:
        # print("No more pages or error navigating to the next page.")
        break

    for i in range(0, 20):  # 페이지당 링크 탐색
        main_window_handle = driver.current_window_handle
        try:
            # y 리스트 (1~10) 클릭
            search_box = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.XPATH, f'//*[@id="ln{i}"]/td[2]/dl/dt/a[1]/strong/strong'))
            )
            search_box.click()

            # 새로운 탭으로 전환
            window_handles = driver.window_handles
            for handle in window_handles:
                if handle != main_window_handle:
                    driver.switch_to.window(handle)
                    break
            time.sleep(0.7)
            
            # '//*[@id="bmunStart"]/h2' XPATH를 사용하여 <h2> 태그 찾기
            bmun_start_h2_tag = driver.find_element(By.XPATH, '//*[@id="bmunStart"]/h2')
            bmun_start_p_tag = driver.find_element(By.XPATH, '//*[@id="bmunStart"]/p')

            # 찾은 <h2> 태그의 텍스트를 공백 기준으로 분리
            split_text = bmun_start_h2_tag.text.split()
            split_text2 = bmun_start_p_tag.text.split('[')
            
            # 분리된 리스트에서 뒤에서 두 번째 요소 추출
            origin_caseNm = split_text2[1].split(']')
            data_caseNm = origin_caseNm[0]
            data_courtNm = split_text[0]
            data_judmnAdjuDe = split_text[1] + split_text[2] + split_text[3]
            
            if '선고' in split_text:
                origin_caseNo = split_text[5]
            else:
                origin_caseNo = split_text[4]
            data_caseNo = origin_caseNo.replace(",", "")

            # JSON 파일에 저장 (append)
            json_data = {
                    "info": {
                        "caseField": "",
                        "detailField": "",
                        "trailField": "",
                        "caseNm": data_caseNm,
                        "courtNm": data_courtNm,
                        "judmnAdjuDe": data_judmnAdjuDe,
                        "caseNo": data_caseNo,
                        "relateLaword": [],
                        "qotatPrcdnt": []
                    },
                    "concerned": {
                        "acusr": "",
                        "dedat": ""
                    },
                    "org": {
                        "orgJdgmnCourtNm": "",
                        "orgJdgmnAdjuDe": "",
                        "orgJdgmnCaseNo": ""
                    },
                    "disposal": {
                        "disposalform": "",
                        "disposalcontent": []
                    },
                    "mentionedItems": {
                        "rqestObjet": []
                    },
                    "assrs": {
                        "acusrAssrs": [],
                        "dedatAssrs": []
                    },
                    "facts": {
                        "bsisFacts": []
                    },
                    "dcss": {
                        "courtDcss": []
                    },
                    "close": {
                        "cnclsns": []
                    }
            }
            # json_data["info"]["caseNm"].append(data_caseNm)
            # json_data["info"]["courtNm"].append(data_courtNm)
            # json_data["info"]["judmnAdjuDe"].append(data_judmnAdjuDe)
            # json_data["info"]["caseNo"].append(data_caseNo)
            # time.sleep(0.1)

            # 찾은 <h2> 태그의 텍스트 출력
            # # print('*' * 100)
            # # print('분류이름(caseNm) : ' + split_text2[1].rstrip(']'))
            # # print('법원이름(courtNm) : ' + split_text[0])
            # # print('판결날짜(judmnAdjuDe) : ' + split_text[1] + split_text[2] + split_text[3])
            # # print('사건번호(caseNo) : ' + split_text[-2])
            # # print('*' * 100)

            # # ---- 참조조문 ----
            # # '//*[@id="RefLaw"]' XPATH를 사용하여 <strong> 태그 찾기
            # reason_strong_tag = driver.find_element(By.XPATH, '//*[@id="RefLaw"]')
            # # 해당 <strong> 태그의 부모 <p> 태그 찾기
            # parent_p_tag = reason_strong_tag.find_element(By.XPATH, '..')

            # # 부모 <p> 태그로부터 아래에 있는 모든 <p> 태그들을 찾기 위한 XPATH 정의
            # # 이 XPATH는 현재 <p> 태그 다음에 오는 모든 형제 <p> 태그들을 선택함
            # following_p_tags_xpath = "following-sibling::p"

            # # 현재 <p> 태그 다음에 오는 모든 <p> 태그들을 가져오기
            # following_p_tags = parent_p_tag.find_elements(By.XPATH, following_p_tags_xpath)
            # data_reference = following_p_tags[0].text.split(', ')

            # split_text3 = []
            # for item in data_reference:
            #     # "[숫자]" 패턴을 찾아 제거
            #     pattern = r'\[\d+\]'
            #     cleaned_item = re.sub(pattern, '', item).strip()
                
            #     # " "을 기준으로 문자열 분리
            #     parts = cleaned_item.split(' ', 1)[0]
                
            #     split_text3.append(parts)

            # # print('참조조문(relateLaword) : ')
            # json_data["info"]["relateLaword"] = split_text3

                # # print(data_relateLaword)


            # # ---- 참조판례 ----
            # # XPATH를 사용하여 특정 <p> 태그 찾기
            # p_tag3 = driver.find_element(By.XPATH, '//*[@id="RefCase"]')
            # # 해당 <p> 태그의 부모 <p> 태그 찾기
            # parent_p_tag3 = p_tag.find_element(By.XPATH, '..')
            # # 부모 <p> 태그 바로 아래에 있는 <span> 태그 찾기
            # next_span_tag3 = parent_p_tag3.find_element(By.XPATH, 'following-sibling::span[1]')

            # # <span> 태그의 데이터 크롤링
            # span_data = next_span_tag3.text
            # # print('*' * 100)
            # # print('참조판례(qotatPrcdnt) : ')
            # # print(span_data)
            # json_data["info"]["qotatPrcdnt"].append(next_span_tag3.text)
            # time.sleep(0.5)


            # ---- 판시사항 -> [facts][bsisFacts] ----
            # '//*[@id="JudgementNote"]' XPATH를 사용하여 <strong> 태그 찾기
            Abstract_strong_tag = driver.find_element(By.XPATH, '//*[@id="JudgementNote"]')
            # 해당 <strong> 태그의 부모 <p> 태그 찾기
            parent_p2_tag = Abstract_strong_tag.find_element(By.XPATH, '..')

            # 부모 <p> 태그로부터 위에 있는 모든 <p> 태그들을 찾기 위한 XPATH 정의
            # 이 XPATH는 현재 <p> 태그 다음에 오는 모든 형제 <p> 태그들을 선택함
            following_p_tags2_xpath = "preceding-sibling::p"

            # 현재 <p> 태그 다음에 오는 모든 <p> 태그들을 가져오기
            following_p2_tags = parent_p2_tag.find_elements(By.XPATH, following_p_tags2_xpath)
            time.sleep(0.2)

            # 뒤에서 두 번째 요소까지 슬라이싱하여 각 <p> 태그의 텍스트 출력
            # print('*' * 100)
            # print('판시사항(bsisFacts) : ')
            for p_tag in following_p2_tags[2:-1:3]:
                # print(p_tag.text)
                item_p2_tag = p_tag.text
                pattern = r'\[\d+\]'
                cleaned_item = re.sub(pattern, '', item_p2_tag).strip()

                json_data["facts"]["bsisFacts"].append(cleaned_item)
                time.sleep(0.3)
            
            # ---- 이유 -> dcss ----
            # '//*[@id="Reason"]' XPATH를 사용하여 <strong> 태그 찾기
            reason_strong_tag = driver.find_element(By.XPATH, '//*[@id="Reason"]')
            # 해당 <strong> 태그의 부모 <p> 태그 찾기
            parent_p_tag = reason_strong_tag.find_element(By.XPATH, '..')

            # 부모 <p> 태그로부터 아래에 있는 모든 <p> 태그들을 찾기 위한 XPATH 정의
            # 이 XPATH는 현재 <p> 태그 다음에 오는 모든 형제 <p> 태그들을 선택함
            following_p_tags_xpath = "following-sibling::p"

            # 현재 <p> 태그 다음에 오는 모든 <p> 태그들을 가져오기
            following_p_tags = parent_p_tag.find_elements(By.XPATH, following_p_tags_xpath)
            time.sleep(0.7)
        
            # 첫번째 요소와 마지막 슬라이싱하여 각 <p> 태그의 텍스트 출력
            # print('*' * 100)
            for p_tag in following_p_tags[1:]:
                # print(p_tag.text)\
                item_p2_tag2 = p_tag.text
                pattern2 = r'\(\d+\)'
                cleaned_item2 = re.sub(pattern2, '', item_p2_tag2).strip()
                pattern2_1 = r'\d+\.'
                cleaned_item2_1 = re.sub(pattern2_1, '', cleaned_item2).strip()
                pattern2_2 = r'\w+\.'
                cleaned_item2_2 = re.sub(pattern2_2, '', cleaned_item2_1).strip()
                pattern2_3 = r'\d+\)'
                cleaned_item2_3 = re.sub(pattern2_3, '', cleaned_item2_2).strip()
                pattern2_4 = r'\w+\)'
                cleaned_item2_4 = re.sub(pattern2_4, '', cleaned_item2_3).strip()
                json_data["dcss"]["courtDcss"].append(cleaned_item2_4)
            time.sleep(0.7)

            # print('*' * 100)
            # ---- 주문 -> cnclsns ----
            # '//*[@id="OutCome"]' XPATH를 사용하여 <strong> 태그 찾기
            result_strong_tag = driver.find_element(By.XPATH, '//*[@id="OutCome"]')
            # 해당 <strong> 태그의 부모 <p> 태그 찾기
            parent_p_tag3 = result_strong_tag.find_element(By.XPATH, '..')

            # 부모 <p> 태그로부터 아래에 있는 모든 <p> 태그들을 찾기 위한 XPATH 정의
            # 이 XPATH는 현재 <p> 태그 다음에 오는 모든 형제 <p> 태그들을 선택함
            following_p_tags_xpath3 = "following-sibling::p"

            # 현재 <p> 태그 다음에 오는 모든 <p> 태그들을 가져오기
            following_p_tags3 = parent_p_tag3.find_elements(By.XPATH, following_p_tags_xpath3)
            time.sleep(0.7)

            # 텍스트 가져와서 저장
            
            json_data["close"]["cnclsns"].append(following_p_tags3[0].text)
            
            time.sleep(0.7)

            trans_legaldata_num = str(int(cnt) * 20 + int(i) + 1)
            
            # 저장할 폴더 지정
            folder_path = f'C:/dev/Crawling/Dataset/big/{legal_subject}'
            # 폴더가 존재하지 않는 경우 생성
            if not os.path.exists(folder_path):
                os.makedirs(folder_path)
            # JSON 파일로 저장
            file_name = f"{legal_subject}_{data_caseNo}.json"
            file_path = os.path.join(folder_path, file_name)
            with open(file_path, 'w', encoding='utf-8') as file:
                json.dump(json_data, file, ensure_ascii=False, indent=4)

            print(" coout: " + trans_legaldata_num)
            driver.close()
            driver.switch_to.window(main_window_handle)
            time.sleep(0.7)

        except Exception as e:
            # print(f"Error occurred: {e}")
            driver.close()
            driver.switch_to.window(main_window_handle)
            time.sleep(0.7)

# 필요 시 브라우저 닫기
# driver.quit()