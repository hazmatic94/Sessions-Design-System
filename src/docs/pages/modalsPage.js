import {componentExampleWrapper, pageHero, section} from '../shell/pageLayout.js';

export function renderModalsPage(page) {
  return `
    ${pageHero(page)}
    ${section('Modal', '', modalExamples(), 'button-example-section card-example-section')}
    ${section('Win Modal', '', winModalCardExamples(), 'button-example-section card-example-section')}
  `;
}

export function modalExampleCard({
  id,
  tocTitle,
  preview,
  reactDemo,
  codeId,
  filename,
  code,
  className = '',
}) {
  return componentExampleWrapper({
    id,
    tocTitle,
    preview,
    reactDemo,
    codeId,
    filename,
    code,
    size: 'lg',
    className,
  });
}

export function modalExamples() {
  return modalExampleCard({
    id: 'modal-low-balance-example',
    tocTitle: 'Low balance',
    reactDemo: 'modal-low-balance',
    codeId: 'modal-low-balance-code',
    filename: 'Modal.tsx',
    code: sampleModalCode(),
    className: 'is-joker-modal',
  });
}

export function winModalCardExamples() {
  return modalExampleCard({
    id: 'win-modal-card-example',
    tocTitle: 'Default',
    reactDemo: 'modal-win-card',
    codeId: 'win-modal-card-code',
    filename: 'WinModalCard.tsx',
    code: sampleWinModalCardCode(),
    className: 'is-win-modal-card',
  });
}

function sampleModalCode() {
  return `import { Modal } from "@joker/design-system";

export function Example() {
  return (
    <Modal
      title="Low Balance"
      onClose={() => {}}
      onCancel={() => {}}
      onPrimary={() => {}}
    >
      You don’t have enough Joker Coins to place this bet. Your bet slip has been saved.

      Deposit more Joker Coins to continue
    </Modal>
  );
}`;
}

function sampleWinModalCardCode() {
  return `import { WinModalCard } from "@joker/design-system";

export function Example({ balance, onBalanceChange }) {
  return (
    <WinModalCard
      amountWon="+88"
      currency="JKC"
      message="Your winnings have been credited to your account"
      messageHighlight="credited"
      balance={balance}
      onCoinsLand={() => onBalanceChange((current) => current + 88)}
      onClose={() => {}}
    />
  );
}`;
}
