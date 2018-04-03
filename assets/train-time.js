// Initialize Firebase
var config = {
  apiKey: "AIzaSyCykRBS3_dmdx5lbdHgAlA5cQla6a9qOcU",
  authDomain: "train-time-666d2.firebaseapp.com",
  databaseURL: "https://train-time-666d2.firebaseio.com",
  projectId: "train-time-666d2",
  storageBucket: "train-time-666d2.appspot.com",
  messagingSenderId: "1017524157623"
};
firebase.initializeApp(config);

var database = firebase.database();

var currentTime = moment();

// submit button trigger -- grabs user information
$("#add-train-btn").on("click", function(event){
    event.preventDefault();

    // capture input fields
    var train = $("#train-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#start-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    // check that all fields entered
    if (train == "") {
        alert('Enter a train name.');
        return false;
    }
    if (destination == "") {
        alert('Enter a destination.');
        return false;
    }
    if (firstTrain == "") {
        alert('Enter a first train time.');
        return false;
    }
    if (frequency == "") {
        alert('Enter a frequency');
        return false;
    }

    //subtract first train time back a year to ensure it's before current time
    var firstTrainConverted = moment(firstTrain, "hh:mm").subtract("1, years");
    // calculate difference between current time and the first train time
    var difference = currentTime.diff(moment(firstTrainConverted), "minutes");
    // calculate how much of current train interval has elapsed
    var remainder = difference % frequency;
    // total interval time minus elapsed time will be minutes to arrival
    var minutesToTrain = frequency - remainder;
    // convert next train time for display
    var nextTrain = moment().add(minutesToTrain, "minutes").format("hh:mm a");

    // store data in object
    var newTrain = {
        name: train,
        destination: destination,
        time: firstTrain,
        frequency: frequency,
        next: nextTrain,
        min: minutesToTrain
    }

    // push data object to Firebase server
    database.ref().push(newTrain);

    // reset user input field values
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");

    return false;
});

// when new information enters database, display new row
database.ref().on("child_added", function(snapshot) {
    // grab data from database
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var next = snapshot.val().next;
    var min = snapshot.val().min;

    // display data in table
    $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + min + "</td></tr>");
});