/* ==========================================================
   A* — LABORATORIO INTERACTIVO
   CC3074 — Modelización y Simulación
   ========================================================== */


/* ==========================================================
   CAMBIO DE MODO
   ========================================================== */

const btnAlgoritmo =
    document.getElementById("btnAlgoritmo");

const btnRobot =
    document.getElementById("btnRobot");

const modoAlgoritmo =
    document.getElementById("modoAlgoritmo");

const modoRobot =
    document.getElementById("modoRobot");


btnAlgoritmo.addEventListener(
    "click",
    () => {

        btnAlgoritmo.classList.add("activo");
        btnRobot.classList.remove("activo");

        modoAlgoritmo.classList.remove("oculto");
        modoRobot.classList.add("oculto");

    }
);


btnRobot.addEventListener(
    "click",
    () => {

        btnRobot.classList.add("activo");
        btnAlgoritmo.classList.remove("activo");

        modoRobot.classList.remove("oculto");
        modoAlgoritmo.classList.add("oculto");

    }
);



/* ==========================================================
   MODO 1 — EJEMPLO ACADÉMICO
   ========================================================== */

const pasosA = [

    {

        titulo:
            "Comenzamos en S",

        descripcion:
            "S es el nodo inicial. Todavía no hemos explorado sus vecinos.",

        actual:
            "S",

        explorados:
            [],

        aristas:
            [],

        calculos: [

            ["g(S)", "0"],

            ["h(S)", "5"],

            ["f(S)", "0 + 5 = 5"]

        ],

        open: [

            ["S", 5]

        ],

        razon:
            "Primero partimos del nodo inicial S. En el siguiente paso evaluaremos sus vecinos A y B.",

        final:
            false

    },


    {

        titulo:
            "Exploramos los vecinos de S",

        descripcion:
            "Desde S podemos llegar a A o B. Calculamos g(n), h(n) y f(n) para ambos.",

        actual:
            "S",

        explorados:
            ["S"],

        aristas:
            ["SA", "SB"],

        calculos: [

            ["A", "g=2 | h=4 | f=6"],

            ["B", "g=4 | h=4 | f=8"]

        ],

        open: [

            ["A", 6],

            ["B", 8]

        ],

        razon:
            "A tiene f=6 y B tiene f=8. A* selecciona el nodo pendiente con menor f(n), por lo que seleccionará A.",

        final:
            false

    },


    {

        titulo:
            "Seleccionamos A",

        descripcion:
            "A tiene el menor valor de f(n). Ahora evaluamos C y G.",

        actual:
            "A",

        explorados:
            ["S"],

        aristas:
            ["SA"],

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
            "Desde A podemos llegar a C con costo acumulado 4 o directamente a G con costo acumulado 9. C tiene menor f(n).",

        final:
            false

    },


    {

        titulo:
            "Seleccionamos C",

        descripcion:
            "Desde C podemos llegar a la meta G con costo 2.",

        actual:
            "C",

        explorados:
            ["S", "A"],

        aristas:
            ["SA", "AC"],

        calculos: [

            ["g(C)", "4"],

            ["C → G", "2"],

            ["g(G)", "4 + 2 = 6"],

            ["h(G)", "0"],

            ["f(G)", "6 + 0 = 6"]

        ],

        open: [

            ["G", 6],

            ["B", 8]

        ],

        razon:
            "G ahora tiene f=6, el menor valor de OPEN. Por eso será seleccionado.",

        final:
            false

    },


    {

        titulo:
            "Llegamos a G",

        descripcion:
            "G es la meta. La búsqueda puede finalizar.",

        actual:
            "G",

        explorados:
            ["S", "A", "C"],

        aristas:
            ["SA", "AC", "CG"],

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
            "El camino encontrado es S → A → C → G con costo total 6.",

        final:
            true

    }

];


let pasoActualA = 0;


const numeroPaso =
    document.getElementById("numeroPaso");

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

const anteriorA =
    document.getElementById("anteriorA");

