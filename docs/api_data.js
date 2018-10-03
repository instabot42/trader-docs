define({ "api": [  {    "type": "",    "url": "account",    "title": "account",    "name": "account",    "version": "1.0.0",    "description": "<p>Send a notification with account balances</p>",    "group": "Actions",    "success": {      "examples": [        {          "title": "Example",          "content": "# Place a limit order to go all in, wait 30 minutes for it to fill\n# then replace it with a market order if it wasn't filled\nbitfinex(BTCUSD) {\n    account();\n}",          "type": "json"        }      ]    },    "filename": "src/commands.js",    "groupTitle": "Actions"  },  {    "type": "",    "url": "cancelOrders",    "title": "cancelOrders",    "name": "cancelOrders",    "version": "1.0.0",    "description": "<p>Attempts to cancel open orders</p>",    "group": "Actions",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "allowedValues": [              "\"buy\"",              "\"sell\"",              "\"all\"",              "\"session\"",              "\"tagged\""            ],            "optional": false,            "field": "which",            "defaultValue": "session",            "description": "<p>Which orders should we cancel.<br> <code>buy</code> will cancel all open buy orders.<br> <code>sell</code> will cancel all open sell orders.<br> <code>all</code> will cancel all open orders.<br> <code>session</code> will cancel all orders opened during the execution of this list of actions.<br> <code>tagged</code> will cancel all orders tagged with the value of <code>tag</code></p>"          },          {            "group": "Parameter",            "type": "String",            "optional": true,            "field": "tag",            "description": "<p>If <code>which</code> is 'tagged', then this is the tag we will look for.</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Example",          "content": "# Place a limit order to go all in, wait 30 minutes for it to fill\n# then replace it with a market order if it wasn't filled\nbitfinex(BTCUSD) {\n    limitOrder(side=buy, amount=100%, offset=10, tag=allIn)\n    wait(30m);\n    cancelOrders(tagged, allIn)\n}",          "type": "json"        }      ]    },    "filename": "src/commands.js",    "groupTitle": "Actions"  },  {    "type": "",    "url": "limitOrder",    "title": "limitOrder",    "name": "limitOrder",    "version": "1.0.0",    "description": "<p>Place a limit order.</p>",    "group": "Actions",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "allowedValues": [              "\"buy\"",              "\"sell\""            ],            "optional": true,            "field": "side",            "defaultValue": "buy",            "description": "<p>Is this a buy or sell order. You should include this, or <code>position</code>.</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "offset",            "defaultValue": "0",            "description": "<p>The offset from the current price. For a buy order, this value is how far below the current price, and for sell orders, how far above the current price. You can also use a percentage (eg 1%). This will calculate the offset as a percentage of the current price. For example, if the current price is $1000 and offset is <code>1%</code> then the order will be placed $10 away from the current price.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": true,            "field": "tag",            "description": "<p>tag this order, so you can cancel it later in the action list if needed.</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": true,            "field": "amount",            "defaultValue": "0",            "description": "<p>The size of the order. Required if <code>position</code> is not used. <br><br> How the amount if interpreted depends on the exchange. Spot exchanges like Bitfinex will treat the amount as the quantity of the asset to buy or sell. For example, on the BTCUSD pair the amount would be measured in BTC. These exchanges also allow you to express the amount as a percentage of either your total account value (eg, 50%), or as a percentage of your available funds (eg, 50%%).<br><br> On Futures exchanges like Bitmex and Deribit, all trades are expressed in <code>contracts</code>, so the amount would be the number of contracts to buy or sell. Normally you can only trade a whole number of contracts, and the percentage values are not supported.<br><br></p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": true,            "field": "position",            "description": "<p>Target position size is only supported on Bitmex and Deribit.<br><br> On these exchanges you can pass in the target position size, instead of passing <code>side</code> and <code>amount</code> values.<br><br> The amount traded will be the difference between your current open position and the target position size. For example, if your current position is -100 contracts (you're short 100 contracts), and you pass in a position of 300, the an order will be placed to buy 400 contracts. This ensures we get from the current -100 to our desired target of +300.</p>"          }        ]      }    },    "error": {      "fields": {        "Compatibility": [          {            "group": "Compatibility",            "optional": false,            "field": "bitfinex",            "description": "<p>Does not support <code>position</code></p>"          },          {            "group": "Compatibility",            "optional": false,            "field": "deribit",            "description": "<p>Does not support <code>%</code> or <code>%%</code> units in <code>amount</code></p>"          },          {            "group": "Compatibility",            "optional": false,            "field": "bitmex",            "description": "<p>Does not support <code>%</code> or <code>%%</code> units in <code>amount</code></p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Bitfinex Example",          "content": "# On Bitfinex BTCUSD pair, place a limit order for 1btc\nbitfinex(BTCUSD) {\n    limitOrder(side=buy, amount=1, offset=10);\n}",          "type": "json"        },        {          "title": "Deribit Example",          "content": "# On Deribit BTC-PERPETUAL contact, update our open position to +1000 contracts\n# if the price drop $50\nderibit(BTC-PERPETUAL) {\n    limitOrder(position=1000, offset=50);\n}",          "type": "json"        }      ]    },    "filename": "src/commands.js",    "groupTitle": "Actions"  },  {    "type": "",    "url": "marketOrder",    "title": "marketOrder",    "name": "marketOrder",    "version": "1.0.0",    "description": "<p>Place a market order.</p>",    "group": "Actions",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "allowedValues": [              "\"buy\"",              "\"sell\""            ],            "optional": true,            "field": "side",            "defaultValue": "buy",            "description": "<p>Is this a buy or sell order. Required if <code>position</code> is not used.</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": true,            "field": "amount",            "defaultValue": "0",            "description": "<p>The size of the order. Required if <code>position</code> is not used. <br><br> How the amount if interpreted depends on the exchange. Spot exchanges like Bitfinex will treat the amount as the quantity of the asset to buy or sell. For example, on the BTCUSD pair the amount would be measured in BTC. These exchanges also allow you to express the amount as a percentage of either your total account value (eg, 50%), or as a percentage of your available funds (eg, 50%%).<br><br> On Futures exchanges like Bitmex and Deribit, all trades are expressed in <code>contracts</code>, so the amount would be the number of contracts to buy or sell. Normally you can only trade a whole number of contracts, and the percentage values are not supported.<br><br></p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": true,            "field": "position",            "description": "<p>Target position size is only supported on Bitmex and Deribit.<br><br> On these exchanges you can pass in the target position size, instead of passing <code>side</code> and <code>amount</code> values.<br><br> The amount traded will be the difference between your current open position and the target position size. For example, if your current position is -100 contracts (you're short 100 contracts), and you pass in a position of 300, the an order will be placed to buy 400 contracts. This ensures we get from the current -100 to our desired target of +300.</p>"          }        ]      }    },    "error": {      "fields": {        "Compatibility": [          {            "group": "Compatibility",            "optional": false,            "field": "bitfinex",            "description": "<p>Does not support <code>position</code></p>"          },          {            "group": "Compatibility",            "optional": false,            "field": "deribit",            "description": "<p>Does not support <code>%</code> or <code>%%</code> units in <code>amount</code></p>"          },          {            "group": "Compatibility",            "optional": false,            "field": "bitmex",            "description": "<p>Does not support <code>%</code> or <code>%%</code> units in <code>amount</code></p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Bitfinex Example",          "content": "# On Bitfinex BTCUSD pair, place a market order for 1btc\nbitfinex(BTCUSD) {\n    marketOrder(side=buy, amount=1);\n}",          "type": "json"        },        {          "title": "Deribit Example",          "content": "# On Deribit BTC-PERPETUAL contact, update our open position to +1000 contracts\nderibit(BTC-PERPETUAL) {\n    marketOrder(position=1000);\n}",          "type": "json"        }      ]    },    "filename": "src/commands.js",    "groupTitle": "Actions"  },  {    "type": "",    "url": "scaledOrder",    "title": "scaledOrder",    "name": "scaledOrder",    "version": "1.0.0",    "description": "<p>Place a series of limit orders over a range of prices</p>",    "group": "Actions",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": true,            "field": "from",            "defaultValue": "0",            "description": "<p>The offset from the current price to start placing orders.</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": true,            "field": "to",            "defaultValue": "50",            "description": "<p>The offset from the current price to finish placing orders.</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": true,            "field": "orderCount",            "defaultValue": "20",            "description": "<p>The number of orders to place between <code>from</code> and <code>to</code>.</p>"          },          {            "group": "Parameter",            "type": "String",            "allowedValues": [              "\"buy\"",              "\"sell\""            ],            "optional": true,            "field": "side",            "defaultValue": "buy",            "description": "<p>Is this a buy or sell order. Required if not using <code>position</code></p>"          },          {            "group": "Parameter",            "type": "String",            "optional": true,            "field": "tag",            "description": "<p>All the orders placed as part of the scaled order will be tagged with this.</p>"          },          {            "group": "Parameter",            "type": "String",            "allowedValues": [              "\"linear\"",              "\"ease-in\"",              "\"ease-out\"",              "\"ease-in-out\""            ],            "optional": true,            "field": "easing",            "defaultValue": "linear",            "description": "<p>The easing method to use when spacing the orders out in the range between <code>from</code> and <code>to</code>.<br> <code>linear</code> will place all the orders evenly spaced out between <code>from</code> and <code>to</code>.<br> <code>ease-in</code> will bunch the orders up closer to <code>from</code>.<br> <code>ease-out</code> will bunch up the orders closer to <code>to</code>.<br> <code>ease-in-out</code> will bunch the orders up closer to <code>from</code> and <code>to</code> away from the middle of the range.</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": true,            "field": "amount",            "defaultValue": "0",            "description": "<p>The size of the order. Required if <code>position</code> is not used. <br><br> How the amount if interpreted depends on the exchange. Spot exchanges like Bitfinex will treat the amount as the quantity of the asset to buy or sell. For example, on the BTCUSD pair the amount would be measured in BTC. These exchanges also allow you to express the amount as a percentage of either your total account value (eg, 50%), or as a percentage of your available funds (eg, 50%%).<br><br> On Futures exchanges like Bitmex and Deribit, all trades are expressed in <code>contracts</code>, so the amount would be the number of contracts to buy or sell. Normally you can only trade a whole number of contracts, and the percentage values are not supported.<br><br></p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": true,            "field": "position",            "description": "<p>Target position size is only supported on Bitmex and Deribit.<br><br> On these exchanges you can pass in the target position size, instead of passing <code>side</code> and <code>amount</code> values.<br><br> The amount traded will be the difference between your current open position and the target position size. For example, if your current position is -100 contracts (you're short 100 contracts), and you pass in a position of 300, the an order will be placed to buy 400 contracts. This ensures we get from the current -100 to our desired target of +300.</p>"          }        ]      }    },    "error": {      "fields": {        "Compatibility": [          {            "group": "Compatibility",            "optional": false,            "field": "bitfinex",            "description": "<p>Does not support <code>position</code></p>"          },          {            "group": "Compatibility",            "optional": false,            "field": "deribit",            "description": "<p>Does not support <code>%</code> or <code>%%</code> units in <code>amount</code></p>"          },          {            "group": "Compatibility",            "optional": false,            "field": "bitmex",            "description": "<p>Does not support <code>%</code> or <code>%%</code> units in <code>amount</code></p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Deribit Example",          "content": "# On Deribit BTC-PERPETUAL contact, place 20 buy orders between $5 and $100 orders below\n# the current price. Each order will be for 0.05btc.\nderibit(BTC-PERPETUAL) {\n    scaledOrder(from=5, to=100, orderCount=20, amount=1, side=buy, tag=scaleMeIn);\n}",          "type": "json"        }      ]    },    "filename": "src/commands.js",    "groupTitle": "Actions"  },  {    "type": "",    "url": "slack",    "title": "slack",    "name": "slack",    "version": "1.0.0",    "description": "<p>Send a notification to Slack if it is configured</p>",    "group": "Actions",    "success": {      "examples": [        {          "title": "Example",          "content": "bitfinex(BTCUSD) {\n    slack(msg=\"BUY BUY BUY, MOON, LAMBO, ETC\");\n}",          "type": "json"        }      ]    },    "filename": "src/commands.js",    "groupTitle": "Actions"  },  {    "type": "",    "url": "sms",    "title": "sms",    "name": "sms",    "version": "1.0.0",    "description": "<p>Send a notification to your phone</p>",    "group": "Actions",    "success": {      "examples": [        {          "title": "Example",          "content": "bitfinex(BTCUSD) {\n    sms(msg=\"BUY BUY BUY, MOON, LAMBO, ETC\");\n}",          "type": "json"        }      ]    },    "filename": "src/commands.js",    "groupTitle": "Actions"  },  {    "type": "",    "url": "steppedMarketOrder",    "title": "steppedMarketOrder",    "name": "steppedMarketOrder",    "version": "1.0.0",    "description": "<p>Place a series of market orders over an extended period of time. The amount will be split between all the orders. After each market order is executed there will be a delay for <code>(duration / orderCount)</code> seconds. For example, if duration is 60 seconds, and the orderCount is 10, then there will be a (60 / 10) = 6 second delay between each order.</p>",    "group": "Actions",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": true,            "field": "orderCount",            "defaultValue": "20",            "description": "<p>The number of orders to place.</p>"          },          {            "group": "Parameter",            "type": "String",            "allowedValues": [              "\"buy\"",              "\"sell\""            ],            "optional": true,            "field": "side",            "defaultValue": "buy",            "description": "<p>Is this a buy or sell order. Required if not using <code>position</code></p>"          },          {            "group": "Parameter",            "type": "TimeString",            "optional": true,            "field": "duration",            "defaultValue": "60s",            "description": "<p>The amount of time to spread the orders over. Supports a number in seconds, or s, m, or h suffix for seconds, minutes and hours (eg 5m = 5 minutes, 2h = 2 hours)</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": true,            "field": "amount",            "defaultValue": "0",            "description": "<p>The size of the order. Required if <code>position</code> is not used. <br><br> How the amount if interpreted depends on the exchange. Spot exchanges like Bitfinex will treat the amount as the quantity of the asset to buy or sell. For example, on the BTCUSD pair the amount would be measured in BTC. These exchanges also allow you to express the amount as a percentage of either your total account value (eg, 50%), or as a percentage of your available funds (eg, 50%%).<br><br> On Futures exchanges like Bitmex and Deribit, all trades are expressed in <code>contracts</code>, so the amount would be the number of contracts to buy or sell. Normally you can only trade a whole number of contracts, and the percentage values are not supported.<br><br></p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": true,            "field": "position",            "description": "<p>Target position size is only supported on Bitmex and Deribit.<br><br> On these exchanges you can pass in the target position size, instead of passing <code>side</code> and <code>amount</code> values.<br><br> The amount traded will be the difference between your current open position and the target position size. For example, if your current position is -100 contracts (you're short 100 contracts), and you pass in a position of 300, the an order will be placed to buy 400 contracts. This ensures we get from the current -100 to our desired target of +300.</p>"          }        ]      }    },    "error": {      "fields": {        "Compatibility": [          {            "group": "Compatibility",            "optional": false,            "field": "bitfinex",            "description": "<p>Does not support <code>position</code></p>"          },          {            "group": "Compatibility",            "optional": false,            "field": "deribit",            "description": "<p>Does not support <code>%</code> or <code>%%</code> units in <code>amount</code></p>"          },          {            "group": "Compatibility",            "optional": false,            "field": "bitmex",            "description": "<p>Does not support <code>%</code> or <code>%%</code> units in <code>amount</code></p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Deribit Example",          "content": "# On Deribit BTC-PERPETUAL contact, place 20 buy orders spread over a 10 minute period\n# in order to buy 1 btc.\nderibit(BTC-PERPETUAL) {\n    steppedMarketOrder(orderCount=20, amount=1, side=buy, duration=10m);\n}",          "type": "json"        }      ]    },    "filename": "src/commands.js",    "groupTitle": "Actions"  },  {    "type": "",    "url": "wait",    "title": "wait",    "name": "wait",    "version": "1.0.0",    "description": "<p>Waits for a given amount of time before proceeding to the next command...</p>",    "group": "Actions",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "TimeString",            "optional": false,            "field": "duration",            "defaultValue": "60s",            "description": "<p>The number of seconds to wait. Can also include units, so <code>10</code> is 10 seconds, <code>10s</code> is also 10 seconds, <code>10m</code> is 10 minutes and <code>10h</code> is 10 hours.</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Example",          "content": "# Place a limit order to go all in, wait 30 minutes for it to fill\n# then replace it with a market order if it wasn't filled\nbitfinex(BTCUSD) {\n    limitOrder(side=buy, amount=100%, offset=10, tag=allIn)\n    wait(30m);\n    cancelOrders(tagged, allIn)\n    marketOrder(side=buy, amount=100%);\n}",          "type": "json"        }      ]    },    "filename": "src/commands.js",    "groupTitle": "Actions"  }] });
