
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
    console.log(emailz);
    var addr = $("#address").val().trim();
    emailz = emailz.replace("." , ",");
    console.log(emailz);
    database.ref('/Users/' + emailz).update({
      'address' : addr
    })
  })


  //e86edc7823204eca23eaaffa56eb0bcb //facebook secret
  //154400321824663 app id
