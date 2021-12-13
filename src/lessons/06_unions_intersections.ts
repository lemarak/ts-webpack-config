// 01 - L'union de types **********
let userStatus: "online" | "offline" | "busy" = "online";

let value: number | string;
value = 1;
value = "Coucou";
// value = true; // not ok

interface Car {
  seat: number;
}

interface Truck {
  seat: number;
  load: (amount: number) => void;
}

const myVehicule1: Car | Truck = {
  seat: 3,
};
myVehicule1.seat = 4; // Car

const myVehicule2: Car | Truck = {
  seat: 6,
  load: (amount) => {
    console.log(amount);
  },
};
myVehicule2.load(12); // Truck

function vehiculeFactory(type: 1 | 2): Car | Truck {
  if (type === 1) {
    return { seat: 4 };
  } else {
    return {
      seat: 6,
      load: (amount: number): void => {
        console.log(amount);
      },
    };
  }
}

const foo = vehiculeFactory(2);
// foo.load(123); //TS ne sait pas si Car ou Truck

// 02 - Les unions discriminantes et gardes **********
interface Car2 {
  type: "car";
  seat: number;
  drive: () => void;
}

interface Truck2 {
  type: "truck";
  seat: number;
  load: (amount: number) => void;
  drive: () => void;
}

const myVehicule2_1: Car2 | Truck2 = {
  type: "car",
  seat: 3,
  drive: () => {},
};
const myVehicule2_2: Car2 | Truck2 = {
  type: "truck",
  seat: 3,
  load: (amount: number): void => {},
  drive: () => {},
};

function vehiculeFactory2(type: 1 | 2): Car2 | Truck2 {
  if (type === 1) {
    return { type: "car", seat: 4, drive: () => {} };
  } else {
    return {
      type: "truck",
      seat: 6,
      load: (amount: number): void => {
        console.log(amount);
      },
      drive: () => {},
    };
  }
}

const foo2 = vehiculeFactory2(2);
if (foo2.type === "truck") {
  foo2.load(123);
}

function startTrip(v: Car2 | Truck2) {
  v.drive();
  switch (v.type) {
    case "car": {
      break;
    }
    case "truck": {
      v.load(123);
      break;
    }
  }
}

// 03 - Les gardes **********
interface Bird {
  fly: () => void;
}

interface Whale {
  swim: () => void;
}

function move(a: Bird | Whale) {
  if ("fly" in a) {
    a.fly();
  } else {
    a.swim();
  }
}

function foo3(a: string | number) {
  if (typeof a === "string") {
    console.log(a.split(" "));
  } else {
    console.log(a.toFixed(2));
  }
}
foo3("Je vais à la pêche");
foo3(10.456);

class A {
  getA() {
    console.log("Je suis A");
  }
}
class B {
  getB() {
    console.log("Je suis B");
  }
}

const a = new A();
const b = new B();

function bar(a: A | B) {
  if (a instanceof A) {
    a.getA();
  } else {
    a.getB();
  }
}

bar(a);
bar(b);

function isBird(x: any): x is Bird {
  // Prédiction de type
  return (x as Bird).fly !== undefined;
}
function move2(a: Bird | Whale) {
  if (isBird(a)) {
    a.fly();
  } else {
    a.swim();
  }
}

// 04 - Les intersections **********

interface User4 {
  username: string;
}

interface Moderator4 {
  deleteMessage: () => void;
  editMessage: () => void;
}

interface AddContent4 {
  addMessage: () => void;
}

let newUser4: User4 & AddContent4 = {
  username: "jean",
  addMessage: () => {
    console.log("new message");
  },
};

let admin: User4 & AddContent4 & Moderator4 = {
  username: "jocelyne",
  addMessage: () => {
    console.log("Bienvenue");
  },
  deleteMessage: () => {},
  editMessage: () => {},
};

interface BasicUser4 extends User4, AddContent4 {}
interface Admin4 extends User4, Moderator4, AddContent4 {}

// 05 - Nouveaux opérateurs

type User5 = {
  username: string;
  age: number;
  address?: {
    city?: {
      name: string;
      population?: number;
    };
  };
};

const myUser5: User5 = {
  username: "paulette",
  age: 21,
};

// const city = myUser5.address.city;  // Error
const city = myUser5.address ? myUser5.address.city : null;

if (myUser5 && myUser5.address && myUser5.address.city) {
  // Un peu long ;)
}
const population = myUser5.address?.city?.population; //Bonne méthode
console.log("population :", population);

if (myUser5.address?.city?.population) {
  console.log("ok");
} else {
  console.log("ko");
}

const address = myUser5.address || "unknown";
console.log("Adresse ", address);

const myUser51: User5 = {
  username: "",
  age: 21,
};

const username5 = myUser51.username ?? "guest";
console.log("username ", username5);

// 06 - Alias de type - **********

type UserStatusType6 = "online" | "offline" | "busy";
type CustomModulo6 = 1 | 2 | 3;
type ObjectId = string; // ex, si un objet de bdd, facilite la lecture
type User6 = {
  username: string;
  age: number;
  id: ObjectId;
};

let userStatus6: UserStatusType6 = "online";
let newUser6: User6 = {
  username: "Charlie",
  age: 7,
  id: "1",
};

function getUserStatus(user): UserStatusType6 {
  return user.status;
}

interface Car6 {
  seat: number;
}
interface Car6 {
  wheel: number;
}

const car6: Car6 = {
  // possibilité de merger les déclarations d'interface, impossible pour les types
  seat: 4,
  wheel: 3,
};
