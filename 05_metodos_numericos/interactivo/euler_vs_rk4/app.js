/* =========================================================
   EULER VS. RUNGE-KUTTA 4
   Enfriamiento de Newton
   CC3074 — Modelización y Simulación
   ========================================================= */


/* =========================================================
   1. PARÁMETROS
   ========================================================= */

const T0 = 90;
const TA = 20;
const K = 0.1;
const H = 1;
const TIEMPO_FINAL = 10;


/* =========================================================
   2. MODELO DIFERENCIAL
   ========================================================= */

/*
    dT/dt = -k(T - Ta)
*/

function f(t, T) {

    return -K * (T - TA);

}


/* =========================================================
   3. SOLUCIÓN EXACTA
   ========================================================= */

function exacta(t) {

    return (
        TA
        +
        (T0 - TA)
        *
        Math.exp(-K * t)
    );

}


/* =========================================================
   4. UN PASO DE EULER
   ========================================================= */

function pasoEuler(t, T) {

    const pendiente =
        f(t, T);

    const nuevoT =
        T + H * pendiente;

    return {
        pendiente,
        nuevoT
    };

}


/* =========================================================
   5. UN PASO DE RK4
   ========================================================= */

/*
    Aquí definimos:

    k1 = f(tn, yn)

    k2 = f(
        tn + h/2,
        yn + h*k1/2
    )

    k3 = f(
        tn + h/2,
        yn + h*k2/2
    )

    k4 = f(
        tn + h,
        yn + h*k3
    )

    yn+1 =
        yn +
        h/6 *
        (k1 + 2k2 + 2k3 + k4)
*/

function pasoRK4(t, T) {

    const k1 =
        f(t, T);


    const t2 =
        t + H / 2;

    const T2 =
        T + H * k1 / 2;

    const k2 =
        f(t2, T2);


    const t3 =
        t + H / 2;

    const T3 =
        T + H * k2 / 2;

    const k3 =
        f(t3, T3);


    const t4 =
        t + H;

    const T4 =
        T + H * k3;

    const k4 =
        f(t4, T4);


    const promedio =
        (
            k1
            +
            2 * k2
            +
            2 * k3
            +
            k4
        )
        / 6;


    const nuevoT =
        T + H * promedio;


    return {

        k1,
        k2,
        k3,
        k4,

        t2,
        T2,

        t3,
        T3,

        t4,
        T4,

        promedio,
        nuevoT

    };

}


/* =========================================================
   6. CALCULAR TODA LA SIMULACIÓN
   ========================================================= */

const resultados = [];


let tActual = 0;

let eulerActual = T0;

let rk4Actual = T0;


resultados.push({

    n: 0,

    t: 0,

    exacta:
        exacta(0),

    euler:
        T0,

    rk4:
        T0,

    errorEuler:
        0,

    errorRK4:
        0,

    calculoRK4:
        pasoRK4(0, T0)

});


for (
    let n = 0;
    n < TIEMPO_FINAL;
    n++
) {

    const eulerPaso =
        pasoEuler(
            tActual,
            eulerActual
        );


    const rk4Paso =
        pasoRK4(
            tActual,
            rk4Actual
        );


    const nuevoTiempo =
        tActual + H;


    const exactaNueva =
        exacta(
            nuevoTiempo
        );


    eulerActual =
        eulerPaso.nuevoT;


    rk4Actual =
        rk4Paso.nuevoT;


    resultados.push({

        n:
            n + 1,

        t:
            nuevoTiempo,

        exacta:
            exactaNueva,

        euler:
            eulerActual,

        rk4:
            rk4Actual,

        errorEuler:
            Math.abs(
                exactaNueva -
                eulerActual
            ),

        errorRK4:
            Math.abs(
                exactaNueva -
                rk4Actual
            ),

        /*
            Guardamos el cálculo que
            produjo este nuevo estado.
        */

        calculoAnteriorRK4:
            rk4Paso,

        /*
            Y preparamos el cálculo
            del siguiente intervalo.
        */

        calculoRK4:
            nuevoTiempo < TIEMPO_FINAL
                ?
                pasoRK4(
                    nuevoTiempo,
                    rk4Actual
                )
                :
                null

    });


    tActual =
        nuevoTiempo;

}


