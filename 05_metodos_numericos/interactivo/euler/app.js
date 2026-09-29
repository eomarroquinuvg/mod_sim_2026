/* =========================================================
   MÉTODO DE EULER
   Enfriamiento de Newton
   CC3074 — Modelización y Simulación
   ========================================================= */


/* =========================================================
   PARÁMETROS DEL MODELO
   ========================================================= */

/*
    Ecuación diferencial:

        dT/dt = -k(T - Ta)

    T  = temperatura del objeto
    Ta = temperatura ambiente
    k  = constante de enfriamiento
*/


const TEMPERATURA_INICIAL = 90;

const TEMPERATURA_AMBIENTE = 20;

const K = 0.1;

const H = 1;

const TIEMPO_FINAL = 10;


/* =========================================================
   FUNCIÓN DEL MODELO
   ========================================================= */

function f(t, T) {

    return -K *
        (
            T -
            TEMPERATURA_AMBIENTE
        );

}


/* =========================================================
   SOLUCIÓN EXACTA
   ========================================================= */

/*
    Para el enfriamiento de Newton:

    T(t) =
        Ta +
        (T0 - Ta)e^(-kt)
*/


function solucionExacta(t) {

    return (

        TEMPERATURA_AMBIENTE

        +

        (
            TEMPERATURA_INICIAL -
            TEMPERATURA_AMBIENTE
        )

        *

        Math.exp(
            -K * t
        )

    );

}


/* =========================================================
   CALCULAR TODOS LOS PASOS DE EULER
   ========================================================= */

const pasos = [];


let t = 0;

let T = TEMPERATURA_INICIAL;


for (
    let n = 0;
    n < TIEMPO_FINAL;
    n++
) {

    const pendiente =
        f(t, T);


    const siguienteT =
        T +
        H * pendiente;


    pasos.push({

        n: n,

        t: t,

        T: T,

        pendiente:
            pendiente,

        siguienteT:
            siguienteT

    });


    T =
        siguienteT;


    t =
        t + H;

}


/*
    Agregamos estado final.
*/

const estados = [

    {
        n: 0,
        t: 0,
        T: TEMPERATURA_INICIAL
    }

];


pasos.forEach(
    paso => {

        estados.push({

            n:
                paso.n + 1,

            t:
                paso.t + H,

            T:
                paso.siguienteT

        });

    }
);


/* =========================================================
   ESTADO DE LA INTERFAZ
   ========================================================= */

let indice =
    0;


let intervalo =
    null;


/* =========================================================
   ELEMENTOS HTML
   ========================================================= */

const temperaturaVisual =
    document.getElementById(
        "temperaturaVisual"
    );

const nivelTemperatura =
    document.getElementById(
        "nivelTemperatura"
    );

const tiempoVisual =
    document.getElementById(
        "tiempoVisual"
    );

const estadoPaso =
    document.getElementById(
        "estadoPaso"
    );

const valorT =
    document.getElementById(
        "valorT"
    );

const valorY =
    document.getElementById(
        "valorY"
    );

const calculoPendiente =
    document.getElementById(
        "calculoPendiente"
    );

const resultadoPendiente =
    document.getElementById(
        "resultadoPendiente"
    );

const interpretacionPendiente =
    document.getElementById(
        "interpretacionPendiente"
    );

const calculoEuler =
    document.getElementById(
        "calculoEuler"
    );

const resultadoEuler =
    document.getElementById(
        "resultadoEuler"
    );

