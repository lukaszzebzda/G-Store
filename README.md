# Project G-Store

The purpose of the project was to create a web implementation of video game digital distribution service.

## Table of Contents

- [General Informations](#general-information)
- [Screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [ERD Schema](#erd-schema)
- [Room for Improvement](#room-for-improvement)

## General Information

The main goal of project was to create an online video game store. In the app, the user can create an account and then, after logging in, purchase any game that their budget allows. After purchasing each item, user will receive a confirmation of purchase via email. There is also a library where all the games purchased by the user are available. The second type of account is an account with the status of admin, which entitles the user to use the admin panel, which in turn allows the modification of products and categories. The project uses various technics like procedures and trigers from Oracle database, or xampp mail server.

## Screenshots

<p float="left">
<img src="/readMeImages/main_menu_screen.png" alt="Main menu" width="410">
<img src="/readMeImages/registration_screen.png" alt="Registration screen" width="410">
<img src="/readMeImages/login_screen.png" alt="Login screen" width="410">
<img src="/readMeImages/shop_screen.png" alt="Shop screen" width="410">
<img src="/readMeImages/game_details_screen.png" alt="Game details" width="410">
<img src="/readMeImages/ratings_comments_screen.png" alt="Ratings and comments" width="410">
<img src="/readMeImages/admin_items_screen.png" alt="Admin - items" width="410">
<img src="/readMeImages/admin_categories_screen.png" alt="Admin - categories" width="410">
</p>

## Features

- Login and Registration.
- Ratings and commenting on games.
- Sending purchase confirmation emails.
- Games purchased by user are shown in his library.
- Administration of games and categories.

## Tech Stack

- Angular 9.1.9
- Oracle Database 18c Enterprise Edition
- php
- Bulma
- Angular Materials

## ERD Schema

![ERD Schema](/readMeImages/erd_schema.png)

- _Przedmioty_ - Stores data on games available in the store
- _Uzytkownicy_ - Users with their data registered in the app
- _Transakcje_ - Information about transactions made in the app
- _Oceny_ - Stores Ratings of games
- _Biblioteki_ - Stores records of user owned games
- _Kategorie_ - Categories of games

## Room for Improvement

- Sending of registration confirmation emails
- Searching game by title
- Light/Dark theme toggle

## Contact

Created by Łukasz Zebzda

Contact: zeblukasz@gmail.com
