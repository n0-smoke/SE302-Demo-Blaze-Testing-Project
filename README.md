# Project for SE302 (Software testing and maintenance)
## Project title and description
The title of this project is **"Demo Blaze Testing using Playwright"**.
This repository contains automated tests for the website [Demo Blaze](https://www.demoblaze.com/) using Playwright and Page Object Model (POM). It includes 15 test cases (5 smoke and 10 normal tests) validating core features like login, search, cart, and checkout. Tests run in headless mode across Chromium, Firefox, and WebKit.
## Team members
- Nađa Mutapčić
- Adna Kikanović
- Dejan Šućur
- Ammar Omerika
- Nedim Redžović
- Hamza Ramović
## Setup instructions
1. Have Visual Studio Code installed
2. Run Visual Studio Code as administrator
3. Create and open a folder where you will clone this repository
4. Open the terminal in Visual Studio Code (make sure the terminal opened is command prompt, and not powershell or other terminals)
5. Run the following comman to clone the git repository
> `git clone https://github.com/n0-smoke/SE302-Demo-Blaze-Testing-Project.git`
7. Open the repository folder with the following command
> `cd SE302-Demo-Blaze-Testing-Project`
8. Create the node modules folder and installed all dependencies and nodes using
> `npm install`
9. Run the playwrigth tests using
> `npx playwright test`
10. Create a localhost server showing the report with this command
> `npx playwright show-report`
11. The terminal will create this report, and give you the link on which you will click to open the report in your browser
