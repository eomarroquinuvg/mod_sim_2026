/* =========================================================
   FLUJO MÁXIMO Y COSTO MÍNIMO
   CC3074 — Modelización y Simulación
   ========================================================= */


/* =========================================================
   CAMBIO DE MODO
   ========================================================= */

const btnMaximo =
    document.getElementById("btnMaximo");

const btnCosto =
    document.getElementById("btnCosto");

const modoMaximo =
    document.getElementById("modoMaximo");

const modoCosto =
    document.getElementById("modoCosto");


btnMaximo.addEventListener("click", () => {

    btnMaximo.classList.add("activo");
    btnCosto.classList.remove("activo");

    modoMaximo.classList.remove("oculto");
    modoCosto.classList.add("oculto");

});


btnCosto.addEventListener("click", () => {

    btnCosto.classList.add("activo");
    btnMaximo.classList.remove("activo");

    modoCosto.classList.remove("oculto");
    modoMaximo.classList.add("oculto");

});


/* =========================================================
   MODO 1 — FLUJO MÁXIMO
   ========================================================= */

/*
    RED:

    S → A = 4
    S → B = 5
    A → B = 2
    A → T = 3
    B → T = 4

    Rutas de aumento didácticas:

    1. S → A → T
       cuello = min(4,3) = 3

    2. S → B → T
       cuello = min(5,4) = 4

    Flujo máximo = 7
*/


const pasosMaximo = [

    {
        titulo:
            "La red está lista",

        texto:
            "Todavía no hemos enviado vehículos. Buscaremos una ruta desde S hasta T con capacidad disponible.",

        ruta: [],

        cuello:
            "min(capacidades disponibles)",

        flujo:
            0,

        iteracion:
            0,

        valores: {
            SA: 0,
            SB: 0,
            AB: 0,
            AT: 0,
            BT: 0
        },

        final:
            false
    },


    {
        titulo:
            "Primera ruta: S → A → T",

        texto:
            "La ruta utiliza S→A con capacidad 4 y A→T con capacidad 3. Solo podemos enviar lo que permite la carretera más limitada.",

        ruta: ["SA","AT"],

        cuello:
            "min(4, 3) = 3",

        flujo:
            3,

        iteracion:
            1,

        valores: {
            SA: 3,
            SB: 0,
            AB: 0,
            AT: 3,
            BT: 0
        },

        final:
            false
    },


    {
        titulo:
            "Segunda ruta: S → B → T",

        texto:
            "Ahora utilizamos S→B con capacidad 5 y B→T con capacidad 4. El cuello de botella permite enviar 4 vehículos adicionales.",

        ruta: ["SB","BT"],

        cuello:
            "min(5, 4) = 4",

        flujo:
            7,

        iteracion:
            2,

        valores: {
            SA: 3,
            SB: 4,
            AB: 0,
            AT: 3,
            BT: 4
        },

        final:
            false
    },


    {
        titulo:
            "No existe otra ruta de aumento",

        texto:
            "Las conexiones A→T y B→T están saturadas. Aunque todavía existe capacidad en otras carreteras, no podemos hacer llegar más flujo hasta T.",

        ruta: [],

        cuello:
            "Flujo máximo = 3 + 4 = 7",

        flujo:
            7,

        iteracion:
            2,

        valores: {
            SA: 3,
            SB: 4,
            AB: 0,
            AT: 3,
            BT: 4
        },

        final:
            true
    }

];


const capacidadesMax = {

    SA: 4,
    SB: 5,
    AB: 2,
    AT: 3,
    BT: 4

};


let indiceMax =
    0;

let intervaloMax =
    null;


const flujoActual =
    document.getElementById("flujoActual");

const flujoMeta =
    document.getElementById("flujoMeta");

const iteracionMax =
    document.getElementById("iteracionMax");

const pasoMax =
    document.getElementById("pasoMax");

const formulaCuello =
    document.getElementById("formulaCuello");

const progresoMax =
    document.getElementById("progresoMax");

const resultadoMax =
    document.getElementById("resultadoMax");

const siguienteMax =
    document.getElementById("siguienteMax");

const anteriorMax =
    document.getElementById("anteriorMax");

const automaticoMax =
    document.getElementById("automaticoMax");

const reiniciarMax =
    document.getElementById("reiniciarMax");


function limpiarCarreterasMax() {

    Object.keys(capacidadesMax)
        .forEach(id => {

            document
                .getElementById("max-" + id)
                .classList.remove(
                    "activa",
                    "usada",
                    "saturada"
                );

        });

}


function actualizarEtiquetasMax(valores) {

    Object.keys(capacidadesMax)
        .forEach(id => {

            document
                .getElementById(
                    "label-max-" + id
                )
                .textContent =
                    `${valores[id]} / ${capacidadesMax[id]}`;

        });

}


