from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
import time

service = Service(executable_path="C:\\Users\\Iva\\Downloads\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe")
driver = webdriver.Chrome(service=service)

try:
    driver.get("http://localhost:4200/")
    time.sleep(1)

    driver.find_element(By.LINK_TEXT, "Account").click()
    time.sleep(1)

    driver.find_element(By.NAME, "username").send_keys("admin")
    driver.find_element(By.NAME, "password").send_keys("Password123!")
    driver.find_element(By.CSS_SELECTOR, "button.btn.btn-success").click()
    time.sleep(2)

    driver.find_element(By.LINK_TEXT, "Shop").click()
    time.sleep(2)

    add_to_cart_buttons = driver.find_elements(By.CSS_SELECTOR, "button.add-to-cart-btn")
    if len(add_to_cart_buttons) == 0:
        raise Exception("Nu există produse cu buton Add to Cart!")

    add_to_cart_buttons[0].click()
    time.sleep(1)

    driver.find_element(By.LINK_TEXT, "Cart").click()
    time.sleep(2)

    produse_in_cart = driver.find_elements(By.CLASS_NAME, "cart-item")
    assert len(produse_in_cart) > 0, "Nu s-a adăugat produsul în coș!"

    print("[PASS] Produs adăugat în coș pentru utilizator admin.")

finally:
    driver.quit()
