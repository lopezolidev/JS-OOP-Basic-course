//Using modules to encapsulate classes and "secret" methods

function videoPlay(id){
  const secretURL = "https://platziismoresecretthanthepentagon" + id;
  console.log(`The class is being played by url: ` + secretURL);
}

function videoStop(id){
  const secretURL = "https://platziismoresecretthanthepentagon" + id;
  console.log(`The class is paused by url: ` + secretURL);
}

// export 
 class PlatziClass{ //exporting this function will make the whole file "invisible" and this sole function will be accessible
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
    isFree = false,
    lang = "spanish",
  }) {
    this.id = id;
    this._name = name; //using "_" we signal the team to not change this property without using the setter
    this.teachers = teachers;
    this.lectures = lectures;
    this.isFree = isFree;
    this.lang = lang;
    
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

class Comment {
  constructor({
    studentName,
    content, 
    studentRole = "student", //we declare here the value of studenRole being "student" as default
  }) {
    this.studentName = studentName;
    this.content = content;
    this.studentRole = studentRole;
    this.likes = 0; //we can set attributes as default by doing this, without declaring them in the constructor
  } 
  publishComment(content){ //when using ``, is mandatory to use "this." to refer as execution context the object Comment itself
    console.log(`
      ${this.studentName} (${this.studentRole})  
    `);
    console.log(`
      ${this.content};
    `)
    console.log(`
    ${this.likes} likes`);
  }
}



const cursoNodeJs = new Course({
  id: "curso-nodejs",
  name: "Curso practico de NodeJS",
  teacher: "Alan Brito",
  isFree: false,
  lang: "english",
})

const cursoBI = new Course({
  id: "curso-bi",
  name: "Curso de Business Intelligence",
  teacher: "Silvia Sentís",
  isFree: false,
  lang: "spanish",
})

const cursoPandasNumpy = new Course({
  id: "curso-manipulacion-transformacion-pandas-numpy",
  name: "Curso Básico de Manipulación y Transformación de Datos con Pandas y NumPy",
  teacher: "Carlos Alarcón",
  isFree: true,
  lang: "spanish",
})

const creacionVgs = new Course({
  id: "curso-creacion-vgs",
  name: "Curso de Creación de Videojuegos",
  teacher: "Alberto Pérez-Bermejo",
  isFree: true,
  lang: "spanish",
})

const gameDesign = new Course({
  id: "curso-game-design",
  name: "Curso de Game Design",
  teacher: "Humberto Cervera",
  isFree: false,
  lang: "english",
})



class User {
  // #name //with ES11 we can "privatize" attributes from our classes

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
    // this.#name = name; //using the "#" when referencing inside the constructor
    this.name = name;
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

  publishComment(commentContent){ //here we insert the method to create new comments using the class Comment
    const comment = new Comment({
      studentName: this.name,
      content: commentContent,
    })
    comment.publishComment();
  }

  // get name(){
  //   // return this.#name; //so as in the getters 
  //   return this.name;
  // }
  // set name(newName){
  //   // this.#name = newName; //and setters
  //   this.name = newName;
  // }
}

//Applying inheritance

class FreeStudent extends User{
  constructor(props){
    super(props); //using "super" we refer to the super class from which is made the inheritance
  }

  selectCourse(newCourse){
    if(newCourse.isFree){
      this.approvedCourses.push(newCourse); //we must use "this." to refer to the object FreeStudent itself
    } else {
      console.warn(`Sorry ${this.name}, but ${newCourse.name} is not open`)
    }
  }
}

class BasicStudent extends User {
  constructor(props){
    super(props);
  }

  selectCourse(newCourse){
    if(newCourse.lang !== "english"){
      this.approvedCourses.push(newCourse);
    } else {
      console.warn(`Sorry ${this.name}, but ${newCourse.name} is only available in english`)
    }
  }
}

class ExpertStudent extends User {
  constructor(props){
    super(props);
  }

  selectCourse(newCourse){
     this.approvedCourses.push(newCourse);
  }
}

class TeacherStudent extends User {
  constructor(props){
    super(props);
  }
  publishComment(commentContent){  //we're overriding the method of publishComment from class User
    const comment = new Comment({
      studentName: this.name,
      content: commentContent,
      studentRole: "teacher" //here we change the value of attribute studentRole from defaul "student" to "teacher"
    });
    comment.publishComment();
  }
}


const JuanD = new User({
  name: "Juan David",
  email: "juancito@gmail.com",
  username: "JuanDC",
  instagram: "Juan_DC"
})

// JuanD.name = "Roberto";
// console.log(JuanD.name)


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
  isFree: false,
  lang: "english",
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

// Instancing students

const juan2 = new FreeStudent({
  name: "JuanDC",
  username: "juandc",
  email: "juanito@juanito.com",
  twitter: "fjuandc",
  learningPaths: [
    escuelaWeb,
    escuelaVgs
  ],
});

// juan2.name = "juancho";
// console.log(juan2.name);

const miguelito2 = new BasicStudent({
  name: "Miguelito",
  username: "migelitofeliz",
  email: "miguelito@juanito.com",
  instagram: "migelito_feliz",
  learningPaths: [
    escuelaWeb,
    escuelaData,
  ],
});

// miguelito2.name = "Miguelacho"; 
// console.log(miguelito2.name);

const mary = new ExpertStudent({
  name: "Mary O",
  username: "maryomary",
  email: "maryo@email.com",
  instagram: "mary_o",
  learningPaths: [
    escuelaVgs,
    escuelaData
  ]
})

const freddy = new TeacherStudent({
  name: "Freddy Vega",
  username: "freddier",
  email: "f@gep.com",
  instagram: "freddier_vega"
})

freddy.publishComment("Excelent job");

// Freddy Vega (teacher)  
    
//  
//       Excelent job;
    
// 
//     0 likes


// mary.name = "maria";
// console.log(mary.name);


// accessing getters and setters:

// console.log(cursoBI.name);
// cursoBI.name = "Evil programming course";
// cursoBI.name = "New Business Intelligence course";
// console.log(cursoBI);
