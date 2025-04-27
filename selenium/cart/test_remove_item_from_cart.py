from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
import time
import random

service = Service(executable_path="C:\\Users\\Iva\\Downloads\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe")
driver = webdriver.Chrome(service=service)

try:
    driver.get("http://localhost:4200/account")

    driver.find_element(By.NAME, "username").send_keys("user")
    driver.find_element(By.NAME, "password").send_keys("Password123!")
    driver.find_element(By.CSS_SELECTOR, "button.btn.btn-success").click()

    time.sleep(2)  

    add_buttons = driver.find_elements(By.CLASS_NAME, "add-to-cart-btn")
    for btn in add_buttons[:3]:
        btn.click()
        time.sleep(0.5)

    driver.find_element(By.LINK_TEXT, "Cart").click()
    time.sleep(2)

    remove_buttons = driver.find_elements(By.XPATH, "//button[contains(text(),'Remove')]")

    if not remove_buttons:
        raise Exception("Nu există produse în coș!")

    random.choice(remove_buttons).click()
    time.sleep(1)

    new_remove_buttons = driver.find_elements(By.XPATH, "//button[contains(text(),'Remove')]")
    assert len(new_remove_buttons) == len(remove_buttons) - 1, "Produsul nu a fost șters corect!"

    print("[PASS] Ștergere produs din coș reușită!")

finally:
    driver.quit()
