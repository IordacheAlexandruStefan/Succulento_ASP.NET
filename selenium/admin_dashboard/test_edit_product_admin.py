from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import random

driver = webdriver.Chrome()

try:
    driver.get("http://localhost:4200/")

    driver.find_element(By.LINK_TEXT, "Account").click()
    driver.find_element(By.NAME, "username").send_keys("admin")
    driver.find_element(By.NAME, "password").send_keys("Password123!")
    driver.find_element(By.CSS_SELECTOR, "button.btn.btn-success").click()

    time.sleep(1)

    driver.find_element(By.LINK_TEXT, "Dashboard").click()
    time.sleep(1)

    nume_initial = f"TestSucculent{random.randint(1000, 9999)}"
    driver.find_element(By.NAME, "nume").send_keys(nume_initial)
    driver.find_element(By.NAME, "descriere").send_keys("Test description.")
    driver.find_element(By.NAME, "pret").clear()
    driver.find_element(By.NAME, "pret").send_keys("19.99")
    driver.find_element(By.NAME, "urlPoza").send_keys("https://via.placeholder.com/150")
    time.sleep(1)

    driver.find_element(By.CSS_SELECTOR, "button.btn.btn-primary").click()
    time.sleep(1)

    produse = driver.find_elements(By.CSS_SELECTOR, "table")
    produs_gasit = None

    for produs in produse:
        if nume_initial in produs.text:
            produs_gasit = produs
            break

    if not produs_gasit:
        raise Exception(f"Nu am găsit produsul adăugat: {nume_initial}")

    produs_gasit.find_element(By.CSS_SELECTOR, "button.btn.btn-primary").click()
    time.sleep(2)

    input_nume = driver.find_element(By.NAME, "nume")
    input_nume.clear()
    nume_nou = f"New Succulent {nume_initial}"
    input_nume.send_keys(nume_nou)

    driver.find_element(By.CSS_SELECTOR, "button.btn.btn-primary").click()
    time.sleep(2)

    produse_actualizate = driver.find_elements(By.CSS_SELECTOR, "table.table tbody tr")
    found = any(nume_nou in produs.text for produs in produse_actualizate)

    assert found, "Produsul editat NU a fost găsit după salvare!"
    print("[PASS] Produsul a fost editat și salvat corect!")

finally:
    driver.quit()
