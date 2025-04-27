from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()
driver.get("http://localhost:4200/")

driver.find_element(By.NAME, "username").send_keys("user")
driver.find_element(By.NAME, "password").send_keys("Password123!")
driver.find_element(By.CSS_SELECTOR, "button.btn.btn-success").click()

time.sleep(2)

dashboard_links = driver.find_elements(By.LINK_TEXT, "Dashboard")

if len(dashboard_links) == 0:
    print("[PASS] Utilizatorul normal NU vede Dashboard-ul (cum trebuie).")
else:
    raise Exception("Utilizatorul normal VEDE Dashboard-ul, dar nu ar trebui!")

driver.quit()
