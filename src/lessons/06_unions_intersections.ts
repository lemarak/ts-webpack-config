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
