// 1 Base interface **********
interface User {
  username: string;
  isDrinking: boolean;
  isHealthy: boolean;
  isSmoking: boolean;
  age: number;
}

const user: User = {
  username: "Jean",
  age: 35,
  isDrinking: true,
  isHealthy: true,
  isSmoking: true,
};

function greet(user: { username: string }): void {
  console.log(`Hello ${user.username}`);
}

function death(user: User) {}

function goodShape(user: User) {}

greet(user);

// 2 Optionnelles et en lecture seule **********
interface User2 {
  readonly username: string;
  isDrinking?: boolean;
  isHealthy?: boolean;
  isSmoking?: boolean;
  age: number;
}

const ids: readonly string[] = ["1", "2", "3"]; // array immutable
const ids2: ReadonlyArray<string> = ["1", "2", "3"]; // autre syntaxe
// ids.push('4');  // not Ok

const user2: User2 = {
  username: "Micheline",
  age: 22,
};

user2.age = 19; // Ok
// user2.username= "Joséphine";  // not Ok

// 3 Types indexables **********
interface User3 {
  readonly username: string;
  isDrinking: boolean;
  isHealthy?: boolean;
  isSmoking?: boolean;
  age: number;
  [propName: string]: any; // ajout de propriétés dynamiques à certains objets
  [propName: number]: any; // même chose avec propriété de type number
}

const user3_1: User3 = {
  username: "Paulette",
  age: 32,
} as User; //cast, isDrinking n'est plus obligatoire

const user3_2: User3 = {
  username: "Justin",
  age: 99,
  isDrinking: false,
  isOnline: true, // propriété spécifique à cet objet
  0: true, // propriété spécifique à cet objet
};

interface CollectionUser {
  // collection avec clé ids
  [x: string]: User3;
}
const myCollection: CollectionUser = {
  "1": user3_1,
  "2": user3_2,
};

// 4 interfaces et fonctions **********
interface MyFunc {
  (param1: string, param2: number): number;
}

const func: MyFunc = (str, n) => {
  console.log(str);
  return n * 2;
};
func("Coucou", 33);

interface Human {
  //Typer une interface avec une fonction
  firstName: string;
  sayHello: (lastName: string) => void;
}
const man: Human = {
  firstName: "Léontine",
  sayHello(str) {
    console.log(`Bonjour ${this.firstName} ${str}`);
  },
};

// 5 Compositions d'interfaces et classes
interface Vehicule {
  name: string;
  drive: () => void;
}
interface Engine {
  type: string;
}
interface Car extends Vehicule, Engine {
  wheels: number;
}

const newCar: Car = {
  // composition d'interfaces
  name: "Clio",
  type: "electric",
  wheels: 5,
  drive: () => {},
};

class CarClasse implements Vehicule, Engine {
  constructor(
    public name: string,
    public type: string,
    public wheels: number
  ) {}
  drive = () => {};
}

const myCar: CarClasse = {
  name: "clio",
  type: "electric",
  wheels: 4,
  drive: () => {
    console.log("Je conduis");
  },
};
myCar.drive();
