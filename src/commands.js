/**
 * @apiDefine defaultVersion
 *
 * @apiVersion 1.0.0
 */

/**
 * @apiDefine OffsetInfo
 * @apiParam {Number} offset=0 The offset from the current price or absolute price. Examples...<br><br>
 *                              `50` - offset $50 from the current price (below for buys, above for sells)<br>
 *                              `5%` - offset 5% of the current price (eg price is $1000, offset $50 from it)<br>
 *                              `@950` - absolute price of 950, regardless of what the current price is
 *                              (so not an offset at all really, but still useful).
 *
 */


/**
 * @apiDefine TagInfo
 * @apiParam {String} [tag] Tag this order with the value given, so it can be canceled later in the action list with `cancelOrders()`.
 *
 */

/**
 * @apiDefine SideInfo
 * @apiParam {String="buy","sell"} [side=buy] Is this a buy or sell order. Required if `position` is not used.
 *
 */


/**
 * @apiDefine AmountInfo
 * @apiParam {Number} [amount=0] The size of the order.<br><br>
 *                              How the amount if interpreted depends on the exchange. Spot exchanges like
 *                              Bitfinex will treat the amount as the quantity of the asset to buy or sell.
 *                              For example, on the BTCUSD pair the amount would be measured in BTC. These
 *                              exchanges also allow you to express the amount as a percentage of either your
 *                              total account value (eg, 50%), or as a percentage of your available funds (eg, 50%%).<br><br>
 *                              On Futures exchanges like Bitmex and Deribit, all trades are expressed in `contracts`,
 *                              so the amount would be the number of contracts to buy or sell. Normally you can only
 *                              trade a whole number of contracts, and the percentage values are not supported.<br><br>
 *                              Required if `position` is not used.
 *
 */

/**
 * @apiDefine PositionInfo
 * @apiParam {Number} [position] Sets the target position size, which is the size of your open position after
 *                              the trade completes. If you use `position`, then you do not need to use `side`
 *                              or `amount` as these are calculated for you.<br><br>
 *                                  The amount traded will be the
 *                              difference between your current open position and the target position size.
 *                              For example, if your current position is -100 contracts (you're short 100 contracts),
 *                              and you pass in a position of 300, then an order will be placed to buy 400 contracts.
 *                              This ensures we get from the current -100 to our desired target of +300.<br><br>
 *                              On spot exchanges, like Bitfinex, the target amount represents the amount of the
 *                              asset you'd like to end up with. For example, on the BTCUSD pair, position would
 *                              represent the amount of BTC you'd like to own after the order completes. If your
 *                              balance is current 4 btc and you set `position` to 3, it will result in a sell of
 *                              1btc (to take you from the current 4 btc balance to teh desired 3 btc balance).
 *                              However, if your balance was 0 btc, then it would result in a buy of 3 btc.<br<br>
 *                              Note that the amount to actually trade is calculated from your current
 *                              open position at the moment the
 *                              action is executed and does not take into account other open orders.<br><br>
 *                              If you do not have enough funds to complete the order, all available funds will be used
 *                              to get as close as possible to the target position.<br><br>
 *                              Required if `side` and `amount` are not used. `side` and `amount` are ignored
 *                              if `position` is used.
 *
 */


/**
 * @api wait wait
 * @apiName wait
 * @apiVersion 1.0.0
 * @apiDescription Waits for a given amount of time before proceeding to the
 * next command...
 * @apiGroup Command Reference
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
 * @apiGroup Command Reference
 *
 * @apiParam {String="buy","sell", "all", "session","tagged"} which=session Which orders should we cancel.<br>
 *                      `buy` will cancel all open buy orders.<br>
 *                      `sell` will cancel all open sell orders.<br>
 *                      `all` will cancel all open orders.<br>
 *                      `session` will cancel all orders opened during the execution of this list of actions.<br>
 *                      `tagged` will cancel all orders tagged with the value of `tag` that were created in the current session.
 * @apiParam {String} [tag] If `which` is 'tagged', then this is the tag we will look for.
 *
 *
 * @apiSuccessExample Example
 *      # Place a limit order to go all in, wait 30 minutes for it to fill
 *      # then cancel the order if it's not fully filled.
 *      bitfinex(BTCUSD) {
 *          limitOrder(side=buy, amount=100%, offset=10, tag=allIn)
 *          wait(30m);
 *          cancelOrders(tagged, allIn)
 *      }
 *
 */


