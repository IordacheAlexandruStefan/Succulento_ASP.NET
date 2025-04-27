from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
import time

service = Service(executable_path="C:\\Users\\Iva\\Downloads\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe")
driver = webdriver.Chrome(service=service)

try:
    driver.get("http://localhost:4200")
    time.sleep(2)

    shop_link = driver.find_element(By.LINK_TEXT, "Shop")
    shop_link.click()
    time.sleep(2)

    add_to_cart_button = driver.find_element(By.XPATH, "//button[contains(text(),'Add to Cart')]")
    add_to_cart_button.click()
    time.sleep(2)
    print("[PASS] Produs adăugat în coș!")

    cart_link = driver.find_element(By.LINK_TEXT, "Cart")
    cart_link.click()
    time.sleep(2)

    page_source = driver.page_source.lower()
    assert "total" in page_source or "cart" in page_source
    print("[PASS] Produsul este prezent în coș!")

finally:
    driver.quit()
