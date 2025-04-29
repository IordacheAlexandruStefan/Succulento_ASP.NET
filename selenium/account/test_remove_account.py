from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
import time
import random

service = Service(executable_path="C:\\Users\\Iva\\Downloads\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe")
driver = webdriver.Chrome(service=service)

try:
    driver.get("http://localhost:4200/account")
    time.sleep(2)

    register_button = driver.find_element(By.XPATH, "//button[contains(text(),'Register')]")
    register_button.click()
    time.sleep(2)

    random_number = random.randint(1000, 9999)
    username = f"removeuser{random_number}"
    email = f"remove{random_number}@mail.com"
    password = "Password123!"

    driver.find_element(By.NAME, "username").send_keys(username)
    driver.find_element(By.NAME, "email").send_keys(email)
    driver.find_element(By.NAME, "password").send_keys(password)
    driver.find_element(By.NAME, "nume").send_keys("Test")
    driver.find_element(By.NAME, "prenume").send_keys("Remove")
    driver.find_element(By.CSS_SELECTOR, "button.btn.btn-success").click()
    time.sleep(3)

    print(f"[PASS] User {username} creat cu succes.")

    shop_link = driver.find_element(By.LINK_TEXT, "Shop")
    shop_link.click()
    time.sleep(2)

    driver.get("http://localhost:4200/account")
    time.sleep(2)

    username_input = driver.find_element(By.NAME, "username")
    password_input = driver.find_element(By.NAME, "password")
    username_input.send_keys(username)
    password_input.send_keys(password)

    login_button = driver.find_element(By.CSS_SELECTOR, "button.btn.btn-success")
    login_button.click()
    time.sleep(3)

    print("[PASS] Login cu user nou creat reușit.")

    shop_link = driver.find_element(By.LINK_TEXT, "Shop")
    shop_link.click()
    time.sleep(2)

    account_link = driver.find_element(By.LINK_TEXT, "Account")
    account_link.click()
    time.sleep(2)

    remove_account_button = driver.find_element(By.XPATH, "//button[contains(text(),'Remove Account')]")
    remove_account_button.click()
    time.sleep(2)

    alert = driver.switch_to.alert
    print(f"[INFO] Alert primit: {alert.text}")
    alert.accept()
    print("[PASS] Alert de ștergere acceptat.")

    time.sleep(2)

    assert "account" in driver.current_url.lower()
    print("[PASS] User șters cu succes!")

finally:
    driver.quit()