/**
 * @api balance balance
 * @apiName balance
 * @apiVersion 1.0.0
 * @apiDescription Send a notification to your default notification channels with a balance report for the exchange and instrument the command is running in.
 * @apiGroup Command Reference
 *
 * @apiSuccessExample Example
 *      # send me a notification with the balance of the BTCUSD pair on Bitfinex
 *      bitfinex(BTCUSD) {
 *          balance()
 *      }
 *
 */

/**
 * @api notify notify
 * @apiName notify
 * @apiVersion 1.0.0
 * @apiDescription Send a notification to one of the supported notification channels
 * @apiGroup Command Reference
 *
 *
 * @apiParam {String} msg The message to send. Use slack shortcodes for emoji when sending to Slack.
 * @apiParam {String} [title] The title of an attachment to include with the message.
 * @apiParam {String} [color] The hex color to use for the attachment side bar (css style
 *                              like #ff0000), or one of `good` (green), `warning` (yellow) or `danger` (red).
 * @apiParam {String} [text] The text to use in the attachment area.
 * @apiParam {String="sms","slack","telegram"} [who=default] Which channel to send the message to. By default it sends to the channel
 *                          configured in your `config/local.json` file, but you can specify the channel here.
 *                          SMS, Slack and Telegram are supported channels.
 *
 * @apiError (Compatibility) Telegram Instabot Trader can only send messages to telegram after you've started a chat.
 * @apiError (Compatibility) Slack `title`, `color` and `text` are really for sending '[attachments](https://api.slack.com/docs/message-attachments)' to Slack - other services are ignoring these for now.
 *
 * @apiSuccessExample Example
 *      bitfinex(BTCUSD) {
 *          notify(msg="BUY BUY BUY, MOON, LAMBO, ETC");
 *      }
 *
 */


