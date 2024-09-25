# Productivity Buddy

# Design Document

Productivity Buddy is a Chrome extension designed to help users enhance their productivity by blocking distracting websites during specified times of the week. The extension creates a popup that allows users to input the URLs of distracting websites, displaying them in a list. The user should also be able to input productive time periods, that have a start time, an end time and days on which they are applied. The user should be redirected away from blocked URLs during blocked time periods. The user should also have the ability to remove websites and times from the list. 

Here is how I technically implemented this chrome extension, with all of these features, going over the design decisions I made in each of my files.

# manifest.json

The manifest is an essential file of a chrome extension, that describes various properties and settings, in JSON (JavaScript Object Notation)

I began by setting the manifest version to V2, because I found that it contained a set of simpler features than V3, that suited the needs of my extension. However, I will acknowledge that it will soon be completely phased out in favor of V3, so I should consider updating this project in the future to implement the same functionality using the features from V3.

Then, I described the name of my popup "Productivity Buddy", its version 3.0 because this was my third implementation of my project, and a short description.

The permissions in the manifest are the access rights that my extension is requesting to function. 

"storage" allowed me to use the Chrome Storage API to store arrays for the blocked websites and the blocked times, so that they could be saved if the user closed their browser or logged into another browser.

"webNavigation" allowed me to track the URL visited by the user, in order to check if it was in the blocked list and redirect the user away from it.

"tabs" allowed me to update the properties of the tab to a new URL, redirecting the user to the blocked page if they visited a blocked website during a blocked time.

"activeTab" allowed me to access information about the active tab, such as its URL. I thought I would use it to access the visited URL in order to compare it with the blocked list, but there is actually a built-in details.url that returns the URL a user is navigating to in the "webNavigation" permission that I used instead.

The "browser_action" section allowed me to define a default icon for my extension, which is the file icon.png that I created. Which is also defined in the "icons" section. I only have a 128x128 px version of the icon. It also defines an HTML file for the default popup to show when the user clicks on the extension, which is defined by popup.html.

Finally, the "background" section introduces scripts that run in the background of my extension, such as background.js which contains the logic to check if the URL is inside the blocked list, and if the current time is inside a blocked time period, redirecting the user away to block that website. The persisten:false condition is simply so that the background script stops running if the extension goes idle, and runs again when it is needed. 

# popup.html

This file is the HTML code for the popup of the extension. 

In the head: the file defines the language as english and contains a meta tag specifying the character encoding as UTF-8. It also contains a meta tag to adjust the width of the popup to the device width, adapting better to mobile and other screen sizes. It also contains the title of the project, Productivity Buddy. It also contains a link to a CSS stylesheet that I used to style the popup's elements to improve the user experience and to the JavaScript logic for the popup's functionality (more on both of these later).

For the body of the popup, I am going to go over the different features the popup should have and how they were implemented using HTML. 

Title of the popup: implemented in a h2 header 

Display status messages: I included a div for status messages that is updated with either error messages or succesful validation messages. I chose to print them directly in the popup instead of as an alert because I thought it would be less invasive and more user-friendly.  

Allow User to Add Websites: Next is the fieldset that I implemented to allow users to add websites to the blocked websites list. It contains a text input for the user to type in a URL, with a label and a button to submit the input.

Display the list of blocked websites: I started with an h3 header as the title of the list, and then an empty unordered list that is going to be dynamically updated with the blocked URLs by the JavaScript code.

Allow User to Add Times: Next is the fieldset that I implemented to allow users to add times to the blocked times list. It contains a time input for a start time and an end time, as well as check boxes for every day of the week that are used to select the days during which the blocked time should be applied. Everything is labeled, and there is a button at the end to submit the time input.

Display the list of blocked times: I started with an h3 header as the title of the list, and then an empty unordered lsit that is going to be dynamically udpated with the start time, the end time, and the list of days that were checked, by the JavaScript code. 

I chose the use fieldsets for these sections so that they could be surrounded by a box, to make it clearer that they had separate functions. That is why both fieldsets were labelled at the top, "Add Website" and "Add Times".

I also want to mention that I used aria labels to provide additional information to assistive technologies, such as screen readers, about the purpose or meaning of certain elements. These labels are particularly valuable for making web content more accessible to users with disabilities.

# popup.css

This CSS stylesheet defines the styles applied to my popup. I am only going to over the important design choices in my styling.

For the body, I set the width to 400px. I feel made the popup wide enough to interact well with without taking over the screen.

