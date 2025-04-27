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
    username = f"invalidpass{random_number}"
    email = f"invalid{random_number}@mail.com"
    weak_password = "abc"

    driver.find_element(By.NAME, "username").send_keys(username)
    driver.find_element(By.NAME, "email").send_keys(email)
    driver.find_element(By.NAME, "password").send_keys(weak_password)
    driver.find_element(By.NAME, "nume").send_keys("Invalid")
    driver.find_element(By.NAME, "prenume").send_keys("Password")
    driver.find_element(By.CSS_SELECTOR, "button.btn.btn-success").click()

    error_message_element = wait.until(
        EC.visibility_of_element_located((By.XPATH, "//div[contains(@class, 'error-message') and contains(text(), 'Password must contain')]"))
    )
    error_message = error_message_element.text

    assert "Password must contain" in error_message, "Mesajul de eroare pentru parolă slabă NU a fost găsit!"
    print("[PASS] Mesajul de eroare pentru parolă slabă a fost afișat corect.")

finally:
    driver.quit()
