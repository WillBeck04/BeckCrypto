## Introduction

Cryptosito is an app I built using Next.js and React, with a focus on providing users with valuable data about the crypto market. As a front-end application, it includes a table of coins, global information about the markets. I created it using Next.js 13, which provides many new features and improvements over previous versions, the biggest one probably is using server and client components.

## Challenges

One of the most challenging parts of building Cryptosito was implementing the features without a backend. I had to find new ways to store user data, such as watchlists and simulated portfolios. However, I found that using local storage provided a suitable solution to store data on the client-side.

## Unique features

One unique feature of the app is the ability to add coins to a watchlist table. Users can keep track of their favorite cryptocurrencies, making it easier to monitor their progress over time. Additionally, users can simulate buying a coin by entering the amount of shares they would like to purchase. The app calculates the resulting shares in their portfolio, allowing users to get a feel for how their investments might perform.

## Dev decisions

For styling, I drew inspiration from CoinMarket, but used TailwindCSS to create a unique look and feel for Cryptosito. I also used Incremental Static Regeneration for fast, revalidated pages, ensuring a smooth user experience.

To ensure fully typesafe data, I used TypeScript and created interfaces for the data. I've also used awesome Zod library and parsed that data through a schema I've built. This helped me ensure that the data I was collecting and using was of the highest quality, providing users with the most accurate information possible.

## Summary

Overall, Cryptosito is a valuable tool for anyone interested in the crypto market. With its continuously evolving database and unique features, it has the potential to become a go-to resource for crypto enthusiasts. I'm excited to continue working on it, improving its functionality and adding new features to make it even more valuable for users.
