from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
import time

service = Service(executable_path="C:\\Users\\Iva\\Downloads\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe")
driver = webdriver.Chrome(service=service)

try:
    driver.get("http://localhost:4200/account")

    driver.find_element(By.NAME, "username").send_keys("user")
    driver.find_element(By.NAME, "password").send_keys("Password123!")
    driver.find_element(By.CSS_SELECTOR, "button.btn.btn-success").click()

    time.sleep(2)

    driver.find_element(By.LINK_TEXT, "Shop").click()

    time.sleep(2)

    produse = driver.find_elements(By.CSS_SELECTOR, "div.grid-item")

    assert len(produse) > 0, "Nu s-au găsit produse în Shop pentru utilizatorul normal!"

    print("[PASS] Produsele sunt afișate în Shop pentru utilizatorul normal.")

finally:
    driver.quit()
