//this is a literal object. Not an instance of a made-by-us Class (prototype). Is an instance of Mother Prototype (__proto__ is the attribute that evidences this heritage)
const natalia = { 
    name: "natalia",
    age: 20,
    approvedCourses: [
        "Practical CSS course",
        "Basic JavaScript course",
    ],
    newCourse(newCourse){  //method inside an object
        this.approvedCourses.push(newCourse); 
        //"this" reffers to the object itself, then we use any refference to an attriubte or other method
    }
}

natalia.newCourse("Basic OOP course");

// Now making a class / made-by-us prototype (old syntax):

function Student(name, age, approvedCourses){
    this.name = name;
    this.age = age;
    this.approvedCourses = approvedCourses;
    // this.newCourse = function (newCourse){  //one form to write methods inside prototypes
    //     this.approvedCourses.push(newCourse);
    // }
    //there're NO methods in this prototype "Student"
}

Student.prototype.newCourse = function (newCourse){  //it's OUTSIDE the class Student   
    //another form to write methods for classes using reserved word "prototype"
        this.approvedCourses.push(newCourse);
    }

const juanita = new Student("juanita",
 21, 
 ["Basic programming history",
  "C++ basic course"]
  );
console.log(juanita);
// Student {name: 'juanita', age: 21, approvedCourses: Array(2)}
// age: 21
// approvedCourses: (2) ['Basic programming history', 'C++ basic course']
// name: "juanita"


juanita.newCourse("Advanced Go course");

// Student {name: 'juanita', age: 21, approvedCourses: Array(2)}
// age: 21
// approvedCourses: (3) ['Basic programming history', 'C++ basic course', 'Advanced Go course']
// name: "juanita"
// [[Prototype]]: Object 
// newCourse: ƒ (newCourse)


// Now creating prototypes with "classes" syntax

class Student2 {
    constructor(name, age, approvedCourses){ 
        //constructor allows us to create an object with the elements we want it the moment we instance the object
        this.name = name;
        this.age = age;
        this.approvedCourses = approvedCourses;
    }
    newCourse(newCourse){  
        this.approvedCourses.push(newCourse); 
    }
}

const jimmy = new Student2("jimbo", "24", [
    "Data Structures and Algorithms course",
    "BI course",
])
console.log(jimmy);
// Student2 {name: 'jimbo', age: '24', approvedCourses: Array(2)}
// age: "24"
// approvedCourses: Array(2)
// 0: "Data Structures and Algorithms course"
// 1: "BI course"
// length: 2
// [[Prototype]]: Array(0)
// name: "jimbo"
// [[Prototype]]: Object
// constructor: class Student2
// newCourse: ƒ newCourse(newCourse)



// Now if we want to send many more arguments to create the object, what if we can't remember any of those? Or if send them with no order? We have ROR

class Student3 {
    constructor({name, 
        id, //optional parameter
        age,
        email, //optional parameter
        approvedCourses,
        }){ 
        //constructor allows us to create an object with the elements we want it the moment we instance the object
        this.name = name;
        this.age = age;
        this.approvedCourses = approvedCourses;
        this.id = id;
        this.email = email;
    }
    newCourse(newCourse){  
        this.approvedCourses.push(newCourse); 
    }
}

const jane = new Student3({ //we must use "{}" to send arguments as an object
    name: "jane",  //also the name of each property
    age: "24",
    approvedCourses: [
    "Data Structures and Algorithms course",
    "BI course",
    ],
    email: "janeemail@website.com"
}) //inside the object it reorganizes itself

console.log(jane);

// Student3 {name: 'jane', age: '24', approvedCourses: Array(2), id: undefined, email: 'janeemail@website.com'}
// age: "24"
// approvedCourses: (2) ['Data Structures and Algorithms course', 'BI course']
// email: "janeemail@website.com"
// id: undefined
// name: "jane"
// [[Prototype]]: Object
// constructor: class Student3
// newCourse: ƒ newCourse(newCourse)