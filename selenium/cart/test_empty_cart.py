from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

service = Service(executable_path="C:\\Users\\Iva\\Downloads\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe")
driver = webdriver.Chrome(service=service)
wait = WebDriverWait(driver, 10)

try:
    driver.get("http://localhost:4200/account")
    time.sleep(2)

    driver.find_element(By.NAME, "username").send_keys("admin")  
    driver.find_element(By.NAME, "password").send_keys("Password123!")
    driver.find_element(By.CSS_SELECTOR, "button.btn.btn-success").click()
    time.sleep(2)

    wait.until(EC.presence_of_element_located((By.LINK_TEXT, "Cart"))).click()
    time.sleep(2)

    total_value = driver.find_element(By.CSS_SELECTOR, "span.final-price").text
    assert "$0.00" in total_value, f"Expected total to be $0.00, but got: {total_value}"
    print("[PASS] Coșul este gol: Total este $0.00.")

finally:
    driver.quit()
