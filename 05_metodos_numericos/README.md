# Métodos Numéricos aplicados a Simulación: Euler y Runge-Kutta

Material de apoyo para **CC3074 – Modelización y Simulación**, Universidad del Valle de Guatemala.

## Contenido

El notebook `Metodos_Numericos_Euler_Runge_Kutta.ipynb` incluye:

- Introducción a ecuaciones diferenciales aplicadas a simulación.
- Ley de Enfriamiento de Newton como caso de estudio.
- Método de Euler.
- Runge-Kutta de cuarto orden (RK4).
- Implementaciones reutilizables en Python.
- Comparación contra la solución exacta.
- Cálculo y visualización del error.
- Experimentos con distintos tamaños de paso `h`.
- Ejercicio integrador para estudiantes.

## Requisitos

- Python 3
- Jupyter Notebook o JupyterLab
- NumPy
- pandas
- Matplotlib

Instalación:

```bash
pip install numpy pandas matplotlib jupyter
```

## Ejecución

```bash
jupyter notebook
```

Abra:

```text
Metodos_Numericos_Euler_Runge_Kutta.ipynb
```

También puede abrir el notebook desde VS Code con la extensión de Jupyter.

## Caso de estudio

Se utiliza la Ley de Enfriamiento de Newton:

```text
dT/dt = -k(T - Ta)
```

y se comparan:

1. Método de Euler
2. Runge-Kutta de cuarto orden (RK4)
3. Solución exacta

## Objetivo

Comprender cómo un modelo matemático continuo puede transformarse en una simulación computacional y analizar el efecto del método numérico y del tamaño de paso sobre los resultados.

## Uso académico

Material preparado como apoyo didáctico para el curso de Modelización y Simulación.
