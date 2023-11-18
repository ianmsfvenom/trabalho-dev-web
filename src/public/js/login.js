document.getElementById('login-form').addEventListener('submit', async event =>  {
    event.preventDefault()

    console.log('gi');
    const formData = new FormData(event.target)
    const urlEncodedData = new URLSearchParams(formData).toString()

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: urlEncodedData
    }).then(async (res, err) => {
        const jsonData = await res.json()
        console.log(jsonData);
    })
})