function pintarEstadoMax(paso) {

    limpiarCarreterasMax();


    Object.keys(paso.valores)
        .forEach(id => {

            const carretera =
                document.getElementById(
                    "max-" + id
                );


            if (
                paso.valores[id] > 0
            ) {

                carretera.classList.add(
                    "usada"
                );

            }


            if (
                paso.valores[id] ===
                capacidadesMax[id]
            ) {

                carretera.classList.remove(
                    "usada"
                );

                carretera.classList.add(
                    "saturada"
                );

            }

        });


    paso.ruta.forEach(id => {

        const carretera =
            document.getElementById(
                "max-" + id
            );


        if (
            paso.valores[id] !==
            capacidadesMax[id]
        ) {

            carretera.classList.add(
                "activa"
            );

        }

    });

}


function mostrarPasoMax() {

    const paso =
        pasosMaximo[indiceMax];


    flujoActual.textContent =
        paso.flujo;


    flujoMeta.textContent =
        paso.final
            ? "7"
            : "?";


    iteracionMax.textContent =
        paso.iteracion;


    pasoMax.innerHTML = `

        <span>
            ${
                paso.final
                ? "RESULTADO"
                : "PASO " + indiceMax
            }
        </span>

        <h3>
            ${paso.titulo}
        </h3>

        <p>
            ${paso.texto}
        </p>

    `;


    formulaCuello.textContent =
        paso.cuello;


    actualizarEtiquetasMax(
        paso.valores
    );


    pintarEstadoMax(
        paso
    );


    progresoMax.style.width =
        (
            indiceMax /
            (pasosMaximo.length - 1)
        ) * 100 + "%";


    anteriorMax.disabled =
        indiceMax === 0;


    siguienteMax.disabled =
        indiceMax ===
        pasosMaximo.length - 1;


    if (paso.final) {

        resultadoMax.innerHTML = `

            <span>🎉</span>

            <div>

                <strong>
                    Flujo máximo = 7 vehículos
                </strong>

                <p>
                    Enviamos 3 por
                    S → A → T
                    y 4 por
                    S → B → T.
                    Las entradas disponibles hacia T
                    quedaron saturadas.
                </p>

            </div>

        `;

    }

    else {

        resultadoMax.innerHTML = `

            <span>🚗</span>

            <div>

                <strong>
                    Flujo acumulado:
                    ${paso.flujo}
                </strong>

                <p>
                    Continúa buscando rutas
                    con capacidad residual.
                </p>

            </div>

        `;

    }

}


siguienteMax.addEventListener(
    "click",
    () => {

        if (
            indiceMax <
            pasosMaximo.length - 1
        ) {

            indiceMax++;

            mostrarPasoMax();

        }

    }
);


anteriorMax.addEventListener(
    "click",
    () => {

        if (
            indiceMax > 0
        ) {

            indiceMax--;

            mostrarPasoMax();

        }

    }
);


reiniciarMax.addEventListener(
    "click",
    () => {

        detenerAutomaticoMax();

        indiceMax = 0;

        mostrarPasoMax();

    }
);


automaticoMax.addEventListener(
    "click",
    () => {

        if (
            intervaloMax !== null
        ) {

            detenerAutomaticoMax();

            return;

        }


        if (
            indiceMax ===
            pasosMaximo.length - 1
        ) {

            indiceMax = 0;

            mostrarPasoMax();

        }


        automaticoMax.textContent =
            "⏸ Pausar";


        intervaloMax =
            setInterval(
                () => {

                    if (
                        indiceMax <
                        pasosMaximo.length - 1
                    ) {

                        indiceMax++;

                        mostrarPasoMax();

                    }

                    else {

                        detenerAutomaticoMax();

                    }

                },
                1300
            );

    }
);


function detenerAutomaticoMax() {

    if (
        intervaloMax !== null
    ) {

        clearInterval(
            intervaloMax
        );

        intervaloMax =
            null;

    }


    automaticoMax.textContent =
        "▶ Automático";

}


/* =========================================================
   MODO 2 — COSTO MÍNIMO
   ========================================================= */

/*
    RED:

    S → A:
        capacidad 4
        costo 2

    S → B:
        capacidad 3
        costo 1

    A → B:
        capacidad 2
        costo 1

    A → T:
        capacidad 3
        costo 2

    B → T:
        capacidad 3
        costo 3


    Rutas simples mostradas:

    S → A → T
        costo = 2 + 2 = Q4
        capacidad inicial = 3

    S → B → T
        costo = 1 + 3 = Q4
        capacidad inicial = 3

    S → A → B → T
        costo = 2 + 1 + 3 = Q6
        capacidad inicial = 2


    IMPORTANTE:

    Las rutas comparten aristas.
    Por eso no tratamos las capacidades
    de las rutas como independientes.
*/


