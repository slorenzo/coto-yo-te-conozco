# COTO: YO TE CONOZC0clear.

This is a simple CLI tool to verify the stock of products.

## Why?

> During the Argentina's quarantine there is no stock available of some basic products. So, I decided to make my life a bit easier building this tool in order to know when the supermarket has new stock.

## How it works.

Using Web Scraping we can extract the data of the products and find out if they are in stock.

## Usage

First at all, clone this repository.

There are some requirements to start using this tool. Following these steps is very easy:

- Open your browser and go to https://www.cotodigital3.com.ar/

- Create an account if you don't have one or login.

- Open your Browser Developer Console.

- Take a look at your request and pick up the `JSESSIONID` value.

- Take a look at the URL and pick up the `sucursalId` value

After that, create a `.env` file at the root directory and add these variables and values to it.

> SESSION_COOKIE=your-JSESSIONID-value
> SUCURSAL_ID=your-sucursalId-value

That's it, we already be able to use this tool.

## Adding products

To add more products there is a JSON file in the `data` folder. Make sure you're adding your products with the same JSON structure that I already used.

## Clarifications

When developing this tool, I realized that the website does not show the real stock of the products. There are differences when you are logged and you are not. It adds some steps and complexity to be used.