//Using modules to encapsulate classes and "secret" methods

function videoPlay(id){
  const secretURL = "https://platziismoresecretthanthepentagon" + id;
  console.log(`The class is being played by url: ` + secretURL);
}

function videoStop(id){
  const secretURL = "https://platziismoresecretthanthepentagon" + id;
  console.log(`The class is paused by url: ` + secretURL);
}

export class PlatziClass{ //exporting this function will make the whole file "invisible" and this sole function will be accessible
    constructor({
      name,
      videoID,
    }) {
      this.name = name;
      this.videoID = videoID;
    }
 
    //these two methods are "invisible" from outside the class
    play(){
      videoPlay(this.videoID);
    };

    stop(){
      videoStop(this.videoID);
    };
}







// Creating learning paths as objects with constructor

class LearningPath {
    constructor({
        id,
        name,
        courses = [],
        teachers = [],
    }) {
        this.id = id;
        this.name = name;
        this.courses = courses;
        this.teachers = teachers;
    }
    
    addCourse(courseToAdd){
      this.courses.push(courseToAdd);
    }
    //TODO: changeCourse & deleteCourse
}
// courses inside Learning Paths

class Course {
  constructor({
    id,
    name,
    teachers = [],
    lectures = [],
  }) {
    this.id = id;
    this._name = name; //using "_" we signal the team to not change this property without using the setter
    this.teachers = teachers;
    this.lectures = lectures;
  }

  get name(){ //a getter returns a property value
    return this._name; 
  }

  set name(newName) { //using a setter we will modify the value of a certain attribute
    if (newName === "Evil programming course"){
      console.error("Dude... no");
    } else {
    this._name = newName;
    }
  }
}

// lectures inside courses

class Lecture {
  constructor({
    id,
    teacher,
    description,
    comments = [],    
  }) {
    this.id = id;
    this._teacher = teacher;
    this.description = description;
    this.comments = comments;
  }

  get teacher(){
    return this._teacher;
  }
  set teacher(newTeacher){
    this._teacher = newTeacher;
  }
}


// Elements associated with lectures

class Description {
  constructor({
    text,
    related_lectures = [],
  }) {
    this.text = text;
    this.related_lectures = related_lectures;
  }
}

class Comments {
  constructor({
    student,
    text,
    type_of_comment,
    likes,
  }) {
    this.student = student;
    this.text = text;
    this.type_of_comment = type_of_comment;
    this.likes = likes;
  }
}



const cursoNodeJs = new Course({
  id: "curso-nodejs",
  name: "Curso practico de NodeJS",
  teacher: "Alan Brito",
})

const cursoBI = new Course({
  id: "curso-bi",
  name: "Curso de Business Intelligence",
  teacher: "Silvia Sentís",
})

const cursoPandasNumpy = new Course({
  id: "curso-manipulacion-transformacion-pandas-numpy",
  name: "Curso Básico de Manipulación y Transformación de Datos con Pandas y NumPy",
  teacher: "Carlos Alarcón",
})

const creacionVgs = new Course({
  id: "curso-creacion-vgs",
  name: "Curso de Creación de Videojuegos",
  teacher: "Alberto Pérez-Bermejo",
})

const gameDesign = new Course({
  id: "curso-game-design",
  name: "Curso de Game Design",
  teacher: "Humberto Cervera",
})



class User {
  #name //with ES11 we can "privatize" attributes from our classes

  constructor({
    name,
    email,
    username,
    twitter = undefined,
    instagram = undefined,
    facebook = undefined,
    approvedCourses = [],
    learningPaths = [],
  }) {
    this.#name = name; //using the "#" when referencing inside the constructor
    this.email = email;
    this.username = username;
    this.socialMedia = {
      twitter,
      instagram,
      facebook,
    };
    this.approvedCourses = approvedCourses;
    this.learningPaths = learningPaths;
  }
  get name(){
    return this.#name; //so as in the getters 
  }
  set name(newName){
    this.#name = newName; //and setters
  }
}

const JuanD = new User({
  // name: "Juan David",
  email: "juancito@gmail.com",
  username: "JuanDC",
  instagram: "Juan_DC"
})

JuanD.name = "Roberto";
console.log(JuanD.name)

// Instancing Description 

const descripcion1 = new Description({
  text: "En esta clase aprenderemos sobre la POO en JavaScript",
  related_lectures: [
  ]
})

const descripcion3 = new Description({
  text: "En esta clase aprenderemos sobre la abstracción como pilar de la POO en JavaScript",
  related_lectures: [
  ]
})

const descripcion8 = new Description({
  text: "En esta clase aprenderemos sobre la herencia como pilar de la POO en JavaScript",
  related_lectures: [
  ]
})

// Instancing lectures 

const clase1 = new Lecture({
  id: "clase-intro-poo",
  teacher: JuanD,
  description: descripcion1,
})

const clase3 =  new Lecture({
  id: "clase-herencia-poo",
  teacher: JuanD,
  description: descripcion3,
})

const clase8 =  new Lecture({
  id: "clase-practica-herencia-poo",
  teacher: JuanD,
  description: descripcion8,
})

// Instancing courses

const cursoFrontend = new Course({
  id: "curso-frontend-dev",
  name: "Curso basico para Frontend Developer",
  teacher: "Estefany Aguilar",
})

const cursoPOO = new Course({
  id: "curso-poo",
  name: "Curso de POO en JavaScript",
  teacher: JuanD,
  lectures: [
    clase1,
    clase3,
    clase8
  ]
})

// Instancing schools

const escuelaWeb = new LearningPath({
  id: "escuela-web",
  name: "Escuela de Desarrollo Web",
  courses: [
    cursoFrontend,
    cursoNodeJs
]
});

const escuelaData = new LearningPath({
  id: "escuela-data-science",
  name: "Escuela de Data Science",
  courses: [
    cursoBI,
    cursoPandasNumpy,
  ]
});

const escuelaVgs = new LearningPath({
  id: "escuela-vgs",
  name: "Escuela de Videojuegos",
  courses: [
    creacionVgs,
    gameDesign,
  ]
});

const juan2 = new User({
  // name: "JuanDC",
  username: "juandc",
  email: "juanito@juanito.com",
  twitter: "fjuandc",
  learningPaths: [
    escuelaWeb,
    escuelaVgs
  ],
});

juan2.name = "juancho";
console.log(juan2.name);

const miguelito2 = new User({
  // name: "Miguelito",
  username: "migelitofeliz",
  email: "miguelito@juanito.com",
  instagram: "migelito_feliz",
  learningPaths: [
    escuelaWeb,
    escuelaData,
  ],
});

miguelito2.name = "Miguelacho"; 
console.log(miguelito2.name);

const mary = new User({
  // name: "Mary O",
  username: "maryomary",
  email: "maryo@email.com",
  instagram: "mary_o",
  learningPaths: [
    escuelaVgs,
    escuelaData
  ]
})

mary.name = "maria";
console.log(mary.name);


// accessing getters and setters:

console.log(cursoBI.name);
cursoBI.name = "Evil programming course";
cursoBI.name = "New Business Intelligence course";
console.log(cursoBI);
