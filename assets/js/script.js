// Função para calcular o IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Função para calcular o fator de comorbidade
function calcularFatorComorbidade(calcularIMC) {
    if (calcularIMC < 18.5) {
        return 10;
    } else if (calcularIMC >= 18.5 && calcularIMC <= 24.9) {
        return 1;
    } else if (calcularIMC >= 25 && calcularIMC <= 29.9) {
        return 6;
    } else if (calcularIMC >= 30 && calcularIMC <= 34.9) {
        return 10;
    } else if (calcularIMC >= 35 && calcularIMC <= 39.9) {
        return 20;
    } else {
        return 30;
    }
}

// Função para calcular o preço do plano básico da operadora A
function calcularABasico(idade, calcularIMC) {
    return 100 + (idade * 10 * (calcularIMC / 10));
}

// Função para calcular o preço do plano standard da operadora A
function calcularAStandard(idade, calcularIMC) {
    return (150 + (idade * 15)) * (calcularIMC / 10);
}

// Função para calcular o preço do plano premium da operadora A
function calcularAPremium(idade, calcularIMC) {
    return (200 - (calcularIMC * 10) + (idade * 20)) * (calcularIMC / 10);
}

// Função para calcular o preço do plano básico da operadora B
function calcularBBasico(calcularFatorComorbidade, calcularIMC) {
    return 100 + (calcularFatorComorbidade * 10 * (calcularIMC / 10));
}

// Função para calcular o preço do plano standard da operadora B
function calcularBStandard(calcularFatorComorbidade, calcularIMC) {
    return (150 + (calcularFatorComorbidade * 15)) * (calcularIMC / 10);
}

// Função para calcular o preço do plano premium da operadora B
function calcularBPremium(calcularFatorComorbidade, calcularIMC) {
    return (200 - (calcularIMC * 10) + (calcularFatorComorbidade * 20)) * (calcularIMC / 10);
}

// Função para comparar os preços dos planos e determinar o mais vantajoso
function compararPlanos(aBasico, aStandard, aPremium, bBasico, bStandard, bPremium) {
    let menorPreco = Math.min(aBasico, aStandard, aPremium, bBasico, bStandard, bPremium);
    let planoMaisVantajoso = "";
    if (menorPreco == aBasico) {
        planoMaisVantajoso = "Básico da operadora A";
    } else if (menorPreco == aStandard) {
        planoMaisVantajoso = "Standard da operadora A";
    } else if (menorPreco == aPremium) {
        planoMaisVantajoso = "Premium da operadora A";
    } else if (menorPreco == bBasico) {
        planoMaisVantajoso = "Básico da operadora B";
    } else if (menorPreco == bStandard) {
        planoMaisVantajoso = "Standard da operadora B";
    } else {
        planoMaisVantajoso = "Premium da operadora B";
    }
    return planoMaisVantajoso;
}

// Selecionando os elementos do HTML
let form = document.getElementById("form");
let idade = document.getElementById("idade");
let peso = document.getElementById("peso");
let altura = document.getElementById("altura");
let resultado = document.getElementById("resultado");
let imcSpan = document.getElementById("calcularIMC");
let fatorSpan = document.getElementById("fator");
let planoSpan = document.getElementById("plano");
let aBasicoTd = document.getElementById("a-basico");
let aStandardTd = document.getElementById("a-standard");
let aPremiumTd = document.getElementById("a-premium");
let bBasicoTd = document.getElementById("b-basico");
let bStandardTd = document.getElementById("b-standard");
let bPremiumTd = document.getElementById("b-premium");

// Adicionando um evento de submit ao formulário
form.addEventListener("submit", function (event) {

    // Prevenindo o comportamento padrão do formulário
    event.preventDefault();
    // Obtendo os valores dos inputs
    let idadeValor = Number(idade.value);
    let pesoValor = Number(peso.value);
    let alturaValor = Number(altura.value);
    // Calculando o IMC, o fator de comorbidade e os preços dos planos
    let imcValor = calcularIMC(pesoValor, alturaValor);
    let fatorValor = calcularFatorComorbidade(imcValor);
    let aBasicoValor = calcularABasico(idadeValor, imcValor);
    let aStandardValor = calcularAStandard(idadeValor, imcValor);
    let aPremiumValor = calcularAPremium(idadeValor, imcValor);
    let bBasicoValor = calcularBBasico(fatorValor, imcValor);
    let bStandardValor = calcularBStandard(fatorValor, imcValor);
    let bPremiumValor = calcularBPremium(fatorValor, imcValor);
    // Comparando os planos e determinando o mais vantajoso
    let planoMaisVantajoso = compararPlanos(aBasicoValor, aStandardValor, aPremiumValor, bBasicoValor, bStandardValor, bPremiumValor);
    // Exibindo o resultado na tela
    resultado.classList.remove("hidden");
    imcSpan.textContent = imcValor.toFixed(2);
    fatorSpan.textContent = fatorValor;
    planoSpan.textContent = planoMaisVantajoso;
    aBasicoTd.textContent = aBasicoValor.toFixed(2);
    aStandardTd.textContent = aStandardValor.toFixed(2);
    aPremiumTd.textContent = aPremiumValor.toFixed(2);
    bBasicoTd.textContent = bBasicoValor.toFixed(2);
    bStandardTd.textContent = bStandardValor.toFixed(2);
    bPremiumTd.textContent = bPremiumValor.toFixed(2);
});
