const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const navLinks = document.querySelectorAll(".nav-link");
const ideaForm = document.getElementById("ideaForm");
const formMessage = document.getElementById("formMessage");
const revealItems = document.querySelectorAll(".reveal");
const chatbotToggle = document.getElementById("chatbotToggle");
const chatbotWindow = document.getElementById("chatbotWindow");
const chatbotClose = document.getElementById("chatbotClose");
const chatbotForm = document.getElementById("chatbotForm");
const chatbotInput = document.getElementById("chatbotInput");
const chatbotBody = document.getElementById("chatbotBody");
const quickQuestions = document.querySelectorAll(".quick-questions button");
const leaderTabs = document.querySelectorAll(".leader-tab");
const leaderScoreIcon = document.getElementById("leaderScoreIcon");
const leaderName = document.getElementById("leaderName");
const leaderRole = document.getElementById("leaderRole");
const leaderAverage = document.getElementById("leaderAverage");
const leaderNextReview = document.getElementById("leaderNextReview");
const leaderFeedback = document.getElementById("leaderFeedback");
const ratingFields = {
  communication: {
    score: document.getElementById("communicationScore"),
    bar: document.getElementById("communicationBar")
  },
  empathy: {
    score: document.getElementById("empathyScore"),
    bar: document.getElementById("empathyBar")
  },
  change: {
    score: document.getElementById("changeScore"),
    bar: document.getElementById("changeBar")
  },
  support: {
    score: document.getElementById("supportScore"),
    bar: document.getElementById("supportBar")
  }
};

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  sidebar.classList.toggle("open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
    menuToggle.classList.remove("open");
    sidebar.classList.remove("open");
  });
});

ideaForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();

  formMessage.textContent = `Gracias, ${name}. Tu idea fue enviada al comité de transformación.`;
  ideaForm.reset();

  window.setTimeout(() => {
    formMessage.textContent = "";
  }, 5500);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sections = [...document.querySelectorAll("section[id]")];

const activeSectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", isActive);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

sections.forEach((section) => activeSectionObserver.observe(section));

const leaders = {
  laura: {
    name: "Laura Martínez",
    role: "Líder de Transformación Comercial | Resultado general del último semestre",
    average: 4.6,
    nextReview: "Diciembre 2026",
    ratings: {
      communication: 4.7,
      empathy: 4.5,
      change: 4.4,
      support: 4.8
    },
    feedback: [
      "<b>Fortaleza:</b> acompaña al equipo y da seguimiento constante.",
      "<b>Área de mejora:</b> comunicar prioridades con mayor anticipación.",
      "<b>Acción sugerida:</b> revisar avances en la siguiente evaluación semestral."
    ]
  },
  jorge: {
    name: "Jorge García",
    role: "Líder de Ventas y Canales Comerciales | Resultado general del último semestre",
    average: 4.3,
    nextReview: "Diciembre 2026",
    ratings: {
      communication: 4.2,
      empathy: 4.1,
      change: 4.4,
      support: 4.5
    },
    feedback: [
      "<b>Fortaleza:</b> orienta al equipo hacia resultados claros.",
      "<b>Área de mejora:</b> reforzar espacios de escucha antes de cambios operativos.",
      "<b>Acción sugerida:</b> abrir reuniones mensuales de retroalimentación con el equipo."
    ]
  },
  karla: {
    name: "Karla Padilla",
    role: "Líder de Marketing y Cultura Digital | Resultado general del último semestre",
    average: 4.8,
    nextReview: "Diciembre 2026",
    ratings: {
      communication: 4.8,
      empathy: 4.9,
      change: 4.7,
      support: 4.8
    },
    feedback: [
      "<b>Fortaleza:</b> impulsa colaboración y aprendizaje entre áreas.",
      "<b>Área de mejora:</b> delegar más responsabilidades en proyectos de alto ritmo.",
      "<b>Acción sugerida:</b> crear un plan de sucesión para nuevos líderes de proyecto."
    ]
  }
};

leaderTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    leaderTabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    updateLeaderRatings(tab.dataset.leader);
  });
});

function updateLeaderRatings(leaderId) {
  const leader = leaders[leaderId];
  if (!leader) return;

  leaderScoreIcon.textContent = leader.average.toFixed(1);
  leaderName.textContent = leader.name;
  leaderRole.textContent = leader.role;
  leaderAverage.textContent = `${leader.average.toFixed(1)}/5`;
  leaderNextReview.textContent = leader.nextReview;

  Object.entries(leader.ratings).forEach(([key, value]) => {
    ratingFields[key].score.textContent = `${value.toFixed(1)}/5`;
    ratingFields[key].bar.style.width = `${value * 20}%`;
  });

  leaderFeedback.innerHTML = leader.feedback.map((item) => `<li>${item}</li>`).join("");
}

const botAnswers = [
  {
    keywords: ["emocional", "emocion", "emociones", "bienestar", "estres", "motivado", "tranquilo"],
    answer: "Tu estado emocional actual aparece como motivado, con carga moderada. El bienestar emocional esta en 76%, el estres en 38% y la recomendacion es mantener seguimiento semanal. Si el estres supera 60%, conviene agendar una conversacion breve con tu lider o Recursos Humanos."
  },
  {
    keywords: ["calificacion", "calificaciones", "rating", "puntaje", "puntuacion"],
    answer: "Las calificaciones actuales muestran a Laura Martinez con 4.6/5, Jorge Garcia con 4.3/5 y Karla Padilla con 4.8/5. Se evalua comunicacion, empatia, gestion del cambio y apoyo al equipo. La calificacion mas alta simulada es Karla, destacando en empatia con 4.9/5."
  },
  {
    keywords: ["semestral", "6 meses", "seis meses", "evaluacion lideres", "evaluacion de lideres"],
    answer: "La evaluacion de lideres se realiza cada 6 meses. Incluye autoevaluacion, retroalimentacion 360 del equipo, comunicacion interna, revision de objetivos y calificaciones por criterio. La proxima revision simulada esta programada para diciembre de 2026."
  },
  {
    keywords: ["noticia", "noticias", "comunicado", "comunicados"],
    answer: "Las noticias internas principales son: nueva iniciativa de inteligencia artificial para identificar tareas repetitivas, actualizacion de procesos internos con nuevos flujos de aprobacion y reconocimiento a equipos colaborativos que documentaron aprendizajes."
  },
  {
    keywords: ["documento", "documentos", "guia", "guias", "faq", "caso", "casos"],
    answer: "Los documentos disponibles incluyen manual de reportes comerciales, flujo de aprobacion de compras internas, protocolo de atencion B2B, guia de uso responsable de IA, plantilla de tareas automatizables, FAQ para registrar ideas y casos de exito de automatizacion de ventas."
  },
  {
    keywords: ["perfil", "habilidades", "intereses", "objetivos", "recomendados", "recomendaciones"],
    answer: "Tu perfil simulado indica habilidades en analisis de datos, comunicacion, eCommerce y trabajo colaborativo. Tus intereses son IA aplicada, proyectos multidisciplinarios y mejora de atencion digital. Por eso se recomiendan proyectos como experiencia eCommerce, piloto de IA y biblioteca de conocimiento interno."
  },
  {
    keywords: ["mis proyectos", "asignado", "asignados", "tareas", "mi avance", "mi proyecto"],
    answer: "Tus proyectos asignados simulados son: automatizacion de reportes comerciales con 70% de avance personal, plataforma de conocimiento interno con 45% y mejora de experiencia eCommerce con 55%. Tu tarea mas proxima es validar campos del reporte semanal antes del 14 de junio."
  },
  {
    keywords: ["proyecto", "proyectos", "avance", "avances"],
    answer: "Hay 8 proyectos activos. Los tres principales son: automatizacion de reportes comerciales en 60%, plataforma de conocimiento interno en 35% y mejora de experiencia eCommerce en 75%. El mas avanzado es eCommerce y el que necesita mas impulso es conocimiento interno."
  },
  {
    keywords: ["proceso", "procesos", "manual", "manuales", "biblioteca"],
    answer: "Los procesos documentados incluyen reportes comerciales, aprobacion de compras internas, atencion B2B y seguimiento de proyectos. El objetivo es que el conocimiento no dependa de una sola persona y que cualquier colaborador pueda replicar buenas practicas."
  },
  {
    keywords: ["curso", "cursos", "capacitacion", "capacitaciones", "ia", "inteligencia artificial"],
    answer: "Los cursos activos son: Introduccion a IA con 82%, Liderazgo transformacional con 64%, Comunicacion efectiva entre areas con 71%, Automatizacion basica con 48% y Cultura de innovacion con 58%. El curso mas avanzado es IA y el mas rezagado es automatizacion."
  },
  {
    keywords: ["idea", "ideas", "mejora", "mejoras", "propuesta"],
    answer: "Para una buena idea de mejora, describe primero el problema, luego explica el impacto y finalmente propone una solucion concreta. Ejemplo: si los reportes tardan mucho, la propuesta puede ser automatizar el formato semanal y asignar un responsable de validacion."
  },
  {
    keywords: ["indicador", "indicadores", "kpi", "satisfaccion", "colaboracion"],
    answer: "Los KPIs actuales son: colaboracion entre areas 78%, participacion en capacitaciones 72%, uso de biblioteca 54%, avance de proyectos estrategicos 68% y satisfaccion interna 81%. El foco de mejora es aumentar el uso de la biblioteca."
  },
  {
    keywords: ["lider", "liderazgo", "mentoring", "mentor", "coaching", "evaluacion", "evaluaciones", "ruta"],
    answer: "El desarrollo de liderazgo incluye ruta de crecimiento en 66%, evaluaciones con 72% de participacion, 18 sesiones de mentoring y plan de coaching activo en 45%. El objetivo es formar lideres que comuniquen mejor, acompañen el cambio y desarrollen talento."
  },
  {
    keywords: ["comunidad", "reconocimiento", "eventos"],
    answer: "La comunidad reconoce al equipo de Ventas por documentar reportes comerciales, promueve mensajes de liderazgo, sesiones mensuales de aprendizajes y eventos como laboratorio de IA, foro de eCommerce y circulo de liderazgo transformacional."
  },
  {
    keywords: ["ayuda", "soporte", "contacto", "duda", "dudas"],
    answer: "Si tienes una duda, la ruta recomendada es: revisar si existe un manual, preguntar al responsable del proyecto y, si detectas una mejora, registrarla como idea. Para dudas de bienestar o liderazgo, conviene escalarlo con tu lider o Recursos Humanos."
  }
];

