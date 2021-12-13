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

// 03 - Classes et types génériques - **********

class Stack {
  // sans générique
  items: any[] = [];
  push(item) {
    this.items.push(item);
  }
  pop() {
    return this.items.pop();
  }
  display() {
    console.log("Items : ", this.items);
  }
}

const newStackNumber = new Stack();
newStackNumber.push(1);
newStackNumber.display();
newStackNumber.push(2);
newStackNumber.display();
const myNumber = newStackNumber.pop();
newStackNumber.display();
console.log("My number : ", myNumber);

const newStackString = new Stack();
newStackString.push("Coucou ");
newStackString.display();
newStackString.push("le Monde ");
newStackString.display();
const myString = newStackString.pop();
newStackString.display();
console.log("My string : ", myString);

class StackT<T> {
  // Avec générique
  items: T[] = [];
  push(item: T): void {
    this.items.push(item);
  }
  pop(): T {
    return this.items.pop();
  }
  display(): void {
    console.log("Items : ", this.items);
  }
}

const newStackStringT = new StackT<string>();
newStackStringT.push("Hello ");
newStackStringT.display();
newStackStringT.push("World ");
newStackStringT.display();
const myStringT = newStackStringT.pop();
newStackStringT.display();
console.log("My string : ", myStringT);

// 04 - Contraintes - **********

interface Name {
  name: string;
}

function displayName<T extends Name>(object: T) {
  console.log(object.name);
}

function displayProp<T, U extends keyof T>(object: T, prop: U) {
  console.log(prop, object[prop]);
}

displayProp({ price: 50 }, "price");

// 05 - Collections et types génériques - **********

interface User5 {
  username: string;
}

// Readonly
const newUser5: Readonly<User5> = {
  username: "Charlie",
};

// newUser5.username = "Lilou";  // Not ok

// Partial
interface User5_1 {
  username: string;
  age: number;
  address: {
    city: string;
  };
}

const newUser5_1: User5_1 = {
  username: "Lilou",
  age: 24,
  address: {
    city: "Rennes",
  },
};

function editUser(user: User5_1, editedUser: Partial<User5_1>) {
  return { ...user, ...editedUser };
}

editUser(newUser5_1, { age: 20 });

// Record
interface Page {
  title: string;
}

type PageType = "home" | "about" | "contact";

const pages: Record<PageType, Page> = {
  home: {
    title: "homepage",
  },
  about: {
    title: "about",
  },
  contact: {
    title: "contact",
  },
};

// Pick
interface User5_2 {
  username: string;
  age: number;
  address: {
    city: string;
  };
}
type LightUser = Pick<User5_2, "username" | "age">;

const newUser5_2: LightUser = {
  username: "Lilou",
  age: 24,
};

// Omit
type LightUser2 = Omit<User5_2, "address">;
