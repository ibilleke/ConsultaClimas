const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e) {
    e.preventDefault();

    // Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === '') {
        // Hubo un error
        mostrarError('Ambos campos son obligatorios');

        return;
    }

    // Consultariamos a la API
    consultarAPI(ciudad);
}

function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta) {
        // Crear una alerta
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
    
        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;
    
        container.appendChild(alerta);

        // Se elimine la alerta luego de 5 seg
        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }
}

function consultarAPI(ciudad) {
    const appId = '20ff1e0fcde546c7968154025230805';
    
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${appId}&q=${ciudad}&days=1&aqi=no&alerts=no`    

    Spinner();

    fetch(url)
        .then( respuesta => respuesta.json() )
        .then( datos => {
            // Limpiar el HTML previo
            limpiarHTML();

            if(datos.code === 1006 ) {
                mostrarError('Ciudad no encontrada');  
                return;
             }

            // Imprime la respuesta en el HTML
             mostrarClima(datos);
        })
}

function mostrarClima(datos) {

    const { current: {  temp_c, feelslike_c, wind_dir,
        wind_kph}, location: { name } } = datos;

    const pais = document.querySelector('#pais').value;

    const temp = redondeo(temp_c);
    const sensacion = redondeo(feelslike_c);
    const dirViento = redondeo(wind_dir);
    const velViento = redondeo (wind_kph);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name} de ${pais}`;
    nombreCiudad.classList.add('font-blod', 'text-2xl')

    const actual = document.createElement('p');
    actual.innerHTML = `${temp} &#8451`;
    actual.classList.add('font-bold', 'text-6xl');

    const sensacionTemp = document.createElement('p');
    sensacionTemp.innerHTML = `sensación térmica: ${sensacion} &#8451`;
    sensacionTemp.classList.add('text-xl');

    const direccionViento = document.createElement('p');
    direccionViento.innerHTML = `Dirección del viento: ${dirViento}`;
    direccionViento.classList.add('text-xl');

    const velocidadViento = document.createElement('p');
    velocidadViento.innerHTML = `Velocidad del viento: ${velViento} Km`;
    velocidadViento.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(sensacionTemp);
    resultadoDiv.appendChild(direccionViento);
    resultadoDiv.appendChild(velocidadViento);

    resultado.appendChild(resultadoDiv);
}

const redondeo = grados => parseInt(grados);

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner() {

    limpiarHTML();

    const divSpinner = document.createElement('p');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);
}