// 1 Typer arguments et la valeur de retour **********
function add(nb1: number, nb2: number): number {
  return nb1 + nb2;
}

console.log(add(2, 4));

// 2 Typer une fonction avant sa déclaration **********
let multiply: (nb1: number, nb2: number) => number;
multiply = (n1: number, n2: number) => {
  return n1 * n2;
};

// 3 Les paramètres optionnels **********
let substract: (nb1: number, nb2?: number) => number; // ?: pour param optionnel
substract = (a: number, b: number) => {
  return b ? b - a : a;
};
substract(4);

// 4 Paramètres par défaut et rest **********
let divide: (nb1: number, nb2?: number) => number;
divide = (a: number, b: number = 1) => {
  return a / b;
};
divide(6);

let sum = (x: number, ...numbers: Array<number>): number => {
  return numbers.reduce((acc, i) => {
    acc += i;
    return acc;
  }, x);
};
sum(0, 1, 2, 3, 4, 5, 6);

// 5 La surcharge de fonction
function calculate(a: number, b: number): number;
function calculate(a: string, b: string): string;
function calculate(a, b): string | number {
  return a + b;
}
const foo = calculate(1, 2);
const bar = calculate("Hello ", "World");
