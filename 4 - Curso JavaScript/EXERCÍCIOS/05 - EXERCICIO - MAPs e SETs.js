/*Exercicios:
1 - Criar uma função que retorna o nome dos membros de um MAP que tem os admins de um sistema.
    1 - Crie uma função GetAdmin que recebe um MAP
    2 - Crie um MAP e popule com nomes de usuários e seus papeis no sistema. (Ex. 'Luiz' => 'Admin")
    3 - Dentro da função GetAdmin, utilize do loop for...of para retornar o nome dos usuários que são administradores.
2 - Dado o array [10,30,40,5,223,2049,5] retorne outro array apenas com valores únicos.

Feito por Anderson A. Martins em 07/04/2022
*/
const usuarios = new Map();

usuarios.set('João', 'User');
usuarios.set('Deovany', 'Admin');
usuarios.set('Jose', 'User');
usuarios.set('Teresa', 'User');
usuarios.set('Vitória', 'User');
usuarios.set('Antonia', 'Admin');
usuarios.set('Jorge', 'Admin');

function getAdmins(map){
    let admins = [];
    for([key, value] of map) {
        if (value == 'Admin') {
            admins.push(key);
        }
    }
    return admins;
}

console.log(getAdmins(usuarios));

//Exercício 2
const arrayInicio = [1,1,2,5,3,5,2,3,1,2,5,3,2,1,4,2,5];

function valoresUnicos(arr) {
    const mySet = new Set(arr);
    return [...mySet];     // Os colchetes indicam que o retorno será num array, e os ... indicam que esse array terá tudo que já tem nele, mais o conteúdo do mySet (argumento REST).
}

console.log(valoresUnicos(arrayInicio));