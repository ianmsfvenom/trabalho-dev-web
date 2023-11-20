document.getElementById('register-form').addEventListener('submit', async event => {
    event.preventDefault()

    const submitButton = document.getElementById('submit-button')
    const userInput = document.getElementById('username-input')
    const passwordInput = document.getElementById('password-input')
    const confirmPasswordInput = document.getElementById('confirm-password-input')

    if(userInput.value.trim() == '' || passwordInput.value.trim() == '' || confirmPasswordInput.value.trim() == '') {
        document.getElementById('alert-success').style.display = 'none'
        document.getElementById('alert-error').style.display = 'flex'
        document.getElementById('alert-error').innerHTML = 'Preencha todos os campos de entrada!'
        submitButton.disabled = false
        return
    }

    if(passwordInput.value != confirmPasswordInput.value) {
        document.getElementById('alert-success').style.display = 'none'
        document.getElementById('alert-error').style.display = 'flex'
        document.getElementById('alert-error').innerHTML = 'As senhas não são coincidentes!'
        submitButton.disabled = false
        return
    }

    submitButton.disabled = true

    const formData = new FormData(event.target)
    const urlEncodedData = new URLSearchParams(formData).toString()

    await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: 'same-origin',
        body: urlEncodedData
    }).then(async (res, err) => {
        const dataJson = await res.json()
        if(!res.ok) {
            document.getElementById('alert-success').style.display = 'none'
            document.getElementById('alert-error').style.display = 'flex'
            document.getElementById('alert-error').innerHTML = dataJson.msg
            return
        }

        document.getElementById('alert-error').style.display = 'none'
        document.getElementById('alert-success').style.display = 'flex'
        document.getElementById('alert-success').innerHTML = 'Usuário registrado com sucesso! Redirecionando...'
        setTimeout(() => {
            window.location.href = '/login'
        }, 3000);
    })
    submitButton.disabled = false
})