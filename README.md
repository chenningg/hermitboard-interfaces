![Hermitboard Banner](https://i.imgur.com/eZJrLH1.png)

Hermitboard is a financial superapp that allows you to track your portfolio holdings across various asset classes and locations, including but not limited to bank accounts, equities and cryptocurrencies. It also allows you to set budgets and keep track of your spending, all in one place. Built as a final year project at the Nanyang Technological University of Singapore.

This repository contains the frontend of Hermitboard, which had been implemented as a monorepo.

## Features
- Add connections to data sources (banks, exchanges, cryptocurrency wallets)
- View balances and transactions
- Track portfolio holdings and profit loss
- Set budgets and track spendings
- Send and receive money to and from friends
- Pay using card
- ... and more...

## Screenshots
![Adding a new connection](https://i.imgur.com/LI07bGB.png)
![Budget and transactions](https://i.imgur.com/YnEz5Kt.png)
![Portfolio details](https://i.imgur.com/3cf22tW.png)
![Friends and chat](https://i.imgur.com/YjyHoFt.png)

## How it works
Hermitboard connects to various banks and exchanges via OAuth. We do this so that you log in directly to your bank and we do not hold your login details. It retrieves price data of various equities and cryptocurrencies from a few sources. For the FYP, we focused on using [The Graph](https://thegraph.com/) for decentralized indexing of cryptocurrency data.

The application runs on a [Go](https://go.dev/) backend, with a frontend coded in [React Native](https://reactnative.dev/). Authentication sessions are maintained via session tokens on [Redis](https://redis.io/). Communication between backend and frontend is established through a [GraphQL](https://graphql.org/) API.