const siguienteA =
    document.getElementById("siguienteA");

const reiniciarA =
    document.getElementById("reiniciarA");

const progresoA =
    document.getElementById("progresoA");

const resultadoA =
    document.getElementById("resultadoA");


function limpiarGrafo() {

    ["S","A","B","C","G"]
        .forEach(nodo => {

            document
                .getElementById(
                    "nodo-" + nodo
                )
                .classList.remove(
                    "actual",
                    "explorado",
                    "final"
                );

        });


    ["SA","SB","AC","AG","BG","CG"]
        .forEach(arista => {

            document
                .getElementById(arista)
                .classList.remove(
                    "activa",
                    "final"
                );

        });

}


function mostrarPasoA() {

    const paso =
        pasosA[pasoActualA];


    limpiarGrafo();


    numeroPaso.textContent =
        `PASO ${pasoActualA} DE ${pasosA.length - 1}`;


    tituloPaso.textContent =
        paso.titulo;


    descripcionPaso.textContent =
        paso.descripcion;


    razonPaso.textContent =
        paso.razon;


    /* EXPLORADOS */

    paso.explorados
        .forEach(nodo => {

            document
                .getElementById(
                    "nodo-" + nodo
                )
                .classList.add(
                    "explorado"
                );

        });


    /* ACTUAL */

    document
        .getElementById(
            "nodo-" + paso.actual
        )
        .classList.add(
            "actual"
        );


    /* ARISTAS */

    paso.aristas
        .forEach(arista => {

            document
                .getElementById(arista)
                .classList.add(
                    "activa"
                );

        });


    /* CÁLCULOS */

    calculos.innerHTML =
        "";


    paso.calculos
        .forEach(
            (fila, indice) => {

                const div =
                    document.createElement(
                        "div"
                    );


                div.className =
                    "fila-calculo";


                if (
                    indice ===
                    paso.calculos.length - 1
                ) {

                    div.classList.add(
                        "destacado"
                    );

                }


                div.innerHTML = `

                    <span>
                        ${fila[0]}
                    </span>

                    <strong>
                        ${fila[1]}
                    </strong>

                `;


                calculos.appendChild(
                    div
                );

            }
        );


    /* OPEN */

    listaOpen.innerHTML =
        "";


    paso.open
        .forEach(
            (item, indice) => {

                const div =
                    document.createElement(
                        "div"
                    );


                div.className =
                    "open-item";


                if (indice === 0) {

                    div.classList.add(
                        "primero"
                    );

                }


                div.innerHTML = `

                    <span>
                        ${item[0]}
                    </span>

                    <span>
                        f = ${item[1]}
                    </span>

                `;


                listaOpen.appendChild(
                    div
                );

            }
        );


    /* FINAL */

    if (paso.final) {

        ["S","A","C","G"]
            .forEach(nodo => {

                document
                    .getElementById(
                        "nodo-" + nodo
                    )
                    .classList.add(
                        "final"
                    );

            });


        ["SA","AC","CG"]
            .forEach(arista => {

                const elemento =
                    document.getElementById(
                        arista
                    );


                elemento.classList.remove(
                    "activa"
                );

                elemento.classList.add(
                    "final"
                );

            });


        resultadoA.innerHTML = `

            Camino:
            <strong>
                S → A → C → G
            </strong>

            &nbsp; | &nbsp;

            Costo:
            <strong>
                6
            </strong>

        `;

    }

    else {

        resultadoA.innerHTML = `

            Camino:
            <strong>
                todavía no encontrado
            </strong>

        `;

    }


    anteriorA.disabled =
        pasoActualA === 0;


    siguienteA.disabled =
        pasoActualA ===
        pasosA.length - 1;


    progresoA.style.width =
        (
            pasoActualA /
            (pasosA.length - 1)
        ) * 100 + "%";

}


siguienteA.addEventListener(
    "click",
    () => {

        if (
            pasoActualA <
            pasosA.length - 1
        ) {

            pasoActualA++;

            mostrarPasoA();

        }

    }
);