const nuevoEstado =
    document.getElementById(
        "nuevoEstado"
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

const tablaEuler =
    document.getElementById(
        "tablaEuler"
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

const puntosEuler =
    document.getElementById(
        "puntosEuler"
    );


/* =========================================================
   ESCALA DE LA GRÁFICA
   ========================================================= */

const GRAF_X_INICIO = 80;

const GRAF_X_FIN = 850;

const GRAF_Y_ARRIBA = 35;

const GRAF_Y_ABAJO = 360;

const TEMP_MIN = 20;

const TEMP_MAX = 100;


function convertirX(tiempo) {

    return (

        GRAF_X_INICIO

        +

        (
            tiempo /
            TIEMPO_FINAL
        )

        *

        (
            GRAF_X_FIN -
            GRAF_X_INICIO
        )

    );

}


function convertirY(temp) {

    const proporcion =

        (
            temp -
            TEMP_MIN
        )

        /

        (
            TEMP_MAX -
            TEMP_MIN
        );


    return (

        GRAF_Y_ABAJO

        -

        proporcion

        *

        (
            GRAF_Y_ABAJO -
            GRAF_Y_ARRIBA
        )

    );

}


/* =========================================================
   CREAR CUADRÍCULA
   ========================================================= */

function crearCuadricula() {

    cuadricula.innerHTML =
        "";


    /*
        Líneas verticales:
        tiempo 0 a 10
    */

    for (
        let tiempo = 0;
        tiempo <= TIEMPO_FINAL;
        tiempo += 1
    ) {

        const x =
            convertirX(tiempo);


        const linea =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "line"
            );


        linea.setAttribute(
            "x1",
            x
        );

        linea.setAttribute(
            "x2",
            x
        );

        linea.setAttribute(
            "y1",
            GRAF_Y_ARRIBA
        );

        linea.setAttribute(
            "y2",
            GRAF_Y_ABAJO
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
            "x",
            x
        );

        texto.setAttribute(
            "y",
            382
        );

        texto.setAttribute(
            "text-anchor",
            "middle"
        );

        texto.setAttribute(
            "class",
            "label-grid"
        );


        texto.textContent =
            tiempo;


        cuadricula.appendChild(
            texto
        );

    }


    /*
        Líneas horizontales:
        20, 40, 60, 80, 100 °C
    */

    for (
        let temp = 20;
        temp <= 100;
        temp += 20
    ) {

        const y =
            convertirY(temp);


        const linea =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "line"
            );


        linea.setAttribute(
            "x1",
            GRAF_X_INICIO
        );

        linea.setAttribute(
            "x2",
            GRAF_X_FIN
        );

        linea.setAttribute(
            "y1",
            y
        );

        linea.setAttribute(
            "y2",
            y
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
            "x",
            60
        );

        texto.setAttribute(
            "y",
            y + 4
        );

        texto.setAttribute(
            "text-anchor",
            "end"
        );

        texto.setAttribute(
            "class",
            "label-grid"
        );


        texto.textContent =
            temp;


        cuadricula.appendChild(
            texto
        );

    }

}


/* =========================================================
   DIBUJAR SOLUCIÓN EXACTA
   ========================================================= */

