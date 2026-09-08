import { componentExampleWrapper, pageHero, section } from "../shell/pageLayout.js?v=sessions-page-h2-v1";
import { renderSessionsInput } from "../../components/input/index.js?v=sessions-input-v6";

export function renderInputsPage(page) {
  return `
    ${pageHero(page)}
    ${section('Text Input', '', textInputExamples(), 'button-example-section input-example-section')}
    ${section('Text Area', '', textAreaExamples(), 'button-example-section input-example-section')}
  `;
}

function textInputExamples() {
  return `
    ${componentExampleWrapper({
      id: 'text-input-default',
      tocTitle: 'Default Input',
      preview: renderSessionsInput({ label: 'Label', placeholder: 'Placeholder', id: 'text-input-default-field' }),
      codeId: 'text-input-default-code',
      filename: 'TextInput.tsx',
      code: sampleTextInputCode(),
    })}
    ${componentExampleWrapper({
      id: 'text-input-success',
      tocTitle: 'Success Input',
      preview: renderSessionsInput({
        id: 'text-input-success-field',
        label: 'Label',
        value: 'Valid value',
        status: 'success',
        message: 'Looks good',
      }),
      codeId: 'text-input-success-code',
      filename: 'SuccessInput.tsx',
      code: sampleSuccessInputCode(),
    })}
    ${componentExampleWrapper({
      id: 'text-input-error',
      tocTitle: 'Error Input',
      preview: renderSessionsInput({
        id: 'text-input-error-field',
        label: 'Label',
        value: 'Invalid value',
        error: 'Error message',
      }),
      codeId: 'text-input-error-code',
      filename: 'ErrorInput.tsx',
      code: sampleErrorInputCode(),
    })}
  `;
}

function textAreaExamples() {
  return `
    ${componentExampleWrapper({
      id: 'text-area-default',
      tocTitle: 'Default Text Area',
      preview: renderSessionsInput({
        id: 'text-area-default-field',
        label: 'Label',
        placeholder: 'Placeholder',
        multiline: true,
      }),
      codeId: 'text-area-default-code',
      filename: 'TextArea.tsx',
      code: sampleTextAreaCode(),
    })}
  `;
}

function sampleTextInputCode() {
  return `import { Input } from "@sessions/design-system";

export function TextInput() {
  return <Input label="Label" placeholder="Placeholder" />;
}`;
}

function sampleSuccessInputCode() {
  return `import { Input } from "@sessions/design-system";

export function SuccessInput() {
  return (
    <Input
      label="Label"
      value="Valid value"
      status="success"
      message="Looks good"
    />
  );
}`;
}

function sampleErrorInputCode() {
  return `import { Input } from "@sessions/design-system";

export function ErrorInput() {
  return (
    <Input
      label="Label"
      value="Invalid value"
      error="Error message"
    />
  );
}`;
}

function sampleTextAreaCode() {
  return `import { Input } from "@sessions/design-system";

export function TextArea() {
  return <Input label="Label" placeholder="Placeholder" multiline />;
}`;
}
