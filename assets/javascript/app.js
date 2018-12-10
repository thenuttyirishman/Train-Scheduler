var config = {
    apiKey: "AIzaSyCcR-lMuoCLd4uQO0HD0fdPeXt_i76Arhw",
    authDomain: "train-scheduler-65893.firebaseapp.com",
    databaseURL: "https://train-scheduler-65893.firebaseio.com",
    projectId: "train-scheduler-65893",
    storageBucket: "train-scheduler-65893.appspot.com",
    messagingSenderId: "879577518161"
  };
  
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var time = moment($("#time-input").val().trim(), "0000").format("X");
  var length = $("#frequency-input").val().trim();


});

var newTrain = {
    name: trainName,
    place: destination,
    time: time, //can I call these the same thing?
    length: length //can I call these the same thing?
  };

  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.place);
  console.log(newTrain.time);
  console.log(newTrain.length);

  alert("Train Successfully Added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().place;
    var time = childSnapshot.val().time;
    var length = childSnapshot.val().length;
  
    // Train Info
    console.log(trainName);
    console.log(destination);
    console.log(time);
    console.log(length);

  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(time),
      $("<td>").text(length),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});





