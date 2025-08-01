let indice = 0;
let data = [];
let filtro = [];
const load = 10;

document.addEventListener("DOMContentLoaded", function () {
    fetch('Assets/certificados.json')
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData;
            filtro = data;
            displayResults();
        })
        .catch(error => console.error('Erro ao carregar dados:', error));

    document.getElementById('btn').addEventListener('click', displayResults);

    document.getElementById('buscarCertificados').addEventListener('input', function () {
        const query = this.value.toLowerCase();
        filtro = data.filter(item => item.certificado.toLowerCase().includes(query));
        indice = 0;
        document.getElementById('dados').innerHTML = '';
        displayResults();
    });
});

function displayResults() {
    const resultado = document.getElementById('dados');
    const mostraDados = filtro.slice(indice, indice + load);

    mostraDados.forEach(item => {

        const dados = document.createElement('a');
        dados.textContent = `${item.certificado}`;
        dados.href = item.link;
        dados.target = '_blank';
        dados.style.marginBottom = '20px';
        resultado.appendChild(dados);
    });

    indice += load;

    if (indice >= filtro.length) {
        document.getElementById('btn').style.display = 'none';
    } else {
        document.getElementById('btn').style.display = 'flex';
    }

    if (filtro.length === 0) {
        const nadaEncontrado = document.createElement('div');
        nadaEncontrado.innerHTML = 'Resultado não encontrado &#128269;';
        nadaEncontrado.className = 'notFoundResult';
        resultado.appendChild(nadaEncontrado);
        document.getElementById('btn').style.display = 'none';
    }
}
