/**
 * @apiDefine defaultVersion
 *
 * @apiVersion 1.0.0
 */

/**
 * @apiDefine AmountInfo
 * @apiParam {Number} [amount=0] The size of the order. Required if `position` is not used. <br><br>
 *                              How the amount if interpreted depends on the exchange. Spot exchanges like
 *                              Bitfinex will treat the amount as the quantity of the asset to buy or sell.
 *                              For example, on the BTCUSD pair the amount would be measured in BTC. These
 *                              exchanges also allow you to express the amount as a percentage of either your
 *                              total account value (eg, 50%), or as a percentage of your available funds (eg, 50%%).<br><br>
 *                              On Futures exchanges like Bitmex and Deribit, all trades are expressed in `contracts`,
 *                              so the amount would be the number of contracts to buy or sell. Normally you can only
 *                              trade a whole number of contracts, and the percentage values are not supported.<br><br>
 *
 */

/**
 * @apiDefine PositionInfo
 * @apiParam {Number} [position] Target position size is only supported on Bitmex and Deribit.<br><br>
*                                On these exchanges you can pass in the
 *                              target position size, instead of passing `side` and `amount` values.<br><br>
 *                                  The amount traded will be the
 *                              difference between your current open position and the target position size.
 *                              For example, if your current position is -100 contracts (you're short 100 contracts),
 *                              and you pass in a position of 300, the an order will be placed to buy 400 contracts.
 *                              This ensures we get from the current -100 to our desired target of +300.
 *
 */


/**
 * @api wait wait
 * @apiName wait
 * @apiVersion 1.0.0
 * @apiDescription Waits for a given amount of time before proceeding to the
 * next command...
 * @apiGroup Actions
 *
 * @apiParam {TimeString} duration=60s The number of seconds to wait. Can also
 *           include units, so `10` is 10 seconds, `10s` is also 10 seconds, `10m`
 *           is 10 minutes and `10h` is 10 hours.
 *
 *
 * @apiSuccessExample Example
 *      # Place a limit order to go all in, wait 30 minutes for it to fill
 *      # then replace it with a market order if it wasn't filled
 *      bitfinex(BTCUSD) {
 *          limitOrder(side=buy, amount=100%, offset=10, tag=allIn)
 *          wait(30m);
 *          cancelOrders(tagged, allIn)
 *          marketOrder(side=buy, amount=100%);
 *      }
 *
 */




/**
 * @api cancelOrders cancelOrders
 * @apiName cancelOrders
 * @apiVersion 1.0.0
 * @apiDescription Attempts to cancel open orders
 * @apiGroup Actions
 *
 * @apiParam {String="buy","sell", "all", "session","tagged"} which=session Which orders should we cancel.<br>
 *                      `buy` will cancel all open buy orders.<br>
 *                      `sell` will cancel all open sell orders.<br>
 *                      `all` will cancel all open orders.<br>
 *                      `session` will cancel all orders opened during the execution of this list of actions.<br>
 *                      `tagged` will cancel all orders tagged with the value of `tag`
 * @apiParam {String} [tag] If `which` is 'tagged', then this is the tag we will look for.
 *
 *
 * @apiSuccessExample Example
 *      # Place a limit order to go all in, wait 30 minutes for it to fill
 *      # then replace it with a market order if it wasn't filled
 *      bitfinex(BTCUSD) {
 *          limitOrder(side=buy, amount=100%, offset=10, tag=allIn)
 *          wait(30m);
 *          cancelOrders(tagged, allIn)
 *      }
 *
 */


/**
 * @api account account
 * @apiName account
 * @apiVersion 1.0.0
 * @apiDescription Send a notification with account balances
 * @apiGroup Actions
 *
 * @apiSuccessExample Example
 *      # Place a limit order to go all in, wait 30 minutes for it to fill
 *      # then replace it with a market order if it wasn't filled
 *      bitfinex(BTCUSD) {
 *          account();
 *      }
 *
 */

/**
 * @api slack slack
 * @apiName slack
 * @apiVersion 1.0.0
 * @apiDescription Send a notification to Slack if it is configured
 * @apiGroup Actions
 *
 * @apiSuccessExample Example
 *      bitfinex(BTCUSD) {
 *          slack(msg="BUY BUY BUY, MOON, LAMBO, ETC");
 *      }
 *
 */


/**
 * @api sms sms
 * @apiName sms
 * @apiVersion 1.0.0
 * @apiDescription Send a notification to your phone
 * @apiGroup Actions
 *
 * @apiSuccessExample Example
 *      bitfinex(BTCUSD) {
 *          sms(msg="BUY BUY BUY, MOON, LAMBO, ETC");
 *      }
 *
 */




/**
 * @api limitOrder limitOrder
 * @apiName limitOrder
 * @apiVersion 1.0.0
 * @apiDescription Place a limit order.
 * @apiGroup Actions
 *
 * @apiParam {String="buy","sell"} [side=buy] Is this a buy or sell order. You should include this, or `position`.
 * @apiParam {Number} offset=0 The offset from the current price. For a buy order, this value is how far below
 *                              the current price, and for sell orders, how far above the current price.
 *                              You can also use a percentage (eg 1%). This will calculate the offset as a percentage
 *                              of the current price. For example, if the current price is $1000 and offset is `1%`
 *                              then the order will be placed $10 away from the current price.
 * @apiUse AmountInfo
 * @apiUse PositionInfo
 * @apiParam {String} [tag] tag this order, so you can cancel it later in the action list if needed.
 *
 *
 * @apiError (Compatibility) bitfinex Does not support `position`
 * @apiError (Compatibility) deribit Does not support `%` or `%%` units in `amount`
 * @apiError (Compatibility) bitmex Does not support `%` or `%%` units in `amount`
 *
 *
 * @apiSuccessExample Bitfinex Example
 *      # On Bitfinex BTCUSD pair, place a limit order for 1btc
 *      bitfinex(BTCUSD) {
 *          limitOrder(side=buy, amount=1, offset=10);
 *      }
 *
 * @apiSuccessExample Deribit Example
 *      # On Deribit BTC-PERPETUAL contact, update our open position to +1000 contracts
 *      # if the price drop $50
 *      deribit(BTC-PERPETUAL) {
 *          limitOrder(position=1000, offset=50);
 *      }
 *
 *
 *
 */




