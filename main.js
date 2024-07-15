const firebaseConfig = {
    apiKey: "AIzaSyCXKGLOn_VNhTZGE_sV3xZ58H0W3XycF7c",
    authDomain: "teste-cf4ff.firebaseapp.com",
    databaseURL: "https://teste-cf4ff-default-rtdb.firebaseio.com",
    projectId: "teste-cf4ff",
    storageBucket: "teste-cf4ff.appspot.com",
    messagingSenderId: "233756083256",
    appId: "1:233756083256:web:653f719f994ce68cde92cd",
    measurementId: "G-K64LHL4RPN"
  };
  
  // Inicializar o Firebase
firebase.initializeApp(firebaseConfig);
// Inicializar variáveis
const auth = firebase.auth()
const database = firebase.database()

// Configurar nossa função de registro
function register () {
  // Obter todos os nossos campos de entrada
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  favorite_song = document.getElementById('favourite_song').value
  milk_before_cereal = document.getElementById('milk_before_cereal').value

  // Validar campos de entrada
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email ou senha estão fora de linha!!')
    return
    // Não continuar executando o código
  }
  if (validate_field(full_name) == false || validate_field(favourite_song) == false || validate_field(milk_before_cereal) == false) {
    alert('Um ou mais campos extras estão fora da linha!!')
    return
  }
 
  // Continue com a autenticação
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declara a variável do usuário
    var user = auth.currentUser

    // Adiciona este usuário ao banco de dados do Firebase
    var database_ref = database.ref()

    // Cria dados do usuário
    var user_data = {
      email : email,
      full_name : full_name,
      favorite_song : favorite_song,
      milk_before_cereal : milk_before_cereal,
      last_login : Date.now()
    }

    // Envia para o banco de dados do Firebase
    database_ref.child('users/' + user.uid).set(user_data)

    // CONCLUÍDO
    alert('Usuário criado!!')
  })
  .catch(function(error) {
    // O Firebase usará isso para alertar sobre seus erros
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

// Configure nossa função de login
function login () {
  // Obtenha todos os nossos campos de entrada
  email = document.getElementById('email').value
  password = document.getElementById('password').valor

  // Validar campos de entrada
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('E-mail ou senha estão fora da linha!!')
    return
    // Não continue executando o código
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declarar variável de usuário
    var user = auth.currentUser

    // Adicionar este usuário ao Firebase Database
    var database_ref = database.ref()

    // Criar dados do usuário
    var user_data = {
      last_login : Date.now()
    }

    // Enviar para o Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // CONCLUÍDO
    alert('Usuário conectado!!')

  })
  .catch(function(error) {
    // O Firebase usará isso para alertar sobre seus erros
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}




// Validar funções
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // E-mail é bom
    return true
  } else {
    // E-mail não é bom
    return false
  }
}

function validate_password(password) {
  // O Firebase aceita apenas comprimentos maiores que 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}