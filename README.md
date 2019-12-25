# Comment-Reply-System
A web-page that replicates a comment and reply system using html, css, and javascript.

## Features
- This web-page runs locally on your system so the files must be placed in the same folder. The data for the usernames, comments, and replies are stored in the local storage of the browser.
- Initially, you'll notice that the interface just has two text fields for username and comment where you can type in the respective details pertaining to the fields and an "Add Comment" button.
- After clicking on the "add comment" button then whatever was typed in the text fields will be displayed along with the time and date of adding the comment. This only works if both the text fields aren't empty.
- Next to the displayed comments you can see the "Delete", "Edit", and "Reply" buttons.
- The "Delete" button deletes the comment from the local storage and it will not be rendered anymore on the page.
- The "Edit" button, when clicked, displays the username and comment in the respective fields and a "Save" button replaces the "Add Comment" button. In this edit state, the username is set to read-only so it can't be edited but the comment can be changed. After you're done editing simply pressing the "Save" button will save any changes done and the "Add comment" button will replace the "Save" button.
- Now when the "Reply" button is clicked, the "Add Comment" button is replaced with a "Reply to Comment" button and you can type any reply to that particular comment. When done and after clicking the "Reply to Comment" button, the reply is saved and is printed nested underneath the comment with which you clicked "Reply" for.
- Similarly, each reply has a "Delete" button and an "Edit" button which work the same way as the comments' "Delete" and "Edit" buttons.
Side Note: When deleting a comment, any replies nested underneath it are also deleted as well.
