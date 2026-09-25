/* =========================================================
   MTIS — Mixed Tenure Interminable Saga

   Main programme start:
   14 July 2023 at 00:00 UK time

   Future events can be added below.
   ========================================================= */


/* ---------- Programme start ---------- */

const programmeStart = new Date(
  "2023-07-14T00:00:00+01:00"
);


/* ---------- Future events ---------- */
/*
   We'll add these tomorrow.

   Example:

   const events = [
     {
       title: "Planning application submitted",
       date: "2024-01-15T00:00:00+00:00"
     }
   ];
*/

const events = [];


/* ---------- Main clock ---------- */

function updateClock() {

  const now = new Date();

  const elapsedMilliseconds =
    now.getTime() - programmeStart.getTime();

  /* Don't allow a negative number */
  if (elapsedMilliseconds < 0) {
    document.getElementById("mainClock").textContent =
      "00:00:00";

    return;
  }


  const totalSeconds =
    Math.floor(elapsedMilliseconds / 1000);


  const hours =
    Math.floor(totalSeconds / 3600);


  const minutes =
    Math.floor(
      (totalSeconds % 3600) / 60
    );


  const seconds =
    totalSeconds % 60;


  const formattedHours =
    hours.toLocaleString("en-GB");


  const formattedMinutes =
    String(minutes).padStart(2, "0");


  const formattedSeconds =
    String(seconds).padStart(2, "0");


  document.getElementById("mainClock").textContent =
    `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}


/* ---------- Start clock ---------- */

updateClock();

setInterval(updateClock, 1000);
