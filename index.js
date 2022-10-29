const contasDeClientes = [];

/*Forms*/
const form = document.getElementById('registrationForm');
const operacaoForm = document.getElementById('operationsForm');

/*inputs do formulario de cadastro*/
const nameInput = document.getElementById('nameInput');
const cpfInput = document.getElementById('cpfInput');
const celphoneInput = document.getElementById('celphoneInput');
const passwordInput = document.getElementById('passwordInput');
const confirmaSenhaInput = document.getElementById('confirmaSenhaInput');

/*Inputs do formulario de operação*/
const valorInput = document.getElementById('valor');

/**/

/*------------Funções para cadastro--------------*/
const criaNumeroDeConta = () => {
  let conta = 0;
  do {
    conta = Math.floor(1000 + Math.random() * 90000);
  } while (contasDeClientes.find(cliente => cliente.conta === conta));
  return conta;
};

const formataCpf = cpfString => {
  if (!cpfString.includes('.')) {
    const cpfFormatado =
      cpfString.slice(0, 3) +
      '.' +
      cpfString.slice(3, 6) +
      '.' +
      cpfString.slice(6, 9) +
      '-' +
      cpfString.slice(9, 11);

    return cpfFormatado;
  }

  return cpfString;
};

/*Formatando o celular*/
const adicionaParenteses = celularString => {
  if (!celularString.includes('(')) {
    const adicionaParenteses =
      '(' + celularString.slice(0, 2) + ')' + celularString.slice(2);
    return adicionaParenteses;
  }
  return celularString;
};

const adicionaEspacoAposDDD = celularString => {
  if (!celularString.includes(' ')) {
    const celularComEspaco =
      celularString.slice(0, 4) + ' ' + celularString.slice(4);

    return celularComEspaco;
  }

  return celularString;
};

const adicionaHifen = celularString => {
  if (!celularString.includes('-')) {
    const celularComHifen =
      celularString.slice(0, 10) + '-' + celularString.slice(10);
    return celularComHifen;
  }
  return celularString;
};

const formataCelular = celularString => {
  let celular = adicionaParenteses(celularString);

  celular = adicionaEspacoAposDDD(celular);

  celular = adicionaHifen(celular);

  return celular;
};

/*Add cliente*/
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
  adicionaMensagem(novoCliente);
  return contasDeClientes;
};
/*Mensagem após adicionar o cliente*/
const adicionaMensagem = cliente => {
  // form.innerHTML = '';

  const h2 = document.createElement('h2');
  h2.innerText = 'Conta criada com sucesso!';
  form.appendChild(h2);

  const p = document.createElement('p');
  p.innerText = `O número da sua conta é: ${cliente.conta}`;
  form.appendChild(p);
};

/*Formulário*/
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
    inputValues[1] = formataCpf(inputValues[1]);
    inputValues[2] = formataCelular(inputValues[2]);

    addCliente(inputValues);
  } else {
    alert('Senhas não conferem');
  }
});

/*------------Funções para Operação--------------*/

const div = document.querySelector('.message');

const desabilitaValorInput = () => {
  const selectedInput = document.querySelector(
    'input[name="operacao"]:checked'
  );

  if (selectedInput.value === 'saldo') {
    valorInput.setAttribute('disabled', 'disabled');
  } else {
    valorInput.removeAttribute('disabled');
  }
};

/*Operações*/
const saque = () => {
  console.log('saque');
};

const deposito = conta => {};

const consultaSaldo = conta => {
  const saldo = contasDeClientes.find(cliente => cliente.conta === conta).saldo;

  mostraSaldo(saldo);
};

/*Validações*/
const validaConta = (conta, senha) => {
  const cliente = contasDeClientes.find(cliente => cliente.conta === conta);

  if (cliente) {
    return cliente.senha === senha;
  }
  return false;
};

/*Mensagens*/

const mostraSaldo = saldo => {
  const h3 = document.createElement('h3');
  h3.innerText = `Seu saldo é de: R$${saldo}`;
  div.appendChild(h3);
};

const criaMensagemDeErro = () => {
  div.innerHTML = '';
  const p = document.createElement('p');
  p.innerText = 'Conta e/ou senha inválida';
  div.appendChild(p);
};

/*Formulário*/
operacaoForm.addEventListener('submit', event => {
  event.preventDefault();

  const valor = parseInt(event.target.valor.value);
  const conta = parseInt(event.target.conta.value);
  const senha = event.target.senha.value;

  if (!validaConta(conta, senha)) {
    criaMensagemDeErro();
    return;
  }

  if (div.innerHTML) {
    div.innerHTML = '';
  }

  const operacao = document.querySelector(
    'input[name="operacao"]:checked'
  ).value;

  switch (operacao) {
    case 'saldo':
      consultaSaldo(conta);
      break;
    case 'deposito':
      deposito();
      break;
    case 'saque':
      saque();
      break;
    default:
      'Operação inválida';
  }
});
