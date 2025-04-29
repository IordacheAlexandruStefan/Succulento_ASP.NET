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

    qty_input = driver.find_element(By.XPATH, "//input[@type='number']")
    qty_input.clear()
    qty_input.send_keys("5")
    qty_input.send_keys("\n")

    time.sleep(2)

    updated_qty = driver.find_element(By.XPATH, "//input[@type='number']").get_attribute("value")
    assert updated_qty == "5", "Cantitatea din coș nu s-a actualizat corect!"

    print("[PASS] Modificarea manuală a cantității a reușit!")

finally:
    driver.quit()
