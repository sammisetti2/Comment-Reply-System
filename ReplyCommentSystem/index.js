showComments();
var currentId = 0;
var rId = 0;

//add comment
function addComment(){
event.preventDefault();
var username = document.getElementById('username').value;
var comment = document.getElementById('comment').value;

var comment= {
    commentId: generateCommentId(),
    username:username,
    comment:comment,
    time:getTimeAndDate(),
    creplies:[]
}

if(!isAnEntry('comments')){
    localStorage.setItem('comments',JSON.stringify([]));
    var comments=getAllComments();
      comments.push(comment);
      updateEntry(comments);
      showComments();
      clearFields();
}
else{
    var comments=getAllComments();
      comments.push(comment);
      updateEntry(comments);
      clearList();
      showComments();
      clearFields();
}

}

//get time and date
function getTimeAndDate(){
    var date= new Date();
    return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + " - "+ date.getHours() + ":" + date.getMinutes();
}

//make text fields and buttons set for replying to comment
function reply(commentId){
  event.preventDefault();
  var comments = getAllComments();
  document.getElementById('editButton').style.display= "none";
  clearFields();
  for(var i=0;i<comments.length;i++){
       if(comments[i].commentId === commentId){
         document.getElementById('replyButton').style.display= "inline";
         currentId = commentId;
       }
  }
}

//reply to another user
function replyToAnotherUser(){
  event.preventDefault();
  var username = document.getElementById('username').value;
  var comment = document.getElementById('comment').value;
  document.getElementById('editButton').style.display= "inline";
  if(username != '' && comment != '')
  {
    var reply = {
      replyId: generateReplyId(),
      rusername:username,
      rcomment:comment,
      time:getTimeAndDate()
    }
    //localStorage.setItem('replies', reply);
    var comments = getAllComments();
    for(var i = 0;i < comments.length; i++)
    {

      if(comments[i].commentId === currentId)
      {
        comments[i].creplies.push(reply);
        updateEntry(comments);
        clearList();
        showComments();
        clearFields();
      }

    }
  }
  else {

  }
  document.getElementById('replyButton').style.display= "none";
}

//clear all text fields
function clearFields(){
    document.getElementById('username').value="";
    document.getElementById('comment').value="";
}

//retrive all comments
function getAllComments(){
    return JSON.parse(localStorage.getItem('comments'));
}

//update comments
function updateEntry(array){
    localStorage.setItem('comments', JSON.stringify(array));
}

//checks if object is part of local storage
function isAnEntry(key){
    if(localStorage.getItem(key) != null)
    {
        return true;
    }
    else
    {
        return false;
    }
}

//print all comments
function showComments(){

    var comments=getAllComments();

    var commentsList=document.getElementById('commentsList');

    for(var i=0;i < comments.length;i++){

      commentsList.innerHTML+= "<li>"+ comments[i].username + "&nbsp;&nbsp;&nbsp;"+comments[i].comment + "&nbsp;&nbsp;&nbsp;"+comments[i].time+"&nbsp;&nbsp;&nbsp;" +"<button onclick=deleteComment("+comments[i].commentId+")>Delete</button>" +"&nbsp;&nbsp;&nbsp;" + "<button onclick=edit("+comments[i].commentId+")>Edit</button>" +"&nbsp;&nbsp;&nbsp;"+"<button onclick=reply("+
      comments[i].commentId+')>Reply</button>' +'</br>';
      commentsList.innerHTML+= '</br>';
      for(var j = 0;j < comments[i].creplies.length; j++)
      {

        commentsList.innerHTML+= "<ul>"+"<li>" + comments[i].creplies[j].rusername + "&nbsp;&nbsp;&nbsp;" + comments[i].creplies[j].rcomment + "&nbsp;&nbsp;&nbsp;" + comments[i].creplies[j].time +
        "&nbsp;&nbsp;&nbsp;" +"<button onclick=deleteReply("+comments[i].commentId +"," + comments[i].creplies[j].replyId+
        ")>Delete</button>"
        + "&nbsp;&nbsp;&nbsp;" + "<button onclick=editReply("+comments[i].commentId+ ","+ comments[i].creplies[j].replyId + ")>Edit</button>" + '</li>';
        commentsList.innerHTML+= '</br>';

      }
      console.log("commentsList", commentsList)
      commentsList.innerHTML+= '</br>';

    }
}