/**
 * @api limitOrder limitOrder
 * @apiName limitOrder
 * @apiVersion 1.0.0
 * @apiDescription Place a limit order.
 * @apiGroup Command Reference
 *
 * @apiUse OffsetInfo
 * @apiUse PositionInfo
 * @apiUse SideInfo
 * @apiUse AmountInfo
 * @apiUse TagInfo
 *
 *
 * @apiError (Compatibility) deribit Does not support `%` or `%%` units in `amount`
 *
 *
 * @apiSuccessExample Bitfinex Example
 *      # On Bitfinex BTCUSD pair, place a limit order to buy 1btc at a price $10 below the current price
 *      bitfinex(BTCUSD) {
 *          limitOrder(side=buy, amount=1, offset=10);
 *      }
 *
 * @apiSuccessExample Deribit Example
 *      # On Deribit BTC-PERPETUAL contact, update our open position to +1000 contracts
 *      # if the price drops $50
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
 * @apiGroup Command Reference
 *
 * @apiUse PositionInfo
 * @apiUse SideInfo
 * @apiUse AmountInfo
 *
 * @apiError (Compatibility) deribit Does not support `%` or `%%` units in `amount`
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
 * @api stopMarketOrder stopMarketOrder
 * @apiName stopMarketOrder
 * @apiVersion 1.0.0
 * @apiDescription Place a stop market order. Where supported, the order will be placed with 'reduce only' enabled
 *                  to ensure it can only reduce your position size (not increase it).<br><br>Take care using `position` for stop orders, as the size of the order
 *                  is calculated at the time the order is placed, not when it is executed. For example, if you
 *                  have no open positions and trigger a limit order, then immediately a stop order, the limit order
 *                  will not have been filled yet when the stop order is placed, so your position is likely to
 *                  still be zero. Instead, use a market order to get into position, or wait after placing the limit
 *                  order (though there is still a risk it won't have been fully filled), or don't use `position`
 *                  to set the size of your stop orders.
 * @apiGroup Command Reference
 *
 * @apiUse PositionInfo
 * @apiUse SideInfo
 * @apiUse AmountInfo
 * @apiUse TagInfo
 * @apiParam {Number} offset=0 The offset from the current price. This is similar to `offset` in other
 *                              order types. However, buy order will be offset to a price higher than the current
 *                              price, and sells will be offset to a price lower.
 * @apiParam {String="index","mark","last"} [trigger=mark] Determine which price to trigger the stop order on, if supported.
 *                      `index` represents the underlying index price, `mark` is the mark price and `last` is the last traded price.
 *
 * @apiError (Compatibility) deribit Only supports `mark` and `index` triggers
 * @apiError (Compatibility) bitfinex trigger is ignored.
 *
 *
 * @apiSuccessExample Bitfinex Example
 *      # On Bitfinex BTCUSD pair, place a market order for 1btc and a stop loss 1% below entry
 *      bitfinex(BTCUSD) {
 *          marketOrder(side=buy, amount=1);
 *          stopMarketOrder(side=sell, amount=1, offset=1%)
 *      }
 *
 * @apiSuccessExample Deribit Example
 *      # On Deribit BTC-PERPETUAL contact, update our open position to +1000 contracts
 *      # and set it up a stop loss market order if the price drops 1% from here.
 *      deribit(BTC-PERPETUAL) {
 *          marketOrder(position=1000);
 *          stopMarketOrder(side=sell, amount=1000, offset=1%)
 *      }
 *
 *
 */



/**
 * @api scaledOrder scaledOrder
 * @apiName scaledOrder
 * @apiVersion 1.0.0
 * @apiDescription Place a series of limit orders over a range of prices. Note that due to order size rounding implemented by
 *                  each of the exchanges, it is possible that the final total of orders is slightly different from the
 *                  amount requested.
 * @apiGroup Command Reference
 *
 * @apiParam {Number} [from=0] The offset from the current price to start placing orders. See `offset` in limitOrder.
 * @apiParam {Number} [to=100] The offset from the current price to finish placing orders. See `offset` in limitOrder.
 * @apiParam {Number{2-100}} [orderCount=10] The number of orders to place between `from` and `to`.
 * @apiParam {String="linear","ease-in","ease-out","ease-in-out"} [easing=linear] The easing method to use when spacing the orders out in the range between
 *                              `from` and `to`.<br>
 *                              `linear` will place all the orders evenly spaced out between `from` and `to`.<br>
 *                              `ease-in` will bunch the orders up closer to `from`.<br>
 *                              `ease-out` will bunch up the orders closer to `to`.<br>
 *                              `ease-in-out` will bunch the orders up closer to `from` and `to` away from the middle of the range.
 * @apiParam {Number{0-1}} [varyAmount=0] How much, as a percentage, should the amount of individual orders be randomised by.
 *                              Can accept numbers, like `0.1`, or percentages like `10%`. For example, with a total amount of
 *                              1000, and an orderCount of 10, each order will be for 100 units. With a 10% varyAmount, each
 *                              order will be between 90 and 110 units.
 * @apiParam {Number{0-1}} [varyPrice=0] How much, as a percentage, should the price of individual orders be randomised by.
 * @apiUse PositionInfo
 * @apiUse SideInfo
 * @apiUse AmountInfo
 * @apiUse TagInfo
 *
 *
 * @apiError (Compatibility) deribit Does not support `%` or `%%` units in `amount`
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
 * @apiDescription This has been deprecated and is now called twapOrder. Still works the same for now though.
 *                  See [twapOrder](#api-Command_Reference-twapOrder) for details...
 * @apiGroup Command Reference
 *
 *
 */


