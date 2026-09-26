const events = [
  {
    date: "2023-07-26T00:00:00+01:00",
    title: "Council letter:",
    quote: "The [building condition] surveys will be carried out in the coming weeks."
  },
  {
    date: "2023-11-01T00:00:00+00:00",
    title: "Council letter - first delay announced:",
    quote: "Due to your property being of different build, there is a delay to spring 2025."
  },
  {
    date: "2024-01-29T00:00:00+00:00",
    title: "Council letter:",
    quote: "We are pleased to confirm to you that we are in a position to recommence building condition surveys on your block. Once the surveys are completed we will issue these to you as quickly as possible."
  },
  {
    date: "2024-02-22T00:00:00+00:00",
    title: "Council letter:",
    quote: "We have contracted Thomas and Adamson surveyors to carry out the surveys in the coming weeks."
  },
  {
    date: "2024-03-18T00:00:00+00:00",
    title: "Survey takes place"
  },
  {
    date: "2024-06-27T00:00:00+01:00",
    title: "Council announcement - new dates for Phase 6:",
    quote: "It is with great delight that we are able to share the programme. Your Phase 6 has a March 25 construction start and Dec 25 construction finish."
  },
  {
    date: "2024-11-22T00:00:00+00:00",
    title: "Council letter - nope, another delay:",
    quote: "We have identified that your home has been built in a different way to most homes in your area. It has become apparent that the potential solution [for your home] would be too expensive and not affordable. We will trial a different approach. We are still working towards fulfilling the 2025/26 projected timescale."
  },
  {
    date: "2024-12-23T00:00:00+00:00",
    title: "Council letter:",
    quote: "Council personnel will be visiting the area week beginning the 16 January 2025 to carry out final inspections and may attend your property."
  },
  {
    date: "2025-11-27T00:00:00+00:00",
    title: "Council letter:",
    quote: "Phase 6 pre construction procurement and consultation are due to begin autumn 2026."
  },
  {
    date: "2026-03-18T00:00:00+00:00",
    title: "Building Warrant application submitted",
    note: "Council applied for a Building Warrant for my property but did not tell me."
  },
  {
    date: "2026-06-02T00:00:00+01:00",
    title: "Building Warrant granted",
    note: "Building Warrant granted, but I had to check the portal myself. No communication from the council."
  },
  {
    date: "2026-06-12T00:00:00+01:00",
    title: "Council letter:",
    quote: "We will be in a position to issue cost estimate 1 to you late August along with your building condition survey."
  },
  {
    date: "2026-09-22T00:00:00+01:00",
    title: "Building condition survey and cost estimate 1 received"
    note: "My estimated costs are nearly £30k and include a £8.3k management fee to the council."
  },
  {
    date: "2026-09-23T00:00:00+01:00",
    title: "I have voted against the works"
  }
];


function formatEventDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).toUpperCase();
}


function formatElapsedTime(dateString) {
  const eventDate = new Date(dateString);
  const elapsed = Date.now() - eventDate.getTime();

  if (elapsed < 0) {
    return "00:00:00";
  }

  const totalSeconds = Math.floor(elapsed / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
   String(hours) +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0")
  );
}


function renderEvents() {
  const container = document.getElementById("eventsContainer");

  if (!container) {
    return;
  }

  container.innerHTML = "";

  events.forEach((event) => {
    const eventItem = document.createElement("article");
    eventItem.className = "event-item";

    const button = document.createElement("button");
    button.className = "event-button";
    button.type = "button";
    button.setAttribute("aria-expanded", "false");

    button.innerHTML = `
      <span class="event-date">${formatEventDate(event.date)}</span>
      <span class="event-arrow">+</span>
    `;

    const details = document.createElement("div");
    details.className = "event-details";
    details.hidden = true;

    let detailsHTML = `
      <div class="event-title">${event.title}</div>
    `;

    if (event.quote) {
      detailsHTML += `
        <div class="event-quote">
          “${event.quote}”
        </div>
      `;
    }

    if (event.note) {
      detailsHTML += `
        <div class="event-note">
          ${event.note}
        </div>
      `;
    }

    detailsHTML += `
      <div class="event-clock-label">HOURS SINCE EVENT</div>
      <div class="event-clock" data-event-date="${event.date}">
        ${formatElapsedTime(event.date)}
      </div>
      <div class="event-counting">And counting.</div>
    `;

    details.innerHTML = detailsHTML;

    button.addEventListener("click", () => {
      const isOpen = !details.hidden;

      document.querySelectorAll(".event-details").forEach((otherDetails) => {
        otherDetails.hidden = true;
      });

      document.querySelectorAll(".event-button").forEach((otherButton) => {
        otherButton.setAttribute("aria-expanded", "false");
      });

      document.querySelectorAll(".event-item").forEach((otherItem) => {
        otherItem.classList.remove("open");
      });

      if (!isOpen) {
        details.hidden = false;
        button.setAttribute("aria-expanded", "true");
        eventItem.classList.add("open");
      }
    });

    eventItem.appendChild(button);
    eventItem.appendChild(details);

    container.appendChild(eventItem);
  });
}


function updateEventClocks() {
  document.querySelectorAll(".event-clock").forEach((clock) => {
    const eventDate = clock.dataset.eventDate;
    clock.textContent = formatElapsedTime(eventDate);
  });
}


renderEvents();
updateEventClocks();

setInterval(updateEventClocks, 1000);
