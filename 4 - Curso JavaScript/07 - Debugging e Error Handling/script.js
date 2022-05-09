/*
Atividade: validação de erros por tipo
O objetivo é que a função receba um array e retorne ele caso o seu tamanho corresponda ao número enviado como parâmetro na função. Caso contrário, um erro será lançado.

Crie uma função que recebe um array e um número
Realize as seguintes validações
Se os parâmetros não forem enviados, lance um erro do tipo ReferenceError
Se o array não for do tipo 'object', lance um erro do tipo TypeError
Se o número não for do tipo 'number', lance um erro do tipo TypeError
Se o tamanho do array for diferente do número enviado como parâmetro, lance um erro do tipo RangeError
Utilize a declaração try...catch
Filtre as chamadas de catch por cada tipo de erro utilizando o operador instanceof
*/

const meuArray = [1,5,8,5,2,4,5,6,3,8,14,2,7,15,2,3,66,54,52,9,65,22,12,24,27];

function verificaTamanhoArray(arr, num) {
    try {
        if (!arr && !num) throw new ReferenceError("Envie os parametros");
    
        if (typeof arr !== 'object') throw new TypeError("Envie um Array no primeiro parametro") //Verifica se o array é um objeto
        
        if (typeof num !== 'number') throw new TypeError("Envie um Numero no segundo parametro")
        
        if ( num !== arr.length ) throw new RangeError("Tamanho Inválido");

        return arr;
    } catch (e) {
        if (e instanceof ReferenceError){
            console.log("Erro de REFERENCIA");
            console.log(e.message);
        } else if (e instanceof TypeError) {
            console.log("Erro de TIPO");
            console.log(e.message);
        } else if (e instanceof RangeError) {
            console.log("Erro de RANGE");
            console.log(e.message);
        } else {
            console.log("Erro não identificado");
            console.log(e.message);
        }
    }
}

console.log(verificaTamanhoArray(['s'],1));