/**
 * @api twapOrder twapOrder
 * @apiName twapOrder
 * @apiVersion 1.0.0
 * @apiDescription Also known as Time-Weighted Average Price (TWAP). Place a series of market orders over an extended period of time. The amount will be split
 *                      between all the orders. After each market order is executed there will be a delay for
 *                      `(duration / orderCount)` seconds. For example, if duration is 60 seconds, and the
 *                      orderCount is 10, then there will be a (60 / 10) = 6 second delay between each order.
 * @apiGroup Command Reference
 *
 * @apiParam {Number{1-100}} [orderCount=10] The number of orders to place.
 * @apiParam {TimeString} [duration=60s] The amount of time to spread the orders over. Supports a number in seconds,
 *                              or s, m, or h suffix for seconds, minutes and hours (eg 5m = 5 minutes, 2h = 2 hours)
 * @apiUse PositionInfo
 * @apiUse SideInfo
 * @apiUse AmountInfo
 * @apiUse TagInfo
 *
 *
 * @apiError (Compatibility) deribit Does not support `%` or `%%` units in `amount`
 *
 *
 * @apiSuccessExample Deribit Example
 *      # On Deribit BTC-PERPETUAL contact, place 20 buy orders spread over a 10 minute period
 *      # in order to buy 1 btc.
 *      deribit(BTC-PERPETUAL) {
 *          twapOrder(orderCount=20, amount=1, side=buy, duration=10m);
 *      }
 *
 *
 */



/**
 * @api accDisOrder accDisOrder
 * @apiName accDisOrder
 * @apiVersion 1.0.0
 * @apiDescription the Accumulate/Distribute Algorithmic order is another name for our Iceberg Order
 *                  See [icebergOrder](#api-Command_Reference-icebergOrder) for details...
 * @apiGroup Command Reference
 *
 *
 */


/**
 * @api icebergOrder icebergOrder
 * @apiName icebergOrder
 * @apiVersion 1.0.0
 * @apiDescription An algorithmic order that breaks up a large order into smaller orders.
 *                  This is often also called the Accumulate / Distribute order (accDisOrder in Instabot Trader).
 *                  NOTE: Some exchanges refer to 'Iceberg Order' as an order that is partially hidden,
 *                  but this is not that kind of order.
 *                  The small orders
 *                  are placed relative to the current price, but only if the current price is below/above
 *                  a set limit price. The system waits for the small order to fill and when it does, places
 *                  the next order. If the price slips too far, the order is cancelled and re-entered.
 *                  This implementation attempts to work in the same way as the [okex iceberg order](https://support.okex.com/hc/en-us/articles/115003537571-Strategy-Order-Explanation).
 *                  <br><br>Note: if you cancel the limit order created by this command on the exchange,
 *                  then Instabot Trader will take that as a signal to cancel the entire iceberg order. If
 *                  we did not do this, as soon as you cancelled an order, a new one would take it's place.
 * @apiGroup Command Reference
 *
 * @apiParam {Number} totalAmount=0 The total size of the order
 * @apiParam {Number} averageAmount=0 The average size of each of the smaller orders. The size of each
 *                      order will between 90% and 110% of the averageAmount value.
 * @apiParam {Number} variance=0.1% The amount to offset the order from the current price. You may provide
 *                      a raw value (`0.001`) or a percentage (`0.1%`). For example, the buy price would
 *                      be calculated as `current bid * (1 - variance)`. With a bid at 6000 and a variance
 *                      of 0.1%, the order would be placed at `6000 * (1 - 0.001) = 5994`.
 * @apiParam {Number} limitPrice When buying, the bid price must be below the limit price. When selling,
 *                      the ask price must be above the limit price. While the price is the wrong side of
 *                      the limit price, the iceberg order will be suspended - no new orders will be placed.
 *                      When the price crosses back, then ordering will continue until totalAmount has been filled.
 * @apiParam {TimeString} timeLimit=1d The amount of time to leave the iceberg order running before giving up.
 *                      Numbers are treated as seconds. Add the postfix
 *                      s, m, h or d to indicate seconds, minutes or hours or days. eg 12h = 12 hours.
 * @apiParam {String="buy","sell"} [side=buy] Is this a buy order or a sell order.
 * @apiUse TagInfo
 *
 *
 * @apiSuccessExample Bitfinex Example
 *      # On Bitfinex BTCUSD pair, place an order to buy 10 BTC, 0.1 BTC at a time,
 *      # while the price is below 6400. Orders are place 0.02% away from the top of the order book
 *      # If it's not fully filled after 12 hours, it will be cancelled.
 *      # When done, send a balance report to your phone / telegram chat.
 *      bitfinex(BTCUSD) {
 *          icebergOrder(side=buy, totalAmount=10, averageAmount=0.1, variance=0.02%, limitPrice=6400, timeLimit=12h);
 *          balance();
 *      }
 *
 *
 */