/* =========================================================
   7. ESTADO DE INTERFAZ
   ========================================================= */

let indice = 0;

/*
    fase:

    0 = nada
    1 = k1
    2 = k2
    3 = k3
    4 = k4
    5 = promedio y resultado
*/

let fase = 0;

let intervalo = null;


/* =========================================================
   8. ELEMENTOS
   ========================================================= */

const tiempoActual =
    document.getElementById(
        "tiempoActual"
    );

const tempExacta =
    document.getElementById(
        "tempExacta"
    );

const tempEuler =
    document.getElementById(
        "tempEuler"
    );

const tempRK4 =
    document.getElementById(
        "tempRK4"
    );

const errorEuler =
    document.getElementById(
        "errorEuler"
    );

const errorRK4 =
    document.getElementById(
        "errorRK4"
    );

const interpretacion =
    document.getElementById(
        "interpretacion"
    );

const pasoRK4Texto =
    document.getElementById(
        "pasoRK4"
    );

const formulaK1 =
    document.getElementById(
        "formulaK1"
    );

const formulaK2 =
    document.getElementById(
        "formulaK2"
    );

const formulaK3 =
    document.getElementById(
        "formulaK3"
    );

const formulaK4 =
    document.getElementById(
        "formulaK4"
    );

const valorK1 =
    document.getElementById(
        "valorK1"
    );

const valorK2 =
    document.getElementById(
        "valorK2"
    );

const valorK3 =
    document.getElementById(
        "valorK3"
    );

const valorK4 =
    document.getElementById(
        "valorK4"
    );

const formulaPromedio =
    document.getElementById(
        "formulaPromedio"
    );

const resultadoRK4 =
    document.getElementById(
        "resultadoRK4"
    );

const cardK1 =
    document.getElementById(
        "cardK1"
    );

const cardK2 =
    document.getElementById(
        "cardK2"
    );

const cardK3 =
    document.getElementById(
        "cardK3"
    );

const cardK4 =
    document.getElementById(
        "cardK4"
    );

const promedioCard =
    document.querySelector(
        ".promedio-rk4"
    );

const faseAnterior =
    document.getElementById(
        "faseAnterior"
    );

const faseSiguiente =
    document.getElementById(
        "faseSiguiente"
    );

const faseTexto =
    document.getElementById(
        "faseTexto"
    );

const progresoFases =
    document.getElementById(
        "progresoFases"
    );

const anterior =
    document.getElementById(
        "anterior"
    );

const siguiente =
    document.getElementById(
        "siguiente"
    );

const automatico =
    document.getElementById(
        "automatico"
    );

const reiniciar =
    document.getElementById(
        "reiniciar"
    );

const progreso =
    document.getElementById(
        "progreso"
    );

const tablaResultados =
    document.getElementById(
        "tablaResultados"
    );

const cuadricula =
    document.getElementById(
        "cuadricula"
    );

const curvaExacta =
    document.getElementById(
        "curvaExacta"
    );

const lineaEuler =
    document.getElementById(
        "lineaEuler"
    );

const lineaRK4 =
    document.getElementById(
        "lineaRK4"
    );

const puntosEuler =
    document.getElementById(
        "puntosEuler"
    );

const puntosRK4 =
    document.getElementById(
        "puntosRK4"
    );


/* =========================================================
   9. ESTADO PRINCIPAL
   ========================================================= */

function actualizarEstado() {

    const r =
        resultados[indice];


    tiempoActual.textContent =
        `${r.t} min`;


    tempExacta.textContent =
        `${r.exacta.toFixed(4)} °C`;


    tempEuler.textContent =
        `${r.euler.toFixed(4)} °C`;


    tempRK4.textContent =
        `${r.rk4.toFixed(4)} °C`;


    errorEuler.textContent =
        `${r.errorEuler.toFixed(4)} °C`;


    errorRK4.textContent =
        `${r.errorRK4.toFixed(4)} °C`;


    if (indice === 0) {

        interpretacion.innerHTML = `

            <span>💡</span>

            <p>
                En t = 0 los tres valores coinciden:
                <strong>90 °C</strong>.
                Todavía no existe error numérico porque
                ambos métodos parten de la condición inicial.
            </p>

        `;

    }

    else {

        const mejor =
            r.errorRK4 <
            r.errorEuler;


        interpretacion.innerHTML = `

            <span>💡</span>

            <p>
                En t = ${r.t} min,
                Euler tiene un error de
                <strong>${r.errorEuler.toFixed(4)} °C</strong>
                y RK4 un error de
                <strong>${r.errorRK4.toFixed(4)} °C</strong>.

                ${
                    mejor
                    ?
                    "En este paso, RK4 se encuentra más cerca de la solución exacta."
                    :
                    "Compara ambos resultados con la referencia."
                }
            </p>

        `;

    }


    progreso.style.width =
        (
            indice /
            (resultados.length - 1)
        )
        *
        100
        +
        "%";


    anterior.disabled =
        indice === 0;


    siguiente.disabled =
        indice ===
        resultados.length - 1;


    fase = 0;

    actualizarFasesRK4();

    actualizarTabla();

    dibujarMetodos();

}


