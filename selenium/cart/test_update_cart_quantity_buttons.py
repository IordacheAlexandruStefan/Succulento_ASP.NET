from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
import time

service = Service(executable_path="C:\\Users\\Iva\\Downloads\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe")
driver = webdriver.Chrome(service=service)

try:
    driver.get("http://localhost:4200/account")

    driver.find_element(By.NAME, "username").send_keys("user")
    driver.find_element(By.NAME, "password").send_keys("Password123!")
    driver.find_element(By.CSS_SELECTOR, "button.btn.btn-success").click()

    time.sleep(2)

    add_buttons = driver.find_elements(By.CLASS_NAME, "add-to-cart-btn")
    if not add_buttons:
        raise Exception("Nu există produse de adăugat!")
    add_buttons[0].click()
    time.sleep(1)

    driver.find_element(By.LINK_TEXT, "Cart").click()
    time.sleep(2)

    plus_button = driver.find_element(By.XPATH, "//button[contains(text(),'+')]")
    plus_button.click()
    plus_button.click()
    time.sleep(1)

    qty_input = driver.find_element(By.XPATH, "//input[@type='number']")
    qty_value = qty_input.get_attribute("value")
    assert qty_value == "3", "Cantitatea nu a crescut corect după '+'!"

    minus_button = driver.find_element(By.XPATH, "//button[contains(text(),'-')]")
    minus_button.click()
    time.sleep(1)

    qty_value_after = qty_input.get_attribute("value")
    assert qty_value_after == "2", "Cantitatea nu a scăzut corect după '-'!"

    print("[PASS] Control cantitate cu '+' și '-' reușit!")

finally:
    driver.quit()