anteriorA.addEventListener(
    "click",
    () => {

        if (
            pasoActualA > 0
        ) {

            pasoActualA--;

            mostrarPasoA();

        }

    }
);


reiniciarA.addEventListener(
    "click",
    () => {

        pasoActualA = 0;

        mostrarPasoA();

    }
);



/* ==========================================================
   MODO 2 — ROBOT / GRID
   ========================================================== */


/*
    FILAS = 8
    COLUMNAS = 10

    Inicio:
    (6, 1)

    Destino:
    (1, 8)
*/


const FILAS =
    8;

const COLUMNAS =
    10;


const inicioRobot =
    {
        fila: 6,
        columna: 1
    };


const destinoRobot =
    {
        fila: 1,
        columna: 8
    };


/* Obstáculos iniciales */

const obstaculosOriginales = [

    "1-3",
    "2-3",
    "3-3",
    "4-3",

    "3-5",
    "3-6",
    "3-7",

    "5-5",
    "6-5",

    "1-6",

    "5-8",
    "6-8"

];


let obstaculos =
    new Set(
        obstaculosOriginales
    );


const grid =
    document.getElementById("grid");

const buscarRuta =
    document.getElementById("buscarRuta");

const pasoRobot =
    document.getElementById("pasoRobot");

const limpiarBusqueda =
    document.getElementById("limpiarBusqueda");

const restablecerMapa =
    document.getElementById("restablecerMapa");

const estadoRobot =
    document.getElementById("estadoRobot");

const exploradosRobot =
    document.getElementById("exploradosRobot");

const longitudRobot =
    document.getElementById("longitudRobot");

const detalleCelda =
    document.getElementById("detalleCelda");

const mensajeRobot =
    document.getElementById("mensajeRobot");


/* Estado de ejecución */

let openRobot = [];

let cerradosRobot =
    new Set();

let padresRobot =
    {};

let costosGRobot =
    {};

let iniciadoRobot =
    false;

let terminadoRobot =
    false;

let encontradoRobot =
    false;

let actualRobot =
    null;

let intervaloRobot =
    null;


/* ------------------------------
   UTILIDADES
   ------------------------------ */

function clave(
    fila,
    columna
) {

    return `${fila}-${columna}`;

}


function desdeClave(
    texto
) {

    const partes =
        texto
            .split("-")
            .map(Number);


    return {

        fila:
            partes[0],

        columna:
            partes[1]

    };

}


function heuristica(
    fila,
    columna
) {

    return (

        Math.abs(
            fila -
            destinoRobot.fila
        )

        +

        Math.abs(
            columna -
            destinoRobot.columna
        )

    );

}


function esDestino(
    fila,
    columna
) {

    return (

        fila ===
        destinoRobot.fila

        &&

        columna ===
        destinoRobot.columna

    );

}


function esInicio(
    fila,
    columna
) {

    return (

        fila ===
        inicioRobot.fila

        &&

        columna ===
        inicioRobot.columna

    );

}


/* ------------------------------
   CREAR GRID
   ------------------------------ */

function crearGrid() {

    grid.innerHTML =
        "";


    for (
        let fila = 0;
        fila < FILAS;
        fila++
    ) {

        for (
            let columna = 0;
            columna < COLUMNAS;
            columna++
        ) {

            const celda =
                document.createElement(
                    "div"
                );


            celda.className =
                "celda";


            celda.dataset.fila =
                fila;

            celda.dataset.columna =
                columna;


            const k =
                clave(
                    fila,
                    columna
                );


            if (
                esInicio(
                    fila,
                    columna
                )
            ) {

                celda.classList.add(
                    "inicio"
                );

                celda.textContent =
                    "🤖";

            }

            else if (
                esDestino(
                    fila,
                    columna
                )
            ) {

                celda.classList.add(
                    "destino"
                );

                celda.textContent =
                    "📦";

            }

            else if (
                obstaculos.has(k)
            ) {

                celda.classList.add(
                    "obstaculo"
                );

                celda.textContent =
                    "🏢";

            }


            celda.addEventListener(
                "click",
                () => {

                    modificarObstaculo(
                        fila,
                        columna
                    );

                }
            );


            grid.appendChild(
                celda
            );

        }

    }

}


