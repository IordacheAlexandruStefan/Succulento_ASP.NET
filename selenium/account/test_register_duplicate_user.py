from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import random

service = Service(executable_path="C:\\Users\\Iva\\Downloads\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe")
driver = webdriver.Chrome(service=service)
wait = WebDriverWait(driver, 10)

try:
    driver.get("http://localhost:4200/account")
    time.sleep(2)

    register_button = driver.find_element(By.XPATH, "//button[contains(text(),'Register')]")
    register_button.click()
    time.sleep(2)

    random_number = random.randint(1000, 9999)
    username = f"testduplicate{random_number}"
    email = f"test{random_number}@mail.com"
    password = "Password123!"

    driver.find_element(By.NAME, "username").send_keys(username)
    driver.find_element(By.NAME, "email").send_keys(email)
    driver.find_element(By.NAME, "password").send_keys(password)
    driver.find_element(By.NAME, "nume").send_keys("Duplicate")
    driver.find_element(By.NAME, "prenume").send_keys("Test")
    driver.find_element(By.CSS_SELECTOR, "button.btn.btn-success").click()
    time.sleep(3)

    print(f"[PASS] Primul user {username} creat cu succes.")

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

    print("[PASS] Login după creare user.")

    shop_link = driver.find_element(By.LINK_TEXT, "Shop")
    shop_link.click()
    time.sleep(2)

    account_link = driver.find_element(By.LINK_TEXT, "Account")
    account_link.click()
    time.sleep(2)

    logout_button = driver.find_element(By.XPATH, "//button[contains(text(),'Logout')]")
    logout_button.click()
    time.sleep(3)

    print("[PASS] Logout făcut cu succes.")

    register_button = driver.find_element(By.XPATH, "//button[contains(text(),'Register')]")
    register_button.click()
    time.sleep(2)

    driver.find_element(By.NAME, "username").send_keys(username)
    driver.find_element(By.NAME, "email").send_keys(f"duplicate{random_number}@mail.com")
    driver.find_element(By.NAME, "password").send_keys(password)
    driver.find_element(By.NAME, "nume").send_keys("Duplicate2")
    driver.find_element(By.NAME, "prenume").send_keys("Test2")
    driver.find_element(By.CSS_SELECTOR, "button.btn.btn-success").click()

    error_message_element = wait.until(
        EC.visibility_of_element_located((By.XPATH, "//div[contains(@class, 'error-message') and contains(text(), 'Username is already taken')]"))
    )
    error_message = error_message_element.text

    assert "Username is already taken" in error_message, "Mesajul 'Username is already taken.' nu a fost găsit!"
    print("[PASS] Mesajul de eroare 'Username is already taken.' a fost afișat corect.")

finally:
    driver.quit()
