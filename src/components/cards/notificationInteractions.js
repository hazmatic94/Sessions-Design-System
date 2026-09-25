function markNotificationRead(card) {
  if (card.dataset.notificationUnread !== "true") return;

  card.classList.remove("sessions-notification-card--unread");
  card.classList.add("sessions-notification-card--read");
  card.dataset.notificationUnread = "false";
  card.querySelector(".sessions-notification-card__dot")?.remove();
}

export function setupSessionsNotifications() {
  document.addEventListener("click", (event) => {
    const card = event.target.closest("[data-sessions-notification]");
    if (!card) return;

    markNotificationRead(card);
  });
}