/* ------------------------------
   MODIFICAR OBSTÁCULOS
   ------------------------------ */

function modificarObstaculo(
    fila,
    columna
) {

    if (
        iniciadoRobot &&
        !terminadoRobot
    ) {

        return;

    }


    if (
        esInicio(
            fila,
            columna
        )

        ||

        esDestino(
            fila,
            columna
        )
    ) {

        return;

    }


    const k =
        clave(
            fila,
            columna
        );


    if (
        obstaculos.has(k)
    ) {

        obstaculos.delete(k);

    }

    else {

        obstaculos.add(k);

    }


    reiniciarBusquedaRobot();

    crearGrid();

}


/* ------------------------------
   OBTENER CELDA
   ------------------------------ */

function obtenerCelda(
    fila,
    columna
) {

    return document.querySelector(

        `.celda[data-fila="${fila}"][data-columna="${columna}"]`

    );

}


/* ------------------------------
   VECINOS
   ------------------------------ */

function obtenerVecinos(
    fila,
    columna
) {

    const movimientos = [

        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]

    ];


    const vecinos =
        [];


    movimientos.forEach(
        movimiento => {

            const nf =
                fila +
                movimiento[0];

            const nc =
                columna +
                movimiento[1];


            if (
                nf >= 0 &&
                nf < FILAS &&
                nc >= 0 &&
                nc < COLUMNAS
            ) {

                const k =
                    clave(
                        nf,
                        nc
                    );


                if (
                    !obstaculos.has(k)
                ) {

                    vecinos.push({

                        fila:
                            nf,

                        columna:
                            nc

                    });

                }

            }

        }
    );


    return vecinos;

}


/* ------------------------------
   INICIAR A*
   ------------------------------ */

function iniciarRobot() {

    reiniciarBusquedaRobot(
        false
    );


    const inicioKey =
        clave(
            inicioRobot.fila,
            inicioRobot.columna
        );


    costosGRobot[inicioKey] =
        0;


    openRobot.push({

        fila:
            inicioRobot.fila,

        columna:
            inicioRobot.columna,

        g:
            0,

        h:
            heuristica(
                inicioRobot.fila,
                inicioRobot.columna
            ),

        f:
            heuristica(
                inicioRobot.fila,
                inicioRobot.columna
            )

    });


    iniciadoRobot =
        true;


    estadoRobot.textContent =
        "BUSCANDO";


    mensajeRobot.classList.remove(
        "error"
    );


    mensajeRobot.innerHTML = `

        <span>🔎</span>

        <div>

            <strong>
                A* comenzó la búsqueda.
            </strong>

            <p>
                Observa cómo se exploran
                las celdas.
            </p>

        </div>

    `;

}


/* ------------------------------
   UN PASO DE A*
   ------------------------------ */

