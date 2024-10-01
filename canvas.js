const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1700; //ancho del canvas
canvas.height = 1200; //largo del canvas

class Estrella { //creamos una clase estrella para el fondo
    constructor() { // Crear e inicializar un objeto creado a partir de una clase (Es el init() de python) 
        //valor aleatorio en el canvas pos estrella
        this.x = Math.random() * canvas.width; //this es el self de python
        this.y = Math.random() * canvas.height;
    }

    estrella() {
        c.beginPath();
        c.arc(this.x, this.y, 2, 0, 2 * Math.PI); //creamos un circulo
        c.fillStyle = 'white'; //asignamos color
        c.fill(); //rellenamos el circulo
    }
}

class Planeta {
    constructor(canvas, radioint, color, dradian, radioext) {
        this.x = canvas.width / 2; //centro del canvas
        this.y = canvas.height / 2; //centro del canvas
        this.radioint = radioint; //radio del planeta
        this.color = color; //color del planeta
        this.dradian = dradian;
        this.radian = 0;
        this.radioext = radioext; //distancia desde centro del canvas
    }

    dibujar() {
        // Orbitas
        c.beginPath();
        c.lineWidth = 3; //grosor de las lineas
        c.arc(canvas.width / 2,canvas.height / 2,this.radioext,0,2 * Math.PI); //dibujamos orbita
        c.strokeStyle = 'grey'; //color de orbita
        c.stroke(); //dibujamos el círculo

        // Planeta
        c.beginPath();
        c.arc(this.x, this.y, this.radioint, 0, Math.PI * 2); //circulo del planeta
        c.fillStyle = this.color; //rellenamos planeta con su color
        c.fill(); //dibujamos planeta
    }

    cambiarpos() {
        this.dibujar(); //dibujamos las orbitas y planetas
        if (this.dradian > 0) { //solo variamos posicion si hay variacion del radian
            this.radian += this.dradian; //variamos angulo segun dradian
            this.x = canvas.width / 2 + Math.cos(this.radian) * this.radioext; //variamos posicion segun variacion del radian
            this.y = canvas.height / 2 + Math.sin(this.radian) * this.radioext;
        }
    }
}

// Animacion de movimiento planetas
function animacion() {
    requestAnimationFrame(animacion); //https://flaviocopes.com/requestanimationframe/
    c.fillStyle = 'black'; //en cada animación debemos pintar nuevamente el fondo
    c.fillRect(0, 0, canvas.width, canvas.height); //pintamos fondo

    estrellas.forEach(estrella => estrella.estrella()); //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
    planetas.forEach(planeta => planeta.cambiarpos());
}

//Creamos las estrellas y planetas

planetas = [];
estrellas = [];

//Velocidades relativas de los planetas https://www.sjsu.edu/faculty/watkins/orbital.htm
// Tamanos relativos de los planetas https://solarsystem.nasa.gov/planet-compare/
const  radio_me = 2.4397;
const  radio_ve = 6.0518;
const  radio_t = 6.371;
const  radio_ma = 3.3895;
const  radio_j = 69.911;
const  radio_s = 58.232;
const  radio_u = 25.362;
const  radio_n = 24.397;
const radio_sol = 50;

// SOL
planetas.push(new Planeta(canvas, radio_sol, 'yellow', 0, 0)); 
// MERCURIO
let radio = 1.5*radio_sol
planetas.push(new Planeta(canvas, radio_me, 'brown', 3*1.607/1000, radio)); 
// VENUS
radio += 5*radio_me
planetas.push(new Planeta(canvas, radio_ve, 'orange', 3*1.174/1000, radio));
// TIERRA
radio += 3*radio_ve
planetas.push(new Planeta(canvas, radio_t, 'lightblue', 3*1/1000, radio));
// MARTE
radio += 2*radio_t
planetas.push(new Planeta(canvas, radio_ma, 'red', 3*0.802/1000, radio));
// JUPITER
radio += 25*radio_ma
planetas.push(new Planeta(canvas, radio_j, '#8A3320', 3*0.434/1000, radio)); 
// SATURNO
radio += 2*radio_j
planetas.push(new Planeta(canvas, radio_s, 'lightgreen', 3*0.323/1000, radio));
// URANO
radio += 1.8*radio_s
planetas.push(new Planeta(canvas, radio_u, 'lightblue', 3*0.228/1000, radio));
// NEPTUNO
radio += 2.2*radio_u
planetas.push(new Planeta(canvas, radio_n, 'blue', 3*0.182/1000, radio));

for (let i = 0; i < 600; i++) { //creamos 600 estrellas
    estrellas.push(new Estrella());
}

animacion();
