document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById('signin-button').addEventListener('click', function(event) {
    event.preventDefault()
    blockstack.redirectToSignIn()
  })
  document.getElementById('signout-button').addEventListener('click', function(event) {
    event.preventDefault()
    blockstack.signUserOut(window.location.href)
  })

  document.getElementById('feel-button').addEventListener('click', function(event) {
    var STORAGE_FILE = 'todos.json';
    var data = document.getElementById('feel');
    const encrypt = true
    blockstack.putFile(STORAGE_FILE, JSON.stringify(data), encrypt);
  })

   document.getElementById('show-button').addEventListener('click', function(event) {
    var STORAGE_FILE = 'todos.json';
    const decrypt = true
     blockstack.getFile(STORAGE_FILE, decrypt)
      .then((todosText) => {
        // var todos = JSON.parse(todosText || '[]')
        // todos.forEach(function (todo, index) {
        //   todo.id = index
        // })
        // this.uidCount = todos.length
        // this.todos = todos
        console.log(todosText);
      })
  })

  function showProfile(profile) {
    var person = new blockstack.Person(profile)
    document.getElementById('heading-name').innerHTML = person.name() ? person.name() : "Nameless Person"
    if(person.avatarUrl()) {
      document.getElementById('avatar-image').setAttribute('src', person.avatarUrl())
    }
    document.getElementById('section-1').style.display = 'none'
    document.getElementById('section-2').style.display = 'block'
  }

  if (blockstack.isUserSignedIn()) {
    var profile = blockstack.loadUserData().profile
      showProfile(profile)
  } else if (blockstack.isSignInPending()) {
    blockstack.handlePendingSignIn().then(function(userData) {
      window.location = window.location.origin
    })
  }

})
