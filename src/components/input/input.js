import { escapeHtml } from "../../utils.js";

const SUCCESS_ICON = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.16917 3.16584C7.5208 2.76019 7.95561 2.43496 8.44406 2.21223C8.93251 1.98951 9.46317 1.87449 10 1.875C11.1308 1.875 12.1442 2.375 12.8308 3.16584C13.3664 3.12759 13.904 3.20507 14.4069 3.39301C14.9099 3.58094 15.3666 3.87493 15.7458 4.255C16.1258 4.63422 16.4196 5.09073 16.6076 5.59355C16.7955 6.09637 16.8731 6.63373 16.835 7.16917C17.2405 7.52088 17.5656 7.95572 17.7881 8.44416C18.0107 8.93261 18.1256 9.46323 18.125 10C18.1255 10.5368 18.0105 11.0675 17.7878 11.5559C17.565 12.0444 17.2398 12.4792 16.8342 12.8308C16.8722 13.3663 16.7947 13.9036 16.6067 14.4065C16.4188 14.9093 16.1249 15.3658 15.745 15.745C15.3658 16.1249 14.9093 16.4188 14.4065 16.6067C13.9036 16.7947 13.3663 16.8722 12.8308 16.8342C12.4792 17.2398 12.0444 17.565 11.5559 17.7878C11.0675 18.0105 10.5368 18.1255 10 18.125C9.46317 18.1255 8.93251 18.0105 8.44406 17.7878C7.95561 17.565 7.5208 17.2398 7.16917 16.8342C6.63365 16.8725 6.09615 16.7952 5.59317 16.6074C5.0902 16.4196 4.63352 16.1258 4.25417 15.7458C3.87414 15.3665 3.58018 14.9099 3.39225 14.4069C3.20432 13.9039 3.12682 13.3664 3.165 12.8308C2.75951 12.4791 2.43444 12.0443 2.21186 11.5558C1.98927 11.0674 1.87439 10.5368 1.875 10C1.875 8.86917 2.375 7.85583 3.16584 7.16917C3.12772 6.63372 3.20525 6.09635 3.39319 5.59352C3.58112 5.09069 3.87504 4.63419 4.255 4.255C4.63419 3.87504 5.09069 3.58112 5.59352 3.39318C6.09635 3.20525 6.63372 3.12772 7.16917 3.16584ZM13.0083 8.48834C13.0583 8.42171 13.0945 8.34576 13.1147 8.26496C13.135 8.18415 13.1388 8.10012 13.1261 8.0178C13.1134 7.93547 13.0844 7.85652 13.0407 7.78558C12.9971 7.71464 12.9397 7.65315 12.8719 7.60471C12.8041 7.55627 12.7273 7.52187 12.6461 7.50353C12.5648 7.48518 12.4807 7.48326 12.3987 7.49789C12.3167 7.51251 12.2385 7.54338 12.1686 7.58868C12.0987 7.63398 12.0385 7.69279 11.9917 7.76167L9.295 11.5367L7.94167 10.1833C7.82319 10.0729 7.66648 10.0128 7.50457 10.0157C7.34265 10.0185 7.18816 10.0841 7.07365 10.1987C6.95914 10.3132 6.89355 10.4676 6.89069 10.6296C6.88783 10.7915 6.94794 10.9482 7.05834 11.0667L8.93334 12.9417C8.99749 13.0058 9.07484 13.0552 9.15999 13.0864C9.24515 13.1176 9.33608 13.1299 9.42647 13.1224C9.51686 13.115 9.60455 13.088 9.68344 13.0432C9.76234 12.9985 9.83054 12.9371 9.88334 12.8633L13.0083 8.48834Z" fill="currentColor"/></svg>`;

