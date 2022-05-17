/* 
Map
Pratique a sintaxe de multiplicação de números, uma vez utilizando o parâmetro this de um 
objeto criado por você, e depois sem ele.

Filter
Filtre e retorne todos os números pares de um array.

Reduce
Some todos os números de um array
Crie uma função que recebe uma lista de preços e um número representando o saldo disponível. 
Calcule qual será o saldo final após subtrair todos os preços da lista enviada.
*/

const maça = { 
    value: 2,
}
const laranja = { 
    value: 3,
}

function mapComThis(arr, thisArg) {
    return arr.map(function (item) {
        return item * this.value;
    }, thisArg);
}

function mapSemThis(arr){
    return arr.map(function(item){
        return item * 10;
    })
}

function filtraPares(arr){
    return arr.filter(retornaFiltro)
}

function retornaFiltro(item){
    return item % 2 == 0
}

function somaNums(arr){
    return arr.reduce(function(prev, current){
        return prev + current;
    })
}

function listaCompra(arr, saldo){
    return arr.reduce(function(prev, current){
        return prev - current;
    },saldo)
}



const nums = [1,2,3,4,5,6,7,8,9,10];

console.log('this -> maça: ', mapComThis(nums, maça))
console.log('this -> laranja: ', mapComThis(nums, laranja))
console.log('Sem o this: ', mapSemThis(nums))
console.log('Filter: ', filtraPares(nums))
console.log('Soma com REDUCE: ', somaNums(nums))
console.log('Sub com REDUCE: ', listaCompra(nums, 100))