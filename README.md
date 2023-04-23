## This repository is archived
This repository is no longer actively maintained or updated. The code is left here as a reference or for historical purposes.

# Transtar VTL Bus Ticket Availability Web Scraper
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

This is a web scraper built with NodeJS and Puppeteer that scrapes the Transtar website for VTL bus ticket availability. It automates the process of checking for available tickets and provides the user with real-time updates on ticket availability.

## What is VTL?
The Vaccinated Travel Lane (VTL) between Singapore and Malaysia was first announced in October 2021 as part of efforts to facilitate cross-border travel for fully vaccinated individuals during the COVID-19 pandemic. The VTL scheme allows eligible travellers to enter each country without the need for quarantine. [Read More](https://www.pmo.gov.sg/Newsroom/Singapore-and-Malaysia-to-launch-VTL-Land-Nov-2021).

## Features
- Scrapes Transtar website for VTL ticket availability
- Provides real-time updates on ticket availability
- Automates the process of checking for available tickets
- Sends email/sms notifications when new tickets become available

## Example
<img src="https://raw.githubusercontent.com/ycluis/VTL-availability-check/main/sample/email_sample.png"  width="50%" height="30%">
<img src="https://raw.githubusercontent.com/ycluis/VTL-availability-check/main/sample/sms_sample.jpeg"  width="50%" height="30%">

## Usage
1. Install NodeJS on your system
2. Clone this repository
3. Install dependencies by running `npm install`
4. Rename the .env.sample file to .env
5. Paste your Twilio SendGrid API key into the .env file
6. Run the scraper by running `npm start`

## Disclaimer
This web scraper is intended for personal use only and is not intended for any commercial use.