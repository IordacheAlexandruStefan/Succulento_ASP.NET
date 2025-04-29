from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
import time
import random

service = Service(executable_path="C:\\Users\\Iva\\Downloads\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe")
driver = webdriver.Chrome(service=service)

try:
    driver.get("http://localhost:4200/account")
    time.sleep(2)

    register_button = driver.find_element(By.XPATH, "//button[contains(text(),'Register')]")
    register_button.click()
    time.sleep(2)

    random_number = random.randint(1000, 9999)
    username = f"testuser{random_number}"
    email = f"test{random_number}@mail.com"
    password = "Password123!"
    nume = "Test"
    prenume = "User"

    username_input = driver.find_element(By.NAME, "username")
    email_input = driver.find_element(By.NAME, "email")
    password_input = driver.find_element(By.NAME, "password")
    nume_input = driver.find_element(By.NAME, "nume")
    prenume_input = driver.find_element(By.NAME, "prenume")

    username_input.send_keys(username)
    email_input.send_keys(email)
    password_input.send_keys(password)
    nume_input.send_keys(nume)
    prenume_input.send_keys(prenume)

    submit_button = driver.find_element(By.CSS_SELECTOR, "button.btn.btn-success")
    submit_button.click()
    time.sleep(3)

    page_source = driver.page_source.lower()
    assert "success" in page_source or "created" in page_source
    print(f"[PASS] Register reușit pentru userul {username}!")

finally:
    driver.quit()