const aristasCosto = {

    SA: {
        capacidad: 4,
        costo: 2,
        flujo: 0
    },

    SB: {
        capacidad: 3,
        costo: 1,
        flujo: 0
    },

    AB: {
        capacidad: 2,
        costo: 1,
        flujo: 0
    },

    AT: {
        capacidad: 3,
        costo: 2,
        flujo: 0
    },

    BT: {
        capacidad: 3,
        costo: 3,
        flujo: 0
    }

};


const rutasCosto = {

    SAT: {

        nombre:
            "S → A → T",

        aristas:
            ["SA","AT"],

        costo:
            4

    },


    SBT: {

        nombre:
            "S → B → T",

        aristas:
            ["SB","BT"],

        costo:
            4

    },


    SABT: {

        nombre:
            "S → A → B → T",

        aristas:
            ["SA","AB","BT"],

        costo:
            6

    }

};


const DEMANDA =
    5;


let rutaSeleccionada =
    null;

let enviado =
    0;

let costoTotal =
    0;


const botonesRuta =
    document.querySelectorAll(
        ".ruta-btn"
    );

const cantidadEnviar =
    document.getElementById(
        "cantidadEnviar"
    );

const enviarCosto =
    document.getElementById(
        "enviarCosto"
    );

const optimoCosto =
    document.getElementById(
        "optimoCosto"
    );

const reiniciarCosto =
    document.getElementById(
        "reiniciarCosto"
    );

const enviadoCosto =
    document.getElementById(
        "enviadoCosto"
    );

const totalCosto =
    document.getElementById(
        "totalCosto"
    );

const restanteCosto =
    document.getElementById(
        "restanteCosto"
    );

const detalleCosto =
    document.getElementById(
        "detalleCosto"
    );


function capacidadResidualArista(id) {

    return (
        aristasCosto[id].capacidad
        -
        aristasCosto[id].flujo
    );

}


function capacidadResidualRuta(idRuta) {

    const ruta =
        rutasCosto[idRuta];


    return Math.min(
        ...ruta.aristas.map(
            id =>
                capacidadResidualArista(id)
        )
    );

}


function costoRuta(idRuta) {

    return rutasCosto[idRuta]
        .aristas
        .reduce(
            (total,id) =>
                total +
                aristasCosto[id].costo,
            0
        );

}


botonesRuta.forEach(
    boton => {

        boton.addEventListener(
            "click",
            () => {

                botonesRuta.forEach(
                    b =>
                        b.classList.remove(
                            "seleccionada"
                        )
                );


                boton.classList.add(
                    "seleccionada"
                );


                rutaSeleccionada =
                    boton.dataset.ruta;


                const ruta =
                    rutasCosto[
                        rutaSeleccionada
                    ];


                const residual =
                    capacidadResidualRuta(
                        rutaSeleccionada
                    );


                const costo =
                    costoRuta(
                        rutaSeleccionada
                    );


                detalleCosto.innerHTML = `

                    <span>🛣️</span>

                    <div>

                        <strong>
                            ${ruta.nombre}
                        </strong>

                        <p>
                            Capacidad residual actual:
                            <b>${residual}</b>
                            unidades.
                            <br>

                            Costo por unidad:
                            <b>Q${costo}</b>.
                        </p>

                    </div>

                `;


                enviarCosto.disabled =
                    residual <= 0 ||
                    enviado >= DEMANDA;

            }
        );

    }
);


enviarCosto.addEventListener(
    "click",
    () => {

        if (
            rutaSeleccionada === null
        ) {

            return;

        }


        const cantidad =
            Number(
                cantidadEnviar.value
            );


        const restante =
            DEMANDA - enviado;


        const residual =
            capacidadResidualRuta(
                rutaSeleccionada
            );


        if (
            cantidad > residual
        ) {

            detalleCosto.innerHTML = `

                <span>🚧</span>

                <div>

                    <strong>
                        Capacidad insuficiente
                    </strong>

                    <p>
                        Esta ruta solamente tiene
                        ${residual}
                        unidades de capacidad residual.
                    </p>

                </div>

            `;

            return;

        }


        if (
            cantidad > restante
        ) {

            detalleCosto.innerHTML = `

                <span>📦</span>

                <div>

                    <strong>
                        No necesitamos tantas unidades
                    </strong>

                    <p>
                        Solo faltan
                        ${restante}
                        unidades para satisfacer
                        la demanda.
                    </p>

                </div>

            `;

            return;

        }


        const ruta =
            rutasCosto[
                rutaSeleccionada
            ];


        ruta.aristas.forEach(
            id => {

                aristasCosto[id].flujo +=
                    cantidad;

            }
        );


        const costoUnitario =
            costoRuta(
                rutaSeleccionada
            );


        const costoMovimiento =
            cantidad *
            costoUnitario;


        enviado +=
            cantidad;


        costoTotal +=
            costoMovimiento;


        actualizarPanelCosto();


        resaltarRutaCosto(
            rutaSeleccionada
        );


        detalleCosto.innerHTML = `

            <span>🚚</span>

            <div>

                <strong>
                    Envío realizado
                </strong>

                <p>
                    ${cantidad}
                    unidad(es) por
                    ${ruta.nombre}.

                    <br>

                    Costo:
                    ${cantidad}
                    × Q${costoUnitario}
                    =
                    <b>Q${costoMovimiento}</b>.
                </p>

            </div>

        `;


        if (
            enviado === DEMANDA
        ) {

            finalizarCosto();

        }

    }
);


