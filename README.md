# [Pantry Profiler](http://pantryprofiler.missouri.edu)

IT4970W - Senior Capstone Design (Writing Intensive)

Andrew Kim, Amanuel Hailemariam, Blake Miller, Mackenna Hale, Haley Williams

## Introduction

Pantry Profiler is a web application hosted database for managing stock and inventory of common items and emergency food packs. It's designed as an inventory management tool for Tiger Pantry to increase efficiency and enhance overall operations. This README provides comprehensive instructions and guidance for administering and using Pantry Profiler, with a particular focus on the features and functionality.

## Usage

**Sign In:** Users must sign in using their umsytem.edu credentials. Attempts to sign in with domains other than umsystem.edu will be rejected.

**Home:** The home page displays the main menu options: Pantry, Emergency Packs, Admin. Selecting these options will navigate the user to their respective pages. The user can navigate using either the navigation bar or the fields below. The "Request E-Pack" option provides quick access for emergency pack locations to notify Tiger Pantry directors of their low stock quantity. The home page also displays a quick view of all locations that need EPacks. Locations that appear in this display have a current quantity of 0.

**Emergency Packs:** By selecting Emergency Packs the user will navigate to the Emergency Food Pack Menu page. Here the user has the option to select between E-Pack Locations and Update E-Packs.

**Emergency Pack Locations:** Selecting Emergency Pack Locations will navigate the user to the Emergency Pack Locations page. Here the user will view a display of all Emergency Pack Locations and their current quantity. Those users belonging to the ‘admin’ or ‘epack’ group have the ability to update the quantity for its respective location. To update the quantity the user will click the current quantity. Here the user can use the UP/DOWN arrows to add to or subtract from, or delete the entry and type in the updated quantity using the keypad. Once the user is satisfied with the input, scroll to the bottom and hit the submit button. Once clicked, a “ change successful” message will pop up.

**Update E-Pack:** By selecting Update EPack the user will navigate to the Update Emergency Food Packs page. Here the user has the ability to select an emergency pack location from the drop down menu by selecting the down arrow in the "Select EPack'' field. Once the location is selected, the user will enter their current on hand quantity of emergency food packs. Once complete, selecting "Update" will add the new on hand quantity to the emergency pack location. Updates made in the Update Epack page can be viewed in the E-Pack Locations page.

**Pantry:** All of the Pantry pages are restricted to those with either Admin or Volunteer privileges. By selecting Pantry the user will navigate to the Pantry Menu page. Here the user has the option to select between Low In Stock, Current Inventory, and Update Inventory.

**Low in Stock:** Selecting Low In Stock will navigate the user to the Pantry Low In Stock page. Here the user can view the Item Name and Quantity for items that have 5 or less items left in stock.

**Current Inventory:** Selecting Current Inventory will navigate the user to the Pantry Current Inventory page. Here the user will view a display of the current inventory of all items and their current quantity. Those users belonging to the admin or volunteer group have the ability to update the quantity for its respective item. To update the quantity the user will click the current quantity. Here the user can use the UP/DOWN arrows to add to or subtract from, or delete the entry and type in the updated quantity using the keypad. Once the user is satisfied with the input, scroll to the bottom and hit the submit button. Once clicked, a “change successful” message will pop up.

**Pantry Update:** By selecting Pantry Update the user will navigate to the Pantry Update page. Here the user has the ability to select an item from the drop down menu by selecting the down arrow in the "Select Item" field. Once the item is selected, the user will enter their current on hand quantity of the selected item. Once complete, selecting "Update" will add the new on hand quantity to the current inventory. Updates made in the Pantry Update page can be viewed in the Current Inventory page.

**Admin:** The Admin page is restricted to those with Admin privileges. Here, administrators can add new users, delete current users, and modify current users privileges. There are three groups consisting of ‘admin’, ‘volunteer’, and ‘epack’. Those in the Admin group have complete and unrestricted access throughout the entire application. Those belonging to the Volunteer group have access to the entire application excluding the Admin page. Those belonging to the Epack group have restricted access to only the Emergency Pack pages.

## Build/Deployment Requirements

-   Unix-based OS to build

    -   Docker
    -   Frontend Packages
        -   node 20
        -   @react-oauth/google: ^0.12.1
        -   @testing-library/jest-dom: ^5.17.0
        -   @testing-library/react: ^13.4.0
        -   @testing-library/user-event: ^13.5.0
        -   axios: ^1.6.2
        -   jsonwebtoken: ^9.0.2
        -   jwt-decode: ^4.0.0
        -   react: ^18.2.0
        -   react-dom: ^18.2.0
        -   react-router-dom: ^6.20.1
        -   react-scripts: 5.0.1
        -   react-select: ^5.8.0
        -   react-toastify: ^9.1.3
        -   reactjs-popup: ^2.0.6
        -   web-vitals: ^2.1.4

-   Backend Packages

    -   node 20
    -   bcyrpt ^5.1.1
    -   express ^4.18.2
    -   jsonwebtoken ^9.0.2"
    -   jwt-decode ^4.0.0"
    -   mssql: ^10.0.1"

-   Config/Secrets
    -   Frontend Config:
        -   `/frontend/src/config.json`
            ```
            {
                "API_URL":  "[REPLACE_WITH_API_URL]/api"
            }
            ```
        -   Backend Secrets:
            -   This GitHub repository is set up with GitHub Secrets, which will be set as environment variables when building via GitHub Actions. However, if building locally, uncomment the dbConfig line in /backend/api/api.js:
            -   `/backend/api/dbConfig.js`
                ```
                module.exports = {
                    server: "[REPLACE_WITH_SERVER_URL]",
                    database: "[REPLACE_WITH_DB_NAME]",
                    user: "[REPLACE_WITH_USERNAME]",
                    password: "[REPLACE_WITH_PASSWORD]",
                };
                ```
            -   Hosting
                -   GitHub Actions autobuilds any push/merge into main and pushes the built containers to the repo’s container registry. Alternatively, build locally using the Dockerfiles.
                -   Can deploy these containers anywhere (e.g., Azure Container Instances, on an on-prem server, etc.)

## How to Run (for development)

1. Ensure requirements above are met
2. GitHub Actions autobuilds any push/merge into main and pushes the built containers to the repo’s container registry. Alternatively, build locally using the Dockerfiles.
3. Deploy these containers (e.g., Azure Container Instances, on an on-prem server, etc.)
4. Visit container’s URL
5. See Usage section for more details about navigation and functionality

## How to Run (live production)

1. Visit [pantryprofiler.missouri.edu](pantryprofiler.missouri.edu) from a browser.
2. See Usage section for more details about navigation and functionality
