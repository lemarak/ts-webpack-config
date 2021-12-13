// 01 Introduction - **********

const fruits: any[] = ["pomme", "fraise", "tomate"];
const fruit = fruits[0]; // fruit est de type any (pas d'autocomplétion)

const legumes: string[] = ["carotte", "chou", "patate"]; // type générique (natif)
const legume = legumes[0]; // legume de type string

const poissons: Array<string> = ["carpe", "truite", "goujeon"]; // autre syntaxe
const poisson = poissons[0];

interface User {
  username: string;
}
const promesse: Promise<User> = new Promise((resolve, reject) => {
  //type générique pour Promise
  resolve({ username: "Lilou" });
});
promesse.then((res) => {
  // res de type User
  console.log(res.username);
});

// 02 Fonctions et types génériques - **********

interface Fruit {
  name: string;
  price: number;
}
interface Car {
  speed: number;
}

const newFruit: Fruit = {
  name: "fraise",
  price: 1.2,
};
const newCar: Car = {
  speed: 50,
};

function addItemToCollection_1(item: object, collection: object[]): object[] {
  return [...collection, item];
}

const myFruits1 = addItemToCollection_1(newFruit, []);
const myCars1 = addItemToCollection_1(newCar, []);

/*
console.log(myFruits1[0].price); // not ok, price n'existe pas dans object
console.log(myCars1[0].speed); // pareil...
*/

function addItemToCollection_2(item: Fruit, collection: Fruit[]): Fruit[]; // solution, mais pas terrible
function addItemToCollection_2(item: Car, collection: Car[]): Car[];
function addItemToCollection_2(item: object, collection: object[]): object[] {
  return [...collection, item];
}

const myFruits2 = addItemToCollection_2(newFruit, []);
const myCars2 = addItemToCollection_2(newCar, []);

console.log(myFruits2[0].price); // ok, price existe pas dans Fruit
console.log(myCars2[0].speed); // pareil...

function addItemToCollectionGood<T>(item: T, collection: T[]): T[] {
  // bonne pratique, inférence avec T
  return [...collection, item];
}

const myFruitsGood = addItemToCollectionGood(newFruit, []);
const myCarsGood = addItemToCollectionGood(newCar, []);

console.log(myFruitsGood[0].price); // ok, price existe pas dans Fruit
console.log(myCarsGood[0].speed); // pareil...

interface AddItemFunction {
  // utilisation de types génériques pour définir signature et interface
  <T>(item: T, collection: T[]): T[];
}
const addItemToCollectionInterface: AddItemFunction = <T>(
  item: T,
  collection: T[]
): T[] => {
  return [...collection, item];
};