I included a media query for screens with a width under 600px, in order to modify styles for mobile devices and other smaller screens. This would make the popup thinner and the text smaller on mobile device for a more seamless experience. I will say that the developper tools for chrome extensions don't allow you to simulate a mobile screen, so I have no idea if this looks good. This can always be adjusted easily to accomodate for mobile users.

I set the legend of the fieldsets, which is the title at the top of the box that reads "Add Website" or "Add Times" to bold so that it is clearer what each section does.

For the class .addButton, which is applied to both buttons to add websites and times, I set them to green so they could contrast with the remove buttons, which I later set to red. I also added a hover effect that switches to a darker green when the mouse hovers over, to indicate to provide some user feedback.

For the list items, which are the lists of blocked websites and times, I added a margin to the bottom so they could be better spaced out, and easier to read.

For the class .error, which is applied to error validation messages, I set them to red so that it could be more intuitive for the user that there was a problem with their input, before reading the specific problem in the message's text.

The same reasoning is applied to the class .success that has green text, for messages that validate a task was accomplished succesfully.

Finally, for the class .removeButton, which is applied to the remove buttons for both websites and times, I set their background color to red to imply their function and contrast with the green add buttons. I also added a hover effect that changes the color to a slightly darker red.

# popup.js

This JavaScript file handles the logic behind all of the events that take in the popup, allowing the user inputs for blocked websites and times to be saved in Chrome's Synchronized Storage, and then displayed dynamically in a list of blocked times and blocked websites, where they can also be removed.

The file starts with an event listener for DOMContentLoaded, waiting for the popup's HTML to be loaded before executing the rest of the code.

Then, the file does essentially 4 things:

1. Add a website to the blocked websites list in storage: 

There is an event listener for the Add Website button being clicked, by listening for the id "addWebsiteButton", which then runs the function addWebsite to add the user's input to the list of blocked websites in Chrome's Synchronized Storage.


2. Add a time to the blocked times list in storage

There is an event listener for the Add Time button being clicked, by listening for the id "addTimeButton", which then runs the function addBlockedTime to add the user's input to the list of blocked websites in Chrome's Synchronized Storage.

3. Update the list of blocked websites in the popup:

Runs the function updateBlockedWebsitesList

4. Update the list of blocked times in the popup:

Runs the function updateBlockedTimesList

The rest of the file defines the functions that allow these 4 tasks to be accomplished effectively. I chose to break up lots of small tasks that needed to be done into functions so that the code could be read easier. 

addWebsite: The function to add a website to the blocked list.

Retrieve user input: It starts by storing the user's input by getting it from its id "websiteInput", removing leading and trailing whitespace using the .value.trim() method, to avoid any bugs in case the user accidentally added any when copy pasting a URL. The input string is stored in the variable website.

Input Validation: Then, there is some error validation. The code checks if the string is empty, meaning the user pressed the button without entering an input. The file then displays an appropriate error message using the displaErrorMessage function, called with the string of the message. More on that function later.

Input Validation: There is also error validation for the format of the URL input. This is accomplished using the isValidURL function. If the function returns False, meaning the format is not valid, then !isValidURL becomes True, and dispayErrorMessage is called with an appropriate error message.

Next is the part of the function that stores the blocked website into the list of blocked websites in Chrome's Synchronized Storage, which exists to save information in the user's google account. I chose to implement this feature because it allows the user to close their browser without losing their list of websites and times, which would be extremely inefficient to reenter every time and make my extension unusable.

Retrieve array of blocked websites from storage: First, it uses chrome.storage.sync.get to retrieve a key-value pair from Chrome's Synchronized Storage, in this case, the "blockedWebsites" key,.
It stores the value of the key using the method data.blockedWebsites, which is an array containing all of the blocked websites. If there is no data, meaning the user is entering their first blocked website, it returns an empty array.

Error validation: The code does some error validation to check if the website is already in the array, using the .includes method passed with website, to check if the input string is inside of the array of blocked websites, displaying an appropriate error message.

Add website to blocked list: The website is added to the blocked array using the .push method, which adds an element to the end of an array.

Update blocked websites list in storage: The array of blocked websites is updated in Synchronized Storage using chrome.storage.sync.set, which allows you to update a key-value pair in the storage. 

It is called with the key-value pair blockedWebsites: blockedWebsites, which is the same key from before, whose value is now set to the updated array, that contains the new website that was just pushed to the end. 

Now that the blocked website list is updated in storage, the popup needs to be updated. The list needs to updated with the new entry, the input field clearer for the next website, and a success message for the user. I decicded for clarity to separate these tasks into other functions, that are simply called here and defined later. 

Update the list of blocked websites in the popup: The function updateBlockedWebsitesList is called.

Clear the website input in the popup: The function clearWebsiteInput is called.

