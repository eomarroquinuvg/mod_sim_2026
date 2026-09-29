const pasos = [

    // PASO 0
    {
        titulo: "Comenzamos en S",

        descripcion:
            "S es el nodo inicial. Todavía no hemos explorado sus vecinos.",

        actual: "S",

        explorados: [],

        aristas: [],

        calculos: [
            ["g(S)", "0"],
            ["h(S)", "5"],
            ["f(S)", "0 + 5 = 5"]
        ],

        open: [
            ["S", 5]
        ],

        razon:
            "Comenzamos en S. El siguiente paso será analizar los nodos A y B.",

        final: false
    },


    // PASO 1
    {
        titulo: "Exploramos los vecinos de S",

        descripcion:
            "Desde S podemos movernos hacia A o hacia B. Calculamos g, h y f para ambos.",

        actual: "S",

        explorados: ["S"],

        aristas: ["SA", "SB"],

        calculos: [
            ["A", "g=2 | h=4 | f=6"],
            ["B", "g=4 | h=4 | f=8"]
        ],

        open: [
            ["A", 6],
            ["B", 8]
        ],

        razon:
            "A tiene f=6 y B tiene f=8. A* siempre selecciona el nodo pendiente con menor f(n). Por eso elegirá A.",

        final: false
    },


    // PASO 2
    {
        titulo: "A* selecciona A",

        descripcion:
            "A tiene el menor valor de f(n). Ahora exploramos sus vecinos C y G.",

        actual: "A",

        explorados: ["S"],

        aristas: ["SA"],

        calculos: [
            ["C", "g=4 | h=2 | f=6"],
            ["G", "g=9 | h=0 | f=9"]
        ],

        open: [
            ["C", 6],
            ["B", 8],
            ["G", 9]
        ],

        razon:
            "Desde A podemos llegar a C con costo acumulado 4 o directamente a G con costo acumulado 9. C tiene el menor f(n), por lo que será el siguiente nodo.",

        final: false
    },


    // PASO 3
    {
        titulo: "A* selecciona C",

        descripcion:
            "C tiene f=6. Desde C existe una conexión hacia la meta G con costo 2.",

        actual: "C",

        explorados: ["S", "A"],

        aristas: ["SA", "AC"],

        calculos: [
            ["g(C)", "4"],
            ["Costo C → G", "2"],
            ["g(G)", "4 + 2 = 6"],
            ["h(G)", "0"],
            ["f(G)", "6 + 0 = 6"]
        ],

        open: [
            ["G", 6],
            ["B", 8]
        ],

        razon:
            "Llegar a G desde C produce un costo total de 6. G ahora tiene el menor valor de f(n).",

        final: false
    },


    // PASO 4
    {
        titulo: "Llegamos a la meta G",

        descripcion:
            "G es el nodo objetivo. A* puede finalizar la búsqueda.",

        actual: "G",

        explorados: ["S", "A", "C"],

        aristas: ["SA", "AC", "CG"],

        calculos: [
            ["S → A", "2"],
            ["A → C", "2"],
            ["C → G", "2"],
            ["Costo total", "2 + 2 + 2 = 6"]
        ],

        open: [
            ["G", 6],
            ["B", 8]
        ],

        razon:
            "G es la meta y fue alcanzada con costo 6. El camino encontrado es S → A → C → G.",

        final: true
    }

];


let pasoActual = 0;


/* ELEMENTOS */

const pasoNumero =
    document.getElementById("pasoNumero");

const tituloPaso =
    document.getElementById("tituloPaso");

const descripcionPaso =
    document.getElementById("descripcionPaso");

const calculos =
    document.getElementById("calculos");

const listaOpen =
    document.getElementById("listaOpen");

const razonPaso =
    document.getElementById("razonPaso");

const anterior =
    document.getElementById("anterior");

const siguiente =
    document.getElementById("siguiente");

const reiniciar =
    document.getElementById("reiniciar");

const barraProgreso =
    document.getElementById("barraProgreso");

