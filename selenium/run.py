import subprocess
import os

def run_tests_from_folder(folder_name):
    folder_path = os.path.join(os.path.dirname(__file__), folder_name)
    for filename in os.listdir(folder_path):
        if filename.endswith(".py"):
            filepath = os.path.join(folder_path, filename)
            print(f"\n[RUNNING] {filepath}")
            subprocess.run(["python", filepath], check=True)

if __name__ == "__main__":
    print("Ce vrei să rulezi? (all / account / admin_dashboard / cart / shop)")
    optiune = input("> ").strip().lower()

    if optiune == "all":
        for folder in ["account", "admin_dashboard", "cart", "shop"]:
            run_tests_from_folder(folder)
    elif optiune in ["account", "admin_dashboard", "cart", "shop"]:
        run_tests_from_folder(optiune)
    else:
        print("Opțiune invalidă! Alege dintre: all / account / admin_dashboard / cart / shop.")