/* =========================================================
   10. FASES INTERNAS DE RK4
   ========================================================= */

function obtenerCalculoActual() {

    /*
        Si estamos en t < 10,
        mostramos cómo RK4 calcularía
        el siguiente estado.
    */

    if (
        indice <
        resultados.length - 1
    ) {

        return resultados[indice]
            .calculoRK4;

    }


    /*
        En el último estado mostramos
        el cálculo que produjo t = 10.
    */

    return resultados[indice]
        .calculoAnteriorRK4;

}


function actualizarFasesRK4() {

    const calculo =
        obtenerCalculoActual();


    const r =
        resultados[indice];


    const tiempoBase =

        indice <
        resultados.length - 1

        ? r.t

        : r.t - H;


    const temperaturaBase =

        indice <
        resultados.length - 1

        ? r.rk4

        : resultados[indice - 1].rk4;


    pasoRK4Texto.textContent =

        indice <
        resultados.length - 1

        ?
        `PASO ${indice} → ${indice + 1}`

        :
        `ÚLTIMO PASO ${indice - 1} → ${indice}`;


    /*
        Limpiamos estados visuales.
    */

    [
        cardK1,
        cardK2,
        cardK3,
        cardK4
    ].forEach(
        card => {

            card.classList.remove(
                "visible",
                "activo"
            );

        }
    );


    promedioCard.classList.remove(
        "visible"
    );


    /*
        Valores matemáticos.
    */

    formulaK1.innerHTML =

        `k₁ =
        f(${tiempoBase.toFixed(2)},
        ${temperaturaBase.toFixed(4)})`;


    valorK1.textContent =

        `k₁ = ${calculo.k1.toFixed(6)} °C/min`;


    formulaK2.innerHTML =

        `k₂ =
        f(${calculo.t2.toFixed(2)},
        ${calculo.T2.toFixed(4)})`;


    valorK2.textContent =

        `k₂ = ${calculo.k2.toFixed(6)} °C/min`;


    formulaK3.innerHTML =

        `k₃ =
        f(${calculo.t3.toFixed(2)},
        ${calculo.T3.toFixed(4)})`;


    valorK3.textContent =

        `k₃ = ${calculo.k3.toFixed(6)} °C/min`;


    formulaK4.innerHTML =

        `k₄ =
        f(${calculo.t4.toFixed(2)},
        ${calculo.T4.toFixed(4)})`;


    valorK4.textContent =

        `k₄ = ${calculo.k4.toFixed(6)} °C/min`;


    formulaPromedio.innerHTML =

        `(${calculo.k1.toFixed(4)}
        + 2(${calculo.k2.toFixed(4)})
        + 2(${calculo.k3.toFixed(4)})
        + ${calculo.k4.toFixed(4)})
        / 6`;


    resultadoRK4.textContent =

        `Pendiente combinada =
        ${calculo.promedio.toFixed(6)}
        °C/min`;


    /*
        Revelar según fase.
    */

    const cards = [
        cardK1,
        cardK2,
        cardK3,
        cardK4
    ];


    for (
        let i = 0;
        i < fase;
        i++
    ) {

        if (i < 4) {

            cards[i]
                .classList.add(
                    "visible"
                );

        }

    }


    if (
        fase >= 1 &&
        fase <= 4
    ) {

        cards[fase - 1]
            .classList.add(
                "activo"
            );

    }


    if (fase === 5) {

        promedioCard.classList.add(
            "visible"
        );

    }


    /*
        Texto del control.
    */

    const textos = [

        "Listo para calcular k₁",

        "k₁: pendiente al inicio",

        "k₂: primera estimación en la mitad",

        "k₃: segunda estimación en la mitad",

        "k₄: pendiente al final",

        "Combinar las cuatro pendientes"

    ];


    faseTexto.textContent =
        textos[fase];


    const textosBoton = [

        "Calcular k₁ →",

        "Calcular k₂ →",

        "Calcular k₃ →",

        "Calcular k₄ →",

        "Combinar pendientes →",

        "Cálculo completo ✓"

    ];


    faseSiguiente.textContent =
        textosBoton[fase];


    faseAnterior.disabled =
        fase === 0;


    faseSiguiente.disabled =
        fase === 5;


    progresoFases.style.width =
        (
            fase / 5
        )
        *
        100
        +
        "%";

}


