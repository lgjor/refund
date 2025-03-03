// Seleciona os elementos do formulário
const form = document.querySelector('form');
const amount = document.getElementById('amount');
const expense = document.getElementById('expense');
const category =  document.getElementById('category');


// Seleciona os elementos da lista de despesas
const expenseList = document.querySelector("ul");
const expensesTotal = document.querySelector("aside header h2");
const expensesQuantity = document.querySelector("aside header p span");

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

// Captura o evento de submit do formulário para obter os valores
form.onsubmit = (event) => {
    // previne o comportamento padrão do formulário de recarregar a página
    event.preventDefault();

    // Cria um novo objeto com os detalhes da nova despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        create_at: new Date(),
    }
    // Chama a função que irá adicionar a nova despesa
    expanseAdd(newExpense);
};

// Adiciona um novo item na lista de despesas
function expanseAdd(newExpense) {
    // Adiciona a nova despesa ao array de despesas
    try{
        // Cria o item (li) para adicionar na lista (ul).
        const expenseItem = document.createElement('li');
        expenseItem.classList.add("expense");

        // Cria a imagem do ícone da categoria
        const expenseIcon = document.createElement('img');
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
        expenseIcon.setAttribute("alt", newExpense.category_name);

        // Cria a info da despesa DIV
        const expenseInfo = document.createElement('div');
        expenseInfo.classList.add("expense-info");

        // Cria o nome da despesa
        expenseName = document.createElement("strong");
        expenseName.textContent = newExpense.expense;

        // Cria a categoria da despesa
        expenseCategory = document.createElement("span");
        expenseCategory.textContent = newExpense.category_name;

        // Adiciona as informações nome e category na div expenseInfo
        expenseInfo.append(expenseName, expenseCategory);

        // Criar o valor da despesa
        const expenseAmount = document.createElement("span");
        expenseAmount.classList.add("expense-amount");
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`;

        // Cria o ícone de remover
        const removeIcon = document.createElement("img");
        removeIcon.classList.add("remove-icon");
        removeIcon.setAttribute("src", "img/remove.svg");
        removeIcon.setAttribute("alt", "Remover despesa");

        // Adiciona as informações no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

        // Adiciona o item na lista
        expenseList.append(expenseItem);
        
        // Atualiza os totais de despesas
        updateTotalExpenses();

    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.");
        console.log(error);
    }
}

// Atualiza os totais de despesas
function updateTotalExpenses() {
    try {
        // Recupera todos os itens (li) da lista (ul)
        const items = expenseList.children;
        
        // Atualiza a quantidade de despesas
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

        // Variável para incrementar o total.
        let total = 0;

        // Percorre todos os itens (li) da lista (ul)
        for (let item = 0; item < items.length; item++) {
            // Recupera o valor da despesa
            const ItemAmount = items[item].querySelector(".expense-amount");

            // Remover caracteres não numéricos e substitui a vírgula por ponto
            let value = ItemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".");

            // Converte o valor para float
            value = parseFloat(value);

            // Verificar se é um número válido
            if (isNaN(value)) {
                // Adiciona o valor ao total
                return alert("Não foi possível calcular o total, o valor não parece ser um número.");
            }
            total += Number(value);
        }

        // Cria a span para adicionar o R$ formatado
        const symbolBRL = document.createElement("small");
        symbolBRL.textContent = "R$";

        // Formata o valor total e remove o R$ que será exibido pela small
        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");

        // Limpa o conteúdo do elemento
        expensesTotal.innerHTML = "";

        // Adiciona o simbolo da moeda e o valor total formatado
        expensesTotal.append(symbolBRL, total);
    } catch (error) {
        alert("Não foi possível atualizar os totais de despesas.");
        console.log(error);
    }
}

