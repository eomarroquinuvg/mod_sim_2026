/* =====================================================
   HILL CLIMBING — LABORATORIO INTERACTIVO
   CC3074 Modelización y Simulación
   ===================================================== */


/* -----------------------------
   CONFIGURACIÓN DE LOS NIVELES
   ----------------------------- */

const niveles = {

    1: {
        nombre: "Dron de rescate",

        descripcion:
            "Encuentra el punto de mayor altitud.",

        valores: [
            0, 7, 12, 15, 16, 15, 12, 7, 0
        ],

        inicio: 1,

        global: 4,

        tipo: "global"
    },


    2: {
        nombre: "Terreno con máximo local",

        descripcion:
            "¿Encontrará Hill Climbing la montaña más alta?",

        /*
        Aquí existen dos montañas.

        El algoritmo comienza cerca
        de la montaña pequeña.
        */

        valores: [
            2, 7, 12, 15, 11, 8, 13, 18, 21
        ],

        inicio: 1,

        global: 8,

        tipo: "local"
    }

};


let nivelActual = 1;
let posicion = 1;
let historial = [];
let movimientos = 0;
let temporizador = null;


/* -----------------------------
   ELEMENTOS HTML
   ----------------------------- */

const formaMontana =
    document.getElementById("formaMontana");

const lineaTerreno =
    document.getElementById("lineaTerreno");

const puntos =
    document.getElementById("puntos");

const dron =
    document.getElementById("dron");

const senal =
    document.getElementById("senal");

const posicionActual =
    document.getElementById("posicionActual");

const valorActual =
    document.getElementById("valorActual");

const movimientosTexto =
    document.getElementById("movimientos");

const paso =
    document.getElementById("paso");

const tituloPaso =
    document.getElementById("tituloPaso");

const descripcionPaso =
    document.getElementById("descripcionPaso");

const actualFormula =
    document.getElementById("actualFormula");

const calculoActual =
    document.getElementById("calculoActual");

const valorIzquierda =
    document.getElementById("valorIzquierda");

const funcionIzquierda =
    document.getElementById("funcionIzquierda");

const valorDerecha =
    document.getElementById("valorDerecha");

const funcionDerecha =
    document.getElementById("funcionDerecha");

const vecinoIzquierda =
    document.getElementById("vecinoIzquierda");

const vecinoDerecha =
    document.getElementById("vecinoDerecha");

const decisionTexto =
    document.getElementById("decisionTexto");

const estadoAlgoritmo =
    document.getElementById("estadoAlgoritmo");

const anterior =
    document.getElementById("anterior");

const siguiente =
    document.getElementById("siguiente");

const automatico =
    document.getElementById("automatico");

const reiniciar =
    document.getElementById("reiniciar");

const nivel1 =
    document.getElementById("nivel1");

const nivel2 =
    document.getElementById("nivel2");

const tituloMision =
    document.getElementById("tituloMision");

const subtituloMision =
    document.getElementById("subtituloMision");

const lineaFuncion =
    document.getElementById("lineaFuncion");

const puntosGrafica =
    document.getElementById("puntosGrafica");

const puntoActualGrafica =
    document.getElementById("puntoActualGrafica");

const resultado =
    document.getElementById("resultado");

const resultadoEtiqueta =
    document.getElementById("resultadoEtiqueta");

const resultadoTitulo =
    document.getElementById("resultadoTitulo");

const resultadoTexto =
    document.getElementById("resultadoTexto");


/* -----------------------------
   COORDENADAS
   ----------------------------- */

function coordenadasTerreno() {

    const valores =
        niveles[nivelActual].valores;

    const maximo =
        Math.max(...valores);

    return valores.map((valor, i) => {

        const x =
            80 + i * 90;

        const y =
            410 - (valor / maximo) * 280;

        return {
            x,
            y,
            valor
        };

    });

}


