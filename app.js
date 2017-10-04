
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAE3iWo1CD2XmAWvffnBSyP8kFUbLOjR3c",
    authDomain: "singin-ba4f0.firebaseapp.com",
    databaseURL: "https://singin-ba4f0.firebaseio.com",
    projectId: "singin-ba4f0",
    storageBucket: "singin-ba4f0.appspot.com",
    messagingSenderId: "412372715700"
  };
  firebase.initializeApp(config);

  database = firebase.database();

  function emailDisguise(email2){
    var em = email2;
    em = em.replace("." , ",");
    return em;
  };

  function loadUser(){

    var user = firebase.auth().currentUser;

    if(user != null){
      $("#content").html("<h1>" + user.email + " : " + user.displayName + "</h1>");
    }
  }

  // console.log(emailDisguise("salam.return"));

  var txtEmail = $("#txtEmail");
  var txtPassword = $("#txtPassword");
  // var btnLogin = $("#btnLogin");
  // var btnSignUP = $("#btnSignUP");
  // var btnLogout = $("#btnLogout");

  $("#btnLogin").on('click' , function(){
    console.log("olleh");
    var email = txtEmail.val();
    var pass = txtPassword.val();
    var auth = firebase.auth();
    // sing in
    var promise = auth.signInWithEmailAndPassword(email, pass);

  })

  $("#btnSignUp").on('click' , function(){
    // console.log("hello");
    var email = txtEmail.val();
    var pass = txtPassword.val();
    var auth = firebase.auth();

    window.email = email;

    // sing up
    var promise = auth.createUserWithEmailAndPassword(email, pass);
    // create a new Node
    database.ref('/Users/' + emailDisguise(window.email)).set({
      'email' : email,
      'address' : "18440 hatteras st"
    })
  })

  firebase.auth().onAuthStateChanged( function(firebaseUser){

    if(firebaseUser){
      // console.log(firebaseUser);
      $("#btnLogout").removeClass("hide");
      $("#btnLogout").addClass("show");
          loadUser();
    }else{
      console.log('not logged in');
      $("#btnLogout").removeClass("show");
      $("#btnLogout").addClass("hide");
    }
  });


  $("#btnLogout").on('click' , function(){
    firebase.auth().signOut();
    $("#content").empty();
  })

  $("#enterAddress").on('click' , function(){
    var emailz = firebase.auth().currentUser.email;

    var addr = $("#address").val().trim();
    emailz = emailz.replace("." , ",");

    database.ref('/Users/' + emailz).update({
      'address' : addr
    })
  })


  //This section is for facebook login

  $("#btnFacebook").on('click' , function(){
    console.log("Facebook");

  var provider = firebase.auth.FacebookAuthProvider();

  provider.addScope('user_friends');

  firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

});
