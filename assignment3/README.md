Unit 03 JavaScript Homework: Password Generator
=============================

Click [here](https://cynwong.github.io/assignments/assignment3/index.html) to view this application. 


Description
--------------
A web application is created to <strong>generate a strong password based on user's preferances.</strong>. This application built using the following technologies: 
<ol style="margin-left:3rem">
    <li><abbr title="HyperText Markup Language">HTML</abbr></li>
    <li><abbr title="Cascading Style Sheets">CSS</abbr></li>
    <li>Javascript</li>
    <li>Bootstrap - CSS Framework</li>
    <li>jQuery for actions of Bootstrap's modal</li>
</ol>

A password can be generated with 
  * Lowercase,
  * Uppercase,
  * Numeric, and
  * Special characters.[?](https://www.owasp.org/index.php/Password_special_characters)

Password can have at least 8 characters and up to 128 characters. The users will be able to choose these options in Password Generator's Settings Panel. 




Instructions
--------------
####Generate Password
* Click on "Generate Password" to start. This will open Password Generator's setting panel. 
* In the prompt form, select password length value from 8 to 128 and desired character type(s).
* Click "Generate" button to get the password.
* Or Click "Close" button to quit the setting page.
* The generated password will be shown in the password session.  

####Copy password to Clipboard
* Once the password is generated, clicking this button will copy the password to the Clipboard. 


Action controls and error messages
-------
Error message 1: <q><em>No password detected. Generate password first.</em></q> will show up when the user is trying to copy the password before a password is generated. 

Error message 2: <q><em>At least one type of character type must be selected</em></q> will show up when user tries to generate a password without selecting any Character type.

Password Length is not checked via code since the dropdown box must always have a value with numeric character. 
