//url
var iconUrl = "icons/icon48.png";
var bodyMessage = 'Time to drink water';
var maxMinutes = 120 * 1000;
//set Notification
function show() {
  var time = /(..)(:..)/.exec(new Date());     // ex[21:45, 21, :45]
  var hour = time[1] % 12 || 12;               // The prettyprinted hour.
  var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
  var n = new Notification(
      hour + time[2] + ' ' + period,
      {
          icon: iconUrl,
          body: bodyMessage
      }
  );
  setTimeout(n.close.bind(n), 9*1000);
}

// Conditionally initialize the localStorage.
if (!localStorage.isInitialized) {
  localStorage.isActivated = true;   // The display activation.
  localStorage.frequency = 1;        // The display frequency, in minutes.
  localStorage.isInitialized = true; // The option initialization.
}

// show Notification
if (window.Notification) {
  // first time to show Notification
  if (JSON.parse(localStorage.isActivated)) { show(); }
  // Next time to show Notification, using interval
  var interval = 0;

  setInterval(function() {
    interval++;

    if (
      JSON.parse(localStorage.isActivated) &&
        localStorage.frequency <= interval
    ) {
      show();
      interval = 0;
    }
}, maxMinutes);
}
