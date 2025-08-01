document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    fetch(this.action, {
        method: this.method,
        body: new FormData(this),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert('Obrigado, mesagem enviada com sucesso!');
            this.reset();
        } else {
            alert('Ops... Algo deu errado ao enviar a mensagem!');
        }
    }).catch(error => {
        alert('Erro ao enviar: ' + error.message);
    });
});