const resultadoFinal =
    document.getElementById("resultadoFinal");


/* LIMPIAR GRAFO */

function limpiarGrafo() {

    ["S", "A", "B", "C", "G"].forEach(nodo => {

        const elemento =
            document.getElementById("nodo-" + nodo);

        elemento.classList.remove(
            "actual",
            "explorado",
            "camino-final"
        );

    });


    ["SA", "SB", "AC", "AG", "BG", "CG"]
        .forEach(arista => {

            document
                .getElementById(arista)
                .classList.remove(
                    "activa",
                    "final"
                );

        });

}


/* MOSTRAR PASO */

function mostrarPaso() {

    const paso = pasos[pasoActual];

    limpiarGrafo();


    /* TEXTO */

    pasoNumero.textContent =
        `PASO ${pasoActual} DE ${pasos.length - 1}`;

    tituloPaso.textContent =
        paso.titulo;

    descripcionPaso.textContent =
        paso.descripcion;

    razonPaso.textContent =
        paso.razon;


    /* NODOS EXPLORADOS */

    paso.explorados.forEach(nodo => {

        document
            .getElementById("nodo-" + nodo)
            .classList.add("explorado");

    });


    /* NODO ACTUAL */

    document
        .getElementById("nodo-" + paso.actual)
        .classList.add("actual");


    /* ARISTAS */

    paso.aristas.forEach(arista => {

        document
            .getElementById(arista)
            .classList.add("activa");

    });


    /* CÁLCULOS */

    calculos.innerHTML = "";

    paso.calculos.forEach((fila, indice) => {

        const div =
            document.createElement("div");

        div.className =
            "fila-calculo";

        if (indice === paso.calculos.length - 1) {
            div.classList.add("destacado");
        }

        div.innerHTML = `
            <span>${fila[0]}</span>
            <strong>${fila[1]}</strong>
        `;

        calculos.appendChild(div);

    });


    /* OPEN */

    listaOpen.innerHTML = "";

    paso.open.forEach((elemento, indice) => {

        const div =
            document.createElement("div");

        div.className =
            "open-elemento";

        if (indice === 0) {
            div.classList.add("primero");
        }

        div.innerHTML = `
            <span>${elemento[0]}</span>
            <span>f = ${elemento[1]}</span>
        `;

        listaOpen.appendChild(div);

    });


    /* RESULTADO FINAL */

    if (paso.final) {

        ["S", "A", "C", "G"]
            .forEach(nodo => {

                document
                    .getElementById("nodo-" + nodo)
                    .classList.add("camino-final");

            });


        ["SA", "AC", "CG"]
            .forEach(arista => {

                document
                    .getElementById(arista)
                    .classList.remove("activa");

                document
                    .getElementById(arista)
                    .classList.add("final");

            });


        resultadoFinal.innerHTML = `
            Camino final:
            <strong>S → A → C → G</strong>
            &nbsp; | &nbsp;
            Costo:
            <strong>6</strong>
        `;

    } else {

        resultadoFinal.innerHTML = `
            Camino final:
            <strong>todavía no encontrado</strong>
        `;

    }


    /* BOTONES */

    anterior.disabled =
        pasoActual === 0;

    siguiente.disabled =
        pasoActual === pasos.length - 1;


    /* PROGRESO */

    const porcentaje =
        (pasoActual / (pasos.length - 1)) * 100;

    barraProgreso.style.width =
        porcentaje + "%";

}


/* BOTONES */

siguiente.addEventListener(
    "click",
    function () {

        if (pasoActual < pasos.length - 1) {

            pasoActual++;

            mostrarPaso();

        }

    }
);


anterior.addEventListener(
    "click",
    function () {

        if (pasoActual > 0) {

            pasoActual--;

            mostrarPaso();

        }

    }
);


reiniciar.addEventListener(
    "click",
    function () {

        pasoActual = 0;

        mostrarPaso();

    }
);


/* INICIO */

mostrarPaso();
