const form = document.getElementById('registrationForm');

const nameInput = document.getElementById('nameInput');
const cpfInput = document.getElementById('cpfInput');
const celphoneInput = document.getElementById('celphoneInput');
const passwordInput = document.getElementById('passwordInput');
const confirmaSenhaInput = document.getElementById('confirmaSenhaInput');

const contasDeClientes = [];
/**/

const criaNumeroDeConta = () => {
  let conta = 0;
  do {
    conta = Math.floor(1000 + Math.random() * 90000);
  } while (contasDeClientes.find(cliente => cliente.conta === conta));
  return conta;
};

const addCliente = inputArray => {
  const [nome, cpf, celular, senha] = inputArray;
  // console.log({ nome, cpf, celular, senha });
  const conta = criaNumeroDeConta();

  const novoCliente = {
    nome: nome,
    cpf: cpf,
    celular: celular,
    senha: senha,
    conta: conta,
    saldo: 0
  };

  contasDeClientes.push(novoCliente);
  console.log(contasDeClientes);
  adicionaMensagem(novoCliente);
  return contasDeClientes;
};

const adicionaMensagem = cliente => {
  form.innerHTML = '';

  const h2 = document.createElement('h2');
  h2.innerText = 'Conta criada com sucesso!';
  form.appendChild(h2);

  const p = document.createElement('p');
  p.innerText = `O número da sua conta é: ${cliente.conta}`;
  form.appendChild(p);
};

form.addEventListener('submit', event => {
  event.preventDefault();

  const inputValues = [
    nameInput.value,
    cpfInput.value,
    celphoneInput.value,
    passwordInput.value,
    confirmaSenhaInput.value
  ];

  if (passwordInput.value === confirmaSenhaInput.value) {
    addCliente(inputValues);
  }
});