chatbotToggle.addEventListener("click", () => {
  chatbotWindow.classList.toggle("open");
  if (chatbotWindow.classList.contains("open")) {
    chatbotInput.focus();
  }
});

chatbotClose.addEventListener("click", () => {
  chatbotWindow.classList.remove("open");
});

quickQuestions.forEach((button) => {
  button.addEventListener("click", () => {
    sendChatMessage(button.dataset.question);
  });
});

chatbotForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendChatMessage(chatbotInput.value);
});

function sendChatMessage(text) {
  const question = text.trim();
  if (!question) return;

  addChatMessage(question, "user-message");
  chatbotInput.value = "";

  window.setTimeout(() => {
    addChatMessage(getBotAnswer(question), "bot-message");
  }, 350);
}

function addChatMessage(text, className) {
  const message = document.createElement("div");
  message.className = className;
  message.textContent = text;
  chatbotBody.appendChild(message);
  chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function getBotAnswer(question) {
  const cleanQuestion = question.toLowerCase();
  const match = botAnswers.find((item) =>
    item.keywords.some((keyword) => cleanQuestion.includes(keyword))
  );

  if (match) return match.answer;

  return "Puedo ayudarte con dudas sobre procesos, avances de proyectos, capacitaciones, indicadores, ideas de mejora y comunidad interna.";
}
