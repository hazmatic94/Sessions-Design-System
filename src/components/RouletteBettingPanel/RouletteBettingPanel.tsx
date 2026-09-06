import type {ChangeEventHandler, MouseEventHandler} from 'react';
import {useState} from 'react';
import jokerCoinSrc from '../../../assets/jokerCoin.svg';
import {playMineClickSound} from '../../utils/tileSounds.js';
import {BetAmountInput} from '../BetAmountInput/index.js';
import {Button} from '../Button/index.js';
import {EnterBetPrecursor} from '../EnterBetPrecursor/index.js';
import type {OddsButtonGroupOption} from '../OddsButtonGroup/index.js';
import {OddsButtonGroup} from '../OddsButtonGroup/index.js';
import styles from './RouletteBettingPanel.module.css';
import type {RouletteBettingPanelProps} from './RouletteBettingPanel.types.js';

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function CoinIcon() {
  return <img src={jokerCoinSrc} alt='' />;
}

const defaultOddsOptions: OddsButtonGroupOption[] = [
  {value: 'red', label: 'Red', sideIcon: 'red'},
  {value: 'black', label: 'Black', sideIcon: 'black'},
  {value: 'green', label: 'Green', sideIcon: 'green'},
];

export function RouletteBettingPanel({
  layout = 'desktop',
  betAmount,
  defaultBetAmount = '',
  onBetAmountChange,
  oddsOptions,
  oddsLayout = 'stacked',
  showOdds = true,
  selectedOddsValue,
  defaultSelectedOddsValue,
  onOddsValueChange,
  onPlaceBet,
  onCashout,
  inGame = false,
  disablePlaceBetUntilBetAmount = true,
  submitLabel = 'Spin Wheel',
  spinWheelLabel = 'Spin Again',
  cashoutLabel = 'Cashout',
  className = '',
}: RouletteBettingPanelProps) {
  const [internalBetAmount, setInternalBetAmount] = useState(
    String(defaultBetAmount),
  );
  const [internalOddsValue, setInternalOddsValue] = useState(
    defaultSelectedOddsValue ?? (inGame ? 'red' : ''),
  );
  const selectedBetAmount = betAmount ?? internalBetAmount;
  const resolvedOddsValue = selectedOddsValue ?? internalOddsValue;
  const hasBetAmount = String(selectedBetAmount).trim().length > 0;
  const hasOddsSelection = hasBetAmount && Boolean(resolvedOddsValue.trim());
  const isMobileLayout = layout === 'mobile';
  const isSubmitReady = inGame
    ? hasOddsSelection
    : !disablePlaceBetUntilBetAmount || (hasBetAmount && hasOddsSelection);
  const showEnterBetPrecursor =
    !inGame && disablePlaceBetUntilBetAmount && !hasBetAmount;
  const oddsDisabled = !inGame && !hasBetAmount;

  const handlePlaceBet: MouseEventHandler<HTMLButtonElement> = event => {
    if (!isSubmitReady) {
      return;
    }

    playMineClickSound();
    onPlaceBet?.(event);
  };

  const handleCashout: MouseEventHandler<HTMLButtonElement> = event => {
    (onCashout ?? onPlaceBet)?.(event);
  };
  const resolvedOddsOptions = oddsOptions ?? defaultOddsOptions;
  const resolvedOddsLayout = isMobileLayout ? 'stacked' : oddsLayout;
  const displayedOddsValue = inGame
    ? resolvedOddsValue || 'red'
    : hasBetAmount
      ? resolvedOddsValue
      : '';

  const handleBetAmountChange: ChangeEventHandler<HTMLInputElement> = event => {
    onBetAmountChange?.(event);
  };

  const handleBetAmountValueChange = (nextValue: string) => {
    setInternalBetAmount(nextValue);
    if (!nextValue.trim()) {
      setInternalOddsValue(inGame ? 'red' : '');
    }
  };

  const betAmountField = (
    <BetAmountInput
      className='live prefix full-width currency joker-bet-field'
      fullWidth
      leftIcon={<CoinIcon />}
      placeholder='0'
      value={selectedBetAmount}
      onChange={handleBetAmountChange}
      onValueChange={handleBetAmountValueChange}
    />
  );

  const oddsGroup = (
    <OddsButtonGroup
      label='Bet type'
      options={resolvedOddsOptions}
      value={displayedOddsValue}
      onValueChange={(value, option) => {
        setInternalOddsValue(value);
        onOddsValueChange?.(value, option);
      }}
      layout={oddsLayout}
      showOdds={false}
      showDirection={false}
      disabled={oddsDisabled}
      ariaLabel='Roulette bet choice'
    />
  );

  const submitGroup = inGame ? (
    <div
      className={cx(
        styles.submitGroup,
        styles.inGameSubmitGroup,
        'joker-betting-submit-group joker-roulette-betting-ingame-submit',
      )}>
      <Button
        variant='cashout'
        fullWidth
        className={cx(
          styles.submit,
          'joker-cta-preview hi-lo-skip cashout full-width',
        )}
        onClick={handleCashout}>
        <span className='joker-hi-lo-skip-label'>{cashoutLabel}</span>
      </Button>
      <Button
        fullWidth
        className={cx(
          styles.submit,
          'joker-cta-preview default full-width joker-bet-submit',
        )}
        onClick={handlePlaceBet}>
        {spinWheelLabel}
      </Button>
    </div>
  ) : (
    <div
      className={cx(
        styles.submitGroup,
        'joker-betting-submit-group',
        showEnterBetPrecursor && 'is-pending-bet',
      )}>
      <Button
        fullWidth
        className={cx(
          styles.submit,
          'joker-cta-preview default full-width joker-bet-submit',
          showEnterBetPrecursor && 'is-pending-bet',
        )}
        onClick={handlePlaceBet}>
        {submitLabel}
      </Button>
      {showEnterBetPrecursor && <EnterBetPrecursor />}
    </div>
  );

  const submitActions = (
    <div className={cx(styles.actions, 'joker-roulette-betting-actions')}>
      <span
        className={cx(styles.divider, 'joker-betting-divider')}
        aria-hidden='true'
      />
      {submitGroup}
    </div>
  );

  const rootClassName = cx(
    styles.root,
    isMobileLayout && styles.mobile,
    'joker-betting-panel joker-roulette-betting-panel',
    isMobileLayout && 'is-mobile',
    inGame && 'is-ingame',
    className,
  );

  if (isMobileLayout) {
    return (
      <aside
        className={rootClassName}
        aria-label='Roulette mobile betting panel'>
        {submitGroup}

        <span
          className={cx(styles.divider, 'joker-betting-divider')}
          aria-hidden='true'
        />

        <div className={cx(styles.main, 'joker-betting-main')}>
          {betAmountField}
          <span
            className={cx(styles.divider, 'joker-betting-divider')}
            aria-hidden='true'
          />
          <div className={cx(styles.fields, 'joker-betting-fields')}>
            {oddsGroup}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={rootClassName} aria-label='Roulette betting panel'>
      <div className={cx(styles.main, 'joker-betting-main')}>
        <div className={cx(styles.fields, 'joker-betting-fields')}>
          {betAmountField}
          <span
            className={cx(styles.divider, 'joker-betting-divider')}
            aria-hidden='true'
          />
          {oddsGroup}
        </div>
      </div>

      <span
        className={cx(styles.submitSpacer, 'joker-betting-submit-spacer')}
        aria-hidden='true'
      />

      {submitActions}
    </aside>
  );
}