/**
 * @api marketOrder marketOrder
 * @apiName marketOrder
 * @apiVersion 1.0.0
 * @apiDescription Place a market order.
 * @apiGroup Actions
 *
 * @apiParam {String="buy","sell"} [side=buy] Is this a buy or sell order. Required if `position` is not used.
 * @apiUse AmountInfo
 * @apiUse PositionInfo
 *
 * @apiError (Compatibility) bitfinex Does not support `position`
 * @apiError (Compatibility) deribit Does not support `%` or `%%` units in `amount`
 * @apiError (Compatibility) bitmex Does not support `%` or `%%` units in `amount`
 *
 *
 * @apiSuccessExample Bitfinex Example
 *      # On Bitfinex BTCUSD pair, place a market order for 1btc
 *      bitfinex(BTCUSD) {
 *          marketOrder(side=buy, amount=1);
 *      }
 *
 * @apiSuccessExample Deribit Example
 *      # On Deribit BTC-PERPETUAL contact, update our open position to +1000 contracts
 *      deribit(BTC-PERPETUAL) {
 *          marketOrder(position=1000);
 *      }
 *
 *
 *
 */





/**
 * @api scaledOrder scaledOrder
 * @apiName scaledOrder
 * @apiVersion 1.0.0
 * @apiDescription Place a series of limit orders over a range of prices
 * @apiGroup Actions
 *
 * @apiParam {Number} [from=0] The offset from the current price to start placing orders.
 * @apiParam {Number} [to=50] The offset from the current price to finish placing orders.
 * @apiParam {Number} [orderCount=20] The number of orders to place between `from` and `to`.
 * @apiParam {String="buy","sell"} [side=buy] Is this a buy or sell order. Required if not using `position`
 * @apiUse AmountInfo
 * @apiUse PositionInfo
 * @apiParam {String} [tag] All the orders placed as part of the scaled order will be tagged with this.
 * @apiParam {String="linear","ease-in","ease-out","ease-in-out"} [easing=linear] The easing method to use when spacing the orders out in the range between
 *                              `from` and `to`.<br>
 *                              `linear` will place all the orders evenly spaced out between `from` and `to`.<br>
 *                              `ease-in` will bunch the orders up closer to `from`.<br>
 *                              `ease-out` will bunch up the orders closer to `to`.<br>
 *                              `ease-in-out` will bunch the orders up closer to `from` and `to` away from the middle of the range.
 *
 *
 * @apiError (Compatibility) bitfinex Does not support `position`
 * @apiError (Compatibility) deribit Does not support `%` or `%%` units in `amount`
 * @apiError (Compatibility) bitmex Does not support `%` or `%%` units in `amount`
 *
 *
 * @apiSuccessExample Deribit Example
 *      # On Deribit BTC-PERPETUAL contact, place 20 buy orders between $5 and $100 orders below
 *      # the current price. Each order will be for 0.05btc.
 *      deribit(BTC-PERPETUAL) {
 *          scaledOrder(from=5, to=100, orderCount=20, amount=1, side=buy, tag=scaleMeIn);
 *      }
 *
 *
 */




/**
 * @api steppedMarketOrder steppedMarketOrder
 * @apiName steppedMarketOrder
 * @apiVersion 1.0.0
 * @apiDescription Place a series of market orders over an extended period of time. The amount will be split
 *                      between all the orders. After each market order is executed there will be a delay for
 *                      `(duration / orderCount)` seconds. For example, if duration is 60 seconds, and the
 *                      orderCount is 10, then there will be a (60 / 10) = 6 second delay between each order.
 * @apiGroup Actions
 *
 * @apiParam {Number} [orderCount=20] The number of orders to place.
 * @apiParam {String="buy","sell"} [side=buy] Is this a buy or sell order. Required if not using `position`
 * @apiUse AmountInfo
 * @apiUse PositionInfo
 * @apiParam {TimeString} [duration=60s] The amount of time to spread the orders over. Supports a number in seconds,
 *                              or s, m, or h suffix for seconds, minutes and hours (eg 5m = 5 minutes, 2h = 2 hours)
 *
 *
 * @apiError (Compatibility) bitfinex Does not support `position`
 * @apiError (Compatibility) deribit Does not support `%` or `%%` units in `amount`
 * @apiError (Compatibility) bitmex Does not support `%` or `%%` units in `amount`
 *
 *
 * @apiSuccessExample Deribit Example
 *      # On Deribit BTC-PERPETUAL contact, place 20 buy orders spread over a 10 minute period
 *      # in order to buy 1 btc.
 *      deribit(BTC-PERPETUAL) {
 *          steppedMarketOrder(orderCount=20, amount=1, side=buy, duration=10m);
 *      }
 *
 *
 */

