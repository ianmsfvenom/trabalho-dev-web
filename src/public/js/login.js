document.getElementById('login-form').addEventListener('submit', async event =>  {
    event.preventDefault()
    
    const submitButton = document.getElementById('submit-button')
    const userInput = document.getElementById('username-input')
    const passwordInput = document.getElementById('password-input')

    submitButton.disabled = true

    if(userInput.value.trim() == '' || passwordInput.value.trim() == '') {
        document.getElementById('alert-success').style.display = 'none'
        document.getElementById('alert-error').style.display = 'flex'
        document.getElementById('alert-error').innerHTML = 'Preencha todos os campos de entrada!'
        submitButton.disabled = false
        return
    }

    const formData = new FormData(event.target)
    const urlEncodedData = new URLSearchParams(formData).toString()

    await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: 'same-origin',
        body: urlEncodedData
    }).then(async (res, err) => {
        const dataJson = await res.json()

        if(res.status == 401) { 
            document.getElementById('alert-success').style.display = 'none'
            document.getElementById('alert-error').style.display = 'flex'
            document.getElementById('alert-error').innerHTML = dataJson.msg
            return
        }

        document.getElementById('alert-error').style.display = 'none'
        document.getElementById('alert-success').style.display = 'flex'
        document.getElementById('alert-success').innerHTML = 'Conta logada! Entrando...'
        
        setTimeout(() => {
            window.location.href = '/'
        }, 3000);
    })

    submitButton.disabled = false
})