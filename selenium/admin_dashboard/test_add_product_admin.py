from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import random

driver = webdriver.Chrome()
driver.get("http://localhost:4200/")

driver.find_element(By.LINK_TEXT, "Account").click()
driver.find_element(By.NAME, "username").send_keys("admin")
driver.find_element(By.NAME, "password").send_keys("Password123!")
driver.find_element(By.CSS_SELECTOR, "button.btn.btn-success").click()


time.sleep(3)

driver.find_element(By.LINK_TEXT, "Dashboard").click()
time.sleep(3)

nume_random = f"TestSucculent{random.randint(1000, 9999)}"
driver.find_element(By.NAME, "nume").send_keys(nume_random)
driver.find_element(By.NAME, "descriere").send_keys("Test description.")
driver.find_element(By.NAME, "pret").clear()
driver.find_element(By.NAME, "pret").send_keys("19.99")
driver.find_element(By.NAME, "urlPoza").send_keys("https://via.placeholder.com/150")

driver.find_element(By.CSS_SELECTOR, "button.btn.btn-primary").click()

time.sleep(2)

produse = driver.find_elements(By.CSS_SELECTOR, "table")
gasit = False
for produs in produse:
    if nume_random in produs.text:
        gasit = True
        break

assert gasit, "Produsul nou NU a fost găsit în lista de produse!"
print("[PASS] Produs adăugat corect în Dashboard!")

driver.quit()