/* =========================================================
   11. CONTROLES DE FASE
   ========================================================= */

faseSiguiente.addEventListener(
    "click",
    () => {

        if (fase < 5) {

            fase++;

            actualizarFasesRK4();

        }

    }
);


faseAnterior.addEventListener(
    "click",
    () => {

        if (fase > 0) {

            fase--;

            actualizarFasesRK4();

        }

    }
);


/* =========================================================
   12. TABLA
   ========================================================= */

function actualizarTabla() {

    tablaResultados.innerHTML =
        "";


    resultados
        .slice(
            0,
            indice + 1
        )
        .forEach(
            (r, i) => {

                const fila =
                    document.createElement(
                        "tr"
                    );


                if (i === indice) {

                    fila.classList.add(
                        "actual"
                    );

                }


                fila.innerHTML = `

                    <td>
                        ${r.t}
                    </td>

                    <td>
                        ${r.exacta.toFixed(4)}
                    </td>

                    <td>
                        ${r.euler.toFixed(4)}
                    </td>

                    <td>
                        ${r.errorEuler.toFixed(4)}
                    </td>

                    <td>
                        ${r.rk4.toFixed(4)}
                    </td>

                    <td>
                        ${r.errorRK4.toFixed(4)}
                    </td>

                `;


                tablaResultados
                    .appendChild(
                        fila
                    );

            }
        );

}


/* =========================================================
   13. GRÁFICA
   ========================================================= */

const X0 = 80;
const X1 = 900;

const Y0 = 35;
const Y1 = 380;

const TEMP_MIN = 20;
const TEMP_MAX = 100;


function convertirX(t) {

    return (
        X0
        +
        (t / TIEMPO_FINAL)
        *
        (X1 - X0)
    );

}


function convertirY(T) {

    return (
        Y1
        -
        (
            (T - TEMP_MIN)
            /
            (TEMP_MAX - TEMP_MIN)
        )
        *
        (Y1 - Y0)
    );

}


/* =========================================================
   14. CUADRÍCULA
   ========================================================= */

function crearCuadricula() {

    cuadricula.innerHTML = "";


    for (
        let t = 0;
        t <= TIEMPO_FINAL;
        t++
    ) {

        const x =
            convertirX(t);


        const linea =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "line"
            );


        linea.setAttribute(
            "x1", x
        );

        linea.setAttribute(
            "x2", x
        );

        linea.setAttribute(
            "y1", Y0
        );

        linea.setAttribute(
            "y2", Y1
        );

        linea.setAttribute(
            "class",
            "grid-line"
        );


        cuadricula.appendChild(
            linea
        );


        const texto =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "text"
            );


        texto.setAttribute(
            "x", x
        );

        texto.setAttribute(
            "y", 402
        );

        texto.setAttribute(
            "text-anchor",
            "middle"
        );

        texto.setAttribute(
            "class",
            "label-grid"
        );


        texto.textContent = t;


        cuadricula.appendChild(
            texto
        );

    }


    for (
        let T = 20;
        T <= 100;
        T += 20
    ) {

        const y =
            convertirY(T);


        const linea =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "line"
            );


        linea.setAttribute(
            "x1", X0
        );

        linea.setAttribute(
            "x2", X1
        );

        linea.setAttribute(
            "y1", y
        );

        linea.setAttribute(
            "y2", y
        );

        linea.setAttribute(
            "class",
            "grid-line"
        );


        cuadricula.appendChild(
            linea
        );


        const texto =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "text"
            );


        texto.setAttribute(
            "x", 60
        );

        texto.setAttribute(
            "y", y + 4
        );

        texto.setAttribute(
            "text-anchor",
            "end"
        );

        texto.setAttribute(
            "class",
            "label-grid"
        );


        texto.textContent = T;


        cuadricula.appendChild(
            texto
        );

    }

}


