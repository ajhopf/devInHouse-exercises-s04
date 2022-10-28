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
    inputValues[1] = formataCpf(inputValues[1]);
    inputValues[2] = formataCelular(inputValues[2]);

    addCliente(inputValues);
  }
});
