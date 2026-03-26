// Objetos
const pais = {
    "Nome": "Brasil",
    "Capital": "Brasília",
    "População": 211000000,
    "Língua": "Portugues",
    "Região": {
        "Sudeste": "SP / MG / ES / RJ",
        "Sul": "PR / SC / RS",
        "Norte": "AC / AM / PA / TO / RO / RR / AP",
        "Nordeste": "BA / PE / CE / RN / SE / AL / PB / PI / MA",
        "Centro Oeste": "GO / DF / MT / MS"
    }
}

console.log(pais.Capital);
console.log(pais. Região.Sul);

// let nome = pais.Nome;
// let capital = pais.Capital;
// let populacao = pais.População;
// let idioma = pais.Idioma;

let {nome, capital, populacao, idioma} = pais;
console.log(nome, capital, populacao, idioma);


