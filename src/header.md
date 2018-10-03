* [Setup Guide](#api-setup) 
* [Supported Actions](#sections)


<h1 id="api-intro">Introduction</h1>

Automate placing complex trades on a selection of exchanges.

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

* Bitfinex - Spot Exchange
* [Deribit](https://www.deribit.com/reg-1657.8470) - Bitcoin Futures
* Bitmex - Bitcoin Futures


<h1 id="api-setup">Setup Guide</h1>



Things you'll need...

- Node.js v8.7.0 or better
- [optional] TradingView account, with a script that can trigger alerts when it's time to buy and sell.
- [optional] Twilio account, that can listen for SMS messages and make an HTTP request to the bot.
- [optional] Mailgun account, that can listen for Email-to-SMS emails and make HTTP requests to the bot.
- [optional] ngrok to tunnel those HTTP requests if you are running on a local machine that
is not reachable from the internet.
- [optional] PM2 to manage the app and keep it running 


## Installation

Requires Node.js. Tested on Node V8.7.0

Clone or copy the source code to a new folder, then...

```
cd instabot-trader
npm install
npm run setup
```


### Edit the config

The last command above should have created a config file for you.
Open `config/local.json` in your favourite editor.

Before Instabot Trader can place any trades, you'll need to add some API keys.


### Launch for the first time

```bash
node trader.js
```

1. Copy the file `.env.example` to `.env` and edit it (docs for settings below). 
   Replace all the defaults with your settings and add all your API keys. I 
   recommend setting up with the Bitmex Testnet API keys first before you start live trading.
2. Pick a random string for the URL endpoint (I recommend a UUID) and set this in the `.env` file. 
   The URL of the bot
   will be `http://youDomain.com:<PORT>/<UUID>/bot` for the Twilio SMS endpoint and 
   `http://youDomain.com:<PORT>/<UUID>/ebot` for the MailGun email endpoint. 
   Note: You will need a URL that is accessible over the internet. If you are running on a 
   local machine that can not be reached on the public internet, you can use a tool like 
   `ngrok` to create a secure tunnel and give you a public URL.
3. Run the node server with `node main.js` (or via PM2 with `pm2 start Trader`).

### Setting up on a computer that isn't reachable on the public Internet.

This step is only required if you are running the bot behind a firewall or router 
(eg, you are running it from a PC in your house, not in a data center like AWS).
If you are using a PC at home, it won't be publicly accessible from the internet. You'll
need to set up a tunnel to forward alert requests to you. `ngrok` is a simple tool that does this.
Once you've downloaded ngrok, you can start the tunnel using this command...

``ngrok http -bind-tls=true 3000```

Where 3000 is the port you've configure the bot to run on. ngrok will tell you the public URL
which will normally look like `randomletters.ngrok.io`. Treat this as your domain from step 2
above. You can pay ngrok a few dollars to get a fixed domain that stays the same each time you 
run it. Set up your fixed domain at ngrok and then start it like this...

```ngrok http -subdomain=myNewSubDomain -bind-tls=true 3000```


### Setting up TradingView to use SMS

1. Create an account on Twilio (https://www.twilio.com/) and get yourself a phone number
2. Configure it to forward incoming messages to the bots SMS public URL.
3. Send a test SMS from your phone to the Twilio number and you should see the
   message on the terminal. Without any bot commands the SMS will be ignored.
4. Configure TradingView to use the SMS number Twilio allocated you. It will
send you a code to active it, but this should appear on the console from the
node.js app
5. Set up trading algo in TradingView and configure alerts. The alert message
is used to control the bot. It can contain any text you like as long as it 
includes the bot command somewhere.

### Setting up TradingView to use Emails

1. Create an account at Mailgun (https://www.mailgun.com/). 
2. Get yourself a domain and set it up according to mailguns instructions.
   This basically means setting up MX records, so mailgun can receive email on your domain.
3. Set up a route in mailgun to forward all emails from TradingView to the bots public URL (the ebot one).
4. In TradingViews profile settings, enter the email address that will be managed by Mailgun
   in the `SMS Email` box. Any email sent to this address will be forwarded to the bot (Mailgun
   lets you add filters to the rules, so you could only forward emails from TradingView if you like).
5. Create alerts like normal in TradingView and tick the SMS-to-Email option. 
   Place the commands in the Alert text.
   
### General TradingView tips

It's a good idea to choose the 'Once per bar close' option, so you don't get the same alert
firing multiple times during a candle forming.

If you change the config settings for any of your indicators (or change the source code),
you will need to replace all your alerts with new ones. The server side alerts run the indicator
with the settings and source code that were current at the time the alert was created.



## Running with pm2

PM2 keeps the node app running. If node crashes for any reason, the app will be instantly
restarted. You'll get an SMS alert to notify you about this if you've configured Twilio. 

The config for the stack is found in `stack.config.js`.

### Some handy commands for PM2

start everything from scratch

`pm2 start stack.config.js`

Reload everything after a config change or code change

`pm2 restart stack.config.js --update-env`

Show what's up

`pm2 status`

`pm2 list`

`pm2 monit`

Watch the logs

`tail -f  /home/vagrant/.pm2/logs/Trader-out-2.log -n 1000`

You can also use the PM2 built in log viewer (`pm2 logs`), but this can mess
up the results a bit. 



<h1 id="api-config">Config</h1>


more
