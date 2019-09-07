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
 * @apiParam {Number} [amount=0] The size of the order. The units depend on the symbol and exchange.<br><br>
 *                              How the amount if interpreted depends on the exchange. Spot exchanges like
 *                              Bitfinex will treat the amount as the quantity of the asset to buy or sell.
 *                              For example, on the BTCUSD pair the amount would be measured in BTC.<br><br>
 *                              % can be used to allocate a percentage of your balance/equity for the order.
 *                              For example, if you have a balance of 1 BTC and use `amount=50%`, then the order
 *                              will be for 0.5 BTC. <br><br>
 *                              %% can be used to allocate a percentage of available funds for your order.
 *                              For example, if you have a balance of 1 BTC, but only 0.5 BTC is available (perhaps the rest is
 *                              locked up in another pending order) and use `amount=50%%`, then the order
 *                              will be for 0.25 BTC (half of what is available).<br><br>
 *                              Percentage amounts are supported on most (but not all) symbols on BitMEX (only available via <https://alertatron.com/>).
 *                              XBTUSD is supported and all symbols against XBT (eg ETHXBT), but not on symbols backed against
 *                              other currencies (eg ETHUSD, XBTJPY etc can not use % amounts and must use fixed amounts).)<br><br>
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
 *                              1btc (to take you from the current 4 btc balance to the desired 3 btc balance).
 *                              However, if your balance was 0 btc, then it would result in a buy of 3 btc.<br><br>
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
 * @apiParam {Boolean} [postOnly=true] Attempt to submit the order as a post-only order. Not all exchanges support this - see compatibility for details
 * @apiParam {Boolean} [reduceOnly=false] Attempt to submit the order as a reduce-only order. Not all exchanges support this - see compatibility for details
 *
 *
 * @apiError (Compatibility) Deribit    Reduce only orders can only be placed if you have an open position.
 *                                  The sum of all reduce-only orders can only be as large as the open position size<br>
 *                                  Post-only orders will have their price adjusted if you attempt to place orders at invalid prices
 * @apiError (Compatibility) Bitfinex Reduce only is not supported on spot exchanges
 * @apiError (Compatibility) Coinbase Reduce only is not supported on spot exchanges
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
 * @api aggressiveEntryOrder aggressiveEntryOrder
 * @apiName aggressiveEntryOrder
 * @apiVersion 1.0.0
 * @apiDescription Tries to enter a position with a limit order that stays at the top of the order book.
 *                  The limit order is initially placed at the top of the order book. If the price moves
 *                  away from the order, the order will be canceled and repositioned at the new top of the book.
 * @apiGroup Command Reference
 *
 * @apiUse PositionInfo
 * @apiUse SideInfo
 * @apiUse AmountInfo
 * @apiUse TagInfo
 * @apiParam {TimeString} [timeLimit] The amount of time to leave the order running before giving up.
 *                      Numbers are treated as seconds. Add the postfix
 *                      s, m, h or d to indicate seconds, minutes or hours or days. eg 12h = 12 hours.
 *                      If this argument is missing, there will be no time limit and the order will run until it is fully filled or cancelled.
 * @apiParam {Number} [slippageLimit] The amount of slippage to allow before giving up. The value can anything supported in `offset` from a limitOrder,
 *                      such as `slippageLimit=20` or `slippageLimit=1%` or `slippageLimit=@10000`
 *                      If this argument is missing, there will be no slippage limit and the order will run until it is fully filled or cancelled.
 *
 * @apiSuccessExample Deribit Example
 *      # Enter a long position at the current price
 *      # will keep moving the order to the top of the order book if the price goes up while waiting
 *      deribit(BTC-PERPETUAL) {
 *          aggressiveEntryOrder(side=buy, amount=1);
 *      }
 *
 */


/**
 * @api stopOrTakeProfitOrder stopOrTakeProfitOrder
 * @apiName stopOrTakeProfitOrder
 * @apiVersion 1.0.0
 * @apiDescription Places a Take Profit order and a Stop Loss order at the same time. It then waits for either order to
 *                  be filled and cancels the other one.
 * @apiGroup Command Reference
 *
 * @apiParam {String="buy","sell"} side=buy Should the orders to be placed be Buy or Sell orders. If you are looking to
 *                  take profit from a Long, then you'll to place sell orders, for example.
 * @apiParam {Number} tp=100 The offset from the current price or absolute price at which the Take Profit should be placed.
 *                          The order will be added as a limit order. Tha value can accept any value that is supported by limitOrders offset value.
 * @apiParam {Number} sl=100 The offset from the current price or absolute price at which the Stop Loss order should be placed.
 *                        The order will be added as a stopMarketOrder. It can accept any value that is supported by stopMarketOrders offset value.
 * @apiParam {Number} amount=0 The size of the take profit and stop loss orders. The amount can be any value that is accepted by the amount field
 *                          in a limitOrder or stopMarketOrder.
 * @apiUse TagInfo
 *
 * @apiSuccessExample Deribit Example
 *      # Enter a long position at the current price
 *      # The place a take profit order $100 above the current price, and a stop loss order $50 below the current price.
 *      deribit(BTC-PERPETUAL) {
 *          aggressiveEntryOrder(side=buy, amount=1);
 *          stopOrTakeProfitOrder(side=sell, tp=100, sl=50, amount=1);
 *      }
 *
 */



