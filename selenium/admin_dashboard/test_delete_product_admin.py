from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import random

driver = webdriver.Chrome()
driver.get("http://localhost:4200/")

driver.find_element(By.NAME, "username").send_keys("admin")
driver.find_element(By.NAME, "password").send_keys("Password123!")
driver.find_element(By.CSS_SELECTOR, "button.btn.btn-success").click()

time.sleep(2)

driver.find_element(By.LINK_TEXT, "Dashboard").click()
time.sleep(2)

random_number = random.randint(1000, 9999)
nume_produs = f"TestDeleteSucculent{random_number}"

driver.find_element(By.NAME, "nume").send_keys(nume_produs)
driver.find_element(By.NAME, "descriere").send_keys("Test description for delete.")
driver.find_element(By.NAME, "pret").send_keys("29.99")
driver.find_element(By.NAME, "urlPoza").send_keys("https://via.placeholder.com/150")
driver.find_element(By.CSS_SELECTOR, "button.btn.btn-primary").click()

time.sleep(2)

produse = driver.find_elements(By.CSS_SELECTOR, "table.table tbody tr")

produs_gasit = False

for produs in produse:
    nume = produs.find_elements(By.TAG_NAME, "td")[0].text
    if nume == nume_produs:
        produs.find_element(By.CSS_SELECTOR, "button.btn.btn-danger").click()
        produs_gasit = True
        break

if not produs_gasit:
    raise Exception("Nu am găsit produsul creat pentru ștergere!")

time.sleep(1)
alert = driver.switch_to.alert
print(f"[INFO] Alerta primită: {alert.text}")
alert.accept()

time.sleep(2)

produse_dupa_delete = driver.find_elements(By.CSS_SELECTOR, "table.table tbody tr")
for produs in produse_dupa_delete:
    nume = produs.find_elements(By.TAG_NAME, "td")[0].text
    if nume == nume_produs:
        raise Exception("Produsul nu a fost șters corect!")

print(f"[PASS] Produsul {nume_produs} a fost șters corect!")

driver.quit()