function coordenadasGrafica() {

    const valores =
        niveles[nivelActual].valores;

    const maximo =
        Math.max(...valores);

    return valores.map((valor, i) => {

        const x =
            90 + i * 90;

        const y =
            285 - (valor / maximo) * 220;

        return {
            x,
            y,
            valor
        };

    });

}


/* -----------------------------
   DIBUJAR MONTAÑA
   ----------------------------- */

function dibujarMontana() {

    const coords =
        coordenadasTerreno();


    const linea =
        coords
            .map(p => `${p.x},${p.y}`)
            .join(" ");


    lineaTerreno.setAttribute(
        "points",
        linea
    );


    const inicio =
        `M ${coords[0].x} 440`;

    const terreno =
        coords
            .map(p => `L ${p.x} ${p.y}`)
            .join(" ");

    const final =
        `L ${coords[coords.length - 1].x} 440 Z`;


    formaMontana.setAttribute(
        "d",
        `${inicio} ${terreno} ${final}`
    );


    puntos.innerHTML = "";


    coords.forEach((p, i) => {

        const grupo =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "g"
            );


        const circulo =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );

        circulo.setAttribute("cx", p.x);
        circulo.setAttribute("cy", p.y);
        circulo.setAttribute("r", 8);

        circulo.setAttribute(
            "class",
            i === posicion
                ? "punto-terreno actual"
                : "punto-terreno"
        );


        const texto =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "text"
            );

        texto.setAttribute("x", p.x);
        texto.setAttribute("y", 455);

        texto.setAttribute(
            "class",
            "numero-x"
        );

        texto.textContent = `x=${i}`;


        grupo.appendChild(circulo);
        grupo.appendChild(texto);

        puntos.appendChild(grupo);

    });


    moverDron();

}


/* -----------------------------
   MOVER DRON
   ----------------------------- */

function moverDron() {

    const coords =
        coordenadasTerreno();

    const p =
        coords[posicion];


    dron.setAttribute(
        "transform",
        `translate(${p.x}, ${p.y - 42})`
    );


    const global =
        niveles[nivelActual].global;

    const puntoGlobal =
        coords[global];


    senal.setAttribute(
        "transform",
        `translate(${puntoGlobal.x}, ${puntoGlobal.y - 65})`
    );

}


/* -----------------------------
   DIBUJAR GRÁFICA
   ----------------------------- */

function dibujarGrafica() {

    const coords =
        coordenadasGrafica();


    lineaFuncion.setAttribute(
        "points",
        coords
            .map(p => `${p.x},${p.y}`)
            .join(" ")
    );


    puntosGrafica.innerHTML = "";


    coords.forEach((p, i) => {

        const circulo =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );

        circulo.setAttribute("cx", p.x);
        circulo.setAttribute("cy", p.y);
        circulo.setAttribute("r", 7);

        circulo.setAttribute(
            "class",
            "punto-grafica"
        );


        const texto =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "text"
            );

        texto.setAttribute("x", p.x);
        texto.setAttribute("y", 320);

        texto.setAttribute(
            "class",
            "numero-grafica"
        );

        texto.textContent = i;


        puntosGrafica.appendChild(circulo);
        puntosGrafica.appendChild(texto);

    });


    actualizarPuntoGrafica();

}


/* -----------------------------
   PUNTO ACTUAL EN GRÁFICA
   ----------------------------- */

function actualizarPuntoGrafica() {

    const coords =
        coordenadasGrafica();

    const p =
        coords[posicion];


    puntoActualGrafica.setAttribute(
        "cx",
        p.x
    );

    puntoActualGrafica.setAttribute(
        "cy",
        p.y
    );

}


/* -----------------------------
   OBTENER MEJOR VECINO
   ----------------------------- */

