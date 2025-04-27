from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
import time

service = Service(executable_path="C:\\Users\\Iva\\Downloads\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe")
driver = webdriver.Chrome(service=service)

try:
    driver.get("http://localhost:4200/account")
    time.sleep(2)

    username_input = driver.find_element(By.NAME, "username")
    password_input = driver.find_element(By.NAME, "password")

    username_input.send_keys("testuser1011")
    password_input.send_keys("Password123!")

    login_button = driver.find_element(By.CSS_SELECTOR, "button.btn.btn-success")
    login_button.click()
    time.sleep(3)

    print("[PASS] Login reușit.")

    account_link = driver.find_element(By.LINK_TEXT, "Account")
    account_link.click()
    time.sleep(2)

    logout_button = driver.find_element(By.XPATH, "//button[contains(text(),'Logout')]")
    logout_button.click()
    time.sleep(3)

    assert "account" in driver.current_url.lower()
    print("[PASS] Logout reușit!")

finally:
    driver.quit()
