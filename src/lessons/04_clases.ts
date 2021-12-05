// 1 Généralités sur les classes **********
class Vehicule {
  wheel = 4;
}

class Voiture extends Vehicule {
  speed: number;
  constructor(speed) {
    super();
    this.speed = speed;
  }

  move() {
    console.log("car move");
  }

  stop() {
    console.log("car stop");
  }
}

const car = new Voiture(130);
console.log(car.speed);
console.log(car.wheel);
car.move();

let bagnole: Voiture;
bagnole = new Voiture(0);

let caisse: Vehicule;
caisse = new Voiture(20);
// console.log(caisse.speed);   // Ne fonctionne pas
console.log(caisse.wheel); // OK

// 2 Les modificateurs public, private, protected et readonly **********
class VehiculeA {
  wheel = 4;
  protected brand: string;

  constructor(brand: string) {
    this.brand = brand;
  }
}

class VoitureA extends VehiculeA {
  public speed: number; // public par défaut
  private maxSpeed: number = 160;
  readonly airbag: boolean;

  constructor(speed) {
    super("renault");
    this.speed = speed;
    this.airbag = true; // modifiable une fois seulement (constructor ou déclaration)
  }

  faster(newSpeed: number): void {
    if (newSpeed < this.maxSpeed) {
      this.speed = newSpeed;
    }
  }

  move() {
    console.log("car move");
  }

  stop() {
    console.log("car stop");
  }

  changeBrand(newBrand: string): void {
    this.brand = newBrand;
  }
}

let carA: VoitureA;
carA = new VoitureA(120);
carA.faster(150);
carA.changeBrand("citroën");

// 3 Propriétés statiques et notation raccourcie **********
class VehiculeB {
  protected brand: string;
  constructor(brand: string) {
    this.brand = brand;
  }
}

class VoitureB extends VehiculeB {
  static className = "Classe VoitureB"; // Propriété statique

  constructor(public speed: number) {
    // déclaration propriétés dans constructor()
    super("renault");
  }

  static canStart(): void {
    console.log("All cars can start");
  }
}

let carB: VoitureB;
carB = new VoitureB(130);
console.log(carB.speed);
console.log(VoitureB.className);
VoitureB.canStart();
console.log(VoitureB);
console.log(carB);

// 4 Les classes abstraites **********
abstract class Engine {
  // class abstraite, non instantiable
  constructor(protected type: string) {}

  stopEngine() {
    console.log("Stop engine");
  }

  abstract openCapot(): void; // Doit être définie dans classe enfant
}

class VehiculeC extends Engine {
  // Hérite de la classe abstraite
  protected brand: string;
  constructor(brand: string) {
    super("v8");
    this.brand = brand;
  }
  openCapot() {
    console.log("J'ouvre le capot");
  }
}

console.log(Engine);
console.log(VehiculeC);
const carC = new VehiculeC("renault");
console.log(carC);