function obtenerMejorVecino() {

    const valores =
        niveles[nivelActual].valores;

    const actual =
        valores[posicion];


    let mejorPosicion =
        posicion;

    let mejorValor =
        actual;


    if (
        posicion > 0 &&
        valores[posicion - 1] > mejorValor
    ) {

        mejorPosicion =
            posicion - 1;

        mejorValor =
            valores[posicion - 1];

    }


    if (
        posicion < valores.length - 1 &&
        valores[posicion + 1] > mejorValor
    ) {

        mejorPosicion =
            posicion + 1;

        mejorValor =
            valores[posicion + 1];

    }


    return mejorPosicion;

}


/* -----------------------------
   ACTUALIZAR PANEL
   ----------------------------- */

function actualizarPanel() {

    const nivel =
        niveles[nivelActual];

    const valores =
        nivel.valores;

    const actual =
        valores[posicion];


    posicionActual.textContent =
        `x = ${posicion}`;

    valorActual.textContent =
        `f(x) = ${actual}`;

    movimientosTexto.textContent =
        movimientos;


    paso.textContent =
        `PASO ${movimientos}`;


    actualFormula.textContent =
        `x = ${posicion}`;


    if (nivelActual === 1) {

        calculoActual.textContent =
            `f(${posicion}) = -(${posicion} - 4)² + 16 = ${actual}`;

    } else {

        calculoActual.textContent =
            `Evaluación de x=${posicion}: ${actual}`;

    }


    /* IZQUIERDA */

    if (posicion > 0) {

        const izquierda =
            valores[posicion - 1];

        valorIzquierda.textContent =
            `x = ${posicion - 1}`;

        funcionIzquierda.textContent =
            `f(${posicion - 1}) = ${izquierda}`;

        vecinoIzquierda.classList.remove(
            "no-disponible"
        );

    } else {

        valorIzquierda.textContent =
            "No existe";

        funcionIzquierda.textContent =
            "";

        vecinoIzquierda.classList.add(
            "no-disponible"
        );

    }


    /* DERECHA */

    if (posicion < valores.length - 1) {

        const derecha =
            valores[posicion + 1];

        valorDerecha.textContent =
            `x = ${posicion + 1}`;

        funcionDerecha.textContent =
            `f(${posicion + 1}) = ${derecha}`;

        vecinoDerecha.classList.remove(
            "no-disponible"
        );

    } else {

        valorDerecha.textContent =
            "No existe";

        funcionDerecha.textContent =
            "";

        vecinoDerecha.classList.add(
            "no-disponible"
        );

    }


    vecinoIzquierda.classList.remove(
        "mejor"
    );

    vecinoDerecha.classList.remove(
        "mejor"
    );


    const mejor =
        obtenerMejorVecino();


    /* ¿HAY MEJORA? */

    if (mejor === posicion) {

        tituloPaso.textContent =
            "No existe un vecino mejor";

        descripcionPaso.textContent =
            "Hill Climbing compara los vecinos y ninguno supera la evaluación actual.";

        decisionTexto.textContent =
            "Como ningún vecino mejora la solución actual, el algoritmo se detiene.";

        estadoAlgoritmo.textContent =
            "DETENIDO";

        siguiente.disabled =
            true;

        mostrarResultado();

    } else {

        tituloPaso.textContent =
            "Evaluamos los vecinos";

        descripcionPaso.textContent =
            "Hill Climbing observa únicamente las posiciones inmediatamente vecinas.";


        if (mejor < posicion) {

            vecinoIzquierda.classList.add(
                "mejor"
            );

            decisionTexto.textContent =
                `La izquierda tiene una mejor evaluación. Hill Climbing se moverá hacia x = ${mejor}.`;

        } else {

            vecinoDerecha.classList.add(
                "mejor"
            );

            decisionTexto.textContent =
                `La derecha tiene una mejor evaluación. Hill Climbing se moverá hacia x = ${mejor}.`;

        }


        estadoAlgoritmo.textContent =
            "BUSCANDO";

        siguiente.disabled =
            false;

        resultado.classList.add(
            "oculto"
        );

    }


    anterior.disabled =
        historial.length === 0;


    dibujarMontana();
    actualizarPuntoGrafica();

}


