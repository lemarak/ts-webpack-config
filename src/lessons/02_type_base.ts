// Primitives
const foo: string = "une string";
const bar: number = 5;
const bool: boolean = true;

// Objects
const obj: object = { name: "Jean" };
const arr: object = [1, 2, 3];

// Anything
const anything: any = "n'importe quoi";

const myconst: 5 = 5;

// Array
const myArr: number[] = [1, 2, 3];
const myArr2: any[] = [1, "2", { name: "jean" }];
const myArr3: Array<any> = [1, "2", true];

// Tuple
const tuple: [number, string] = [1, "deux"];

// Enum
enum XhrReadyState {
  UNSENT = 1,
  OPENED,
  HEADERS_RECEIVED,
  LOADING,
  DONE,
}

const readyState: number = 2;
if (readyState === XhrReadyState.UNSENT) {
  console.log("UNSET");
}
if (readyState === XhrReadyState.OPENED) {
  console.log("OPENED");
}

console.log(XhrReadyState.DONE);
console.log(XhrReadyState[1]);

// null, undefined
const fooNull: null = null;
const fooUndefined: undefined = undefined;

// Return function
function add(nb1, nb2): number {
  return nb1 + nb2;
}

function calculate(nb1, nb2): void {
  console.log(nb1 + nb2);
}

function loop(error: any): never {
  //   while (true) {
  //     console.log("loop");
  //   }
  throw new Error(error);
}

// Inférence et assertion
let myVar = "Hello";
myVar = "World !";

let username: any;
username = "Jean";
const nb: number = (<string>username).length;
const nb2: number = (username as string).length;