/**
 * @api pingPongOrder pingPongOrder
 * @apiName pingPongOrder
 * @apiVersion 1.0.0
 * @apiDescription This algorithmic order starts off identical to a `scaledOrder`. It places a series of
 *                      limit orders. However, once the orders are placed, Instabot Trader waits for
 *                      them to be filled. As soon as one of the limit orders is filled, a new limit order
 *                      is placed, `pongDistance` away from the original on the other side of the book.
 *                      The order completes when all the original ping orders have been filled and all
 *                      the resulting pong orders have also been filled.
 *                      However, if `endless` is 'true', then the pong orders will create new ping orders
 *                      as they are filled and the whole process starts again. When in `endless` mode
 *                      the order will never complete. If you want to cancel it, you can either manually
 *                      cancel all the open orders on the exchange, or call `cancelOrders(tagged, tagname)`.
 *                      The tag defaults of 'pingpong' for this order, but can be anything you like.
 *
 *
 * @apiGroup Command Reference
 *
 * @apiParam {Number} [from=0] The offset from the current price to start placing orders. See `offset` in limitOrder.
 * @apiParam {Number} [to=50] The offset from the current price to finish placing orders. See `offset` in limitOrder.
 * @apiParam {Number{2-100}} [orderCount=10] The number of orders to place between `from` and `to`.
 * @apiParam {String="linear","ease-in","ease-out","ease-in-out"} [easing=linear] The easing method to use when spacing the orders out in the range between
 *                              `from` and `to`.<br>
 *                              `linear` will place all the orders evenly spaced out between `from` and `to`.<br>
 *                              `ease-in` will bunch the orders up closer to `from`.<br>
 *                              `ease-out` will bunch up the orders closer to `to`.<br>
 *                              `ease-in-out` will bunch the orders up closer to `from` and `to` away from the middle of the range.
 * @apiParam {Number{0-1}} [varyAmount=0] How much, as a percentage, should the amount of individual orders be randomised by.
 *                              Can accept numbers, like `0.1`, or percentages like `10%`. For example, with a total amount of
 *                              1000, and an orderCount of 10, each order will be for 100 units. With a 10% varyAmount, each
 *                              order will be between 90 and 110 units.
 * @apiParam {Number{0-1}} [varyPrice=0] How much, as a percentage, should the price of individual orders be randomised by.
 * @apiParam {Number} [pongDistance=20] Once a ping order has been filled, a new order is placed `pongDistance` away on the other side of the book.
 * @apiParam {Number} [pingAmount=0] The size of each of the individual ping orders. This will be used in preference to `amount`. The total amount needed is pingAmount * orderCount.
 * @apiParam {Number} [pongAmount=0] The size of each of the individual pong orders. This will be used in preference to `amount`.
 * @apiParam {String="true","false"} [endless=false] The Ping Pong order normally completes after the original ping order is filled and the following pong order is also filled.
 *                              If `endless` is true, then the pong order will generate a new ping order and the process will continue forever.
 * @apiUse SideInfo
 * @apiUse AmountInfo
 * @apiUse TagInfo
 *
 *
 * @apiError (Compatibility) deribit Does not support `%` or `%%` units in `amount`
 *
 *
 * @apiSuccessExample Bitfinex Example
 *      # On Bitfinex BTCUSD pair, place 40 buy orders between $0 and $20 orders below
 *      # the current price. As each order is filled, a new sell order is place $30 away.
 *      # Once all the sells fill, the order will complete.
 *      bitfinex(BTCUSD) {
 *        pingPongOrder(from=0, to=20, orderCount=40, amount=10, side=buy, pongDistance=30, endless=false)
 *      }
 *
 *
 */



