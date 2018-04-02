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

// submit button trigger
$("#add-train-btn").on("click", function(event){
    event.preventDefault();

    // push values to database
    database.ref().push({
        name: $("#train-input").val(),
        destination: $("#destination-input").val(),
        time: $("#start-input").val(),
        frequency: $("#frequency-input").val()
    });
});

database.ref().on("child_added", function(snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var time = snapshot.val().time;
    var frequency = snapshot.val().frequency;
});