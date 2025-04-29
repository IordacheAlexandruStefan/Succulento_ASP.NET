from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
import time


service = Service(executable_path="C:\\Users\\Iva\\Downloads\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe")
driver = webdriver.Chrome(service=service)

try:
    driver.get("http://localhost:4200")
    time.sleep(2)

    assert "Succulento" in driver.title 
    print("[PASS] Homepage title verificat.")

    menu_items = [
        ("Shop", "Shop"),
        ("Cart", "Cart"),
        ("Account", "Account")
    ]

    for menu_text, page_text in menu_items:
        try:
            menu_link = driver.find_element(By.LINK_TEXT, menu_text)
            menu_link.click()
            time.sleep(2)

            assert page_text.lower() in driver.page_source.lower() or page_text.lower() in driver.current_url.lower()
            print(f"[PASS] Navigare către {menu_text} OK.")
        except Exception as e:
            print(f"[FAIL] Problema la click pe {menu_text}: {str(e)}")
        finally:
            driver.get("http://localhost:4200")
            time.sleep(2)

finally:
    driver.quit()
