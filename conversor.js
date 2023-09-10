const axios = require('axios');

const pegarTaxaCambio = async (moedaOrigem, moedaDestino) => {
  try {
    const resposta = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
    const taxa = resposta.data.rates[moedaDestino];
    return taxa;
  } catch (erro) {
    throw new Error(`Não foi possível obter a taxa de câmbio para ${moedaOrigem} e ${moedaDestino}.`);
  }
};

const converterMoeda = async (moedaOrigem, moedaDestino, quantia) => {
  const taxa = await pegarTaxaCambio(moedaOrigem, moedaDestino);
  const quantiaConvertida = (quantia * taxa).toFixed(2);
  console.log(`${quantia} ${moedaOrigem} é igual a ${quantiaConvertida} ${moedaDestino}.`);
};

const moedaOrigem = 'USD';
const moedaDestino = 'BRL';
const quantia = 1;

converterMoeda(moedaOrigem, moedaDestino, quantia);