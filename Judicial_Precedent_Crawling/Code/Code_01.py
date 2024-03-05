import requests
from bs4 import BeautifulSoup

url = 'https://bigcase.ai/search/case?q=%EC%9E%84%EB%8C%80%EC%B0%A8&page=1'

# 웹페이지에 요청을 보내고 HTML을 가져옴
response = requests.get(url)
html_content = response.text

print(html_content)

# # BeautifulSoup을 사용하여 HTML을 파싱
# soup = BeautifulSoup(html_content, 'html.parser')

# # 특정 선택자를 사용하여 텍스트 데이터 추출
# selector = '#__next > div > div.layout.layout--scrolled.css-2e6cdx > div.layout__content > div > div.page-search-list__list-wrap > article:nth-child(1) > div > div.search-list-card__body-wrap'
# text_data = soup.select_one(selector).text

# # 결과 출력
# print(text_data)
