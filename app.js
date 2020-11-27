const login = document.querySelector('#login')
const error = document.querySelector('.error')
login.addEventListener('submit', (e)=>{
    e.preventDefault()

    const email = login['email'].value
    const password = login['password'].value

    auth.signInWithEmailAndPassword(email, password).then(cred =>{
        console.log(cred.user);
        window.location = 'teacher.html'
    })
    .catch(err=>{
        error.innerHTML = 'هناك خطأ في البريد أو في كلمة المرور'
    })
})