const ERROR_ICON = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.13335 3.75C9.09585 2.08333 11.5025 2.08333 12.4642 3.75L18.5933 14.3733C19.555 16.04 18.3517 18.1233 16.4275 18.1233H4.17001C2.24585 18.1233 1.04335 16.04 2.00501 14.3733L8.13251 3.75H8.13335ZM10.2992 8.1225C10.4649 8.1225 10.6239 8.18835 10.7411 8.30556C10.8583 8.42277 10.9242 8.58174 10.9242 8.7475V11.8725C10.9242 12.0383 10.8583 12.1972 10.7411 12.3144C10.6239 12.4317 10.4649 12.4975 10.2992 12.4975C10.1334 12.4975 9.97445 12.4317 9.85724 12.3144C9.74003 12.1972 9.67418 12.0383 9.67418 11.8725V8.7475C9.67418 8.58174 9.74003 8.42277 9.85724 8.30556C9.97445 8.18835 10.1334 8.1225 10.2992 8.1225ZM10.2992 14.9975C10.4649 14.9975 10.6239 14.9317 10.7411 14.8144C10.8583 14.6972 10.9242 14.5383 10.9242 14.3725C10.9242 14.2067 10.8583 14.0478 10.7411 13.9306C10.6239 13.8133 10.4649 13.7475 10.2992 13.7475C10.1334 13.7475 9.97445 13.8133 9.85724 13.9306C9.74003 14.0478 9.67418 14.2067 9.67418 14.3725C9.67418 14.5383 9.74003 14.6972 9.85724 14.8144C9.97445 14.9317 10.1334 14.9975 10.2992 14.9975Z" fill="currentColor"/></svg>`;

export function renderSessionsInput({
  label = "Label",
  placeholder = "Placeholder",
  value = "",
  disabled = false,
  type = "text",
  name,
  id,
  fullWidth = false,
  ariaLabel,
  status,
  error,
  message,
  rightIcon,
  multiline = false,
} = {}) {
  const resolvedStatus = error ? "error" : status;
  const resolvedMessage = error || message;
  const trailingIcon = multiline
    ? rightIcon || ""
    : rightIcon ||
      (resolvedStatus === "success"
        ? SUCCESS_ICON
        : resolvedStatus === "error"
          ? ERROR_ICON
          : "");
  const classes = [
    "sessions-input",
    multiline ? "sessions-input--multiline" : "",
    resolvedStatus ? `sessions-input--${resolvedStatus}` : "",
    trailingIcon ? "sessions-input--with-trailing-icon" : "",
    fullWidth ? "sessions-input--full-width" : "",
    disabled ? "is-disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const sharedAttrs = [
    `class="sessions-input__field"`,
    placeholder ? `placeholder="${escapeHtml(placeholder)}"` : "",
    name ? `name="${escapeHtml(name)}"` : "",
    id ? `id="${escapeHtml(id)}"` : "",
    ariaLabel ? `aria-label="${escapeHtml(ariaLabel)}"` : "",
    resolvedMessage ? `aria-describedby="${escapeHtml(messageId(id))}"` : "",
    resolvedStatus === "error" ? 'aria-invalid="true"' : "",
    disabled ? "disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const fieldMarkup = multiline
    ? `<textarea ${sharedAttrs} rows="4">${escapeHtml(value)}</textarea>`
    : `<input ${sharedAttrs} type="${escapeHtml(type)}"${value ? ` value="${escapeHtml(value)}"` : ""} />`;

  const labelMarkup = label
    ? `<span class="sessions-input__label">${escapeHtml(label)}</span>`
    : "";

  const iconMarkup = trailingIcon
    ? `<span class="sessions-input__icon sessions-input__icon--trailing" aria-hidden="true">${trailingIcon}</span>`
    : "";

  const messageMarkup = resolvedMessage
    ? `<span class="sessions-input__message" id="${escapeHtml(messageId(id))}"${resolvedStatus === "error" ? ' role="alert"' : ""}>${escapeHtml(resolvedMessage)}</span>`
    : "";

  return `<label class="${classes}">${labelMarkup}<span class="sessions-input__control">${fieldMarkup}${iconMarkup}</span>${messageMarkup}</label>`;
}

function messageId(id) {
  return `${id || "sessions-input"}-message`;
}