Display success message: The function displaySuccessMessage is called with an appropriate message.

addBlockedTime: The function to add a time period to the blocked list.

This function is very similar to the previous function that added websites to the blocked list. 

Retrieve user input for times: Gets elements by id "startTime" and "endTime" for the start and end times input by the user.

Input Validation: Check if the user did not enter a start or end time. The code check if either the start or end time are emtpy strings, displaying an appropriate error message.

Input Validation: Check if the user input times with the valid format HH:MM AM/PM. If the user does not touch the HTML for the popup, the input sections of type="time" should only let them enter the valid format. However, this is making sure to not accept invalid inputs if the user changes the input type to text and enters something like "9am" for example. It performs the check using the function isValidTimeFormat, displaying an appropriate error message.

Input Validation: Check to make sure the user input times in the proper order. The start time is supposed to come before the end time, but nothing in the input fields requires the user to enter them this way. The isTimeRangeValid function is called to make sure they are in the right order, displaying an appropriate error message if not.

Retrieve input for the days: 

document.querySelectorAll('#days input:checked') selects all input checkbox elements that are checked with the id "days" 

Array.from stores this list of elements in an array

.map(checkbox => checkbox.value) transforms each element of the array to the value of the checkbox, which is a string of the day of the week it represents.

Therefore, we end up with an array containing the days of the week that were checked.

Input Validation: Check to make sure at least one day was selected. The .length method is used to check if the the number of days in the array is 0, and display an appropriate error message.

Retrive the blocked list of times/days from storage: Use chrome.storage.sync.get to retrieve the key-value pair blockedTimes from storage. Store the value of blockedTimes using data.blockedTimes, which is an array containing the list of blocked times/days. If there is no data stored at that key in storage, meaning no time period has been input, return an empty array.

Add the blocked times/days to the array: The times/days are added to the blocked array using the .push method, contained in a JavaScript object of the following form: {startTime, endTime, days} (days is the array of days)

Update the list of blocked times/days in synchronized storage: using chrome.storage.sync.set, called with the key-value pair blockedTimes: blockedTimes.

This is the same key from before, whose value is now set to the updated array, that contains the new JS object containing the times/days, that was just pushed to the end of the array.

Update the list of blocked times/days in the popup: The function updateBlockedTimesList is called.

Clear the times/days inputs in the popup: The functions clearTimeInput and clearCheckboxes are called

Display success message: The function displaySuccessMessage is called with an appropriate message.

The rest of the functions were called inside of the previous two functions, to perform some of their functionality that was described.

updateBlockedWebsitesList: Responsible for updating the list of blocked websites in the popup.

Retrieve the array of blocked websites from storage: Uses chrome.storage.sync.get on the same key-value pair as above, using data. to obtain the array.

Get the list element from the popup: Gets the unordered list element for the websites from the popup's HTML using getElementbyId on the id "blockedList".

Clear the current list of blocked websites the popup: clears the current list using .innerHTML to go into the list element and set it to an empty string to clear it out. 

Add the updated list of blocked websites:

I start by iterating over each of the websites in the array using the .forEach method. For each website in the blocked list, do the following

Create a list item for the website: calls the createListItem function that I created to do this. Called 

Create a remove button for the website's list element: calls the createRemoveButton function with the argument removedBlockedWebsite, to specify that a website is going to be removed with this button (more on this later).

Insert the remove button into the website's list item: uses the .appendChild method, which is used to attach a child node at the end of a parent node. What this means in HTML is that inside of the <li> for the website, the <button> for the remove button is going to be added.

Add the list item containing the website and remove button to the popup:
also uses the .appendChild method to add the <li> containing the website's URL and the remove button to the <ul> for blocked websites.

After iterating over all of the websites in the array, the list in the popup is populated with all of the blocked URLs and a button to remove them.

updateBlockedTimesList: Similar to the previous function, responsible for updating the list of blocked time periods in the popup.

It is designed in the exact same way as the websites, except for calling the createListItem function. For the websites, it was called on the string of the URL, which is what is contained inside of the array of blocked websites. 

But remember that the times/days are stored as JS objects: {startTime, endTime, days}. Therefore, I call createListElement with the following argument, that formats a string for how I would like to display the time period and days in the popup: `Start Time: ${time.startTime}, End Time: ${time.endTime}, Days: ${time.days.join(', ')}`

uses. startTime to get the startTime, .endTime to get the end time, and .days.join(', ') to get all of the days in the array of days that were checked, and display them all, separated by commas.

createListItem: Function to create HTML list items to insert into popup.html, it is passed with the text that should be displayed, either the website URL or the formatted string for times/days.

