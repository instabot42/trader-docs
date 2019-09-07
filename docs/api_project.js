define({  "name": "Instabot Trader",  "version": "1.0.0",  "description": "Send Algorithmic orders to any exchange.",  "title": "Instabot Trader",  "header": {    "title": "Introduction",    "content": "<ul>\n<li><a href=\"#api-setup\">Setup Guide</a></li>\n<li><a href=\"#api-format\">Message Format</a></li>\n<li><a href=\"#api-examples\">Examples</a></li>\n<li><a href=\"#sections\">Command Reference</a></li>\n<li><a href=\"#api-_footer\">License</a></li>\n</ul>\n<blockquote>\n<p><strong>DISCLAIMER:</strong> <em>This package is in development and makes no guarantee that it is able to do any of\nthe things described here. Use only at your own risk.</em></p>\n</blockquote>\n<h1 id=\"api-intro\">Introduction</h1>\n<p><strong>Instabot Trader 🤖</strong> helps you to automate placing complex trades on a selection of exchanges.</p>\n<p>Place algorithmic orders, or complex sequences of trades easily...</p>\n<ul>\n<li><strong>Accumulate / Distribute orders</strong> (or <strong>Iceberg orders</strong>)</li>\n<li><strong>Time weighted average orders</strong></li>\n<li><strong>Ping Pong orders</strong></li>\n<li><strong>Scaled orders</strong></li>\n<li>All order types are available on all exchanges (currently Deribit, Coinbase Pro and Bitfinex)</li>\n<li>Basic limit, market and stop orders</li>\n<li>Send yourself notifications (<strong>SMS</strong>, <strong>Slack</strong> and <strong>Telegram</strong>) of progress and account balances / status.</li>\n<li>Chains of the above (for example, scaled order, wait a while, cancel unfilled orders,\nreplace with market orders etc)</li>\n</ul>\n<p>Trigger your trades from...</p>\n<ul>\n<li><strong>TradingView alerts</strong></li>\n<li><strong>Telegram</strong></li>\n<li>Anything that can send an HTTP request (A simple web form, Zapier,\nemail routers like Mailgun, SMS routers like Twilio, etc).</li>\n<li>even from the command line, if that's your thing.</li>\n</ul>\n<h2>Which exchanges are supported?</h2>\n<ul>\n<li><a href=\"https://www.bitfinex.com/\">Bitfinex</a> - Spot Trading or margin trading</li>\n<li><a href=\"https://www.deribit.com/reg-1657.8470\">Deribit</a> - Bitcoin Futures</li>\n<li><a href=\"https://pro.coinbase.com/trade/BTC-USD\">Coinbase Pro</a> - Spot Trading (BTC, LTC, ETH and Bcash)</li>\n<li><a href=\"https://www.bitmex.com/register/LWpOVZ\">BitMEX</a> (only available via <a href=\"https://alertatron.com/\">Alertatron</a> ) - 100x degen gambling</li>\n<li>Coming soon: Binance - shitcoin party</li>\n</ul>\n<h2>You may also be interested in...</h2>\n<p>Looking for a hosted version of Instabot Trader?  <a href=\"https://alertatron.com/\">Alertatron</a> offers a hosted edition of Instabot Trader\nthat adds BitMEX support too. <a href=\"https://alertatron.com/\">Alertatron</a> can also forward your alerts, with attached charts, to Telegram,\nDiscord, Slack, Email or call Webhooks.</p>\n<div id=\"donate\">\n<h2>Source code?</h2>\n<p><a href=\"https://github.com/instabot42/instabot-trader\">https://github.com/instabot42/instabot-trader</a></p>\n</div>\n<h2>What does it do? How does it work?</h2>\n<p>You send some text to Instabot Trader. The text contains commands.\nThe commands are are converted into suitabled API calls to an exchange. Orders are placed. Lambos!</p>\n<p>Each message looks a bit like this...</p>\n<pre><code>Any text you like here...\n\nNext, we have a set of actions that\nwill be executed on an exchange...\n\nexchangeName( instrument ) {\n    action1(value1=x, value2=y);\n    action2(value1=x, value2=y);\n}\n\nYou can have more action lists here, so you can execute commands\non several exchanges at the same time.\n</code></pre>\n<h2>Give us a simple example...</h2>\n<p>OK, lets place a limit order at Bitfinex to buy 1 BTC on the BTCUSD pair. We'll put the\nbid in $50 below the current price...</p>\n<pre><code>bitfinex(BTCUSD) { limitOrder(side=buy, amount=1btc, offset=50); }\n</code></pre>\n<p>or how about place a scaled order on Deribit's perpetual swap (BTC-PERPETUAL). Same amount, but lets\nspread it over 25 orders from $20 below the current price, down to $70\nbelow the current price...</p>\n<pre><code>Scaling in on perps...\nderibit(BTC-PERPETUAL) {\n  scaledOrder(side=buy, amount=1btc, from=20, to=70, orderCount=25);\n}\n</code></pre>\n<p>Easy. You'll find <strong><a href=\"#api-examples\">more examples here...</a></strong></p>\n<h2>But how do I send these messages?</h2>\n<p>Instabot Trader listens for messages sent to it over the web, so anything\nthat can make HTTP requests will be able to trigger the bot to execute\ntrades for you. It's possible to set it up to respond to emails, SMS messages\nor to build a simple html page that sends commands when you click a button.\nSee the setup guides for more details.</p>\n<p>By default the bot listens at <code>http://localhost:3000/trade</code>, though both the port and path\ncan be configured in the config.</p>\n<p><code>POST</code> messages to this URL, with your message in value called <code>message</code>, <code>subject</code> or <code>Body</code>.</p>\n<pre><code>curl --data-urlencode &quot;message=hello world&quot; http://localhost:3000/trade\n</code></pre>\n<div id=\"donate\">\n<h2>All donations gratefully accepted!</h2>\n<p>If you're using this to help you trade 24/7, it would be great if you could throw me a few Satoshi\nfrom time to time to say thanks.</p>\n<p><a href=\"https://commerce.coinbase.com/checkout/4a67a444-578b-4908-ac9d-8ea716e8b0cb\">Donate with Crypto</a></p>\n<p>Thank you... 🎉</p>\n</div>\n<br>\n<hr>\n<h1 id=\"api-setup\">Setup Guide</h1>\n<h2>Installation</h2>\n<p>You'll need <strong><a href=\"https://nodejs.org/en/\">Node.js</a></strong> v10.3.0 or better to run Instabot Trader.</p>\n<p>So, clone or copy the source code to a new folder, then...</p>\n<pre><code class=\"language-bash\">$ git clone https://github.com/instabot42/instabot-trader.git\n$ cd instabot-trader\n$ npm install\n$ npm run setup\n</code></pre>\n<div id=\"donate\">\n<h3>Looking for a hosted version with no setup?</h3>\n<p><a href=\"https://alertatron.com/\">https://alertatron.com/</a></p>\n</div>\n<h3>Edit the config</h3>\n<p>The last command above should have created a default config file for you.\nOpen <code>config/local.json</code> in your favourite editor.</p>\n<p>There are several sections here that you can adjust...</p>\n<ul>\n<li><strong>Credentials</strong> - add the API keys for each of the exchanges you want to trade on to this section.\nYou can create API Keys at each exchange. You'll need to give the keys permission to\nread/create/delete orders, as well as read permission for your wallet.<br>\n<strong>DO NOT CREATE KEYS WITH PERMISSION TO DO MORE THAN YOU NEED</strong> - it's just careless.</li>\n<li><strong>SMS</strong> - Instabot Trader has a built in <a href=\"https://www.twilio.com/\">Twilio</a> integration. If you have a Twilio account you can set\nup the credentials, 'from' phone number and your phone number to send alerts to.</li>\n<li><strong>Slack</strong> - You can have notifications sent to a slack channel. Set up the <a href=\"https://api.slack.com/incoming-webhooks\">webhook</a> here.</li>\n<li><strong>Telegram</strong> - If you want to talk to Instabot Trader from Telegram, you'll need to create a bot\n(see <a href=\"https://core.telegram.org/bots#6-botfather\">the botFather</a>) and add the botToken\nto the config. Once you've done that, start a chat with your new bot and have it send\nmessages executed instantly. See the section on Telegram for the commands and shortcuts.\nYou should also set your telegram user id in <code>telegram.safeUser</code> to ensure only you can send\ncommands using this method.</li>\n<li><strong>Notifications</strong> - Set up the default notification channel (or channels) and control if you get sent a\nnotification when Instabot Trader starts up.</li>\n<li><strong>Server</strong> - here you can change the URL that your server is accessed from, and the port that it listens on</li>\n</ul>\n<p>You'll need to get an API key and secret from each of the exchanges you want to trade on.\nOnce you have these, update <code>local.json</code> with them and you're ready to start.</p>\n<h3>Launch for the first time</h3>\n<pre><code class=\"language-bash\">$ npm run start\n\n=================================================\n\n  Instabot Trader bot starting  🤖  🚀  🌔  🏎️\n\n=================================================\n\n</code></pre>\n<p>That's it, you're up and running...\n<br><br>\n<strong>Very strongly recommend that you start out using very small amounts until you've figured it all out.</strong>\n<strong>Even better, start by using only the wait() command, which won't place any trades.</strong></p>\n<hr>\n<h1>Security</h1>\n<p>By default, Instabot Trader listens for HTTP requests on port 3000. Requests to <code>/trade</code> will be processed. If you\nmake the server visible on the open internet then this can be a risk. There are some things you can do though...</p>\n<ul>\n<li>Change the <code>server.url</code> config setting and use a url that is unique. Make it long and random so no one\nfinds it by chance.</li>\n<li>Change the default port.</li>\n<li>Enable message signing (see below)</li>\n<li>Run the server behind a load balancer or proxy that can handle SSL for you, enabling secure transmission of your\nmessages.</li>\n<li>Use IP whitelisting to limit who can see the server. Limit this to just the services that send commands for you.</li>\n<li>Run it locally, not on the open internet and send it commands from the same PC. This has the obvious disadvantage of\nnot being for handling alerts from other systems such as TradingView.</li>\n<li>If you use the Telegram integration, set <code>telegram.safeUser</code> your personal Telegram user id. This will ensure only\nyou can send commands via telegram.</li>\n</ul>\n<h3>Message Signing</h3>\n<p>There are 3 levels of message signing supported...</p>\n<ul>\n<li>None - messages are not signed. This is the default.</li>\n<li>Password - the message must contain the secret set up in the config</li>\n<li>Hash - the message must be signed with part of a sha256 hash generated using the message and the secret.</li>\n</ul>\n<p>You can control which option is used from the config.\n<code>server.security.signingMethod</code> can be set to <code>none</code>, <code>password</code> or <code>hash</code>.\n<code>server.security.secret</code> should be set to a password of your choice when using either <code>password</code> or <code>hash</code> methods.</p>\n<p>To add your signature to a message, add <code>sig:YourSignature</code> to the end of messages.</p>\n<p><em>Examples</em></p>\n<p>We'll use the following message to sign...</p>\n<pre><code>bitfinex(BTCUSD) {\n  wait(5s);\n}\n</code></pre>\n<p>If the signing method is <code>password</code> and the secret is set to <code>bitcoin</code>, then you need to add <code>sig:bitcoin</code>\nto the end of the message, like so...</p>\n<pre><code>bitfinex(BTCUSD) {\n  wait(5s);\n}\nsig:bitcoin\n</code></pre>\n<p>If the signing method is <code>hash</code> and the secret is set to <code>bitcoin</code>, then you need generate a suitable\nhash to add to the end. There is a script with the source code to do this. We'll put the message into a file\ncalled <code>message.txt</code> and enter the following command: <code>cat message.txt | npm run sign</code>. That should output the following :-</p>\n<pre><code>bitfinex(BTCUSD) {\n  wait(5s);\n}\n\nsig:fe83f5fed15c7841\n</code></pre>\n<p>It's important to note that the message content is part of the signing process, so any change to the message will need\na new signature generating. The signature will be unique for every message you send, so you have to keep generating them.\nIf you want max security though, this is the price you have to pay.</p>\n<p>Any message received without the correct signature will be ignored.</p>\n<p>Also, don't use <code>bitcoin</code> as your password - that would suck. or <code>password</code>.</p>\n<h1>Advanced Setup (for full automation)</h1>\n<p>This section covers setting up a secure tunnel, an Email-to-bot service, TradingView email alerts etc. Basically,\nall these bits together can help you set up the bot so it can automatically trade from alerts triggered in\nTradingView, or from other services.</p>\n<p>Ideally you'd host this on a proper server, which makes a several of the steps below unnecessary, but is\ntechnically harder if Devops isn't your thing.</p>\n<h2>Config in more depth</h2>\n<h3>Credentials</h3>\n<p>This section looks like this by default...</p>\n<pre><code class=\"language-json\">&quot;credentials&quot;: [\n    {\n      &quot;name&quot;: &quot;deribit&quot;,\n      &quot;exchange&quot;: &quot;deribit&quot;,\n      &quot;key&quot;: &quot;api-key&quot;,\n      &quot;secret&quot;: &quot;api-secret&quot;\n    },\n    {\n      &quot;name&quot;: &quot;bitfinex&quot;,\n      &quot;exchange&quot;: &quot;bitfinex&quot;,\n      &quot;key&quot;: &quot;api-key&quot;,\n      &quot;secret&quot;: &quot;api-secret&quot;,\n      &quot;margin&quot;: false,\n      &quot;max-leverage&quot;: 1\n    },\n    {\n      &quot;name&quot;: &quot;coinbase&quot;,\n      &quot;exchange&quot;: &quot;coinbase&quot;,\n      &quot;endpoint&quot;: &quot;https://api.pro.coinbase.com&quot;,\n      &quot;key&quot;: &quot;api-key&quot;,\n      &quot;secret&quot;: &quot;api-secret&quot;,\n      &quot;passphrase&quot;: &quot;secret-passphrase&quot;\n    }\n  ]\n</code></pre>\n<p>It is an array of all the credentials you want to set up. Each entry contains the following keys:</p>\n<ul>\n<li>name - this is the name you give the api keys. In commands, this is the name you will use to identify the exchange\nand api keys to use. For example, if you set name to be <code>bot</code>, then to execute commands on this exchange with these\napi keys you'd send <code>bot(BTCUSD) { wait(5s); }</code>.</li>\n<li>exchange - this is the name of the exchange the credentials belong to. It can be one of deribit, bitfinex or coinbase.</li>\n<li>key, secret, passphrase - these are the actual api keys needed to execute orders on the exchange. Typically these will\nneed read and write permissions on orders, plus read permissions on balances/wallets. The actual fields required varies\nfrom exchange to exchange (eg coinbase pro requires a passphrase)</li>\n</ul>\n<p>It is possible to create multiple entries on the same exchange, as long as they have different <code>name</code>s. For example,\non Deribit you can create sub-accounts and create separate API keys for each one. You might also have multiple accounts\non some exchanges.`</p>\n<h2>Setting things up so you can run the bot from home</h2>\n<p>If you are planning on running the bot at home or from behind a firewall, and don't know how to (or can't) set up\nport forwarding on the network, then you'll need to create a secure tunnel.</p>\n<p><a href=\"https://ngrok.com/\">ngrok</a> is a great way to do this. Download it and set up a tunnel from a public url to\nyour server like so...</p>\n<pre><code class=\"language-bash\">ngrok http -bind-tls=true 3000\n</code></pre>\n<p>Where 3000 is the port number in your config files.</p>\n<p>This will show you the public address that you can use to access your bot from outside your network.\nThe main problem with this is that you'll get a different URL each time you run the command, which can be\ninconvienient, especially when trying to link this up to other services.</p>\n<p>However, for a $5 a month you can have a fixed domain that you can use every time, which is much better. You start\nit a bit like this...</p>\n<pre><code class=\"language-bash\">ngrok http -subdomain=myNewSubDomain -bind-tls=true 3000\n</code></pre>\n<p>I've kept these running for months at a time with no problems at all.</p>\n<h2>Set up an Email listener</h2>\n<p>There are many services out there that can receive emails and make an HTTP request with the details of the message.\nYou can use one of these to enable a method of converting emails into automated trades. This is especially useful\nwhen trying to trigger trades from TradingView, as it offers an option to send alerts via email for free.</p>\n<p>Here we'll cover setting up MailGun to do this, though you can use any service you are familiar with.</p>\n<ul>\n<li>Create an account at <a href=\"https://www.mailgun.com/\">MailGun</a></li>\n<li>Ideally set up a spare domain so MailGun handles its email. You do get a sandbox domain from Mailgun for free\nbut there are more limits on this and it may not be suitable.</li>\n<li>Go to the <code>Routes</code> section and add a new Route. These are used to filter incoming email and then forward\nthem on to a new destination. You can filter by from address, or a secret code you add to all the messages you\nwant to be forwarded to the bot.</li>\n<li>In the action for the Route, make sure you tick 'forward' and enter the full URL for your bot. If your bot\nis running at home behind a firewall, you'll need to have set up a tunnel first (see above).</li>\n<li>Save the rule and test it out. Any email you send to the address that matches you filtering settings should\nend up making a call to your bot if it is running and accessible from Mailguns servers.</li>\n</ul>\n<h2>Set up TradingView</h2>\n<p><a href=\"https://www.tradingview.com/\">TradingView</a> has a very powerful alerting system, allowing you to trigger an alert when any combination of\nindicators do something you consider important. You can also write your own indicators in PineScript and have\nthose fire alerts when interesting things happen too.</p>\n<p>TradingView will let you set up either a phone number for SMS alerts, or an email address for what it\ncalls SMS emails (I think this is meant to enable you to use an email to SMS service, as TradingView has a\nhard limit of only 500 SMS's, even on their most expensive account).</p>\n<p>I recommend using the SMS Email option, as there are no usage limits and it's just as easy to hook up\nan email-to-bot service as it is an SMS-to-bot service.</p>\n<p>Go to your TradingView settings page, and enter the SMS email address in the Private Details section\nof the page. You'll also need to set up that email address so it is forwarded to your bot, but there are\nsome tips on doing this above.</p>\n<h2>Set up SMS</h2>\n<p>This is actually pretty simple.</p>\n<ul>\n<li>Create a Twilio account</li>\n<li>To be able to send SMS messages out (for alerts or account updates), grab the API Credentials from\nthe Programmable SMS section and put these into your <code>config/local.json</code>, along with the number you'd\nlike the messages to be sent to.</li>\n<li>To receive SMS messages that are routed to Instabot Trader, create a new number and set it up\nto call a webhook when a message comes in. Enter the URL for your server and set it to HTTP POST.\nAny SMS sent to that number will be passed on to your server now.</li>\n</ul>\n<h2>Set up Slack</h2>\n<ul>\n<li>In slack create a new Webhook URL to send messages to the channel you want and paste it into the\n<code>config/local.json</code> (slack -&gt; webhook).</li>\n</ul>\n<h2>Set up Telegram</h2>\n<p>Before you can use the Telegram integration you'll need to create a telegram bot. Don't worry, it's\neasier than it sounds...</p>\n<ul>\n<li>First, in Telegram, you'll need to start a chat with @botFather to create your own chat bot token.\nThere are detailed instructions at\n<a href=\"https://core.telegram.org/bots#6-botfather\">https://core.telegram.org/bots#6-botfather</a>.</li>\n<li>Once you have a token, you can add it to the config in <code>config/local.json</code> and restart Instabot Trader.</li>\n<li>Now you can start a chat with your new bot. Type <code>/help</code> for the help text.</li>\n<li>Anything you say to the telegram bot will now to sent directly to Instabot Trader and will be treated\nas a regular message (commands and all). Because of this, it is recomended that you find out your telegram\nuser id (Instabot Trader will log this if you send a message to it) and save it in the <code>telegram.safeUser</code>\nsetting in your config. This will limit access to just that user id.</li>\n<li>To make things even simpler you can create some shortcuts that you can trigger\nTelegram using <code>/shortcut &lt;name&gt;</code>. The shortcuts are defined in your <code>config/local.json</code> as an array\nof objects. The example below can be executed using <code>/shortcut example</code>...</li>\n</ul>\n<pre><code>{\n    &quot;name&quot;: &quot;example&quot;,\n    &quot;message&quot;: &quot;Testing... bitfinex(BTCUSD) { wait(5s); } &quot;\n}\n</code></pre>\n<h2>Notifications</h2>\n<ul>\n<li><strong>alertOnStartup</strong> should be true or false. If true, a notification will be sent each time\nInstabot Trader starts.</li>\n<li><strong>default</strong> is an array containing the names of the channels to send messages to. If you provide\nmore than one channel, messages will be sent to all listed channels.</li>\n</ul>\n<hr>\n<h1 id=\"api-format\">Message Format</h1>\n<p>When a message is received, the following elements are looked for...</p>\n<h3>{!}</h3>\n<p>An explanation mark in curly brackets tells Instabot Trader to take all the text that is not\npart of a command / action list and send it to your default notification channel (notification channels\nare configured in your <code>local.json</code> config).</p>\n<p>This is great for simple alerts. For example, set up an alert in TradingView when the\nprice crosses an important line and set the alert text like this...</p>\n<pre><code>BTC now over 10K! {!}\n</code></pre>\n<p>You'll get a message 'BTC now over 10K!' sent to you on your configured channels (SMS, Slack or Telegram).\nThere are no commands in the message, so that's all that will happen.</p>\n<h3>Actions and commands</h3>\n<p>You can have as many of these as you like in a message. This makes it possible to trigger something\nthat will happen on multiple exchanges, or on multiple pairs/instruments on an exchange.\nAll the exchange blocks are executed simultaneously, allowing\nyou to be placing orders on different exchanges / pairs at the same time. The commands inside each block\nare executed one at a time.</p>\n<p>Lets look at an example and break it down so you can understand all the parts...</p>\n<pre><code>Going Long {!}\n\nbitfinex(BTCUSD) {\n   limitOrder(side=buy, amount=1, offset=5);\n   notify(msg=&quot;Order placed, on Bitfinex, for 1 BTC&quot;);\n}\n\nderibit(BTC-PERPETUAL) {\n   scaledOrder(position=10000, from=0, to=50, orderCount=30);\n   wait(30m);\n   cancelOrders(session);\n   marketOrder(position=10000);\n}\n</code></pre>\n<p>First up, we'll get sent an SMS with the message 'Going Long'.</p>\n<p>Next, there are 2 blocks. One will target Bitfinex and the second will target Deribit to place orders. Both will\nbe executed at the same time.</p>\n<p>The Bitfinex blocks starts by indicating which pair to trade on (BTCUSD in this example). The list of actions\nto run on the Bitfinex BTCUSD pair are contained between the open and close curly brackets. Each action looks\nlike a function call. It starts with the name of the command, then a list of parameters inside brackets.\nAn optional semi-colon can be seen in the example too.</p>\n<p>The arguments are all named (meaning they all take the form of <code>name = value</code>)and can be listed in any order.\nEach parameter is separated by a comma. The Bitfinex limitOrder action in the example above has 3 parameters -\n<code>side</code>, <code>amount</code> and <code>offset</code>. You'll notice that the <code>notify</code> action uses double quotes around it's value.\nThis is necessary as the value contains commas, but is optional if it does not.</p>\n<p>The actions in the block are executed one at a time. So in the Bitfinex example, the first command is\na limitOrder command. Note that it does not wait for the order to\nbe filled - it only waits until the order has been submitted and accepted by the exchange. Once the limit\norder has been placed, it moves on to the second action (sending a notification (SMS, Slack and Telegram supported)).</p>\n<p>The Deribit example shows this ordering more clearly. It will attempt to get into a position cheaply\nusing limit orders over a small price range. It will give this 30 minutes to work, then fall back to a market\norder to finalise the position if any of the limit orders were still unfilled.</p>\n<p>First we place a scaled order, which actually results\nin Instabot Trader placing 30 separate limit orders. How long this takes depends on the rate limits at the\nexchange and for your account (Deribit has pretty high limits, so can probably place all the orders in a\nfraction of a second. The same command on Bitfinex would take a lot longer to execute as it has much lower\nrate limits). Once all the orders are placed, it goes on to the second action, which just waits for 30 minutes.\nAfter 30 minutes it will cancel any outstanding orders that were created by the scaled order action and finally\nplace a market order to get us fully into position.</p>\n<hr>\n<h1 id=\"api-examples\">Examples</h1>\n<h4>Place a market order to buy 1 btc</h4>\n<pre><code>bitfinex(BTCUSD) {\n    marketOrder(side=buy, amount=1)\n}\n</code></pre>\n<h4>Adjust your open position so you own 1 btc, using a market order</h4>\n<pre><code>bitfinex(BTCUSD) {\n    marketOrder(position=1)\n}\n</code></pre>\n<h4>Place a limit order at $10 below the current price</h4>\n<pre><code>bitfinex(BTCUSD) {\n    limitOrder(side=buy, amount=1, offset=10);\n}\n</code></pre>\n<h4>Adjust your open position so you own 1 btc using a limit order</h4>\n<pre><code>bitfinex(BTCUSD) {\n    limitOrder(position=1, offset=10);\n}\n</code></pre>\n<h4>Kill everything - close all orders and close open positions</h4>\n<p>This works by cancelling all open orders and aiming for an open position of 0 contracts.\nIf the account was long, this would turn into a market sell. If short, a market buy.\nIf there were no open positions, no trade would be placed.</p>\n<pre><code>deribit(BTC-PERPETUAL) {\n    cancelOrders(all);\n    marketOrder(position=0);\n}\n</code></pre>\n<h4>Get your balance at Bitfinex and Deribit</h4>\n<p>Notification will be sent to your preferred channel (one or many of SMS, Telegram or Slack)</p>\n<pre><code>deribit(BTC-PERPETUAL) { balance() }\nbitfinex(BTCUSD) { balance() }\n</code></pre>\n<h4>Just send a message / alert</h4>\n<p>To your preferred notification channels (see config). Perfect for alerts when triggered from something like TradingView.</p>\n<pre><code>This text will be sent to SMS, Telegram or Slack {!}\n</code></pre>\n<h4>Enter a long position of 10,000 contracts over a period of time</h4>\n<p>A more complex example. This will place 30 limit orders over a $50 range,\nwith the aim of ending up 10,000 contracts long. After 30 minutes, cancel\nanything not yet filled and place a new range of orders in a tighter range\nclose to the current price again. Wait again, cancel anything not filled again\nand finally market buy any missing contracts. At the end, send a balance\nreport. The whole sequence will take around 1 hour to complete.</p>\n<pre><code>Going Long {!}\nderibit(BTC-PERPETUAL) {\n    scaledOrder(from=0, to=50, orderCount=30, position=10000, tag=firstGo);\n    wait(duration=30m);\n    cancelOrders(which=tagged, tag=firstGo);\n    scaledOrder(from=0, to=20, orderCount=30, position=10000, tag=secondGo);\n    wait(duration=30m);\n    cancelOrders(which=tagged, tag=secondGo);\n    marketOrder(position=10000);\n    balance();\n}\n</code></pre>\n<h4>Open a short position and set a stop loss $100 higher</h4>\n<pre><code>deribit(BTC-PERPETUAL) {\n    marketOrder(position=-1000);\n    stopMarketOrder(side=buy, amount=1000, offset=100);\n}\n</code></pre>\n<h4>Place a series of market orders over a 10 minute period</h4>\n<p>This will be done using 20 market orders at 30 second intervals. Once\nthe sequence is complete you will have an open position of 1000 contracts\n(regardless of what your open position was at the start)</p>\n<pre><code>deribit(BTC-PERPETUAL) {\n    steppedMarketOrder(orderCount=20, duration=10m, position=1000);\n}\n</code></pre>\n<h4>Buy on the next dip</h4>\n<p>Attempt to accumulate 10 btc in total, roughly 0.1 btc at a time (it will vary the amount randomly within 10% of 0.1),\nwhen the price dips 0.4% and as long as the price remains below $4000. It will keep trying for 1 day.</p>\n<pre><code>bitfinex(BTCUSD) {\n    icebergOrder(side=buy, totalAmount=10, averageAmount=0.1, variance=0.4%, limitPrice=4000, timeLimit=1d);\n}\n</code></pre>\n<h4>Start a simple market maker bot running</h4>\n<p>This will create a simple market maker bot.\nEach time an order is filled, a matching order is placed on the other side of the book.\nThese trades will actually run forever (or until they are cancelled).</p>\n<pre><code>bitfinex(BTCUSD) {\n  marketMakerOrder(\n    bidAmount=0.1, bidStep=5, bidCount=40,\n    askAmount=0.1, askStep=5, askCount=40,\n    spread=30,\n    autoBalance=limit, autoBalanceAt=10%)\n}\n</code></pre>\n"  },  "footer": {    "title": "License",    "content": "<h2>License</h2>\n<p>Copyright 2018 Instabot</p>\n<p>Permission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the &quot;Software&quot;), to deal in the\nSoftware without restriction, including without limitation the rights to use, copy,\nmodify, merge, publish, distribute, sublicense, and/or sell copies of the Software,\nand to permit persons to whom the Software is furnished to do so, subject to the\nfollowing conditions:</p>\n<p>The above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.</p>\n<p>THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,\nINCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A\nPARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT\nHOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION\nOF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE\nSOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>\n"  },  "sampleUrl": false,  "defaultVersion": "0.0.0",  "apidoc": "0.3.0",  "generator": {    "name": "apidoc",    "time": "2019-09-07T11:09:39.555Z",    "url": "http://apidocjs.com",    "version": "0.17.7"  }});
