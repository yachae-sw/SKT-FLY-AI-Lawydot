# Crawling
## ⚙️개발환경
 - Python
   - Library: selenium, webdriver, expected_condition

## 🚩과정
 - [대한민국 법원 종합법률정보](https://glaw.scourt.go.kr/wsjo/panre/sjo060.do)
 - "F12" 키 또는 'Ctrl + Shift + C'를 사용하여 크롤링하려는 부분을 직접 선택하면, 오른쪽 콘솔 창에 파란색으로 표시됩니다.<img width="1128" alt="판례_html" src="https://github.com/yachae-sw/AI-Python-base/assets/93850398/28723e1b-39cc-432c-97c8-d27d6142cc42">
 - JSON 형태
```PYTHON
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
```
