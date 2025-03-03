// Seleciona os elementos do formulário
const form = document.querySelector('form');
const amount = document.getElementById('amount');
const expense = document.getElementById('expense');
const category =  document.getElementById('category');

amount.addEventListener('focus', function() {
    // Define a posição do cursor para o final do valor padrão R$ 0,00
    this.selectionStart = this.selectionEnd = this.value.length;
  });

// Captura o evento de input para formatar o valor
amount.oninput = () => {
    // Recebo o valor do input, removo caracteres não numéricos
    let value = amount.value.replace(/\D/g, "");

    // Transformar o valor em centavos
    value = Number(value) / 100;

    // Atualizo o valor do input
    amount.value = formatCurrencyBRL(value);
}

function formatCurrencyBRL(value) {
    // Converte o valor para o formato de moeda brasileiro
    value = value.toLocaleString(
        'pt-BR',
        {   
            style: 'currency',
            currency: 'BRL'
         });
    return value;
}

form.onsubmit = (event) => {
    event.preventDefault();
};