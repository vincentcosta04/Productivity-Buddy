// background.js

// Event listener triggered before a navigation event in the browser
// Function executed as navigation event about to occur (user vists a website)
chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
  // Check if the user is navigating to a blocked website
  checkBlockedWebsite(details.url, function (isBlockedWebsite) { // details.url is page being navigated to
    if (isBlockedWebsite) {
      // Check if the current time is within a blocked time range
      checkBlockedTime(function (isBlockedTime) {
        if (isBlockedTime) {
          // Redirect to the blocked page
          redirectToBlockedPage();
        }
      });
    }
  });
});
  
// Function to check if a url is in the list of blocked websites
function checkBlockedWebsite(url, callback) {
  // Retrieve the array of blocked websites from synchronized storage
  chrome.storage.sync.get({ blockedWebsites: [] }, function (data) {
    const blockedWebsites = data.blockedWebsites || [];
    // Iterate over array of blocked websites
    // Return True if the substring of a blocked URL is found withint the string of the current URL
    const isBlockedWebsite = blockedWebsites.some(blockedUrl => url.includes(blockedUrl));
    callback(isBlockedWebsite);
  });
}
  
// Function to check if current time is inside a blocked time
function checkBlockedTime(callback) {
  // Current date and time information
  const now = new Date();
  // Current day of the week
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
  // Current time in format HH:MM
  const currentTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  // Retrieve array of blocked times from synchronized storage
  chrome.storage.sync.get({ blockedTimes: [] }, function (data) {
    const blockedTimes = data.blockedTimes || [];

    console.log("Current Day:", currentDay);
    console.log("Current Time:", currentTime);
    console.log("Blocked Times:", blockedTimes);

    // Iterate over array of blocked times,
    // Return True if current day is in the list of days
    // And if the current time is between the start time and end time
    const isBlockedTime = blockedTimes.some(time => {
      return (
        time.days.includes(currentDay) && isTimeInRange(currentTime, time.startTime, time.endTime)
      );
    });

    console.log("Is Blocked Time:", isBlockedTime);

    callback(isBlockedTime);
  });
}

// Helper function to check if current time is between start and end time
function isTimeInRange(currentTime, startTime, endTime) {
  // Convert time strings to Date objects for proper comparison
  const currentDate = new Date();
  const startDate = new Date(currentDate.toDateString() + ' ' + startTime);
  const endDate = new Date(currentDate.toDateString() + ' ' + endTime);

  return currentDate >= startDate && currentDate <= endDate;
}
  
// Function to redirect the user to the blocked page
function redirectToBlockedPage() {
  // Updates tab to the html file for the blocked page
  chrome.tabs.update({ url: chrome.extension.getURL('blocked-page.html') });
}  
