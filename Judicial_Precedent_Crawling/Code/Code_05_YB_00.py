from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

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

driver = webdriver.Chrome(options=chrome_options)
driver.get('https://glaw.scourt.go.kr/wsjo/panre/sjo050.do#1706146869017')
time.sleep(3)

# Locate the search input field and enter "교통사고"
search_input_selector = '#search > div.input_area_wrap > fieldset > input'
search_input = driver.find_element(By.CSS_SELECTOR, search_input_selector)
search_input.send_keys("교통사고")

# Press Enter to submit the search form or find the search button and click it
search_input.send_keys(Keys.RETURN)
time.sleep(3)

# Your original logic to iterate through search results and navigate through pages
for _ in range(1):  # Navigate through 4 pages
    for i in range(0, 2):  # Iterate through links on the page
        main_window_handle = driver.current_window_handle
        try:
            link_selector = f"#ln{i} > td:nth-child(2) > dl > dt > a:nth-child(1) > strong > strong"
            link = driver.find_element(By.CSS_SELECTOR, link_selector)
            link.click()
            time.sleep(3)

            window_handles = driver.window_handles
            for handle in window_handles:
                if handle != main_window_handle:
                    driver.switch_to.window(handle)
                    break

            elements = driver.find_elements(By.CSS_SELECTOR, "#areaDetail")
            for element in elements:
                print(element.text)

            driver.close()
            driver.switch_to.window(main_window_handle)
            time.sleep(1)

        except Exception as e:
            print(f"Error occurred: {e}")
            driver.switch_to.window(main_window_handle)

    try:
        # Click the next page link
        next_page_link = driver.find_element(By.CSS_SELECTOR, '#tabwrap > div > div > div.tab_util > div.list_option > div > fieldset > p > a:nth-child(3) > img')
        next_page_link.click()
        time.sleep(3)
    except Exception as e:
        print("No more pages or error navigating to the next page.")
        break

# Optionally, close the browser
# driver.quit()