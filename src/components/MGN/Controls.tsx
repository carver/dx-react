import React from 'react'
import Countdown from './Countdown'
import { Conditions } from './helpers'
import { URLS } from 'globals'

interface API {
  lockTokens: () => any;
  unlockTokens: () => any;
  withdrawUnlockedTokens: () => any;
}

interface ControlsProps {
  api: API;
  conditions: Conditions;
  now: number,
  then: number,
  mgnhref: string
}

const Controls: React.SFC<ControlsProps> = ({ api, conditions, now, then, mgnhref }) => {
  const { lockTokens, unlockTokens, withdrawUnlockedTokens } = api
  const { canUnlock, canLock, canWithdraw, canReUnlock } = conditions

  const btnClass = 'control-btn buttonCTA '

  const unlockDisabled = !canUnlock
  const unlockBTNclass =
    btnClass + (canUnlock ? 'blue' : 'buttonCTA-disabled')

  const lockDisabled = !canLock
  const lockBTNclass = btnClass + (canLock ? 'blue' : 'buttonCTA-disabled')

  const withdrawDisabled = !canWithdraw
  const withdrawBTNclass =
    btnClass + (canWithdraw ? 'blue' : 'buttonCTA-disabled')

  return (
    <>
      {canReUnlock && <p className="control-warning">
        Unlocking will reset the 24 hour waiting period for any Magnolia associated with your account that is still in the unlocking period and not withdrawn.
        <br/>
        Consult the <a href={URLS.MGN_FAQ} target="_blank">Magnolia FAQ</a> for further details.
      </p>}
      <div className="element">
        <div className="control-wrap">
          <h3 className="control-main">UNLOCK</h3>
          <span className="control-desc">(entire amount only)</span>
          <button
            className={unlockBTNclass}
            disabled={unlockDisabled}
            onClick={unlockTokens}
          >
            UNLOCK
            </button>
        </div>
      </div>
      <div className="element">
        <p className="control-info">Wait for 24 hours before it can be withdrawn</p>
      </div>
      <div className="element">
        <div className="control-wrap">
          <h3 className="control-main">WITHDRAW UNLOCKED</h3>
          <button
            className={withdrawBTNclass}
            disabled={withdrawDisabled}
            onClick={withdrawUnlockedTokens}
          >
            WITHDRAW
            </button>
          <span className="control-desc">
            {then && <Countdown now={now} then={then} />}
          </span>
        </div>
      </div>
      <div className="element">
        <div className="control-info">
          <p>
            Add the <a href={mgnhref} target="_blank">MGN token address</a> to your wallet. Immediately after the
            third step you can transfer the token like any ERC20 token.
          </p>
          <p>
            Then proceed to Step 5 with the other wallet address.
          </p>
        </div>
      </div>
      <div className="element">
        <div className="control-wrap">
          <h3 className="control-main">LOCK</h3>
          <button
            className={lockBTNclass}
            disabled={lockDisabled}
            onClick={lockTokens}
          >
            LOCK
            </button>
          <span className="control-desc">
            (locks entire balance)
            </span>
        </div>
      </div>
      <p className="bottom">
        If you want to lock less MGN than your current MGN balance, then
        transfer the amount of MGN you do not want locked to another wallet
        address.
        </p>
    </>
  )
}

export default Controls
