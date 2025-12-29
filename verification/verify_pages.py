from playwright.sync_api import sync_playwright
import os

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Get absolute path to src/index.html
    cwd = os.getcwd()
    index_path = f"file://{cwd}/src/index.html"
    map_path = f"file://{cwd}/src/map.html"
    submit_path = f"file://{cwd}/src/submit.html"

    print(f"Navigating to {index_path}")
    page.goto(index_path)
    page.wait_for_selector('.hero') # Wait for hero to ensure styles loaded
    page.screenshot(path="verification/index_screenshot.png")
    print("Captured index_screenshot.png")

    print(f"Navigating to {map_path}")
    page.goto(map_path)
    page.wait_for_selector('#map')
    page.screenshot(path="verification/map_screenshot.png")
    print("Captured map_screenshot.png")

    print(f"Navigating to {submit_path}")
    page.goto(submit_path)
    page.wait_for_selector('form')
    page.screenshot(path="verification/submit_screenshot.png")
    print("Captured submit_screenshot.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
