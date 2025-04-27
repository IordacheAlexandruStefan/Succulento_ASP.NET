from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Setup
service = Service(executable_path="C:\\Users\\Iva\\Downloads\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe")
driver = webdriver.Chrome(service=service)
wait = WebDriverWait(driver, 10)

try:
    driver.get("http://localhost:4200/account")
    time.sleep(2)

    driver.find_element(By.NAME, "username").send_keys("userinexistent12345")
    driver.find_element(By.NAME, "password").send_keys("Password123!")
    driver.find_element(By.CSS_SELECTOR, "button.btn.btn-success").click()

    error_message_element = wait.until(
        EC.visibility_of_element_located((By.XPATH, "//div[contains(@class, 'error-message')]"))
    )
    error_message = error_message_element.text

    assert "wrong" in error_message.lower(), "Mesajul de eroare pentru login invalid NU a fost găsit!"
    print("[PASS] Mesajul de eroare pentru login invalid a fost afișat corect.")

finally:
    driver.quit()
