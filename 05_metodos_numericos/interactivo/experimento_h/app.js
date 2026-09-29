/* =========================================================
   EXPERIMENTO CON EL TAMAÑO DE PASO h
   Euler vs. RK4
   CC3074 — Modelización y Simulación
   ========================================================= */


/* =========================================================
   1. PARÁMETROS FIJOS
   ========================================================= */

const T0 = 90;

const TA = 20;

const K = 0.1;

const TIEMPO_FINAL = 10;


/* =========================================================
   2. MODELO
   ========================================================= */

/*
    Enfriamiento de Newton

    dT/dt = -k(T - Ta)
*/

function f(t, T) {

    return -K * (T - TA);

}


/* =========================================================
   3. SOLUCIÓN EXACTA
   ========================================================= */

function solucionExacta(t) {

    return (
        TA
        +
        (T0 - TA)
        *
        Math.exp(-K * t)
    );

}


/* =========================================================
   4. EULER
   ========================================================= */

function pasoEuler(t, T, h) {

    const pendiente =
        f(t, T);


    const nuevaT =
        T + h * pendiente;


    return nuevaT;

}


/* =========================================================
   5. RK4
   ========================================================= */

function pasoRK4(t, T, h) {

    const k1 =
        f(t, T);


    const k2 =
        f(
            t + h / 2,
            T + h * k1 / 2
        );


    const k3 =
        f(
            t + h / 2,
            T + h * k2 / 2
        );


    const k4 =
        f(
            t + h,
            T + h * k3
        );


    return (

        T

        +

        h

        *

        (
            k1
            +
            2 * k2
            +
            2 * k3
            +
            k4
        )

        / 6

    );

}


/* =========================================================
   6. SIMULACIÓN
   ========================================================= */

function simular(h) {

    const resultados = [];


    let t = 0;

    let euler = T0;

    let rk4 = T0;

    let paso = 0;


    resultados.push({

        paso: 0,

        t: 0,

        exacta:
            solucionExacta(0),

        euler:
            T0,

        rk4:
            T0,

        errorEuler: 0,

        errorRK4: 0

    });


    /*
        Como h puede no dividir exactamente
        el tiempo final, usamos un paso real
        que nunca sobrepase t = 10.
    */

    while (
        t <
        TIEMPO_FINAL - 1e-10
    ) {

        const hReal =
            Math.min(
                h,
                TIEMPO_FINAL - t
            );


        const nuevoEuler =
            pasoEuler(
                t,
                euler,
                hReal
            );


        const nuevoRK4 =
            pasoRK4(
                t,
                rk4,
                hReal
            );


        t += hReal;

        paso++;


        euler =
            nuevoEuler;


        rk4 =
            nuevoRK4;


        const exacta =
            solucionExacta(t);


        resultados.push({

            paso: paso,

            t: t,

            exacta: exacta,

            euler: euler,

            rk4: rk4,

            errorEuler:
                Math.abs(
                    exacta -
                    euler
                ),

            errorRK4:
                Math.abs(
                    exacta -
                    rk4
                )

        });

    }


    return resultados;

}


/* =========================================================
   7. ELEMENTOS HTML
   ========================================================= */

const sliderH =
    document.getElementById(
        "sliderH"
    );


const valorH =
    document.getElementById(
        "valorH"
    );


const numeroPasos =
    document.getElementById(
        "numeroPasos"
    );


const errorEulerElemento =
    document.getElementById(
        "errorEuler"
    );


const errorRK4Elemento =
    document.getElementById(
        "errorRK4"
    );


const evaluacionesEuler =
    document.getElementById(
        "evaluacionesEuler"
    );


const evaluacionesRK4 =
    document.getElementById(
        "evaluacionesRK4"
    );


const interpretacion =
    document.getElementById(
        "interpretacion"
    );


const textoErrorEuler =
    document.getElementById(
        "textoErrorEuler"
    );


const textoErrorRK4 =
    document.getElementById(
        "textoErrorRK4"
    );


const barraErrorEuler =
    document.getElementById(
        "barraErrorEuler"
    );


const barraErrorRK4 =
    document.getElementById(
        "barraErrorRK4"
    );


const costoEuler =
    document.getElementById(
        "costoEuler"
    );


