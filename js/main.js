(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

})(jQuery);

// Lista de serviços
let services = JSON.parse(localStorage.getItem('services')) || [];

function renderServices() {
    const list = document.getElementById('services-list');
    const dropdown = document.getElementById('service-select');
    list.innerHTML = '';
    dropdown.innerHTML = '<option selected disabled>Select a Service</option>';

    services.forEach((service, index) => {
        // Adiciona à lista visual
        const li = document.createElement('li');
        li.innerHTML = `
            ${service}
            <button class="btn btn-primary" onclick="editService(${index})">Editar</button>
            <button class="btn btn-primary" onclick="deleteService(${index})">Remover</button>
        `;
        list.appendChild(li);

        // Adiciona à dropdown
        const option = document.createElement('option');
        option.value = service;
        option.textContent = service;
        dropdown.appendChild(option);
    });

    localStorage.setItem('services', JSON.stringify(services));
}

function addService() {
    const input = document.getElementById('new-service');
    const service = input.value.trim();
    if (service !== '') {
        services.push(service);
        input.value = '';
        renderServices();
    }
}

function deleteService(index) {
    services.splice(index, 1);
    renderServices();
}

function editService(index) {
    const novo = prompt("Editar serviço:", services[index]);
    if (novo && novo.trim() !== '') {
        services[index] = novo.trim();
        renderServices();
    }
}

// Inicializa a página
document.addEventListener('DOMContentLoaded', renderServices);

// Objeto Contato
function Contato(nome, email, assunto, mensagem) {
    this.nome = nome;
    this.email = email;
    this.assunto = assunto;
    this.mensagem = mensagem;
}

// Evento de envio do formulário
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // evita recarregar a página

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const assunto = document.getElementById("assunto").value;
        const mensagem = document.getElementById("mensagem").value.trim();

        if (!nome || !email || !assunto || !mensagem) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        const contato = new Contato(nome, email, assunto, mensagem);

        // Mensagem de confirmação
        alert(
            `Mensagem enviada com sucesso!\n\n` +
            `Nome: ${contato.nome}\n` +
            `Email: ${contato.email}\n` +
            `Assunto: ${contato.assunto}\n` +
            `Mensagem: ${contato.mensagem}`
        );

        form.reset(); // limpa o formulário
    });
});