function actualizarPanelCosto() {

    enviadoCosto.textContent =
        `${enviado} / ${DEMANDA}`;


    totalCosto.textContent =
        `Q${costoTotal}`;


    restanteCosto.textContent =
        DEMANDA - enviado;


    if (
        rutaSeleccionada !== null
    ) {

        enviarCosto.disabled =
            capacidadResidualRuta(
                rutaSeleccionada
            ) <= 0
            ||
            enviado >= DEMANDA;

    }

}


function resaltarRutaCosto(idRuta) {

    document
        .querySelectorAll(
            "#redCosto .carretera"
        )
        .forEach(
            carretera => {

                carretera.classList.remove(
                    "activa"
                );

            }
        );


    rutasCosto[idRuta]
        .aristas
        .forEach(
            id => {

                document
                    .getElementById(
                        "cost-" + id
                    )
                    .classList.add(
                        "activa"
                    );

            }
        );

}


function finalizarCosto() {

    enviarCosto.disabled =
        true;


    detalleCosto.innerHTML = `

        <span>🎯</span>

        <div>

            <strong>
                Demanda satisfecha
            </strong>

            <p>
                Se transportaron
                ${DEMANDA}
                unidades.

                <br>

                Costo total de tu solución:
                <b>Q${costoTotal}</b>.

                <br><br>

                Ahora puedes comparar tu resultado
                con una distribución de menor costo.
            </p>

        </div>

    `;

}


/* =========================================================
   SOLUCIÓN DIDÁCTICA DE MENOR COSTO
   ========================================================= */

/*
    Para esta red y una demanda de 5:

    3 unidades:
        S → A → T
        costo unitario Q4
        costo = Q12

    2 unidades:
        S → B → T
        costo unitario Q4
        costo = Q8

    Total:
        5 unidades
        Q20

    Ambas rutas directas cuestan Q4 por unidad.
    Existen varias distribuciones con costo total Q20,
    siempre que respeten las capacidades compartidas.
*/


optimoCosto.addEventListener(
    "click",
    () => {

        detalleCosto.innerHTML = `

            <span>💡</span>

            <div>

                <strong>
                    Una solución de menor costo
                </strong>

                <p>
                    Enviar
                    <b>3 unidades</b>
                    por
                    S → A → T:

                    <br>

                    3 × Q4 = Q12

                    <br><br>

                    Enviar
                    <b>2 unidades</b>
                    por
                    S → B → T:

                    <br>

                    2 × Q4 = Q8

                    <br><br>

                    <b>
                        Costo total = Q20
                    </b>

                    <br><br>

                    Las dos rutas directas cuestan
                    Q4 por unidad, por lo que pueden
                    existir otras distribuciones
                    factibles con el mismo costo mínimo.
                </p>

            </div>

        `;

    }
);


/* =========================================================
   REINICIAR COSTO
   ========================================================= */

reiniciarCosto.addEventListener(
    "click",
    reiniciarMisionCosto
);


function reiniciarMisionCosto() {

    Object.keys(
        aristasCosto
    ).forEach(
        id => {

            aristasCosto[id].flujo =
                0;

        }
    );


    enviado =
        0;

    costoTotal =
        0;

    rutaSeleccionada =
        null;


    botonesRuta.forEach(
        boton => {

            boton.classList.remove(
                "seleccionada"
            );

        }
    );


    document
        .querySelectorAll(
            "#redCosto .carretera"
        )
        .forEach(
            carretera => {

                carretera.classList.remove(
                    "activa",
                    "usada",
                    "saturada"
                );

            }
        );


    enviarCosto.disabled =
        true;


    actualizarPanelCosto();


    detalleCosto.innerHTML = `

        <span>💰</span>

        <div>

            <strong>
                Selecciona una ruta.
            </strong>

            <p>
                Observa su capacidad y costo
                antes de enviar suministros.
            </p>

        </div>

    `;

}


/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

mostrarPasoMax();

actualizarPanelCosto();