function dibujarExacta() {

    let path =
        "";


    const muestras =
        150;


    for (
        let i = 0;
        i <= muestras;
        i++
    ) {

        const tiempo =
            (
                i /
                muestras
            )
            *
            TIEMPO_FINAL;


        const temperatura =
            solucionExacta(
                tiempo
            );


        const x =
            convertirX(
                tiempo
            );


        const y =
            convertirY(
                temperatura
            );


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
   DIBUJAR EULER
   ========================================================= */

function dibujarEuler() {

    const visibles =
        estados.slice(
            0,
            indice + 1
        );


    const coordenadas =
        visibles.map(
            estado => {

                return (
                    convertirX(
                        estado.t
                    )
                    +
                    ","
                    +
                    convertirY(
                        estado.T
                    )
                );

            }
        );


    lineaEuler.setAttribute(
        "points",
        coordenadas.join(" ")
    );


    puntosEuler.innerHTML =
        "";


    visibles.forEach(
        (estado, posicion) => {

            const circulo =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "circle"
                );


            circulo.setAttribute(
                "cx",
                convertirX(
                    estado.t
                )
            );

            circulo.setAttribute(
                "cy",
                convertirY(
                    estado.T
                )
            );

            circulo.setAttribute(
                "r",
                posicion ===
                visibles.length - 1
                    ? 8
                    : 6
            );


            circulo.setAttribute(
                "class",
                posicion ===
                visibles.length - 1
                    ? "punto-actual"
                    : "punto-euler"
            );


            puntosEuler.appendChild(
                circulo
            );

        }
    );

}


/* =========================================================
   ACTUALIZAR TERMÓMETRO
   ========================================================= */

function actualizarTermometro(
    temperatura
) {

    temperaturaVisual.textContent =
        temperatura.toFixed(2);


    const porcentaje =

        (
            temperatura /
            100
        )
        *
        100;


    nivelTemperatura.style.height =
        Math.max(
            0,
            Math.min(
                100,
                porcentaje
            )
        )
        +
        "%";

}


/* =========================================================
   ACTUALIZAR CÁLCULO
   ========================================================= */

function actualizarCalculo() {

    /*
        Si estamos en el último estado,
        mostramos el último cálculo realizado.
    */

    const indicePaso =

        Math.min(
            indice,
            pasos.length - 1
        );


    const paso =
        pasos[indicePaso];


    const estado =
        estados[indice];


    estadoPaso.textContent =
        `PASO ${indice} DE ${estados.length - 1}`;


    valorT.textContent =
        estado.t.toFixed(0);


    valorY.textContent =
        estado.T.toFixed(2)
        +
        " °C";


    /*
        Cuando estamos mostrando el estado n,
        explicamos el cálculo que produce n+1.

        En el estado final explicamos
        el último cálculo ejecutado.
    */

    if (
        indice <
        pasos.length
    ) {

        const actual =
            pasos[indice];


        calculoPendiente.innerHTML =

            `f(t<sub>${actual.n}</sub>,T<sub>${actual.n}</sub>)
            =
            -${K}(${actual.T.toFixed(2)} - ${TEMPERATURA_AMBIENTE})`;


        resultadoPendiente.textContent =

            `= ${actual.pendiente.toFixed(2)} °C/min`;


        calculoEuler.innerHTML =

            `T<sub>${actual.n + 1}</sub>
            =
            ${actual.T.toFixed(2)}
            +
            ${H}(${actual.pendiente.toFixed(2)})`;


        resultadoEuler.innerHTML =

            `T<sub>${actual.n + 1}</sub>
            =
            ${actual.siguienteT.toFixed(2)} °C`;


        nuevoEstado.innerHTML =

            `Después de avanzar ${H} minuto,
            Euler estima una temperatura
            de <strong>${actual.siguienteT.toFixed(2)} °C</strong>.`;


        if (
            actual.pendiente < 0
        ) {

            interpretacionPendiente.textContent =

                `La pendiente es negativa (${actual.pendiente.toFixed(2)} °C/min), por lo que el objeto se está enfriando.`;

        }

        else if (
            actual.pendiente > 0
        ) {

            interpretacionPendiente.textContent =

                "La pendiente es positiva, por lo que la temperatura está aumentando.";

        }

        else {

            interpretacionPendiente.textContent =

                "La pendiente es cero. La temperatura ya no está cambiando.";

        }

    }

    else {

        const ultimo =
            pasos[
                pasos.length - 1
            ];


        calculoPendiente.innerHTML =

            `Última pendiente utilizada:
            ${ultimo.pendiente.toFixed(2)} °C/min`;


        resultadoPendiente.textContent =

            "La simulación llegó al tiempo final.";


        calculoEuler.innerHTML =

            `Último valor calculado:
            T(${TIEMPO_FINAL})`;


        resultadoEuler.textContent =

            `${estado.T.toFixed(2)} °C`;


        nuevoEstado.innerHTML =

            `Euler aproximó la temperatura
            después de ${TIEMPO_FINAL} minutos
            como <strong>${estado.T.toFixed(2)} °C</strong>.`;

    }

}


/* =========================================================
   TABLA
   ========================================================= */

function actualizarTabla() {

    tablaEuler.innerHTML =
        "";


    /*
        Mostramos únicamente los cálculos
        que ya han sido alcanzados.
    */

    const cantidadFilas =
        Math.min(
            indice + 1,
            pasos.length
        );


    for (
        let i = 0;
        i < cantidadFilas;
        i++
    ) {

        const paso =
            pasos[i];


        const fila =
            document.createElement(
                "tr"
            );


        if (
            i === indice
            ||
            (
                indice === estados.length - 1
                &&
                i === pasos.length - 1
            )
        ) {

            fila.classList.add(
                "actual"
            );

        }


        fila.innerHTML = `

            <td>
                ${paso.n}
            </td>

            <td>
                ${paso.t.toFixed(0)}
            </td>

            <td>
                ${paso.T.toFixed(2)}
            </td>

            <td>
                ${paso.pendiente.toFixed(2)}
            </td>

            <td>
                ${paso.siguienteT.toFixed(2)}
            </td>

        `;


        tablaEuler.appendChild(
            fila
        );

    }

}


/* =========================================================
   ACTUALIZAR TODO
   ========================================================= */

function actualizarInterfaz() {

    const estado =
        estados[indice];


    actualizarTermometro(
        estado.T
    );


    tiempoVisual.textContent =
        estado.t.toFixed(0)
        +
        " min";


    actualizarCalculo();

    dibujarEuler();

    actualizarTabla();


    progreso.style.width =

        (
            indice /
            (estados.length - 1)
        )
        *
        100
        +
        "%";


    anterior.disabled =
        indice === 0;


    siguiente.disabled =
        indice ===
        estados.length - 1;

}


/* =========================================================
   CONTROLES
   ========================================================= */

siguiente.addEventListener(
    "click",
    () => {

        if (
            indice <
            estados.length - 1
        ) {

            indice++;

            actualizarInterfaz();

        }

    }
);


anterior.addEventListener(
    "click",
    () => {

        if (
            indice > 0
        ) {

            indice--;

            actualizarInterfaz();

        }

    }
);


reiniciar.addEventListener(
    "click",
    () => {

        detenerAutomatico();

        indice = 0;

        actualizarInterfaz();

    }
);


automatico.addEventListener(
    "click",
    () => {

        if (
            intervalo !== null
        ) {

            detenerAutomatico();

            return;

        }


        if (
            indice ===
            estados.length - 1
        ) {

            indice = 0;

            actualizarInterfaz();

        }


        automatico.textContent =
            "⏸ Pausar";


        intervalo =
            setInterval(
                () => {

                    if (
                        indice <
                        estados.length - 1
                    ) {

                        indice++;

                        actualizarInterfaz();

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

    if (
        intervalo !== null
    ) {

        clearInterval(
            intervalo
        );

        intervalo =
            null;

    }


    automatico.textContent =
        "▶ Automático";

}


/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

crearCuadricula();

dibujarExacta();

actualizarInterfaz();