Starts by using .createElement('li') to create an HTML list element with the tag<li>

Then uses .textContent to populate the list element with the string argument passed into the function.

createRemoveButton: Function to create a remove button, that allows the user to remove that element from a blocked list.

It is important to note that the element, be it a website or a time, also needs to be removed from synchronized storage when the button is pressed. Therefore, the function is passed with an argument removeFunction, which is going to be a the function to remove the element from storage when the button is pressed.

Create a button: use the .createElement('button') method to create an HTML element for a <button>. Uses the .textContent method to add some text to indicate what the button does. Uses the .className method to add the 'removeButton' class that allows the remove buttons to be styled differently in the stylesheet.

Remove the element from storage if the button pressed: Uses an event listener for the button being clicked, and then calls the function removeFunction that was passed as an argument. 

If the remove button is being created for a website, it is going to be passed with removeBlockedWebsite. If the button is for a time period, it is passed with removeBlockedTime. This is because the two don't have the same format, and are stored in different key-value pairs in storage. I thought it would be simpler to just break this functionality into two separate functions.

removeWebsite: Function to remove a website from the blocked list in storage.

Retrieve the array of blocked websites in storage: uses chrome.storage.sync.get on the same key-value pair for blockedWebsites, uses data. to get just the array of blocked websites.

Update the array to remove a website: uses the .filter method on the array, calling it with item => item !== website. What this does is iterate over the items in the array and keep them only if they are not the website that is being removed. 

Update the array of websites in storage: uses the familiar chrome.storage.sync.set with the key-value pair, updating the key with the updated array, that no longer contains the removed website. 

Update the list of websites in the popup: The list of blocked websites in the popup needs to be updated to no longer display the removed website. Calls the updateBlockedWebsitesList that I described above in the document. 

*** Design Note: This is why I designed updateBlockedWebsitesList to clear the list and repopulate it with the contents of the current array. This works equally well if a website is added or removed.

Display a success message for the user: calls the displaySuccessMessage function with an appropriate error message

removeBlockedTime: Similar to the previous function, removes a time from the blocked list in storage. 

Retrieve the array of blocked time periods in storage: uses chrome.storage.sync.get on the same key-value pair for blockedTimes, uses data. to get just the array of blocked times. It is an array of objects that contain start time, end time and an array of days.

Because the .filter method would not work in this case, it is not as simple to remove the time period, so I went with this approach instead.

Find the index of the time that needs to be removed in the array: uses the .findIndex method to iterate over the array and find an element with matching start times, matching end times, and matching arrays for the days. In order to compare the arrays for the days, I defined a function arraysEqual. Returns -1 if there is no match, but that will not happen since we are removing an element that is definitely in the array.

Create a new array without the time period that needs to be removed: I accomplished this by using slices and indexing. The updated array of blocked times only includes the slice from 0 to the index of the time that needs to be removed (which stops right before it, does not include it), and the slice from the index + 1 (which starts right after it) to the end. By combining these two slices, I effectively created an array of blocked time period objects that no longer includes the one that needed to be removed. 

Update the array of websites in storage: uses the familiar chrome.storage.sync.set with the key-value pair, updating the key with the updated array, that no longer contains the removed time period. 

Update the list of times in the popup: The list of blocked times in the popup needs to be updated to no longer display the removed time period. Calls the updateBlockedTimesList function described above. 

Display a success message for the user: calls the displaySuccessMessage function with an appropriate error message

arraysEqual: Function to return whether two arrays are identical. 
Compares the length of both arrays using the .length method
Compares every value in the arrays using the .every method on the first array with (value, index), iterating over every value of the array, keeping track of its index.
value === array2[index]: compares the value of the element in the first array with the value in the second array at that same index.

displayErrorMessage: Function to display error message. Calls the function displayMessage specifying the argument 'error'.

displaySuccessMessage: Function to display succesful task message. Calls the function displayMessage specifying the argument 'success'.

displayMessage: Function to display message of both types depending on argument 'messageType'. 
It starts by getting the section of the popup HTML where the message is supposed to be printed, getting the element by ID 'statusMessage'

The it populates its text using the .textContent method

Then, it adds an appropriate class for styling using the .className method. The class is going to be 'error' or 'success' depending on what it passed, allowing them to be style differently in the stylesheet.

** Design note: I decided to implement the messages this way to define only a single function for messages, and have it populate this class depending on the type of message separately, to avoid creating two long functions for success and error messages

It calls setTimeout to make the the messages only last 3 seconds (3000 ms). the .textContent and .className are set to an emmpty strings after this time has elapsed.

