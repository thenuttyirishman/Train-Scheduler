// Configurues my Firebase key
var config = {
  apiKey: "AIzaSyAaJuHoUiw7UmGIuwsLvYsitSyODn8ayJU",
  authDomain: "train-scheduler-8cd73.firebaseapp.com",
  databaseURL: "https://train-scheduler-8cd73.firebaseio.com",
  projectId: "train-scheduler-8cd73",
  storageBucket: "train-scheduler-8cd73.appspot.com",
  messagingSenderId: "880865646525"
};

// Initilizing Firebase
firebase.initializeApp(config);

// Declaing Firebase database
var database = firebase.database();

// Button for adding Trains
$("#add-train-btn").on("click", function (event) {
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

  //Pusshing the user train info into the into the table
  database.ref().push(newTrain);
  alert("Train Successfully Added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");

  return false;
});

// Function for diplaying the info into the table
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());
  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().place;
  var time = childSnapshot.val().time;
  var length = childSnapshot.val().length;
  // variable for timing of trains
  var timeArray = time.split(":");
  var trainTime = moment().hours(timeArray[0]).minutes(timeArray[1]);
  var maxTime = moment.max(moment(), trainTime);
  var trainMinutes;
  var trainArrival;
  // If statment for measure of time calculated on the table
  if (maxTime === trainTime) {
    trainArrival = trainTime.format("hh:mm A");
    trainMinutes = trainTime.diff(moment(), "minutes");
  } else {
    var differentTimes = moment().diff(trainTime, "minutes");
    var remainder = differentTimes % length;
    trainMinutes = length - remainder;
    trainArrival = moment().add(trainMinutes, "m").format("hh:mm A");
  }

  // Append the new row to the table
  $("tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + time + "</td><td>" + length + "</td><td>" + trainArrival + "</td><td>" + trainMinutes + "</td></tr>");

});