const costoRK4 =
    document.getElementById(
        "costoRK4"
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


const hipotesisSelect =
    document.getElementById(
        "hipotesisSelect"
    );


const verificarHipotesis =
    document.getElementById(
        "verificarHipotesis"
    );


const resultadoHipotesis =
    document.getElementById(
        "resultadoHipotesis"
    );


/* =========================================================
   8. ESCALA DE GRÁFICA
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
   9. CUADRÍCULA
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
            "x1",
            x
        );

        linea.setAttribute(
            "x2",
            x
        );

        linea.setAttribute(
            "y1",
            Y0
        );

        linea.setAttribute(
            "y2",
            Y1
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
            402
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
            t;


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
            "x1",
            X0
        );

        linea.setAttribute(
            "x2",
            X1
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
            T;


        cuadricula.appendChild(
            texto
        );

    }

}


/* =========================================================
   10. SOLUCIÓN EXACTA
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
            solucionExacta(t);


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
   11. DIBUJAR RESULTADOS
   ========================================================= */

function dibujarResultados(
    resultados
) {

    const puntosEulerTexto =
        resultados.map(
            r =>
                `${convertirX(r.t)},${convertirY(r.euler)}`
        );


    const puntosRK4Texto =
        resultados.map(
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


    /*
        Si tenemos muchos puntos,
        no dibujamos un círculo en todos
        para evitar saturar la gráfica.
    */

    const salto =
        Math.max(
            1,
            Math.floor(
                resultados.length / 30
            )
        );


    resultados.forEach(
        (r, i) => {

            if (
                i % salto !== 0
                &&
                i !== resultados.length - 1
            ) {

                return;

            }


            const puntoEuler =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "circle"
                );


            puntoEuler.setAttribute(
                "cx",
                convertirX(r.t)
            );

            puntoEuler.setAttribute(
                "cy",
                convertirY(r.euler)
            );

            puntoEuler.setAttribute(
                "r",
                4
            );

            puntoEuler.setAttribute(
                "class",
                "punto-euler"
            );


            puntosEuler.appendChild(
                puntoEuler
            );


            const puntoRK4 =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "circle"
                );


            puntoRK4.setAttribute(
                "cx",
                convertirX(r.t)
            );

            puntoRK4.setAttribute(
                "cy",
                convertirY(r.rk4)
            );

            puntoRK4.setAttribute(
                "r",
                4
            );

            puntoRK4.setAttribute(
                "class",
                "punto-rk4"
            );


            puntosRK4.appendChild(
                puntoRK4
            );

        }
    );

}


/* =========================================================
   12. TABLA
   ========================================================= */

function actualizarTabla(
    resultados
) {

    tablaResultados.innerHTML = "";


    /*
        Queremos que la tabla siga siendo legible
        incluso con h = 0.1.

        Mostramos como máximo unas 25 filas.
    */

    const salto =
        Math.max(
            1,
            Math.ceil(
                resultados.length / 25
            )
        );


    resultados.forEach(
        (r, i) => {

            if (
                i % salto !== 0
                &&
                i !== resultados.length - 1
            ) {

                return;

            }


            const fila =
                document.createElement(
                    "tr"
                );


            fila.innerHTML = `

                <td>
                    ${r.paso}
                </td>

                <td>
                    ${r.t.toFixed(2)}
                </td>

                <td>
                    ${r.exacta.toFixed(4)}
                </td>

                <td>
                    ${r.euler.toFixed(4)}
                </td>

                <td>
                    ${r.errorEuler.toFixed(6)}
                </td>

                <td>
                    ${r.rk4.toFixed(4)}
                </td>

                <td>
                    ${r.errorRK4.toFixed(6)}
                </td>

            `;


            tablaResultados.appendChild(
                fila
            );

        }
    );

}


/* =========================================================
   13. ACTUALIZAR EXPERIMENTO
   ========================================================= */

