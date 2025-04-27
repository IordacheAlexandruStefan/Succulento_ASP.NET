from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
import time

service = Service(executable_path="C:\\Users\\Iva\\Downloads\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe")  # modifică calea corectă!

driver = webdriver.Chrome(service=service)

try:
    driver.get("http://localhost:4200")
    
    time.sleep(3)
    
    assert "Succulento" in driver.title
    
    print("Test PASSED!")
finally:
    driver.quit()
