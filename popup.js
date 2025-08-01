// popup.js

// Wait for content to be loaded
document.addEventListener('DOMContentLoaded', function () {
  // Add event listeners for both buttons being clicked
  document.getElementById('addWebsiteButton').addEventListener('click', addWebsite);
  document.getElementById('addTimeButton').addEventListener('click', addBlockedTime);

  // Initialize the blocked websites and times lists
  updateBlockedWebsitesList();
  updateBlockedTimesList();

  // Function to add a website to the blocked list when button clicked
  function addWebsite() {
    // Website input by the user
    const websiteInput = document.getElementById('websiteInput');
    // Remove leading and trailing whitespace in case
    const website = websiteInput.value.trim();

    // Error validation if no website was input
    if (website === '') {
      displayErrorMessage('Please enter a website URL.');
      return;
    }

    // Error validation for format of the URL
    if (!isValidURL(website)) {
      displayErrorMessage('Please enter a valid website URL.');
      return;
    }

    // Add the website to the list and update

    // Retrieve the key blockedWebsites from Chrome's synchronized storage
    chrome.storage.sync.get({ blockedWebsites: [] }, function (data) {

      // Array of blocked websites
      const blockedWebsites = data.blockedWebsites || [];

      // Error validation if website already in array
      if (blockedWebsites.includes(website)) {
        displayErrorMessage('This website is already in the blocked list.');
        return;
      }

      // Add the website to the end of the array
      blockedWebsites.push(website);

      // Update array of blocked websites in storage (edit key-value pair blockedWebsites: blockedWebsites)
      chrome.storage.sync.set({ blockedWebsites: blockedWebsites }, function () {
        // Update list of blocked websites on the popup
        updateBlockedWebsitesList();
        // Clear the website input
        clearWebsiteInput(websiteInput);
        // Success validation
        displaySuccessMessage('Website added successfully.');
      });
    });
  }

  // Function to add a blocked time when button pressed
  function addBlockedTime() {
    // User input for start time
    const startTime = document.getElementById('startTime').value;
    // User input for end time
    const endTime = document.getElementById('endTime').value;

    // Input validation if no times are input
    if (startTime === '' || endTime === '') {
      displayErrorMessage('Please enter both start and end times.');
      return;
    }

    // Input validation for the format of the time input
    if (!isValidTimeFormat(startTime) || !isValidTimeFormat(endTime)) {
      displayErrorMessage('Please enter valid time formats.');
      return;
    }

    // Input validation for correct order of start and end times
    if (!isTimeRangeValid(startTime, endTime)) {
      displayErrorMessage('Invalid time range. Start time should be before end time.');
      return;
    }

    // User input for the days selected
    const days = Array.from(document.querySelectorAll('#days input:checked')).map(checkbox => checkbox.value);

    // Input validation for at least 1 day selected
    if (days.length === 0) {
      displayErrorMessage('Please select at least one day.');
      return;
    }

    // Add the blocked time to the list and update

    // Retrieve the blocked times from Chrome's Synchronized Storage
    chrome.storage.sync.get({ blockedTimes: [] }, function (data) {

      // Array of blocked times
      const blockedTimes = data.blockedTimes || [];

      // Add the time to the end of the array
      blockedTimes.push({ startTime, endTime, days });

      // Update the array of blocked times in storage (edit key:value blockedTimes: blockedTimes)
      chrome.storage.sync.set({ blockedTimes: blockedTimes }, function () {
        // Update list of blocked times in the popup
        updateBlockedTimesList();
        // Clear input boxes for times
        clearTimeInput(['startTime', 'endTime']);
        // Clear input in checkboxes
        clearCheckboxes('days');
        // Success validation
        displaySuccessMessage('Time added successfully.');
      });
    });
  }

  // Function to update the popup with the list of blocked websites
  function updateBlockedWebsitesList() {
    // Retrieve the array of blocked websites from storage
    chrome.storage.sync.get({ blockedWebsites: [] }, function (data) {
      const blockedWebsites = data.blockedWebsites || [];
      // Get the list element from the popup HTML
      const blockedList = document.getElementById('blockedList');
      // Clear the current list
      blockedList.innerHTML = ''; 

      // Iterate over the array of websites
      blockedWebsites.forEach(website => {
        // Create a list item for the website
        const listItem = createListItem(website);
        // Create a remove button to the website
        const removeButton = createRemoveButton(removeWebsite, website);
        
        // Insert the remove button into the list item
        listItem.appendChild(removeButton);

        // Add the website and remove button item to the list on the popup
        blockedList.appendChild(listItem);
      });
    });
  }

  // Function to update the popup with the list of blocked times
  function updateBlockedTimesList() {
    
    // Retrieve the array of times from storage
    chrome.storage.sync.get({ blockedTimes: [] }, function (data) {
      const blockedTimes = data.blockedTimes || [];
      // Get the list element from the popup HTML
      const blockedTimesList = document.getElementById('blockedTimesList');
      // Clear the current list
      blockedTimesList.innerHTML = '';

      // Iterate over the array of times
      blockedTimes.forEach(time => {
        // Create a list item for the time, with start/end time and the list of days
        const listItem = createListItem(`Start Time: ${time.startTime}, End Time: ${time.endTime}, Days: ${time.days.join(', ')}`);
        // Create a remove button 
        const removeButton = createRemoveButton(removeBlockedTime, time);

        // Insert the remove button into the lsit item
        listItem.appendChild(removeButton);
        // Add the time and remove button to the list on the popup
        blockedTimesList.appendChild(listItem);
      });
    });
  }

  // Helper function to create list items to insert into popup.html
  function createListItem(text) {
    // Create an html list element
    const listItem = document.createElement('li');
    // Populate it with input text (website or time)
    listItem.textContent = text;
    return listItem;
  }

  // Helper function to create remove buttons with event listeners
  // Passed with a different remove function depending on website or time
  function createRemoveButton(removeFunction, dataToRemove) {
    // Create html button element
    const removeButton = document.createElement('button');
    // Populate it with descriptive text
    removeButton.textContent = 'Remove';
    // Add the class removeButton to style it
    removeButton.className = 'removeButton';
    
    // Add event listener if the button is clicked
    removeButton.addEventListener('click', function () {
      // Call a function to remove either a website or a time
      removeFunction(dataToRemove);
    });
    return removeButton;
  }

  // Function to remove a website from the blocked list
  function removeWebsite(website) {
    // Retrieve array of blocked websites from storage
    chrome.storage.sync.get({ blockedWebsites: [] }, function (data) {
      const blockedWebsites = data.blockedWebsites || [];
      // Update the array to include all strings that are not the website (remove the website from array)
      const updatedWebsites = blockedWebsites.filter(item => item !== website);
      // Update the website array in synchronized storage
      chrome.storage.sync.set({ blockedWebsites: updatedWebsites }, function () {
        // Update website list in the popup
        updateBlockedWebsitesList();
        // Success validation
        displaySuccessMessage('Website removed successfully.');
      });
    });
  }

  // Function to remove a time from the blocked list
  function removeBlockedTime(time) {
    // Retrieve array of blocked times from storage
    chrome.storage.sync.get({ blockedTimes: [] }, function (data) {
      const blockedTimes = data.blockedTimes || [];
      // Search for index of time that needs to be removed by comparing start time, end time and days
      // Returns -1 if not found
      const matchingTimeIndex = blockedTimes.findIndex(t =>
        t.startTime === time.startTime && t.endTime === time.endTime && arraysEqual(t.days, time.days)
      );
      
      // Check if a matching time was found (returns index not -1)
      if (matchingTimeIndex !== -1) {
        // Create a new array by excluding the time at the matching index (merging slices before and after)
        const updatedTimes = [...blockedTimes.slice(0, matchingTimeIndex), ...blockedTimes.slice(matchingTimeIndex + 1)];
        // Store the new updated array in synchronized storage
        chrome.storage.sync.set({ blockedTimes: updatedTimes }, function () {
          // Update the list of blocked times in the popup
          updateBlockedTimesList();
          // Success validation
          displaySuccessMessage('Time removed successfully.');
        });
      }
    });
  }

  // Helper function to compare if two arrays of days are identical
  // Compares number of days, and iterates over both arrays, comparing the string for the day at each index 
  function arraysEqual(array1, array2) {
    return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
  }

  // Helper function to display error messages
  function displayErrorMessage(message) {
    displayMessage(message, 'error');
  }

  // Helper function to display success messages
  function displaySuccessMessage(message) {
    displayMessage(message, 'success');
  }

  // Function to display messages of both types (specified in the arguments)
  function displayMessage(message, messageType) {
    // Get the element for the status messages in the popup HTML
    const statusMessage = document.getElementById('statusMessage');
    // Add the text content of the message
    statusMessage.textContent = message;
    // Add a class for styling which is the message type (error or success)
    statusMessage.className = messageType; 
    // Display messages only 3 seconds
    setTimeout(() => {
      statusMessage.textContent = ''; // Remove text content
      statusMessage.className = ''; // Remove the class
    }, 3000); // After 3 seconds
  }

  // Helper function to clear website inputs
  function clearWebsiteInput(inputField) {
    inputField.value = '';
  }

  // Helper function to clear time inputs, passed with array of Ids
  function clearTimeInput(inputIds) {
    // Iterate over Ids
    inputIds.forEach(id => {
      // Clear elements with that Id
      document.getElementById(id).value = '';
    });
  }

  // Helper function to clear checkboxes for days, passed with ID
  function clearCheckboxes(checkboxContainerId) {
    // All checkboxes with that ID
    const checkboxes = document.querySelectorAll(`#${checkboxContainerId} input`);
    // Iterate over checkboxes
    checkboxes.forEach(checkbox => {
      // Set to false
      checkbox.checked = false;
    });
  }

  // Helper function to validate URL format
  function isValidURL(url) {
    // Uses a regular expression to check for a valid URL format
    const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/[a-zA-Z0-9/?%&=]*)?$/;
    return urlRegex.test(url);
  }

  // Helper function to validate time format
  function isValidTimeFormat(time) {
    // Uses a regular expression to check for a valid time format (HH:MM)
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeRegex.test(time);
  }

  // Helper function to validate that times were input in correct order
  function isTimeRangeValid(startTime, endTime) {
    // Compare the time values to check if the start time is before the end time
    return startTime < endTime;
  }
});