/**
 * @api continue continue
 * @apiName continue
 * @apiVersion 1.0.0
 * @apiDescription Evaluates some condition and will only continue to later commands if the condition is met.
 *                  If the condition is not met, then this command will abort execution of the command sequence.
 *                  Typically you would place these at the start of the command sequence. See also [stop](#api-Command_Reference-stop) which is the same, but with inverted logic.
 * @apiGroup Command Reference
 *
 * @apiParam {String} if=always The name of the condition to check<br>
 *                          **Simple Conditions**<br>
 *                      `always` - will always be true. Value is ignored.<br>
 *                      `never` - will always be false. Value is ignored.<br><br>
 *                       **Date and Time**<br>
 *                           All date and time conditions use UTC time only. Dates must be given in the format `YYYY-MM-DD` and times in the format `HH:MM`. Times are assumed to be using the 24 hour clock.<br><br>
 *                       `isAfterDate` - true if the current date is after the date given in the value.<br>
 *                       `isOnOrAfterDate` - true if the current date is on or after the date given in the value.<br>
 *                       `isBeforeDate` - true if the current date is before the date given in the value.<br>
 *                       `isOnOrBeforeDate` - true if the current date is on or before the date given in the value.<br>
 *                       `isSameDate` - true if the current date is the same as the date given in the value.<br>
 *                       `isAfterTime` - true if the current time is after the time given in the value.<br>
 *                       `isBeforeTime` - true if the current time is before the time given in the value.<br><br>
 *                       **Position Size**<br>
 *                       Position size is your current open position. Positive values are long positions, negative values are short positions. On
 *                       spot exchanges, the position will be considered to be the amount of the asset in your wallet (so will always be >=0)<br>
 *                       `positionLessThan` - true if your current open position size is less than the value.<br>
 *                       `positionLessThanEq` - true if your current open position size is less than or equal to the value.<br>
 *                       `positionGreaterThan` - true if your current open position size is greater than the value.<br>
 *                       `positionGreaterThanEq` - true if your current open position size is greater than or equal to the value.<br>
 *                       `positionLong` - true if your currently have a LONG position. Value is ignored.<br>
 *                       `positionShort` - true if your currently have a SHORT position. Value is ignored.<br>
 *                       `positionNone` - true if you currently have no open positions at all. Value is ignored.<br><br>
 *                       **Last Price**<br>
 *                       The last price is calculated as the mid point between the current top bid and ask in the order book.<br>
 *                       `priceLessThan` - true if the current price is less than the value.<br>
 *                       `priceGreaterThan` - true if the current price is greater than the value.<br>
 *                       `priceLessThanEq` - true if the current price is less than or equal to the value.<br>
 *                       `priceGreaterThanEq` - true if the current price is greater than or equal to the value.<br>
 * @apiParam {String} [value] The value to compare against, if needed. It's value will depend on the condition being tested.
 *
 * @apiSuccessExample Deribit Example
 *      # Check that our current position size is less than 1000 contracts.
 *      # If it exceeds 1000, stop and exit
 *      # If it is under 1000, then place a limit order to buy 500 contracts
 *      deribit(BTC-PERPETUAL) {
 *          continue(if=positionLessThan, value=1000);
 *          limitOrder(side=buy, amount=500, offset=10);
 *      }
 *
 */

/**
 * @api stop stop
 * @apiName stop
 * @apiVersion 1.0.0
 * @apiDescription Evaluates some condition and will only stop execution of the commands if it is true.
 *                  See also [continue](#api-Command_Reference-continue) which is the same, but with inverted logic.
 * @apiGroup Command Reference
 *
 * @apiParam {String} if=always The name of the condition to check<br>
 *                          See [continue](#api-Command_Reference-continue) for all possible values.
 * @apiParam {String} [value] The value to compare against, if needed. It's value will depend on the condition being tested.
 *
 * @apiSuccessExample Deribit Example
 *      # Check the current position size and stop if it is too large.
 *      # If it exceeds 1000, stop and exit
 *      # If it is under 1000, then place a limit order to buy 500 contracts
 *      deribit(BTC-PERPETUAL) {
 *          stop(if=positionGreaterThan, value=1000);
 *          limitOrder(side=buy, amount=500, offset=10);
 *      }
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
 * @apiDescription This has been deprecated and is now called twapOrder. Still works the same though.
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
 * @apiDescription An order that creates a basic market maker bot. This essentially looks like a pair of endless
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
 * @apiParam {String="none","shuffle"} [autoBalance=none] When autoBalance is set to `shuffle`, Instabot Trader will attempt to shuffle your orders closer
 *                              to the price if the prices moves outside the your order range. For example, if the prices goes up all the way through your
 *                              asks, and keeps going, you'll be left with a lot of bids some way below the current price. When `shuffle` is on, the
 *                              bid furthest from the price will be moved to `bidStep` above the block, effectively moving the entire block of orders
 *                              bidStep closer to the price. This process will repeat until the bids are just below the price again.
 * @apiParam {TimeString} [autoBalanceEvery=0] The number of seconds to wait between each attempt to auto balance. You can adjust this to change how
 *              quickly Instabot Trader tries to rebalance your orders. Can also include units, so `10` is 10 seconds, `10s` is also 10 seconds, `10m`
 *              is 10 minutes and `10h` is 10 hours.
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