clearWebsiteInput: Function to clear the website input box. Sets the .value of that elements ID to an empty string. 

clearTimeInput: clear the inputs for start time and end time. Called with both of their IDs, uses .forEach to iterate over them and .getElementById to get the elements in the popup, and set their .value to an empty string.

clearCheckboxes: Function to clear the checkboxes for the days of the week. Passed with the ID for the checkboxes. uses .querySelectorAll to select all elements with the ID, iterates over them with .fearEach and unchecks them using .checked = false.

isValidURL: Function to validate the format of a website input as a URL. Defines a regular expression for a valid URL and uses the .test method to compare the input to it.

isValidTimeFormat: Function to validate the format of a time input as HH:MM. Defines a regular expression for the time format and compares the input using .test.

isTimeRangeValid: Function to make sure the user inputs the start and end times in the right order. simply compares their value using <.

That completes all the functions that were used to implement popup.js, which now is responsible for everything that happens in the popup.

# background.js

This JavaScript file runs in the background and handles redirecting the user away from blocked websites during blocked times.

It does this using chrome.webNavigation.onBeforeNavigate.addListener, which listens for a navigation event taking place (when the user navigates to a wbesite). It then executes its code right before a navigation event occurs.

Check if the user is navigating to a blocked website: Calls the checkBlockedWebsite function on details.url, which is the current URL that is being visited in the navigation event.

If it returns a callback True ->

Check if the current time is within a blocked time: Calls the checkBlockedTime function, if it returns a callback True ->

Redirect the user to a blocked page: Call the function redirectToBlockedPage

That is all of the core functionality covered, now for how these functions work:

checkBlockedWebsite: Function to check whether the visited URL is in the list of blocked websites.

Retrieves the array of blocked websites from storage, uses chrome.storage.sync.get on key blockedWebsites as we have seen, using .data to get the array.

Check if URL is in the array: uses the .some method on the array to iterate over every blocked URL, 


** Design Note: I used .some because it stops iterating returns True as soon as a single match is found.

blockedUrl => url.includes(blockedUrl): this checks if the URL being visited contains some substring that matches the blocked URL in the array. 

**Design Note: This makes it so that if you block youtube.com for example, it will redirect you away from any youtube video URL that contains that substring.

If this condition is met, stop iterating, callback is True.

checkBlockedTime: Function to check if the current time is inside of a blocked time interval.

Stores the current date information using Date()

Stores the current day by calling method toLocaleDateString('en-US', { weekday: 'long' }) which stores the day of the week as a long

Stores the current time using method toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

Retrieve array of blocked time objects from storage: 
use the familiar chrome.storage.sync.get on the key blockedTimes, using .data to get the array.

** Design Note: I was debugging this section and so I included some console logs that print information to the console, to check if this portion of the code was running properly. I forgot to remove it after debugging.

Iterate over the array of blocked time objects, checking if the current time is inside of the time interval and if the current day is inside of its list of days: 

For every blocked time object (containing times and days)

-> call the .some method again to iterate until a match is found 

-> check if the array of days contains the current day using the .includes method

-> check if the current time is inside of the interval of the start and end times by calling the isTimeinRange function

If all of these conditions are met, callback is True.

isTimeInRange: Function to check whether the current time is inside of the start and end time.

Converts the start time and end times from strings to date objects, so that they can properly be compared with the current time.

Compares them mathematicallty using >= and <=, checking for both conditions.

redirectToBlockedPage: Function to redirect the current tab to another HTML file, away from the blocked website.

Uses chrome.tabs.update, which updates the current tab to another URL.

It is updated to the URL of the blocked-page.html file in the package of the extension, that is created using the .getURL method.

# blocked-page.html

An HTML file for the blocked page that users are redirected to when they visit a blocked website during a blocked time.

I included a fun meme as an image element, but realistically anything can go here. I wish I had more time to style it better, and maybe find a way to have it cycle over many memes. The image file for the meme is in the folder as meme.png.

# icon.png

The image file for the icon of my popup, that appears in your toolbar, that you press to access the popup. I designed it myself on Canvas!

# Chrome Store

I plan on adding Producivity Buddy to the Chrome Store when I have a minute, so be on the lookout for that!

Contributors: I just want to note that I used ChatGPT to help recommend methods I could use to accomplish what I wanted. A lot of what I learnt about using Chrome's various APIs, for storage and navigation, was from ChatGPT. However, I hope that this document proves as evidence that I understand my implementation thoroughly, and used this AI tool responsibly.

Thank you for reading this, and I hope you enjoy testing Productivity Buddy! Thank you for all your help this semester, and wishing you best of luck on your finals!

















