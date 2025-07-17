const apiKey = 'dfrQBhepEiYd2kAPH3ln28gcMbpsqHv9Df8YpTrF';

const title = document.getElementById('title');
const image = document.getElementById('image');
const description = document.getElementById('description');

function loadAPOD() {
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      title.textContent = data.title;
      image.src = data.url;
      description.textContent = data.explanation;
    })
    .catch(() => {
      title.textContent = "Error";
      image.src = "";
      description.textContent = "No se pudo cargar la imagen del día.";
    });
}

function loadDONKI() {
  fetch(`https://api.nasa.gov/DONKI/FLR?startDate=2025-07-01&api_key=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      if (!data.length) {
        title.textContent = "Sin eventos solares";
        image.src = "";
        description.textContent = "No se encontraron fulguraciones solares recientes.";
        return;
      }
      const event = data[0];
      title.textContent = `Evento Solar: ${event.flrID}`;
      image.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Solar_flare.jpg/800px-Solar_flare.jpg";
      description.textContent = `Fecha: ${event.beginTime}\nClase: ${event.classType || "N/A"}\nUbicación: ${event.sourceLocation}`;
    })
    .catch(() => {
      title.textContent = "Error al cargar DONKI";
      image.src = "";
      description.textContent = "Hubo un problema al consultar los eventos solares.";
    });
}

function loadNeo() {
  const today = new Date().toISOString().split('T')[0];
  fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&api_key=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      const nearEarth = data.near_earth_objects[today];
      if (!nearEarth || nearEarth.length === 0) {
        title.textContent = "Sin asteroides cercanos hoy";
        image.src = "";
        description.textContent = "No se encontraron objetos cercanos a la Tierra hoy.";
        return;
      }
      const asteroid = nearEarth[0];
      title.textContent = `Asteroide: ${asteroid.name}`;
      image.src = "https://upload.wikimedia.org/wikipedia/commons/e/e7/Asteroid_Bennu_artwork.jpg";
      description.textContent = `Magnitud: ${asteroid.absolute_magnitude_h}\n¿Peligroso?: ${asteroid.is_potentially_hazardous_asteroid ? "Sí" : "No"}`;
    })
    .catch(() => {
      title.textContent = "Error al cargar NeoWs";
      image.src = "";
      description.textContent = "No se pudo obtener información sobre asteroides.";
    });
}

function loadEPIC() {
  fetch(`https://api.nasa.gov/EPIC/api/natural/images?api_key=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      if (!data.length) {
        title.textContent = "Sin imágenes EPIC disponibles";
        image.src = "";
        description.textContent = "No hay imágenes recientes de la Tierra disponibles.";
        return;
      }
      const img = data[0];
      const date = img.date.split(' ')[0].replace(/-/g, '/');
      const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${date}/jpg/${img.image}.jpg`;

      title.textContent = `Imagen EPIC del ${img.date.split(' ')[0]}`;
      image.src = imageUrl;
      description.textContent = `Identificador: ${img.identifier}`;
    })
    .catch(() => {
      title.textContent = "Error al cargar EPIC";
      image.src = "";
      description.textContent = "Hubo un problema al obtener la imagen desde el satélite EPIC.";
    });
}
