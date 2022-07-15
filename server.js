//establish the required starting const declarations 
const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');

//establish the const that fetches the json data 
//also setting notes to be called back later 
const Notes = require('./miniature-eureka-main/Develop/db/db.json')

//GET REQUESTS SECTION 
//get the response from the api  
app.get('api/notes', (req, res) => {
    //retrieve info from json file  
    res.json(Notes.slice(1));
});

//landing page for the website  
app.get('/', (req, res) => {
    //call path const that was declared earlier 
    res.sendFile(path.join(__dirname, './miniature-eureka-main/Develop/public/index.html' ));
});

//the actual notes file after clicking 'get started' on landing page 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './miniature-eureka-main/Develop/public/notes.html'))
});

//assign * to the index.html file as stated in requirements 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './miniature-eureka-main/Develop/public/index.html'))
});

//now that paths are all set we can make the actual functions 
//function to make a new note 
function createNewNote (body, notesArray) {
    //set const for adding a new note 
    const addNote = body;
    //if statement to record responses 
    if (!Array.isArray(notesArray))
        notesArray = [];
    if (notesArray.length === 0)
        notesArray.push(0);
    //append the notes page with new notes 
    body.id = notesArray[0];
    notesArray[0]++;
    notesArray.push(addNote);
    fs.writeFileSync(path.join(__dirname, './miniature-eureka-main/Develop/db/db.json'),
    JSON.stringify(notesArray, null, 2)
    );
    //return the new note
    return addNote;
}