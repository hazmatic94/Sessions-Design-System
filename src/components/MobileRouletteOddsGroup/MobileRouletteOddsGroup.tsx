import {OddsButtonGroup} from '../OddsButtonGroup/index.js';
import type {MobileRouletteOddsGroupProps} from './MobileRouletteOddsGroup.types.js';

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function MobileRouletteOddsGroup({
  ariaLabel = 'Roulette bet choice',
  blackLabel = 'Black',
  className,
  defaultValue,
  disabled = false,
  greenLabel = 'Green',
  label = '',
  onValueChange,
  options,
  redLabel = 'Red',
  value,
}: MobileRouletteOddsGroupProps) {
  return (
    <OddsButtonGroup
      ariaLabel={ariaLabel}
      className={cx('joker-mobile-roulette-odds-group', className)}
      defaultValue={defaultValue}
      disabled={disabled}
      label={label}
      layout='inline'
      onValueChange={onValueChange}
      options={
        options ?? [
          {value: 'red', label: redLabel, sideIcon: 'red'},
          {value: 'black', label: blackLabel, sideIcon: 'black'},
          {value: 'green', label: greenLabel, sideIcon: 'green'},
        ]
      }
      showDirection={false}
      showOdds={false}
      value={value}
    />
  );
}
