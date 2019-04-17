* [Setup Guide](#api-setup)
* [Message Format](#api-format)
* [Examples](#api-examples)
* [Command Reference](#sections)
* [License](#api-_footer)

> **DISCLAIMER:** *This package is in development and makes no guarantee that it is able to do any of
the things described here. Use only at your own risk.*


<h1 id="api-intro">Introduction</h1>

**Instabot Trader 🤖** helps you to automate placing complex trades on a selection of exchanges.

Place algorithmic orders, or complex sequences of trades easily...

* **Accumulate / Distribute orders** (or **Iceberg orders**)
* **Time weighted average orders**
* **Ping Pong orders**
* **Scaled orders**
* All order types are available on all exchanges (currently Deribit, Coinbase Pro and Bitfinex)
* Basic limit, market and stop orders
* Send yourself notifications (**SMS**, **Slack** and **Telegram**) of progress and account balances / status.
* Chains of the above (for example, scaled order, wait a while, cancel unfilled orders,
  replace with market orders etc)

Trigger your trades from...

* **TradingView alerts**
* **Telegram**
* Anything that can send an HTTP request (A simple web form, Zapier,
  email routers like Mailgun, SMS routers like Twilio, etc).
* even from the command line, if that's your thing.


<div id="donate">

## Source code?

[https://github.com/instabot42/instabot-trader](https://github.com/instabot42/instabot-trader)

</div>

## What does it do? How does it work?

You send some text to Instabot Trader. The text contains commands.
The commands are are converted into suitabled API calls to an exchange. Orders are placed. Lambos!

Each message looks a bit like this...

```
Any text you like here...
Want this text sent as an SMS to your phone?
then add this somewhere-> {!}

Next, we have a set of actions that
will be executed on an exchange...

exchangeName( instrument ) {
    action1(value1=x, value2=y);
    action2(value1=x, value2=y);
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

or how about place a scaled order on Deribit's perpetual swap (BTC-PERPETUAL). Same amount, but lets
spread it over 25 orders from $20 below the current price, down to $70
below the current price...

```
Scaling in on perps...
deribit(BTC-PERPETUAL) {
  scaledOrder(side=buy, amount=1btc, from=20, to=70, orderCount=25);
}
```

Easy. You'll find **[more examples here...](#api-examples)**

## But how do I send these messages?

Instabot Trader listens for messages sent to it over the web, so anything
that can make HTTP requests will be able to trigger the bot to execute
trades for you. It's possible to set it up to respond to emails, SMS messages
or to build a simple html page that sends commands when you click a button.
See the setup guides for more details.

By default the bot listens at `http://localhost:3000/trade`, though both the port and path
can be configured in the config.

`POST` messages to this URL, with your message in value called `message`, `subject` or `Body`.

```
curl --data-urlencode "message=hello world" http://localhost:3000/trade
```


## Which exchanges are supported?

* [Bitfinex](https://www.bitfinex.com/) - Spot Trading or margin trading
* [Deribit](https://www.deribit.com/reg-1657.8470) - Bitcoin Futures
* [Coinbase Pro](https://pro.coinbase.com/trade/BTC-USD) - Spot Trading (BTC, LTC, ETH and Bcash)
* Coming soon: [Bitmex](https://www.bitmex.com/register/LWpOVZ) - 100x degen gambling
* Coming soon: Binance - shitcoin party


## You may also be interested in...

Instabot Trader integrates well with [Alert-a-Tron](https://alertatron.com/), which makes it super simpler to capture
alerts from TradingView, or other services, and push them various targets, with screenshots of charts attached.
It can be used to simply forward alerts into Instabot Trader too,
and can simplify the setup and installation of Instabot Trader significantly.

<div id="donate">

## All donations gratefully accepted!

If you're using this to help you trade 24/7, it would be great if you could throw me a few Satoshi
from time to time to say thanks.

[Donate with Crypto](https://commerce.coinbase.com/checkout/4a67a444-578b-4908-ac9d-8ea716e8b0cb)

Thank you... 🎉

</div>

<br>

--------


<h1 id="api-setup">Setup Guide</h1>

## Installation

You'll need **[Node.js](https://nodejs.org/en/)** v10.3.0 or better to run Instabot Trader.

So, clone or copy the source code to a new folder, then...

```bash
$ git clone https://github.com/instabot42/instabot-trader.git
$ cd instabot-trader
$ npm install
$ npm run setup
```


### Edit the config

The last command above should have created a default config file for you.
Open `config/local.json` in your favourite editor.

There are several sections here that you can adjust...

* **Credentials** - add the API keys for each of the exchanges you want to trade on to this section.
            You can create API Keys at each exchange. You'll need to give the keys permission to
            read/create/delete orders, as well as read permission for your wallet.<br>
            **DO NOT CREATE KEYS WITH PERMISSION TO DO MORE THAN YOU NEED** - it's just careless.
* **SMS** - Instabot Trader has a built in [Twilio](https://www.twilio.com/) integration. If you have a Twilio account you can set
            up the credentials, 'from' phone number and your phone number to send alerts to.
* **Slack** - You can have notifications sent to a slack channel. Set up the [webhook](https://api.slack.com/incoming-webhooks) here.
* **Telegram** - If you want to talk to Instabot Trader from Telegram, you'll need to create a bot
                 (see [the botFather](https://core.telegram.org/bots#6-botfather)) and add the botToken
                 to the config. Once you've done that, start a chat with your new bot and have it send
                 messages executed instantly. See the section on Telegram for the commands and shortcuts.
                 You should also set your telegram user id in `telegram.safeUser` to ensure only you can send
                 commands using this method.
* **Notifications** - Set up the default notification channel (or channels) and control if you get sent a
                notification when Instabot Trader starts up.
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
<br><br>
**Very strongly recommend that you start out using very small amounts until you've figured it all out.**
**Even better, start by using only the wait() command, which won't place any trades.**



--------

# Security

By default, Instabot Trader listens for HTTP requests on port 3000. Requests to `/trade` will be processed. If you
make the server visible on the open internet then this can be a risk. There are some things you can do though...

* Change the `server.url` config setting and use a url that is unique. Make it long and random so no one
  finds it by chance.
* Change the default port.
* Enable message signing (see below)
* Run the server behind a load balancer or proxy that can handle SSL for you, enabling secure transmission of your
  messages.
* Use IP whitelisting to limit who can see the server. Limit this to just the services that send commands for you.
* Run it locally, not on the open internet and send it commands from the same PC. This has the obvious disadvantage of
  not being for handling alerts from other systems such as TradingView.
* If you use the Telegram integration, set `telegram.safeUser` your personal Telegram user id. This will ensure only
  you can send commands via telegram.

### Message Signing

There are 3 levels of message signing supported...

* None - messages are not signed. This is the default.
* Password - the message must contain the secret set up in the config
* Hash - the message must be signed with part of a sha256 hash generated using the message and the secret.

You can control which option is used from the config.
`server.security.signingMethod` can be set to `none`, `password` or `hash`.
`server.security.secret` should be set to a password of your choice when using either `password` or `hash` methods.

To add your signature to a message, add `sig:YourSignature` to the end of messages.

*Examples*

We'll use the following message to sign...

```
bitfinex(BTCUSD) {
  wait(5s);
}
```

If the signing method is `password` and the secret is set to `bitcoin`, then you need to add `sig:bitcoin`
to the end of the message, like so...

```
bitfinex(BTCUSD) {
  wait(5s);
}
sig:bitcoin
```

If the signing method is `hash` and the secret is set to `bitcoin`, then you need generate a suitable
hash to add to the end. There is a script with the source code to do this. We'll put the message into a file
called `message.txt` and enter the following command: `cat message.txt | npm run sign`. That should output the following :-

```
bitfinex(BTCUSD) {
  wait(5s);
}

sig:fe83f5fed15c7841
```

It's important to note that the message content is part of the signing process, so any change to the message will need
a new signature generating. The signature will be unique for every message you send, so you have to keep generating them.
If you want max security though, this is the price you have to pay.

Any message received without the correct signature will be ignored.

Also, don't use `bitcoin` as your password - that would suck. or `password`.



# Advanced Setup (for full automation)

This section covers setting up a secure tunnel, an Email-to-bot service, TradingView email alerts etc. Basically,
all these bits together can help you set up the bot so it can automatically trade from alerts triggered in
TradingView, or from other services.

Ideally you'd host this on a proper server, which makes a several of the steps below unnecessary, but is
technically harder if Devops isn't your thing.

## Config in more depth

### Credentials

This section looks like this by default...

```json
"credentials": [
    {
      "name": "deribit",
      "exchange": "deribit",
      "key": "api-key",
      "secret": "api-secret"
    },
    {
      "name": "bitfinex",
      "exchange": "bitfinex",
      "key": "api-key",
      "secret": "api-secret",
      "margin": false,
      "max-leverage": 1
    },
    {
      "name": "coinbase",
      "exchange": "coinbase",
      "endpoint": "https://api.pro.coinbase.com",
      "key": "api-key",
      "secret": "api-secret",
      "passphrase": "secret-passphrase"
    }
  ]
```

It is an array of all the credentials you want to set up. Each entry contains the following keys:

* name - this is the name you give the api keys. In commands, this is the name you will use to identify the exchange
  and api keys to use. For example, if you set name to be `bot`, then to execute commands on this exchange with these
  api keys you'd send `bot(BTCUSD) { wait(5s); }`.
* exchange - this is the name of the exchange the credentials belong to. It can be one of deribit, bitfinex or coinbase.
* key, secret, passphrase - these are the actual api keys needed to execute orders on the exchange. Typically these will
  need read and write permissions on orders, plus read permissions on balances/wallets. The actual fields required varies
  from exchange to exchange (eg coinbase pro requires a passphrase)

It is possible to create multiple entries on the same exchange, as long as they have different `name`s. For example,
on Deribit you can create sub-accounts and create separate API keys for each one. You might also have multiple accounts
on some exchanges.`

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

[TradingView](https://www.tradingview.com/) has a very powerful alerting system, allowing you to trigger an alert when any combination of
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


## Set up SMS

This is actually pretty simple.

* Create a Twilio account
* To be able to send SMS messages out (for alerts or account updates), grab the API Credentials from
  the Programmable SMS section and put these into your `config/local.json`, along with the number you'd
  like the messages to be sent to.
* To receive SMS messages that are routed to Instabot Trader, create a new number and set it up
  to call a webhook when a message comes in. Enter the URL for your server and set it to HTTP POST.
  Any SMS sent to that number will be passed on to your server now.


## Set up Slack

* In slack create a new Webhook URL to send messages to the channel you want and paste it into the
    `config/local.json` (slack -> webhook).


## Set up Telegram

Before you can use the Telegram integration you'll need to create a telegram bot. Don't worry, it's
easier than it sounds...

* First, in Telegram, you'll need to start a chat with @botFather to create your own chat bot token.
  There are detailed instructions at
  [https://core.telegram.org/bots#6-botfather](https://core.telegram.org/bots#6-botfather).
* Once you have a token, you can add it to the config in `config/local.json` and restart Instabot Trader.
* Now you can start a chat with your new bot. Type `/help` for the help text.
* Anything you say to the telegram bot will now to sent directly to Instabot Trader and will be treated
  as a regular message (commands and all). Because of this, it is recomended that you find out your telegram
  user id (Instabot Trader will log this if you send a message to it) and save it in the `telegram.safeUser`
  setting in your config. This will limit access to just that user id.
* To make things even simpler you can create some shortcuts that you can trigger
  Telegram using `/shortcut <name>`. The shortcuts are defined in your `config/local.json` as an array
  of objects. The example below can be executed using `/shortcut example`...

```
{
    "name": "example",
    "message": "Testing... bitfinex(BTCUSD) { wait(5s); } "
}
```

## Notifications

* **alertOnStartup** should be true or false. If true, a notification will be sent each time
        Instabot Trader starts.
* **default** is an array containing the names of the channels to send messages to. If you provide
        more than one channel, messages will be sent to all listed channels.

---------


<h1 id="api-format">Message Format</h1>

When a message is received, the following elements are looked for...

### {!}

An explanation mark in curly brackets tells Instabot Trader to take all the text that is not
part of a command / action list and send it to your default notification channel (notification channels
are configured in your `local.json` config).

This is great for simple alerts. For example, set up an alert in TradingView when the
price crosses an important line and set the alert text like this...

```
BTC now over 10K! {!}
```

You'll get a message 'BTC now over 10K!' sent to you on your configured channels (SMS, Slack or Telegram).
There are no commands in the message, so that's all that will happen.

### Actions and commands

You can have as many of these as you like in a message. This makes it possible to trigger something
that will happen on multiple exchanges, or on multiple pairs/instruments on an exchange.
All the exchange blocks are executed simultaneously, allowing
you to be placing orders on different exchanges / pairs at the same time. The commands inside each block
are executed one at a time.

Lets look at an example and break it down so you can understand all the parts...

```
Going Long {!}

bitfinex(BTCUSD) {
   limitOrder(side=buy, amount=1, offset=5);
   notify(msg="Order placed, on Bitfinex, for 1 BTC");
}

deribit(BTC-PERPETUAL) {
   scaledOrder(position=10000, from=0, to=50, orderCount=30);
   wait(30m);
   cancelOrders(session);
   marketOrder(position=10000);
}
```

First up, we'll get sent an SMS with the message 'Going Long'.

Next, there are 2 blocks. One will target Bitfinex and the second will target Deribit to place orders. Both will
be executed at the same time.

The Bitfinex blocks starts by indicating which pair to trade on (BTCUSD in this example). The list of actions
to run on the Bitfinex BTCUSD pair are contained between the open and close curly brackets. Each action looks
like a function call. It starts with the name of the command, then a list of parameters inside brackets.
An optional semi-colon can be seen in the example too.

The arguments are all named (meaning they all take the form of `name = value`)and can be listed in any order.
Each parameter is separated by a comma. The Bitfinex limitOrder action in the example above has 3 parameters -
`side`, `amount` and `offset`. You'll notice that the `notify` action uses double quotes around it's value.
This is necessary as the value contains commas, but is optional if it does not.

The actions in the block are executed one at a time. So in the Bitfinex example, the first command is
a limitOrder command. Note that it does not wait for the order to
be filled - it only waits until the order has been submitted and accepted by the exchange. Once the limit
order has been placed, it moves on to the second action (sending a notification (SMS, Slack and Telegram supported)).

The Deribit example shows this ordering more clearly. It will attempt to get into a position cheaply
using limit orders over a small price range. It will give this 30 minutes to work, then fall back to a market
order to finalise the position if any of the limit orders were still unfilled.

First we place a scaled order, which actually results
in Instabot Trader placing 30 separate limit orders. How long this takes depends on the rate limits at the
exchange and for your account (Deribit has pretty high limits, so can probably place all the orders in a
fraction of a second. The same command on Bitfinex would take a lot longer to execute as it has much lower
rate limits). Once all the orders are placed, it goes on to the second action, which just waits for 30 minutes.
After 30 minutes it will cancel any outstanding orders that were created by the scaled order action and finally
place a market order to get us fully into position.


---------


<h1 id="api-examples">Examples</h1>

#### Place a market order to buy 1 btc

```
bitfinex(BTCUSD) {
    marketOrder(side=buy, amount=1)
}
```

#### Adjust your open position so you own 1 btc, using a market order

```
bitfinex(BTCUSD) {
    marketOrder(position=1)
}
```

#### Place a limit order at $10 below the current price

```
bitfinex(BTCUSD) {
    limitOrder(side=buy, amount=1, offset=10);
}
```

#### Adjust your open position so you own 1 btc using a limit order

```
bitfinex(BTCUSD) {
    limitOrder(position=1, offset=10);
}
```

#### Kill everything - close all orders and close open positions

This works by cancelling all open orders and aiming for an open position of 0 contracts.
If the account was long, this would turn into a market sell. If short, a market buy.
If there were no open positions, no trade would be placed.

```
deribit(BTC-PERPETUAL) {
    cancelOrders(all);
    marketOrder(position=0);
}
```

#### Get your balance at Bitfinex and Deribit

Notification will be sent to your preferred channel (one or many of SMS, Telegram or Slack)

```
deribit(BTC-PERPETUAL) { balance() }
bitfinex(BTCUSD) { balance() }
```

#### Just send a message / alert

To your preferred notification channels (see config). Perfect for alerts when triggered from something like TradingView.

```
This text will be sent to SMS, Telegram or Slack {!}
```

#### Enter a long position of 10,000 contracts over a period of time

A more complex example. This will place 30 limit orders over a $50 range,
with the aim of ending up 10,000 contracts long. After 30 minutes, cancel
anything not yet filled and place a new range of orders in a tighter range
close to the current price again. Wait again, cancel anything not filled again
and finally market buy any missing contracts. At the end, send a balance
report. The whole sequence will take around 1 hour to complete.

```
Going Long {!}
deribit(BTC-PERPETUAL) {
    scaledOrder(from=0, to=50, orderCount=30, position=10000, tag=firstGo);
    wait(duration=30m);
    cancelOrders(which=tagged, tag=firstGo);
    scaledOrder(from=0, to=20, orderCount=30, position=10000, tag=secondGo);
    wait(duration=30m);
    cancelOrders(which=tagged, tag=secondGo);
    marketOrder(position=10000);
    balance();
}
```

#### Open a short position and set a stop loss $100 higher

```
deribit(BTC-PERPETUAL) {
    marketOrder(position=-1000);
    stopMarketOrder(side=buy, amount=1000, offset=100);
}
```


#### Place a series of market orders over a 10 minute period

This will be done using 20 market orders at 30 second intervals. Once
the sequence is complete you will have an open position of 1000 contracts
(regardless of what your open position was at the start)

```
deribit(BTC-PERPETUAL) {
    steppedMarketOrder(orderCount=20, duration=10m, position=1000);
}
```


#### Buy on the next dip

Attempt to accumulate 10 btc in total, roughly 0.1 btc at a time (it will vary the amount randomly within 10% of 0.1),
when the price dips 0.4% and as long as the price remains below $4000. It will keep trying for 1 day.

```
bitfinex(BTCUSD) {
    icebergOrder(side=buy, totalAmount=10, averageAmount=0.1, variance=0.4%, limitPrice=4000, timeLimit=1d);
}
```


#### Start a simple market maker bot running

This will create a simple market maker bot.
Each time an order is filled, a matching order is placed on the other side of the book.
These trades will actually run forever (or until they are cancelled).
```
bitfinex(BTCUSD) {
  marketMakerOrder(
    bidAmount=0.1, bidStep=5, bidCount=40,
    askAmount=0.1, askStep=5, askCount=40,
    spread=30,
    autoBalance=limit, autoBalanceAt=10%)
}
```
