let services = JSON.parse(localStorage.getItem('services')) || [];

function renderServices() {
    const list = document.getElementById("services-list");
    const select = document.getElementById("assunto");

    if (list) list.innerHTML = "";
    if (select) {
        select.innerHTML = '<option disabled selected>Select a Service</option>';
    }

    services.forEach((service, index) => {

        if (list) {
            const li = document.createElement("li");
            li.textContent = service + " ";


            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Remover";
            deleteBtn.classList.add("btn", "btn-primary");
            deleteBtn.onclick = () => removeService(index);


            const editBtn = document.createElement("button");

            editBtn.textContent = "Editar";
            editBtn.classList.add("btn", "btn-primary");
            editBtn.onclick = () => editService(index);

            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            list.appendChild(li);
        }


        if (select) {
            const option = document.createElement("option");
            option.value = service;
            option.textContent = service;
            select.appendChild(option);
        }
    });
}

function addService() {
    const input = document.getElementById("new-service");
    const serviceName = input.value.trim();

    if (serviceName && !services.includes(serviceName)) {
        services.push(serviceName);
        localStorage.setItem('services', JSON.stringify(services));
        input.value = "";
        renderServices();
    } else {
        alert("Invalid!");
    }
}

function removeService(index) {
    services.splice(index, 1);
    localStorage.setItem('services', JSON.stringify(services));
    renderServices();
}

function editService(index) {
    const newName = prompt("Editar nome do serviço:", services[index]);
    if (newName && newName.trim() !== "" && !services.includes(newName.trim())) {
        services[index] = newName.trim();
        localStorage.setItem('services', JSON.stringify(services));
        renderServices();
    } else {
        alert("Invalid!");
    }
}

function Contato(nome, email, assunto, mensagem) {
    this.nome = nome;
    this.email = email;
    this.assunto = assunto;
    this.mensagem = mensagem;
}

document.addEventListener("DOMContentLoaded", () => {
    renderServices();

    const form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const nome = document.getElementById("nome").value.trim();
            const email = document.getElementById("email").value.trim();
            const assunto = document.getElementById("assunto").value;
            const mensagem = document.getElementById("mensagem").value.trim();

            if (!nome || !email || !assunto || !mensagem) {
                alert("Por favor, preencha todos os campos obrigatórios.");
                return;
            }

            const contato = new Contato(nome, email, assunto, mensagem);

            alert(
                `Mensagem enviada com sucesso!\n\n` +
                `Nome: ${contato.nome}\n` +
                `Email: ${contato.email}\n` +
                `Assunto: ${contato.assunto}\n` +
                `Mensagem: ${contato.mensagem}`
            );

            form.reset();
        });
    }
});