//edit comment
function edit(commentId){
  event.preventDefault();

  var comments = getAllComments();
  document.getElementById('editButton').style.display= "none";
  document.getElementById('username').readOnly= true;
  document.getElementById('usernameText').innerHTML = "Username:";
  for(var i=0;i<comments.length;i++){

       if(comments[i].commentId === commentId){
         document.getElementById('saveButton').style.display= "inline";
         document.getElementById('username').value = comments[i].username;
         document.getElementById('comment').value = comments[i].comment;
         currentId = commentId;
       }
  }
}

function editReply(commentId, replyId)
{
  event.preventDefault();
  console.log("Entered");
  var comments = getAllComments();
  document.getElementById('editButton').style.display= "none";
  document.getElementById('username').readOnly= true;
  document.getElementById('usernameText').innerHTML = "Username:";
  for(var i=0;i<comments.length;i++){

       if(comments[i].commentId === commentId){
         for(var j = 0;j < comments[i].creplies.length; j++)
         {
           if(comments[i].creplies[j].replyId === replyId)
           {
             document.getElementById('RsaveButton').style.display= "inline";
             document.getElementById('username').value = comments[i].creplies[j].rusername;
             document.getElementById('comment').value = comments[i].creplies[j].rcomment;
             currentId = commentId;
             rId = replyId;
           }

         }

      }
  }
}

function Rsave(){
  event.preventDefault();
  var comments = getAllComments();
  for(var i=0;i<comments.length;i++){

       if(comments[i].commentId === currentId){
         for(var j = 0;j < comments[i].creplies.length; ++j)
         {
           if(comments[i].creplies[j].replyId === rId)
           {
             comments[i].creplies[j].rcomment = document.getElementById('comment').value;
             clearFields();
           }
         }
       }
       document.getElementById('RsaveButton').style.display = "none";
       document.getElementById('editButton').style.display = "inline";
       document.getElementById('username').readOnly = false;
       document.getElementById('usernameText').innerHTML = "Enter Username: ";
       updateEntry(comments);
       clearList();
       showComments();

  }

}



//save an edit
function save(){
  event.preventDefault();
  var comments = getAllComments();
  for(var i=0;i<comments.length;i++){

       if(comments[i].commentId === currentId){
         comments[i].comment = document.getElementById('comment').value;

         clearFields();
       }
       document.getElementById('saveButton').style.display = "none";
       document.getElementById('editButton').style.display = "inline";
       document.getElementById('username').readOnly = false;
       document.getElementById('usernameText').innerHTML = "Enter Username: ";
       updateEntry(comments);
       clearList();
       showComments();

  }

}


//delete comment
function deleteComment(commentId){

    var comments=getAllComments();

    for(var i=0;i<comments.length;i++){

         if(comments[i].commentId === commentId){
            comments.splice(i,1);
         }
         updateEntry(comments);
         clearList();
      showComments();
      clearFields();
    }
}

function deleteReply(commentId, replyId){

    var comments = getAllComments();

    for(var i = 0;i < comments.length;i++){

      if(comments[i].commentId === commentId){
         for(var j = 0;j < comments[i].creplies.length; ++j)
         {
           if(comments[i].creplies[j].replyId === replyId)
            comments[i].creplies.splice(j, 1);
         }
      }
      updateEntry(comments);
      clearList();
      showComments();
      clearFields();
    }
}



//clear list to reprint it
function clearList(){
    document.getElementById('commentsList').innerHTML="";
}



//generate a comment id
function generateCommentId(){

     if(localStorage.getItem('counter') == null){

         localStorage.setItem('counter',0);

        var updatedCounter=parseInt(localStorage.getItem('counter'))+ 1;
        localStorage.setItem('counter',updatedCounter);
        return updatedCounter;


     }
     else
     {
        var updatedCounter=parseInt(localStorage.getItem('counter'))+ 1;
        localStorage.setItem('counter',updatedCounter);
        return updatedCounter;
     }

}

//generate Reply Id
function generateReplyId(){

     if(localStorage.getItem('rcounter') == null){

         localStorage.setItem('rcounter',0);

        var updatedRCounter=parseInt(localStorage.getItem('rcounter'))+ 1;
        localStorage.setItem('rcounter',updatedRCounter);
        return updatedRCounter;


     }
     else
     {
        var updatedRCounter=parseInt(localStorage.getItem('rcounter'))+ 1;
        localStorage.setItem('rcounter',updatedRCounter);
        return updatedRCounter;
     }

}
