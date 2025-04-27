from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

service = Service(executable_path="C:\\Users\\Iva\\Downloads\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe")
driver = webdriver.Chrome(service=service)

try:
    driver.get("http://localhost:4200/account")
    time.sleep(2)
    
    driver.find_element(By.NAME, "username").send_keys("admin")
    driver.find_element(By.NAME, "password").send_keys("Password123!")
    driver.find_element(By.CSS_SELECTOR, "button.btn.btn-success").click()

    WebDriverWait(driver, 10).until(
        EC.url_contains("/shop")
    )
    print("[PASS] Login reușit.")

    add_buttons = driver.find_elements(By.CLASS_NAME, "add-to-cart-btn")
    if add_buttons:
        add_buttons[0].click()
        print("[PASS] Produs adăugat în coș.")
    else:
        raise Exception("Nu am găsit buton cu clasa 'add-to-cart-btn'!")

    time.sleep(1)  

    driver.find_element(By.LINK_TEXT, "Cart").click()

    WebDriverWait(driver, 10).until(
        EC.url_contains("/cart")
    )

    time.sleep(4)

    clear_cart_button = driver.find_element(By.XPATH, "//button[contains(text(),'Clear Cart')]")
    clear_cart_button.click()
    print("[PASS] Buton 'Clear Cart' apăsat.")

    time.sleep(1) 

    total_span = driver.find_element(By.CLASS_NAME, "final-price")
    assert total_span.text.strip() == "$0.00", "Totalul după Clear Cart NU este $0.00!"
    print("[PASS] Coșul a fost golit cu succes.")

finally:
    driver.quit()
