
var config = {
  apiKey: "AIzaSyAaJuHoUiw7UmGIuwsLvYsitSyODn8ayJU",
  authDomain: "train-scheduler-8cd73.firebaseapp.com",
  databaseURL: "https://train-scheduler-8cd73.firebaseio.com",
  projectId: "train-scheduler-8cd73",
  storageBucket: "train-scheduler-8cd73.appspot.com",
  messagingSenderId: "880865646525"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function (event) {
  console.log("Hi");
  event.preventDefault();
  event.stopPropagation();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var time = $("#time-input").val().trim();
  var length = $("#frequency-input").val().trim();
  var newTrain = {
    name: trainName,
    place: destination,
    time: time,
    length: length
  };

  database.ref().push(newTrain);
  alert("Train Successfully Added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");

  return false;
});

database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());
  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().place;
  var time = childSnapshot.val().time;
  var length = childSnapshot.val().length;
  debugger
  // Append the new row to the table
  $("tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td></tr>" + time + "</td></tr>" + length);

});





