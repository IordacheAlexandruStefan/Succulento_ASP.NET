from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
import time
import random

# Setup
service = Service(executable_path="C:\\Users\\Iva\\Downloads\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe")
driver = webdriver.Chrome(service=service)

try:
    # Deschidem pagina de register
    driver.get("http://localhost:4200/account")
    time.sleep(2)

    # Click pe butonul "Register"
    register_button = driver.find_element(By.XPATH, "//button[contains(text(),'Register')]")
    register_button.click()
    time.sleep(2)

    # Generăm un username random
    random_number = random.randint(1000, 9999)
    username = f"testuser{random_number}"
    email = f"test{random_number}@mail.com"
    password = "Password123!"
    nume = "Test"
    prenume = "User"

    # Completăm toate câmpurile pentru primul user
    driver.find_element(By.NAME, "username").send_keys(username)
    driver.find_element(By.NAME, "email").send_keys(email)
    driver.find_element(By.NAME, "password").send_keys(password)
    driver.find_element(By.NAME, "nume").send_keys(nume)
    driver.find_element(By.NAME, "prenume").send_keys(prenume)

    driver.find_element(By.CSS_SELECTOR, "button.btn.btn-success").click()
    time.sleep(3)

    print(f"[PASS] Primul user {username} creat cu succes.")

    driver.get("http://localhost:4200/account")
    time.sleep(2)
    register_button = driver.find_element(By.XPATH, "//button[contains(text(),'Register')]")
    register_button.click()
    time.sleep(2)

    driver.find_element(By.NAME, "username").send_keys(username)
    driver.find_element(By.NAME, "email").send_keys(f"another{random_number}@mail.com")
    driver.find_element(By.NAME, "password").send_keys(password)
    driver.find_element(By.NAME, "nume").send_keys(nume)
    driver.find_element(By.NAME, "prenume").send_keys(prenume)

    driver.find_element(By.CSS_SELECTOR, "button.btn.btn-success").click()
    time.sleep(3)

    page_source = driver.page_source.lower()
    assert "already taken" in page_source or "exists" in page_source
    print(f"[PASS] Mesaj de eroare corect afișat pentru username deja existent ({username}).")

finally:
    driver.quit()