function actualizarExperimento() {

    const h =
        parseFloat(
            sliderH.value
        );


    valorH.textContent =
        h.toFixed(2);


    const resultados =
        simular(h);


    const final =
        resultados[
            resultados.length - 1
        ];


    const pasos =
        resultados.length - 1;


    /*
        Euler:
        1 evaluación de f por paso.

        RK4:
        4 evaluaciones de f por paso.
    */

    const evalEuler =
        pasos;


    const evalRK4 =
        pasos * 4;


    numeroPasos.textContent =
        pasos;


    errorEulerElemento.textContent =
        final.errorEuler.toFixed(6)
        +
        " °C";


    errorRK4Elemento.textContent =
        final.errorRK4.toFixed(8)
        +
        " °C";


    evaluacionesEuler.textContent =
        evalEuler;


    evaluacionesRK4.textContent =
        evalRK4;


    costoEuler.textContent =
        evalEuler;


    costoRK4.textContent =
        evalRK4;


    textoErrorEuler.textContent =
        final.errorEuler.toFixed(6)
        +
        " °C";


    textoErrorRK4.textContent =
        final.errorRK4.toFixed(8)
        +
        " °C";


    /*
        Barras de error.

        Usamos el error de Euler con h = 2
        como referencia visual aproximada.
    */

    const referenciaError =
        3;


    const porcentajeEuler =
        Math.min(
            100,
            (
                final.errorEuler /
                referenciaError
            )
            *
            100
        );


    const porcentajeRK4 =
        Math.min(
            100,
            (
                final.errorRK4 /
                referenciaError
            )
            *
            100
        );


    barraErrorEuler.style.width =
        Math.max(
            1,
            porcentajeEuler
        )
        +
        "%";


    barraErrorRK4.style.width =
        Math.max(
            1,
            porcentajeRK4
        )
        +
        "%";


    /*
        Interpretación automática.
    */

    let mensaje = "";


    if (h >= 1.5) {

        mensaje = `

            Estás utilizando un paso grande
            (<strong>h = ${h.toFixed(2)}</strong>).

            La simulación necesita solamente
            <strong>${pasos} pasos</strong>,
            pero Euler presenta un error final
            de <strong>${final.errorEuler.toFixed(4)} °C</strong>.

        `;

    }

    else if (h >= 0.7) {

        mensaje = `

            Estás utilizando un tamaño de paso intermedio
            (<strong>h = ${h.toFixed(2)}</strong>).

            Se realizan <strong>${pasos} pasos</strong>.
            Observa que RK4 continúa siguiendo muy de cerca
            la solución exacta.

        `;

    }

    else {

        mensaje = `

            Ahora el paso es pequeño
            (<strong>h = ${h.toFixed(2)}</strong>).

            Necesitamos <strong>${pasos} pasos</strong>.
            El cálculo requiere más trabajo,
            pero Euler sigue la curva con mayor detalle.

        `;

    }


    interpretacion.innerHTML = `

        <span>
            💡
        </span>

        <div>

            <strong>
                Observación
            </strong>

            <p>
                ${mensaje}
            </p>

        </div>

    `;


    dibujarResultados(
        resultados
    );


    actualizarTabla(
        resultados
    );

}


/* =========================================================
   14. SLIDER
   ========================================================= */

sliderH.addEventListener(
    "input",
    actualizarExperimento
);


/* =========================================================
   15. BOTONES RÁPIDOS
   ========================================================= */

document
    .querySelectorAll(
        "[data-h]"
    )
    .forEach(
        boton => {

            boton.addEventListener(
                "click",
                () => {

                    sliderH.value =
                        boton.dataset.h;


                    actualizarExperimento();

                }
            );

        }
    );


/* =========================================================
   16. VERIFICAR HIPÓTESIS
   ========================================================= */

verificarHipotesis.addEventListener(
    "click",
    () => {

        const respuesta =
            hipotesisSelect.value;


        if (respuesta === "") {

            resultadoHipotesis.innerHTML =

                "Primero selecciona una hipótesis.";

            return;

        }


        if (
            respuesta ===
            "disminuye"
        ) {

            resultadoHipotesis.innerHTML = `

                <strong>
                    Tu hipótesis coincide con el experimento.
                </strong>

                Al reducir h en este modelo,
                el error numérico observado disminuye,
                aunque aumenta la cantidad de pasos.

            `;

        }

        else {

            resultadoHipotesis.innerHTML = `

                <strong>
                    Compara nuevamente h = 2 con h = 0.1.
                </strong>

                En este experimento se observa que,
                al reducir h, las aproximaciones se acercan
                más a la solución exacta, especialmente Euler.

            `;

        }

    }
);


/* =========================================================
   17. INICIALIZACIÓN
   ========================================================= */

crearCuadricula();

dibujarExacta();

actualizarExperimento();
