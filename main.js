// numero de prueba -> cambiar por el real si algun dia es un cliente
const PHONE = "573000000000";

// Horario: [abre, cierra] en horas decimales. null = cerrado
// index 0 = domingo (asi lo maneja getDay())
const SCHEDULE = [
  null,          // dom
  [9, 19.5],     // lun
  [9, 19.5],
  [9, 19.5],
  [9, 19.5],
  [9, 19.5],     // vie
  [8, 18],       // sab
];

function updateStatus() {
  const el = document.getElementById("status");
  const now = new Date();
  const today = SCHEDULE[now.getDay()];
  const hour = now.getHours() + now.getMinutes() / 60;

  if (today && hour >= today[0] && hour < today[1]) {
    el.textContent = "Abierto ahora";
    el.className = "status open";
  } else {
    el.textContent = "Cerrado ahora";
    el.className = "status closed";
  }
}

updateStatus();

// no dejar escoger dias pasados en el calendario
const dayInput = document.getElementById("dia");
const todayStr = new Date().toLocaleDateString("en-CA"); // da formato YYYY-MM-DD
dayInput.min = todayStr;
dayInput.value = todayStr;

document.getElementById("booking").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const nombre = f.get("nombre").trim();
  const error = document.getElementById("error");

  if (!nombre) {
    error.textContent = "Ponle tu nombre para saber a quién esperamos.";
    return;
  }

  // los domingos no se trabaja
  const fecha = new Date(f.get("dia") + "T12:00");
  if (fecha.getDay() === 0) {
    error.textContent = "Los domingos está cerrado, escoge otro día.";
    return;
  }
  error.textContent = "";

  const diaBonito = fecha.toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" });
  const msg = `Hola, soy ${nombre}. Quiero un turno de ${f.get("servicio")} con ${f.get("barbero")} el ${diaBonito}.`;

  window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, "_blank");
});
