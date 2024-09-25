# Productivity Buddy

Productivity Buddy is a Chrome extension designed to help users enhance their productivity by blocking distracting websites during specified times of the week.

## Table of Contents
- [Download and Installation]
- [Usage and Testing]
    - [Input Validation]
    - [Functionality]
- [Troubleshooting]

## Download and Installation

1. Download the folder containing the extension files from the Gradescope assignment "Final Project: Implementation". Make sure to decompress the folder from the zip file.
2. Open the folder and make sure it contains the following essential files: "manifest.json", "popup.html", "popup.css", "popup.js", "background.js", "blocked-page.html", "icon.jpg". 
2. Open the Google Chrome browser and go to chrome://extensions/. Make sure to toggle on "Developper mode" in the top right corner.
3. Load the extension into your browser by pressing "Load unpacked" in the top right corner and selecting the downloaded folder containing the extension files. 
4. You should see an entry for "Productivity Buddy 3.0 appear under "All Extensions". Make sure that it is toggled on. There is a button to reload the extension should you need it.
5. A button for "Errors" should appear, click on it and make sure the only error is for "Manifest version 2 is deprecated, and support will be removed in 2023." This is simply a warning, and does not affect functionality at the moment.
5. Make sure that the extension opens properly. In your toolbar at the top right of the browser, on the right of the search bar, click on the puzzle piece to view your extensions. Click on "Productivity Buddy" and make sure that the popup opens properly.

## Usage and Testing
Now that we made sure the popup opens properly, we can test the functionality of the extension. The popup contains two input sections. 1. Input the URL of a website you want to block. 2. Input a time during which you want them blocked, containing a start time, an end time and checking off the days during which you want those times applied. 

## Input Validation

1. Empty website input: try clicking on the "Add Website" button without entering an input in "Website URL:". You should see an appropriate error message displayed in red at the top of the popup, underneath the title. Nothing else should be updated on the popup.
2. Invalid website input: try entering an input into "Website URL:" that is not a valid format for a URL. For example, you can try something like "instagram". You should see an appropriate error message displayed in red at the top of the popup, underneath the title. Nothing else should be updated on the popup.
3. Empty time inputs: try clicking on the "Add Time" button without entering an input into the "Start Time:" or the "End Time:". You should see an appropriate error message displayed in red at the top of the popup, underneath the title. Nothing else should be updated on the popup. Try again with only an input for "Start Time:" or "End Time:", you should see the same message.
4. Empty day inputs: input both a start time and an end time, and try clicking on the "Add Time" button without checking off any of the days. You should see an appropriate error message displayed in red at the top of the popup, underneath the title. Nothing else should be updated on the popup.
5. Invalid time input: Go into the developer tools for the popup by clicking on the puzzle piece in the toolbar, then on the three dots next to "Productivity Buddy", then "Inspect Popup". Go to "Elements" to view the HTML code for the popup, into the fieldset to add times. Change the input type for either the "StartTime" or "EndTime" from type="time" to type="text" and try entering some text that is not a time, such as "9am" for example. Make sure to input the other time properly and check at least one day, then press "Add Time". You should see an appropriate error message displayed in red at the top of the popup, underneath the title. Nothing else should be updated on the popup.

## Functionality

1. Input a website: try inputting a website you want to block into "Website URL:" and press on the "Add Website" button. You should see the URL appear underneath "Blocked Websites" with a red "Remove" button next to it. You should see an appropriate validation message displayed in green at the top of the popup, underneath the title. As an example, you can try: https://www.instagram.com/. 
2. Test blocking without time: try visiting the URL you input, because you have not yet submitted a time, you should be able to visit it as per usual.
3. Input a time: try inputting a time during which you want to block the website. Input a start time, an end time and check off the days during which you want them applied. Press on "Add Time" when you are done. You should see the time appear underneath "Blocked Times" with a red "Remove" button next to it. You should see an appropriate validation message displayed in green at the top of the popup, underneath the title.

4. Test blocking with website and time: try visiting the blocked website with a few different time inputs. 

You can start by inputting a time that does not contain the current time or the current day, and make sure the website is not blocked. 

Then, try a time interval that contains the current day but not the current time. 

Then, try an interval that contains the current time but not the current day. All of those should not block the website. 

Finally, try visiting the blocked website with a time interval that contains the current time and current day. You should be redirected towards the blocked page.

5. Test remove buttons: You should have already done this for the previous step, but try pressing the remove button for both websites and times and making sure they disappear from the popup. Try visiting the blocked website after removing a time that blocks it to make sure you can visit it once again.
6. Input validation for duplicate websites: Try entering the URL for a website that you have already entered. You should see an appropriate error message displayed in red at the top of the popup, underneath the title. Nothing else should be updated on the popup.
7. Blocking for substrings: Try visiting a URL that contains a URL on the blocked list but is not exactly the same. For example, if you have input https://www.instagram.com/ on the blocked list, then try visiting https://www.instagram.com/accounts/login/. You should also be blocked from accessing these URLs.
8. Saved to synchronized storage: try entering some websites and times, and closing your browser and reopening it. Open up the popup, your websites and times should be saved and displayed on the popup as before you closed your browser.

## Troubleshooting

Note for the time inputs, they have the following format: HH:MM AM/PM, for that last part that determines AM or PM, entering "a" will autofill the input to "AM", and entering "p" will autocomplete to "PM". 

If some part of the time input is not working, simply click on it to highlight it in blue and press delete to start over.

You can also check for error message by clicking on the puzzle piece to go back to the general extensions page, and click on "Errors" where you saw the manifest V2 error from earlier, to see if there are any additional errors.

## Link to Youtube Video
https://youtu.be/YB1C1MnO_zA