function ejecutarPasoRobot() {

    if (
        terminadoRobot
    ) {

        return;

    }


    if (
        !iniciadoRobot
    ) {

        iniciarRobot();

    }


    if (
        openRobot.length === 0
    ) {

        terminarSinRuta();

        return;

    }


    /*
        Ordenamos OPEN por f.
        Si existe empate, usamos h.
    */

    openRobot.sort(
        (a,b) => {

            if (
                a.f === b.f
            ) {

                return (
                    a.h - b.h
                );

            }

            return (
                a.f - b.f
            );

        }
    );


    const actual =
        openRobot.shift();


    actualRobot =
        actual;


    const actualKey =
        clave(
            actual.fila,
            actual.columna
        );


    /*
        Puede existir una entrada repetida
        en OPEN. Si ya fue cerrada,
        continuamos con el siguiente paso.
    */

    if (
        cerradosRobot.has(
            actualKey
        )
    ) {

        ejecutarPasoRobot();

        return;

    }


    cerradosRobot.add(
        actualKey
    );


    pintarExplorado(
        actual
    );


    exploradosRobot.textContent =
        cerradosRobot.size;


    detalleCelda.innerHTML = `

        <strong>
            Celda (${actual.fila}, ${actual.columna})
        </strong>

        <br><br>

        g(n) = ${actual.g}

        <br>

        h(n) = ${actual.h}

        <br>

        f(n) =
        ${actual.g}
        +
        ${actual.h}
        =
        <strong>${actual.f}</strong>

    `;


    /* ¿LLEGAMOS? */

    if (
        esDestino(
            actual.fila,
            actual.columna
        )
    ) {

        encontradoRobot =
            true;

        terminadoRobot =
            true;


        construirRuta(
            actualKey
        );


        return;

    }


    /* EXPANDIR VECINOS */

    const vecinos =
        obtenerVecinos(
            actual.fila,
            actual.columna
        );


    vecinos.forEach(
        vecino => {

            const vecinoKey =
                clave(
                    vecino.fila,
                    vecino.columna
                );


            if (
                cerradosRobot.has(
                    vecinoKey
                )
            ) {

                return;

            }


            const nuevoG =
                actual.g + 1;


            const gAnterior =
                costosGRobot[
                    vecinoKey
                ];


            if (
                gAnterior === undefined
                ||
                nuevoG < gAnterior
            ) {

                costosGRobot[
                    vecinoKey
                ] =
                    nuevoG;


                padresRobot[
                    vecinoKey
                ] =
                    actualKey;


                const h =
                    heuristica(
                        vecino.fila,
                        vecino.columna
                    );


                openRobot.push({

                    fila:
                        vecino.fila,

                    columna:
                        vecino.columna,

                    g:
                        nuevoG,

                    h:
                        h,

                    f:
                        nuevoG + h

                });

            }

        }
    );


    if (
        openRobot.length === 0
    ) {

        terminarSinRuta();

    }

}


/* ------------------------------
   PINTAR EXPLORADO
   ------------------------------ */

function pintarExplorado(
    nodo
) {

    const celda =
        obtenerCelda(
            nodo.fila,
            nodo.columna
        );


    document
        .querySelectorAll(
            ".celda.actual"
        )
        .forEach(
            elemento => {

                elemento.classList.remove(
                    "actual"
                );

            }
        );


    if (
        !esInicio(
            nodo.fila,
            nodo.columna
        )

        &&

        !esDestino(
            nodo.fila,
            nodo.columna
        )
    ) {

        celda.classList.add(
            "explorada"
        );

    }


    celda.classList.add(
        "actual"
    );

}


/* ------------------------------
   CONSTRUIR RUTA
   ------------------------------ */

function construirRuta(
    destinoKey
) {

    const ruta =
        [];


    let actual =
        destinoKey;


    while (
        actual !== undefined
    ) {

        ruta.push(
            actual
        );


        actual =
            padresRobot[
                actual
            ];

    }


    ruta.reverse();


    ruta.forEach(
        k => {

            const pos =
                desdeClave(k);


            const celda =
                obtenerCelda(
                    pos.fila,
                    pos.columna
                );


            celda.classList.remove(
                "explorada",
                "actual"
            );


            celda.classList.add(
                "ruta"
            );


            if (
                esInicio(
                    pos.fila,
                    pos.columna
                )
            ) {

                celda.textContent =
                    "🤖";

            }


            if (
                esDestino(
                    pos.fila,
                    pos.columna
                )
            ) {

                celda.textContent =
                    "📦";

            }

        }
    );


    longitudRobot.textContent =
        ruta.length - 1;


    estadoRobot.textContent =
        "RUTA ENCONTRADA";


    mensajeRobot.classList.remove(
        "error"
    );


    mensajeRobot.innerHTML = `

        <span>🎉</span>

        <div>

            <strong>
                ¡Entrega posible!
            </strong>

            <p>
                A* encontró una ruta de
                ${ruta.length - 1}
                movimientos después de explorar
                ${cerradosRobot.size}
                nodos.
            </p>

        </div>

    `;


    detenerAutomaticoRobot();

}


