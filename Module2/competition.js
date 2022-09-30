// Creating learning paths as objects with constructor

class LearningPath {
    constructor({
        id,
        name,
        courses = [],
    }) {
        this.id = id;
        this.name = name;
        this.courses = courses;
    }
    
    addCourse(courseToAdd){
      this.courses.push(courseToAdd);
    }
}

class Course {
  constructor({
    id,
    name,
    teacher,
  }) {
    this.id = id;
    this.name = name;
    this.teacher = teacher;
  }
}

const escuelaWeb = new LearningPath({
  id: "escuela-web",
  name: "Escuela de Desarrollo Web",
  courses: [
    new Course({
    id: "curso-basico-frontend",
    name: "Curso basico para Frontend Developer",
    teacher: "Estefany Aguilar",
  }),
    new Course({
      id: "curso-nodejs",
      name: "Curso practico de NodeJS",
      teacher: "Alan Brito",
    })
]
});

const escuelaData = new LearningPath();
const escuelaVgs = new LearningPath();

class Student {
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
}

const juan2 = new Student({
  name: "JuanDC",
  username: "juandc",
  email: "juanito@juanito.com",
  twitter: "fjuandc",
  learningPaths: [
    escuelaWeb,
  ],
});

const miguelito2 = new Student({
  name: "Miguelito",
  username: "migelitofeliz",
  email: "miguelito@juanito.com",
  instagram: "migelito_feliz",
  learningPaths: [
    escuelaWeb,
  ],
});

console.log(juan2)