/**
 * @api marketMakerOrder marketMakerOrder
 * @apiName marketMakerOrder
 * @apiVersion 1.0.0
 * @apiDescription An order that creates a basic market maker bot. This essentially look like a pair of endless
 *                  [ping pong orders](#api-Command_Reference-pingPongOrder) that are a little easier to set up. It also supports a feature to
 *                  auto balance the position if price starts to move outside the initial range. You'll
 *                  need to experiment with this feature, as used correctly it allows you to focus your funds in
 *                  a tighter range, while still being able to profit from trending markets or significant moves
 *                  outside your original range.
 *
 *
 * @apiGroup Command Reference
 *
 * @apiParam {Number} [bidAmount=0] The amount of *each* bid
 * @apiParam {Number} [bidStep=5] The price difference between each bid order
 * @apiParam {Number} [bidCount=0] The number of bid orders to place initially.
 * @apiParam {Number} [askAmount=0] The amount of *each* ask
 * @apiParam {Number} [askStep=5] The price difference between each ask order
 * @apiParam {Number} [askCount=0] The number of ask orders to place initially.
 * @apiParam {Number} [spread=30] The gap between bids and asks (well, when a bid/ask is filled, how far away
 *                                  should the opposite order be placed). In [pingPongOrder](#api-Command_Reference-pingPongOrder) terms, this is pongDistance.
 * @apiParam {String="none","limit","market"} [autoBalance=none] When the system needs to free up funds in order to re-balance your position,
 *                                  what method should it use. `none` means do not re-balance positions, `limit` means
 *                                  use limit orders to re-balance, and `market` means use market orders to re-balance.
 *                                  Note that limit orders actually use an aggressive [icebergOrder](#api-Command_Reference-icebergOrder) to ensure a quick
 *                                  fill without paying taker fees.
 * @apiParam {Percentage} [autoBalanceAt=20%] When the price has moved such that you are down to only N% of your orders
 *                                  on one side of the book, start trying to re-balance by removing positions from
 *                                  the other side of the book, exchanging the funds and placing them on the thin side.
 *                                  For example, if you start with 50 bids and 50 asks, and the price goes up, your
 *                                  asks will be filled and replaced with more bids. If autoBalanceAt is set to 20%,
 *                                  and autoBalance is either 'limit' or 'market', then when you only have 20 asks left,
 *                                  re-balancing will start. This will cause your lowest bid to be cancelled, and the
 *                                  value bought at the current price, and a new ask being placed just above your highest
 *                                  existing ask. Ideally you'd keep some spare funds in your account to better support
 *                                  this balancing process.
 * @apiUse TagInfo
 *
 *
 * @apiSuccessExample Bitfinex Example
 *      # Start a crude market maker bot on Bitfinex that runs forever.
 *      # The initial spread will consist of 80 orders over a roughly $400 range ($200 above and below the current price)
 *      bitfinex(BTCUSD) {
 *        marketMakerOrder(
 *          bidAmount=0.1, bidStep=5, bidCount=40,
 *          askAmount=0.1, askStep=5, askCount=40,
 *          spread=30,
 *          autoBalance=limit, autoBalanceAt=10%)
 *      }
 *
 *
 */