/* ------------------------------
   SIN RUTA
   ------------------------------ */

function terminarSinRuta() {

    terminadoRobot =
        true;


    estadoRobot.textContent =
        "SIN RUTA";


    longitudRobot.textContent =
        "-";


    mensajeRobot.classList.add(
        "error"
    );


    mensajeRobot.innerHTML = `

        <span>🚧</span>

        <div>

            <strong>
                No existe una ruta.
            </strong>

            <p>
                Los obstáculos bloquean completamente
                el acceso al destino.
                Modifica el mapa e inténtalo nuevamente.
            </p>

        </div>

    `;


    detenerAutomaticoRobot();

}


/* ------------------------------
   AUTOMÁTICO
   ------------------------------ */

function ejecutarAutomaticoRobot() {

    if (
        intervaloRobot !== null
    ) {

        detenerAutomaticoRobot();

        return;

    }


    if (
        terminadoRobot
    ) {

        reiniciarBusquedaRobot();

    }


    buscarRuta.textContent =
        "⏸ Pausar búsqueda";


    intervaloRobot =
        setInterval(
            () => {

                if (
                    terminadoRobot
                ) {

                    detenerAutomaticoRobot();

                }

                else {

                    ejecutarPasoRobot();

                }

            },
            180
        );

}


function detenerAutomaticoRobot() {

    if (
        intervaloRobot !== null
    ) {

        clearInterval(
            intervaloRobot
        );

        intervaloRobot =
            null;

    }


    buscarRuta.textContent =
        "▶ Buscar ruta con A*";

}


/* ------------------------------
   REINICIAR BÚSQUEDA
   ------------------------------ */

function reiniciarBusquedaRobot(
    reconstruir = true
) {

    detenerAutomaticoRobot();


    openRobot =
        [];

    cerradosRobot =
        new Set();

    padresRobot =
        {};

    costosGRobot =
        {};

    iniciadoRobot =
        false;

    terminadoRobot =
        false;

    encontradoRobot =
        false;

    actualRobot =
        null;


    estadoRobot.textContent =
        "LISTO";

    exploradosRobot.textContent =
        "0";

    longitudRobot.textContent =
        "-";


    detalleCelda.innerHTML = `

        Presiona
        <b>Avanzar un paso</b>
        o
        <b>Buscar ruta con A*</b>.

    `;


    mensajeRobot.classList.remove(
        "error"
    );


    mensajeRobot.innerHTML = `

        <span>🤖</span>

        <div>

            <strong>
                El robot está listo.
            </strong>

            <p>
                Puedes modificar los obstáculos
                antes de comenzar.
            </p>

        </div>

    `;


    if (
        reconstruir
    ) {

        crearGrid();

    }

}


/* ------------------------------
   RESTABLECER MAPA
   ------------------------------ */

function restablecerMapaRobot() {

    obstaculos =
        new Set(
            obstaculosOriginales
        );


    reiniciarBusquedaRobot();

}


/* ------------------------------
   EVENTOS ROBOT
   ------------------------------ */

pasoRobot.addEventListener(
    "click",
    ejecutarPasoRobot
);


buscarRuta.addEventListener(
    "click",
    ejecutarAutomaticoRobot
);


limpiarBusqueda.addEventListener(
    "click",
    () => {

        reiniciarBusquedaRobot();

    }
);


restablecerMapa.addEventListener(
    "click",
    restablecerMapaRobot
);



/* ==========================================================
   INICIALIZACIÓN
   ========================================================== */

mostrarPasoA();

crearGrid();

reiniciarBusquedaRobot();