/* -----------------------------
   MOVER
   ----------------------------- */

function mover() {

    const mejor =
        obtenerMejorVecino();


    if (mejor === posicion) {
        actualizarPanel();
        return;
    }


    historial.push(posicion);

    posicion =
        mejor;

    movimientos++;


    actualizarPanel();

}


/* -----------------------------
   ANTERIOR
   ----------------------------- */

function retroceder() {

    if (historial.length === 0) {
        return;
    }


    posicion =
        historial.pop();

    movimientos =
        Math.max(0, movimientos - 1);


    resultado.classList.add(
        "oculto"
    );


    actualizarPanel();

}


/* -----------------------------
   RESULTADO
   ----------------------------- */

function mostrarResultado() {

    const nivel =
        niveles[nivelActual];

    const valores =
        nivel.valores;

    const valor =
        valores[posicion];

    const valorGlobal =
        valores[nivel.global];


    resultado.classList.remove(
        "oculto",
        "alerta"
    );


    if (posicion === nivel.global) {

        resultadoEtiqueta.textContent =
            "MISIÓN COMPLETADA";

        resultadoTitulo.textContent =
            "Hill Climbing encontró el máximo.";

        resultadoTexto.textContent =
            `El algoritmo terminó en x=${posicion} con una evaluación de ${valor}.`;

    } else {

        resultado.classList.add(
            "alerta"
        );

        resultadoEtiqueta.textContent =
            "MÁXIMO LOCAL";

        resultadoTitulo.textContent =
            "¡El dron cree que llegó a la mejor cima!";

        resultadoTexto.textContent =
            `Hill Climbing se detuvo en x=${posicion} con valor ${valor}, pero existe un máximo global en x=${nivel.global} con valor ${valorGlobal}.`;

    }

}


/* -----------------------------
   REINICIAR
   ----------------------------- */

function reiniciarSimulacion() {

    detenerAutomatico();

    posicion =
        niveles[nivelActual].inicio;

    historial = [];

    movimientos = 0;

    resultado.classList.add(
        "oculto"
    );


    dibujarMontana();
    dibujarGrafica();
    actualizarPanel();

}


/* -----------------------------
   AUTOMÁTICO
   ----------------------------- */

function ejecutarAutomatico() {

    if (temporizador !== null) {

        detenerAutomatico();
        return;

    }


    automatico.textContent =
        "⏸ Pausar";


    temporizador =
        setInterval(() => {

            const mejor =
                obtenerMejorVecino();


            if (mejor === posicion) {

                detenerAutomatico();
                actualizarPanel();

            } else {

                mover();

            }

        }, 1000);

}


function detenerAutomatico() {

    if (temporizador !== null) {

        clearInterval(
            temporizador
        );

        temporizador = null;

    }


    automatico.textContent =
        "▶ Automático";

}


/* -----------------------------
   CAMBIAR NIVEL
   ----------------------------- */

function cambiarNivel(numero) {

    nivelActual =
        numero;


    nivel1.classList.toggle(
        "activo",
        numero === 1
    );

    nivel2.classList.toggle(
        "activo",
        numero === 2
    );


    tituloMision.textContent =
        niveles[numero].nombre;

    subtituloMision.textContent =
        niveles[numero].descripcion;


    reiniciarSimulacion();

}


/* -----------------------------
   EVENTOS
   ----------------------------- */

siguiente.addEventListener(
    "click",
    mover
);


anterior.addEventListener(
    "click",
    retroceder
);


reiniciar.addEventListener(
    "click",
    reiniciarSimulacion
);


automatico.addEventListener(
    "click",
    ejecutarAutomatico
);


nivel1.addEventListener(
    "click",
    () => cambiarNivel(1)
);


nivel2.addEventListener(
    "click",
    () => cambiarNivel(2)
);


/* -----------------------------
   INICIAR
   ----------------------------- */

cambiarNivel(1);
