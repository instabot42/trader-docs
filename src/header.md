* [Setup Guide](#api-setup)
* [Configuration](#api-config)  
* [Command Reference](#sections)

> **DISCLAIMER:** *This package is in development and makes no guarantee that it is able to do any of 
the things described here. Use only at your own risk.*  


<h1 id="api-intro">Introduction</h1>

**Instabot Trader 🤖** helps you to automate placing complex trades on a selection of exchanges.

Trigger your trades from...

* **TradingView alerts**
* Anything that can send an HTTP request.
* A simple form on a web page (example included)
* email or SMS
* even from the command line, if that's your thing.

Place simple limit orders or complex sequences of trades...

* **Scaled orders**, even on exchanges that don't offer this (like Bitmex and Deribit)
* **Stepped market orders** (a series of market orders spread over a period of time)
* Basic limit, market and stop orders
* Send yourself notifications (**SMS** or **Slack**) of progress and account balances / status.
* Chains of the above (for example, scaled order, wait a while, cancel unfilled orders, 
  replace with market orders etc)

<div id="donate">

## All donations gratefully accepted! 👊 

If you're using this to help you trade 24/7, it would be great if you could throw me a few Satoshi 
from time to time to say thanks. 

* **Bitcoin**: 39vBjyAu65vYEd7thnW75V7eULTcz7wgxV
* **Litecoin**: LUov5izfzuDakBeLGGCtyzmZcwCB2nXBDY
* **Ethereum**: 0x2F18958381D3a1025e136b5AEF727dDa132602f8

Thank you... 🎉 

</div>

<br>


## What does it do? How does it work?

You send some text to Instabot Trader. The text contains commands. 
The commands are are converted into suitabled API calls to an exchange. Orders are placed. Lambos!

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

OK, lets place a limit order at Bitfinex to buy 1 BTC on the BTCUSD pair. We'll put the
bid in $50 below the current price...

```
bitfinex(BTCUSD) { limitOrder(side=buy, amount=1btc, offset=50); } 
```

or how about place a scaled order on Bitmex's perpetual swap (XBTUSD). Same amount, but lets
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
Set the Alert Message to the commands you'd like to execute, like the examples above. 
Change a couple of settings
in TradingView and then you'll trigger some actions every time that alert fires.
24 hours a day, 7 days a week. 
(see the setup and config sections below for details on setting this up).

Instabot Trader listens for messages sent to it over the web, so anything
that can make HTTP requests will be able to trigger the bot to execute
trades for you. It's possible to set it up to respond to emails, SMS messages
or to build a simple html page that sends commands when you click a button. 
See the setup guides for more details. 


## Which exchanges are supported?

* [Bitfinex](https://www.bitfinex.com/) - Spot Exchange
* [Deribit](https://www.deribit.com/reg-1657.8470) - Bitcoin Futures
* [Bitmex](https://www.bitmex.com/register/LWpOVZ) - 100x degen trading
* Coming soon: Binance 


<h1 id="api-setup">Setup Guide</h1>

## Installation

You'll need **[Node.js](https://nodejs.org/en/)** to run Instabot Trader. Tested on Node V8.7.0, 
though v10.11.0 or better would be ideal.

So, clone or copy the source code to a new folder, then...

```bash
$ cd instabot-trader
$ npm install
$ npm run setup
```


### Edit the config

The last command above should have created a default config file for you.
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

That's it, you're up and running...

## Using the bot locally

Open up `instabot.html` from the project and you'll get a simple web page that you can use to manually control
the bot locally. From here you'll be able to FOMO in, or layout out a spread of orders in a single click, without
having to log into your exchange accounts or fight system overload messages.


# Advanced Setup (for full automation)

This section covers setting up a secure tunnel, an Email-to-bot service, TradingView email alerts etc. Basically,
all these bits together can help you set up the bot so it can automatically trade from alerts triggered in 
TradingView, or from other services.

Ideally you'd host this on a proper server, which makes a several of the steps below unnecessary, but is 
technically harder if Devops isn't your thing.   

## Setting things up so you can run the bot from home

If you are planning on running the bot at home or from behind a firewall, and don't know how to (or can't) set up
port forwarding on the network, then you'll need to create a secure tunnel. 

[ngrok](https://ngrok.com/) is a great way to do this. Download it and set up a tunnel from a public url to 
your server like so...

```bash
ngrok http -bind-tls=true 3000
```

Where 3000 is the port number in your config files.

This will show you the public address that you can use to access your bot from outside your network. 
The main problem with this is that you'll get a different URL each time you run the command, which can be 
inconvienient, especially when trying to link this up to other services.

However, for a $5 a month you can have a fixed domain that you can use every time, which is much better. You start 
it a bit like this...

```bash
ngrok http -subdomain=myNewSubDomain -bind-tls=true 3000
```
  
I've kept these running for months at a time with no problems at all.


## Set up an Email listener

There are many services out there that can receive emails and make an HTTP request with the details of the message.
You can use one of these to enable a method of converting emails into automated trades. This is especially useful
when trying to trigger trades from TradingView, as it offers an option to send alerts via email for free.

Here we'll cover setting up MailGun to do this, though you can use any service you are familiar with.

* Create an account at [MailGun](https://www.mailgun.com/)
* Ideally set up a spare domain so MailGun handles its email. You do get a sandbox domain from Mailgun for free
  but there are more limits on this and it may not be suitable.
* Go to the `Routes` section and add a new Route. These are used to filter incoming email and then forward
  them on to a new destination. You can filter by from address, or a secret code you add to all the messages you 
  want to be forwarded to the bot.
* In the action for the Route, make sure you tick 'forward' and enter the full URL for your bot. If your bot
  is running at home behind a firewall, you'll need to have set up a tunnel first (see above).
* Save the rule and test it out. Any email you send to the address that matches you filtering settings should 
  end up making a call to your bot if it is running and accessible from Mailguns servers.
   

## Set up TradingView

TradingView has a very powerful alerting system, allowing you to trigger an alert when any combination of
indicators do something you consider important. You can also write your own indicators in PineScript and have
those fire alerts when interesting things happen too.

TradingView will let you set up either a phone number for SMS alerts, or an email address for what it 
calls SMS emails (I think this is meant to enable you to use an email to SMS service, as TradingView has a 
hard limit of only 500 SMS's, even on their most expensive account).

I recommend using the SMS Email option, as there are no usage limits and it's just as easy to hook up 
an email-to-bot service as it is an SMS-to-bot service.

Go to your TradingView settings page, and enter the SMS email address in the Private Details section
of the page. You'll also need to set up that email address so it is forwarded to your bot, but there are
some tips on doing this above.


## Set up an SMS listener


## Set up PM2 to ensure your new bot stays running.

## How to write messages

