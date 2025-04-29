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

    driver.find_element(By.NAME, "username").send_keys("admin") 
    driver.find_element(By.NAME, "password").send_keys("Password123!")
    driver.find_element(By.CSS_SELECTOR, "button.btn.btn-success").click()
    time.sleep(2)

    wait.until(EC.presence_of_element_located((By.LINK_TEXT, "Account"))).click()
    time.sleep(2)

    driver.find_element(By.NAME, "nume").clear()
    driver.find_element(By.NAME, "nume").send_keys("NumeNouTest")

    driver.find_element(By.NAME, "prenume").clear()
    driver.find_element(By.NAME, "prenume").send_keys("PrenumeNouTest")

    driver.find_element(By.NAME, "email").clear()
    driver.find_element(By.NAME, "email").send_keys("emailnou@test.com")

    driver.find_element(By.CSS_SELECTOR, "button.btn.btn-success").click()

    alert = wait.until(EC.alert_is_present())
    assert "user updated successfully" in alert.text.lower(), "Mesajul din alertă NU este cel așteptat!"
    print(f"[INFO] Alertă primită: {alert.text}")
    alert.accept()
    print("[PASS] Alertă acceptată după editare cont.")

    time.sleep(1)

    updated_nume = driver.find_element(By.NAME, "nume").get_attribute("value")
    updated_prenume = driver.find_element(By.NAME, "prenume").get_attribute("value")
    updated_email = driver.find_element(By.NAME, "email").get_attribute("value")

    assert updated_nume == "NumeNouTest", "Numele NU s-a actualizat corect!"
    assert updated_prenume == "PrenumeNouTest", "Prenumele NU s-a actualizat corect!"
    assert updated_email == "emailnou@test.com", "Emailul NU s-a actualizat corect!"

    print("[PASS] Editare cont realizată cu succes!")

finally:
    driver.quit()
