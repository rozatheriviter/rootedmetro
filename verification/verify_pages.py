from playwright.sync_api import sync_playwright
import os

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Get absolute path to index.html
    cwd = os.getcwd()
    index_path = f"file://{cwd}/src/index.html"
    submit_path = f"file://{cwd}/src/submit.html"
    mapped_path = f"file://{cwd}/src/mapped.html"

    print(f"Navigating to {index_path}")
    page.goto(index_path)

    # Check for Nav
    nav_links = page.query_selector_all(".main-nav a")
    print(f"Found {len(nav_links)} nav links")
    if len(nav_links) != 3:
        print("Error: Expected 3 nav links in index.html")

    # Check for Print Button
    print_btn = page.query_selector("button.btn-outline")
    if print_btn and "Print Resources" in print_btn.inner_text():
        print("Print button found")
    else:
        print("Error: Print button not found")

    # Screenshot Index
    page.screenshot(path="verification/index_screenshot.png")

    # Navigate to Submit page
    print(f"Navigating to {submit_path}")
    page.goto(submit_path)

    # Check form exists
    form = page.query_selector("form.submit-form")
    if form:
        print("Submit form found")
    else:
        print("Error: Submit form not found")

    # Screenshot Submit
    page.screenshot(path="verification/submit_screenshot.png")

    # Navigate to Mapped page
    print(f"Navigating to {mapped_path}")
    page.goto(mapped_path)

    # Check map container
    map_div = page.query_selector("#map")
    if map_div:
        print("Map container found")
    else:
        print("Error: Map container not found")

    # Screenshot Map
    page.screenshot(path="verification/map_screenshot.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
