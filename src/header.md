* [Setup Guide](#api-setup)
* [Configuration](#api-config)  
* [Command Reference](#sections)


<h1 id="api-intro">Introduction</h1>

**Instabot Trader** helps you to automate placing complex trades on a selection of exchanges.

Trigger your trades from...

* TradingView alerts
* A simple form on a web page (example included)
* email or SMS
* Anything that can send an HTTP request (IFTTT, Zapier etc)
* even from the command line, if that's your thing.

Place simple limit orders or complex sequences of trades...

* Scaled orders, even on exchanges that don't offer this (like Bitmex and Deribit)
* Stepped market orders (a series of market orders spread over a period of time)
* Basic limit, market and stop orders
* Send yourself notifications (SMS or Slack) of progress and account balances / status.
* Chains of the above (for example, scaled order, wait a while, cancel unfilled orders, replace with market orders etc)

<br>

> **DISCLAIMER:** *This package is in development and makes no guarantee that it is able to do any of 
the things described here. Use only at your own risk.*  

## How?

You send some text to Instabot Trader, with a list of actions to execute. It reads the 
message and looks for actions you want to execute on supported exchanges.

Each message looks a bit like this...

```
Any text you like here...

exchangeName( instrument ) {
    action1(value1, value2);
    action2(value1, value2);
}

You can have more action lists here, so you can execute commands
on several exchanges at the same time.
```

## Give us a simple example...

OK, lets place a limit order at Bitfinex to buy 1 BTC. We'll put the
bid in $50 below the current price...

```
bitfinex(BTCUSD) { limitOrder(side=buy, amount=1btc, offset=50); } 
```

or how about place a scaled order on Bitmex. Same amount, but lets
spread it over 25 orders from $20 below the current price, down to $70
below the current price...

```
Scaling in on mex...
bitmex(XBTUSD) { 
  scaledOrder(side=buy, amount=1btc, from=20, to=70, orderCount=25); 
} 
```

Easy.

## But how do I send these messages?

If you use TradingView, set up an alert that triggers when you want to trade.
Set the Alert Message to your list of actions. Change a couple of settings
in TradingView and then you'll trigger some actions every time that alert fires.
24 hours a day, 7 days a week. 
(see the setup and config sections below for details on setting this up).

Instabot Trader listens for messages sent to it over the web, so anything
that can make HTTP requests will be able to trigger the bot to execute
trades for you. It's possible to set it up to respond to emails, SMS messages
and loads more - see the setup guide for more details. 


## Which exchanges are supported?

* [Bitfinex](https://www.bitfinex.com/) - Spot Exchange
* [Deribit](https://www.deribit.com/reg-1657.8470) - Bitcoin Futures
* [Bitmex](https://www.bitmex.com/register/LWpOVZ) - 100x degen trading


<h1 id="api-setup">Setup Guide</h1>

## Installation

Requires **[Node.js](https://nodejs.org/en/)**. Tested on Node V8.7.0

Clone or copy the source code to a new folder, then...

```bash
$ cd instabot-trader
$ npm install
$ npm run setup
```


### Edit the config

The last command above should have created a config file for you.
Open `config/local.json` in your favourite editor.

There are several sections here that you can adjust...

* **Credentials** - add the API keys for each of the exchanges you want to trade on to this section
* **SMS** - Instabot Trader has a built in Twilio integration. If you have a Twilio account you can set
            up the credentials, 'from' phone number and your phone number to send alerts to.
* **Slack** - You can have notifications sent to a slack channel. Set up the webhook here. 
* **Server** - here you can change the URL that your server is accessed from, and the port that it listens on

You'll need to get an API key and secret from each of the exchanges you want to trade on.
Once you have these, update `local.json` with them and you're ready to start.   


### Launch for the first time

```bash
$ npm run start

=================================================

  Instabot Trader bot starting  🤖  🚀  🌔  🏎️ 

=================================================

```


## Set up TradingView

So that you can execute trades on any alert from TradingView.

## Set up an Email listener

## Set up an SMS listener

## Set up a tunnel to a home computer

## Set up PM2 to ensure your new bot stays running.

## How to write messages