/* =========================================================
   15. CURVA EXACTA
   ========================================================= */

function dibujarExacta() {

    let path = "";


    const muestras = 200;


    for (
        let i = 0;
        i <= muestras;
        i++
    ) {

        const t =
            (
                i /
                muestras
            )
            *
            TIEMPO_FINAL;


        const T =
            exacta(t);


        const x =
            convertirX(t);


        const y =
            convertirY(T);


        if (i === 0) {

            path +=
                `M ${x} ${y}`;

        }

        else {

            path +=
                ` L ${x} ${y}`;

        }

    }


    curvaExacta.setAttribute(
        "d",
        path
    );

}


/* =========================================================
   16. DIBUJAR MÉTODOS
   ========================================================= */

function dibujarMetodos() {

    const visibles =
        resultados.slice(
            0,
            indice + 1
        );


    const puntosEulerTexto =
        visibles.map(
            r =>
                `${convertirX(r.t)},${convertirY(r.euler)}`
        );


    const puntosRK4Texto =
        visibles.map(
            r =>
                `${convertirX(r.t)},${convertirY(r.rk4)}`
        );


    lineaEuler.setAttribute(
        "points",
        puntosEulerTexto.join(" ")
    );


    lineaRK4.setAttribute(
        "points",
        puntosRK4Texto.join(" ")
    );


    puntosEuler.innerHTML = "";

    puntosRK4.innerHTML = "";


    visibles.forEach(
        r => {

            const puntoE =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "circle"
                );


            puntoE.setAttribute(
                "cx",
                convertirX(r.t)
            );

            puntoE.setAttribute(
                "cy",
                convertirY(r.euler)
            );

            puntoE.setAttribute(
                "r",
                5
            );

            puntoE.setAttribute(
                "class",
                "punto-euler"
            );


            puntosEuler.appendChild(
                puntoE
            );


            const puntoR =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "circle"
                );


            puntoR.setAttribute(
                "cx",
                convertirX(r.t)
            );

            puntoR.setAttribute(
                "cy",
                convertirY(r.rk4)
            );

            puntoR.setAttribute(
                "r",
                5
            );

            puntoR.setAttribute(
                "class",
                "punto-rk4"
            );


            puntosRK4.appendChild(
                puntoR
            );

        }
    );

}


/* =========================================================
   17. CONTROLES PRINCIPALES
   ========================================================= */

siguiente.addEventListener(
    "click",
    () => {

        if (
            indice <
            resultados.length - 1
        ) {

            indice++;

            actualizarEstado();

        }

    }
);


anterior.addEventListener(
    "click",
    () => {

        if (indice > 0) {

            indice--;

            actualizarEstado();

        }

    }
);


reiniciar.addEventListener(
    "click",
    () => {

        detenerAutomatico();

        indice = 0;

        fase = 0;

        actualizarEstado();

    }
);


automatico.addEventListener(
    "click",
    () => {

        if (intervalo !== null) {

            detenerAutomatico();

            return;

        }


        if (
            indice ===
            resultados.length - 1
        ) {

            indice = 0;

            actualizarEstado();

        }


        automatico.textContent =
            "⏸ Pausar";


        intervalo =
            setInterval(
                () => {

                    if (
                        indice <
                        resultados.length - 1
                    ) {

                        indice++;

                        actualizarEstado();

                    }

                    else {

                        detenerAutomatico();

                    }

                },
                1100
            );

    }
);


function detenerAutomatico() {

    if (intervalo !== null) {

        clearInterval(
            intervalo
        );

        intervalo = null;

    }


    automatico.textContent =
        "▶ Automático";

}


/* =========================================================
   18. INICIALIZACIÓN
   ========================================================= */

crearCuadricula();

dibujarExacta();

actualizarEstado();
