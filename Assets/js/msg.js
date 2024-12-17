const elemento = document.getElementById('msg');


const dataAtual = new Date();
const dia = String(dataAtual.getDate()).padStart(2, '0'); 
const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); 
const ano = dataAtual.getFullYear();


const dataFormatada = `${dia}/${mes}/${ano}`;

if (dataFormatada === `25/12/${ano}`) { 
  elemento.innerHTML = "Feliz natal! 🎁 🎄";
}
if (dataFormatada === `01/01/${ano}`) { 
  elemento.innerHTML = "Feliz ano novo! 🎆 🎇";
} 

