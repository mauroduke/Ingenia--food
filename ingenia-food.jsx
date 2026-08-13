import React, { useState, useEffect, useMemo } from "react";
import {
  Menu, X, ChefHat, ClipboardCheck, Bug, Trash2, Ruler, Calculator,
  Building2, Search, Users, FileText, ArrowRight, CheckCircle2,
  Circle, Lock, Mail, Phone, MapPin, Download, ShieldCheck,
  BadgeCheck, Clock, BarChart3, LogOut, User as UserIcon, Instagram,
} from "lucide-react";

/* ---------------------------------------------------------------
   TOKENS
--------------------------------------------------------------- */
const T = {
  bg: "#FFF9F4",
  bgCard: "#FFFFFF",
  ink: "#18352D",
  inkSoft: "#50665F",
  inkFaint: "#86948C",
  gold: "#F26522",
  goldDark: "#D94D17",
  steel: "#467267",
  clay: "#C84B32",
  line: "#E7D6C9",
};

const displayFont = { fontFamily: "'Fraunces', Georgia, serif" };
const monoFont = { fontFamily: "'JetBrains Mono', monospace" };

/* ---------------------------------------------------------------
   CONTENT (from the brief — nothing invented beyond copy)
--------------------------------------------------------------- */
const SERVICIOS = [
  { id: "bpm", icon: ClipboardCheck, title: "Consultoría en BPM", items: ["Diagnóstico", "Auditorías", "Planes de acción", "Capacitación", "Seguimiento", "Implementación de procedimientos"] },
  { id: "estandarizacion", icon: Ruler, title: "Estandarización de productos", items: ["Recetas estándar", "Fichas técnicas", "Porcionamiento", "Rendimientos", "Procesos de producción", "Control de calidad"] },
  { id: "costeo", icon: Calculator, title: "Costeo de productos y cartas", items: ["Costeo de recetas", "Costo por porción", "Análisis de precios", "Margen", "Ingeniería de menú", "Construcción de cartas"] },
  { id: "capacitacion", icon: ChefHat, title: "Capacitación", items: ["BPM", "Manipulación de alimentos", "Limpieza y desinfección", "Manejo de residuos", "Control de plagas", "Administración"] },
  { id: "acompanamiento", icon: Building2, title: "Acompañamiento empresarial", items: ["Diagnóstico inicial", "Plan de trabajo", "Capacitación", "Implementación", "Seguimiento", "Evaluación de resultados"] },
];

const HOME_CARDS = [
  { icon: ClipboardCheck, title: "Capacitación en BPM" },
  { icon: ShieldCheck, title: "Seguridad e inocuidad alimentaria" },
  { icon: Bug, title: "Manejo integrado de plagas" },
  { icon: Trash2, title: "Manejo de residuos" },
  { icon: Ruler, title: "Estandarización de productos" },
  { icon: Calculator, title: "Costeo de recetas y cartas" },
  { icon: Building2, title: "Administración de establecimientos" },
  { icon: Search, title: "Auditorías y diagnóstico" },
  { icon: Users, title: "Acompañamiento empresarial" },
  { icon: FileText, title: "Manuales y procedimientos" },
];

const CIUDADES = ["Manizales", "Pereira", "Armenia", "Bogotá", "Medellín"];

const COURSES = [
  {
    id: "bpm-101",
    categoria: "Buenas Prácticas de Manufactura",
    nombre: "Introducción a las BPM",
    duracion: "45 minutos",
    nivel: "Básico",
    descripcion: "Fundamentos de higiene, manipulación y control de temperaturas en establecimientos de alimentos.",
    modulos: [
      { titulo: "Introducción a las BPM", tipo: "Video" },
      { titulo: "Higiene personal y lavado de manos", tipo: "Video" },
      { titulo: "Contaminación cruzada y temperaturas", tipo: "PDF" },
      { titulo: "Evaluación", tipo: "Quiz" },
    ],
    quiz: [
      { p: "¿Cuál es la temperatura mínima segura de cocción para la mayoría de carnes?", opciones: ["45°C", "63°C", "74°C", "100°C"], correcta: 2 },
      { p: "La contaminación cruzada ocurre principalmente por:", opciones: ["Contacto entre alimentos crudos y cocidos", "Exceso de sal", "Uso de guantes", "Refrigeración correcta"], correcta: 0 },
      { p: "¿Cada cuánto se debe lavar las manos un manipulador de alimentos?", opciones: ["Una vez al día", "Cada vez que cambie de actividad", "Solo al iniciar turno", "No es necesario con guantes"], correcta: 1 },
    ],
  },
  {
    id: "residuos-101",
    categoria: "Manejo de Residuos",
    nombre: "Manejo de residuos sólidos y líquidos",
    duracion: "35 minutos",
    nivel: "Básico",
    descripcion: "Clasificación, separación y disposición correcta de residuos, y manejo de trampa de grasas.",
    modulos: [
      { titulo: "Residuos sólidos: clasificación", tipo: "Video" },
      { titulo: "Residuos líquidos y trampa de grasas", tipo: "PDF" },
      { titulo: "Evaluación", tipo: "Quiz" },
    ],
    quiz: [
      { p: "La trampa de grasas debe limpiarse:", opciones: ["Nunca", "De forma periódica según registro", "Solo si hay mal olor", "Una vez al año"], correcta: 1 },
      { p: "Los residuos orgánicos deben separarse de:", opciones: ["Nada, van todos juntos", "Residuos reciclables y peligrosos", "Solo del vidrio", "Del agua"], correcta: 1 },
    ],
  },
  {
    id: "costeo-101",
    categoria: "Costeo de Cartas",
    nombre: "Costeo de recetas: fundamentos",
    duracion: "50 minutos",
    nivel: "Intermedio",
    descripcion: "Cómo calcular costo por porción, margen y aplicar ingeniería de menú a una carta.",
    modulos: [
      { titulo: "Materia prima y rendimientos", tipo: "Video" },
      { titulo: "Costo por porción y merma", tipo: "PDF" },
      { titulo: "Precio de venta y margen", tipo: "Video" },
      { titulo: "Evaluación", tipo: "Quiz" },
    ],
    quiz: [
      { p: "El costo por porción se calcula dividiendo el costo total de la receta entre:", opciones: ["El precio de venta", "El número de porciones", "El margen", "El rendimiento bruto"], correcta: 1 },
      { p: "La merma en una receta representa:", opciones: ["Ganancia extra", "Pérdida de producto en el proceso", "El precio final", "El IVA"], correcta: 1 },
    ],
  },
  {
    id: "inocuidad-101",
    categoria: "Seguridad e Inocuidad Alimentaria",
    nombre: "Fundamentos de inocuidad alimentaria",
    duracion: "40 minutos",
    nivel: "Básico",
    descripcion: "Identificación de peligros, prevención de contaminación y controles esenciales para alimentos seguros.",
    modulos: [
      { titulo: "Peligros físicos, químicos y biológicos", tipo: "Video" },
      { titulo: "Contaminación y controles preventivos", tipo: "PDF" },
      { titulo: "Evaluación", tipo: "Quiz" },
    ],
    quiz: [
      { p: "La inocuidad alimentaria busca principalmente:", opciones: ["Mejorar el empaque", "Evitar que los alimentos causen daño", "Aumentar las porciones", "Reducir el menú"], correcta: 1 },
      { p: "Un peligro biológico puede ser:", opciones: ["Un fragmento de vidrio", "Un residuo de detergente", "Una bacteria patógena", "Una etiqueta"], correcta: 2 },
    ],
  },
  {
    id: "plagas-101",
    categoria: "Manejo Integrado de Plagas",
    nombre: "Prevención y control de plagas",
    duracion: "35 minutos",
    nivel: "Básico",
    descripcion: "Prevención, inspección y acciones correctivas para controlar plagas en establecimientos de alimentos.",
    modulos: [
      { titulo: "Plagas frecuentes en alimentos", tipo: "Video" },
      { titulo: "Prevención, registros y acciones correctivas", tipo: "PDF" },
      { titulo: "Evaluación", tipo: "Quiz" },
    ],
    quiz: [
      { p: "La mejor estrategia frente a las plagas es:", opciones: ["Esperar a verlas", "Prevenir su ingreso y controlar sus fuentes", "Usar químicos sin registro", "Cerrar las ventanas solamente"], correcta: 1 },
      { p: "Un registro de control permite:", opciones: ["Documentar inspecciones y acciones", "Reemplazar la limpieza", "Evitar capacitar al equipo", "Eliminar los procedimientos"], correcta: 0 },
    ],
  },
  {
    id: "estandarizacion-101",
    categoria: "Estandarización de Productos",
    nombre: "Recetas estándar y fichas técnicas",
    duracion: "45 minutos",
    nivel: "Intermedio",
    descripcion: "Herramientas para documentar recetas, porciones, rendimientos y criterios de calidad.",
    modulos: [
      { titulo: "Qué debe contener una receta estándar", tipo: "Video" },
      { titulo: "Rendimientos, porciones y control de calidad", tipo: "PDF" },
      { titulo: "Evaluación", tipo: "Quiz" },
    ],
    quiz: [
      { p: "Una receta estándar sirve para:", opciones: ["Improvisar cantidades", "Repetir un producto con resultados consistentes", "Eliminar el control de costos", "Cambiar el menú diariamente"], correcta: 1 },
      { p: "El rendimiento indica:", opciones: ["El número de proveedores", "La cantidad de producto útil obtenida", "El precio de venta", "El tiempo de apertura"], correcta: 1 },
    ],
  },
  {
    id: "administracion-101",
    categoria: "Administración de Establecimientos",
    nombre: "Administración operativa para alimentos",
    duracion: "50 minutos",
    nivel: "Intermedio",
    descripcion: "Organización de equipos, compras, inventarios y rutinas operativas para establecimientos de alimentos.",
    modulos: [
      { titulo: "Roles, turnos y responsabilidades", tipo: "Video" },
      { titulo: "Compras, inventario e indicadores", tipo: "PDF" },
      { titulo: "Evaluación", tipo: "Quiz" },
    ],
    quiz: [
      { p: "Un inventario confiable ayuda a:", opciones: ["Controlar existencias y tomar decisiones de compra", "Eliminar los registros", "Aumentar la merma", "Evitar las fechas de vencimiento"], correcta: 0 },
      { p: "Una responsabilidad operativa debe ser:", opciones: ["Ambigua", "Verbal y cambiante", "Clara y asignada", "Exclusiva del cliente"], correcta: 2 },
    ],
  },
  {
    id: "auditoria-101",
    categoria: "Auditorías y Diagnóstico",
    nombre: "Cómo realizar un diagnóstico sanitario",
    duracion: "40 minutos",
    nivel: "Intermedio",
    descripcion: "Planeación de auditorías, levantamiento de hallazgos y priorización de acciones de mejora.",
    modulos: [
      { titulo: "Preparación y lista de verificación", tipo: "Video" },
      { titulo: "Hallazgos, evidencias y plan de acción", tipo: "PDF" },
      { titulo: "Evaluación", tipo: "Quiz" },
    ],
    quiz: [
      { p: "Un hallazgo debe sustentarse con:", opciones: ["Suposiciones", "Evidencia verificable", "Opiniones del equipo", "Un mensaje informal"], correcta: 1 },
      { p: "Un plan de acción debe indicar:", opciones: ["Solo el problema", "Acción, responsable y fecha", "Únicamente el costo", "El nombre del cliente"], correcta: 1 },
    ],
  },
  {
    id: "acompanamiento-101",
    categoria: "Acompañamiento Empresarial",
    nombre: "Implementación y mejora continua",
    duracion: "45 minutos",
    nivel: "Intermedio",
    descripcion: "Método para convertir el diagnóstico en un plan de trabajo, seguimiento y resultados medibles.",
    modulos: [
      { titulo: "Del diagnóstico al plan de trabajo", tipo: "Video" },
      { titulo: "Seguimiento, indicadores y cierre", tipo: "PDF" },
      { titulo: "Evaluación", tipo: "Quiz" },
    ],
    quiz: [
      { p: "El seguimiento debe realizarse:", opciones: ["Solo al final", "De forma periódica con evidencias", "Sin responsables", "Cuando aparezca un problema"], correcta: 1 },
      { p: "Un indicador sirve para:", opciones: ["Medir avances y resultados", "Reemplazar los objetivos", "Evitar reuniones", "Ocultar hallazgos"], correcta: 0 },
    ],
  },
  {
    id: "manuales-101",
    categoria: "Manuales y Procedimientos",
    nombre: "Diseño de manuales operativos",
    duracion: "35 minutos",
    nivel: "Básico",
    descripcion: "Principios para documentar procedimientos claros, aplicables y fáciles de actualizar.",
    modulos: [
      { titulo: "Estructura de un procedimiento", tipo: "Video" },
      { titulo: "Redacción, responsables y control de versiones", tipo: "PDF" },
      { titulo: "Evaluación", tipo: "Quiz" },
    ],
    quiz: [
      { p: "Un procedimiento debe explicar:", opciones: ["Qué se hace, cómo, cuándo y quién", "Solo el nombre de la tarea", "La historia de la empresa", "Únicamente el resultado"], correcta: 0 },
      { p: "El control de versiones permite:", opciones: ["Evitar actualizar documentos", "Saber cuál es la versión vigente", "Eliminar responsables", "Duplicar procedimientos"], correcta: 1 },
    ],
  },
];

/* ---------------------------------------------------------------
   STORAGE HELPERS (personal, per-user demo persistence)
--------------------------------------------------------------- */
async function loadJSON(key, fallback) {
  try {
    const r = await window.storage.get(key, false);
    return r ? JSON.parse(r.value) : fallback;
  } catch {
    return fallback;
  }
}
async function saveJSON(key, value) {
  try {
    await window.storage.set(key, JSON.stringify(value), false);
  } catch (e) {
    console.error("storage error", e);
  }
}
function genCertCode() {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `IF-2026-${rand}`;
}

/* ---------------------------------------------------------------
   SIGNATURE ELEMENT — audit/quality seal
--------------------------------------------------------------- */
function Seal({ size = 120, color = T.clay, label = "INGENIA FOOD · CERTIFICADO ·" }) {
  const id = useMemo(() => "sealpath" + Math.random().toString(36).slice(2, 8), []);
  const r = size / 2 - 10;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
      <defs>
        <path id={id} d={`M ${size / 2},${size / 2} m -${r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`} />
      </defs>
      <circle cx={size / 2} cy={size / 2} r={size / 2 - 3} fill="none" stroke={color} strokeWidth="2" opacity="0.9" />
      <circle cx={size / 2} cy={size / 2} r={size / 2 - 8} fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <text fill={color} fontSize={size * 0.075} letterSpacing="2" style={monoFont}>
        <textPath href={`#${id}`} startOffset="0%">{label.repeat(2)}</textPath>
      </text>
      <path
        d={`M ${size * 0.32} ${size * 0.52} l ${size * 0.14} ${size * 0.14} l ${size * 0.24} -${size * 0.28}`}
        fill="none" stroke={color} strokeWidth={size * 0.045} strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------------------------------------------------------------
   SHARED UI
--------------------------------------------------------------- */
function Eyebrow({ children }) {
  return (
    <div style={{ ...monoFont, color: T.gold, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>
      {children}
    </div>
  );
}

function TicketCard({ children, style }) {
  return (
    <div
      style={{
        background: T.bgCard,
        border: `1px solid ${T.line}`,
        borderRadius: 4,
        position: "relative",
        ...style,
      }}
    >
      <div style={{
        position: "absolute", top: 14, left: 0, right: 0, height: 0,
        borderTop: `1px dashed ${T.line}`, opacity: 0,
      }} />
      {children}
    </div>
  );
}

function Progress({ pct, color = T.steel }) {
  return (
    <div style={{ background: "#E7E9E1", borderRadius: 20, height: 8, overflow: "hidden", width: "100%" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 20, transition: "width .4s" }} />
    </div>
  );
}

function Button({ children, onClick, variant = "primary", style, type = "button" }) {
  const base = {
    padding: "12px 22px", borderRadius: 3, fontSize: 14, fontWeight: 600,
    cursor: "pointer", border: "none", display: "inline-flex", alignItems: "center", gap: 8,
    letterSpacing: 0.2, transition: "transform .15s, opacity .15s",
  };
  const variants = {
    primary: { background: T.ink, color: "#fff" },
    gold: { background: T.gold, color: "#fff" },
    outline: { background: "transparent", color: T.ink, border: `1px solid ${T.ink}` },
    ghost: { background: "transparent", color: T.inkSoft },
  };
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
    >
      {children}
    </button>
  );
}

/* ---------------------------------------------------------------
   NAV
--------------------------------------------------------------- */
function Nav({ page, setPage, user, onLogout }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["home", "Inicio"], ["quienes", "Quiénes somos"], ["servicios", "Servicios"],
    ["capacitaciones", "Capacitaciones"], ["donde", "Dónde estamos"], ["contacto", "Contacto"],
  ];
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,249,244,0.92)", backdropFilter: "blur(6px)", borderBottom: `1px solid ${T.line}` }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}>
          <img src="./ingenia-food-logo.svg" alt="Ingenia Food" style={{ width: 184, height: "auto" }} />
        </button>

        <div className="ingenia-desktop-nav" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {links.map(([id, label]) => (
            <button key={id} onClick={() => setPage(id)}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: page === id ? T.gold : T.inkSoft, fontWeight: page === id ? 600 : 500 }}>
              {label}
            </button>
          ))}
          {user ? (
            <>
              <Button variant="outline" onClick={() => setPage("dashboard")}><UserIcon size={14} /> {user.nombre.split(" ")[0]}</Button>
              <Button variant="ghost" onClick={onLogout}><LogOut size={14} /></Button>
            </>
          ) : (
            <Button variant="gold" onClick={() => setPage("login")}>Iniciar sesión</Button>
          )}
        </div>

        <button className="ingenia-mobile-btn" onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none" }}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="ingenia-mobile-menu" style={{ display: "none", flexDirection: "column", padding: 16, gap: 14, borderTop: `1px solid ${T.line}` }}>
          {links.map(([id, label]) => (
            <button key={id} onClick={() => { setPage(id); setOpen(false); }} style={{ textAlign: "left", background: "none", border: "none", fontSize: 15, color: T.ink }}>{label}</button>
          ))}
          <Button variant="gold" onClick={() => { setPage(user ? "dashboard" : "login"); setOpen(false); }}>
            {user ? "Mi panel" : "Iniciar sesión"}
          </Button>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .ingenia-desktop-nav { display: none !important; }
          .ingenia-mobile-btn { display: block !important; }
          .ingenia-mobile-menu { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ borderTop: `1px solid ${T.line}`, marginTop: 100, padding: "40px 24px", background: T.ink, color: "#fff" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 24 }}>
        <div>
          <div style={{ ...displayFont, fontSize: 18, fontWeight: 700 }}>Ingenia Food</div>
          <div style={{ fontSize: 13, opacity: 0.7, marginTop: 6, maxWidth: 320 }}>
            Consultoría, capacitación y acompañamiento para el sector de alimentos.
          </div>
        </div>
        <div style={{ display: "flex", gap: 36, fontSize: 13, flexWrap: "wrap" }}>
          <button onClick={() => setPage("validar")} style={{ background: "none", border: "none", color: "#fff", opacity: 0.85, cursor: "pointer", textAlign: "left" }}>Validar certificado</button>
          <button onClick={() => setPage("contacto")} style={{ background: "none", border: "none", color: "#fff", opacity: 0.85, cursor: "pointer", textAlign: "left" }}>Contacto</button>
          <button onClick={() => setPage("servicios")} style={{ background: "none", border: "none", color: "#fff", opacity: 0.85, cursor: "pointer", textAlign: "left" }}>Servicios</button>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------
   PAGES — public site
--------------------------------------------------------------- */
function Home({ setPage }) {
  return (
    <div>
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "90px 24px 60px", display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: 60, alignItems: "center" }}>
        <div>
          <Eyebrow>Consultoría · Capacitación · Alimentos</Eyebrow>
          <h1 style={{ ...displayFont, fontSize: "clamp(34px, 5vw, 54px)", color: T.ink, lineHeight: 1.08, fontWeight: 600, margin: 0 }}>
            Transformamos el conocimiento en <em style={{ color: T.gold, fontStyle: "italic" }}>mejores procesos</em> para tu empresa de alimentos.
          </h1>
          <p style={{ color: T.inkSoft, fontSize: 17, lineHeight: 1.6, marginTop: 22, maxWidth: 540 }}>
            Acompañamos a empresas del sector gastronómico en procesos de capacitación, estandarización, calidad, costos, BPM y administración.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 30, flexWrap: "wrap" }}>
            <Button variant="gold" onClick={() => setPage("servicios")}>Conoce nuestros servicios <ArrowRight size={15} /></Button>
            <Button variant="outline" onClick={() => setPage("capacitaciones")}>Accede a nuestras capacitaciones</Button>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", padding: 28, borderRadius: 20, background: "#fff", border: `1px solid ${T.line}`, width: "min(100%, 430px)" }}>
          <img src="./ingenia-food-logo.svg" alt="Logo de Ingenia Food" style={{ width: "100%", height: "auto" }} />
        </div>
      </section>

      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "40px 24px 90px" }}>
        <Eyebrow>¿Qué hacemos?</Eyebrow>
        <h2 style={{ ...displayFont, fontSize: 30, color: T.ink, marginBottom: 30 }}>Diez frentes, un mismo objetivo: procesos mejores.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 16 }}>
          {HOME_CARDS.map((c, i) => (
            <TicketCard key={i} style={{ padding: "22px 18px" }}>
              <c.icon size={20} color={T.steel} />
              <div style={{ fontSize: 14.5, fontWeight: 600, color: T.ink, marginTop: 14 }}>{c.title}</div>
              <button onClick={() => setPage("servicios")} style={{ marginTop: 12, fontSize: 12.5, color: T.gold, background: "none", border: "none", cursor: "pointer", padding: 0, fontWeight: 600 }}>
                Ver más →
              </button>
            </TicketCard>
          ))}
        </div>
      </section>
    </div>
  );
}

function Quienes() {
  const props = [
    ["Conocimiento", "Capacitación basada en conceptos técnicos y aplicación práctica."],
    ["Acompañamiento", "No solamente entregamos información; acompañamos la implementación."],
    ["Estandarización", "Ayudamos a convertir los procesos en procedimientos claros y medibles."],
    ["Rentabilidad", "Integramos calidad y operación con herramientas de costos y administración."],
  ];
  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "70px 24px" }}>
      <Eyebrow>Quiénes somos</Eyebrow>
      <h1 style={{ ...displayFont, fontSize: 36, color: T.ink, maxWidth: 720 }}>
        Convertimos el conocimiento técnico en procesos que sí se aplican.
      </h1>
      <p style={{ color: T.inkSoft, fontSize: 16, lineHeight: 1.7, maxWidth: 680, marginTop: 18 }}>
        Ingenia Food es una empresa de consultoría y capacitación especializada en el sector de alimentos, enfocada en ayudar a restaurantes, cafeterías, empresas gastronómicas y establecimientos de alimentos a mejorar sus procesos mediante conocimiento práctico, estandarización y acompañamiento. Nuestro trabajo integra aspectos de calidad, inocuidad, operación, administración y rentabilidad. Buscamos que nuestros clientes no solamente conozcan los procedimientos, sino que puedan aplicarlos correctamente en sus operaciones diarias.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 16, marginTop: 50 }}>
        {props.map(([t, d]) => (
          <TicketCard key={t} style={{ padding: 24 }}>
            <div style={{ ...displayFont, fontWeight: 700, fontSize: 19, color: T.gold }}>{t}</div>
            <div style={{ fontSize: 14, color: T.inkSoft, marginTop: 8, lineHeight: 1.55 }}>{d}</div>
          </TicketCard>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 60 }}>
        <div style={{ background: T.ink, color: "#fff", padding: 30, borderRadius: 4 }}>
          <div style={{ ...monoFont, fontSize: 12, letterSpacing: 2, color: T.gold, marginBottom: 10 }}>MISIÓN</div>
          <p style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.92 }}>
            Brindar soluciones de consultoría, capacitación y acompañamiento al sector de alimentos, contribuyendo al fortalecimiento de sus procesos, la calidad, la inocuidad y la rentabilidad.
          </p>
        </div>
        <div style={{ border: `1px solid ${T.line}`, padding: 30, borderRadius: 4 }}>
          <div style={{ ...monoFont, fontSize: 12, letterSpacing: 2, color: T.steel, marginBottom: 10 }}>VISIÓN</div>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: T.inkSoft }}>
            Ser una empresa reconocida en Colombia por transformar el conocimiento técnico en herramientas prácticas que permitan a las empresas de alimentos mejorar continuamente sus procesos y resultados.
          </p>
        </div>
      </div>
    </div>
  );
}

function Servicios() {
  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "70px 24px" }}>
      <Eyebrow>Servicios</Eyebrow>
      <h1 style={{ ...displayFont, fontSize: 36, color: T.ink, marginBottom: 40 }}>Nuestros servicios</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {SERVICIOS.map((s, i) => (
          <div key={s.id} style={{ display: "grid", gridTemplateColumns: "60px 1fr 1.4fr", gap: 24, padding: "30px 0", borderTop: `1px solid ${T.line}` }}>
            <div style={{ ...monoFont, color: T.inkFaint, fontSize: 13 }}>{String(i + 1).padStart(2, "0")}</div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <s.icon size={20} color={T.gold} style={{ marginTop: 3 }} />
              <div style={{ ...displayFont, fontSize: 20, fontWeight: 600, color: T.ink }}>{s.title}</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {s.items.map((it) => (
                <span key={it} style={{ fontSize: 12.5, color: T.inkSoft, border: `1px solid ${T.line}`, borderRadius: 20, padding: "5px 12px" }}>{it}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Capacitaciones({ setPage, setActiveCourse }) {
  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "70px 24px" }}>
      <Eyebrow>Plataforma educativa</Eyebrow>
      <h1 style={{ ...displayFont, fontSize: 36, color: T.ink, marginBottom: 10 }}>Capacitaciones disponibles</h1>
      <p style={{ color: T.inkSoft, fontSize: 15, marginBottom: 40, maxWidth: 600 }}>
        Regístrate para inscribirte, avanzar por módulos, presentar la evaluación y obtener tu certificado.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 18 }}>
        {COURSES.map((c) => (
          <TicketCard key={c.id} style={{ padding: 24 }}>
            <div style={{ ...monoFont, fontSize: 11, color: T.steel, letterSpacing: 1.5 }}>{c.categoria.toUpperCase()}</div>
            <div style={{ ...displayFont, fontSize: 20, fontWeight: 600, color: T.ink, marginTop: 8 }}>{c.nombre}</div>
            <p style={{ fontSize: 13.5, color: T.inkSoft, marginTop: 8, lineHeight: 1.5 }}>{c.descripcion}</p>
            <div style={{ display: "flex", gap: 14, marginTop: 16, fontSize: 12.5, color: T.inkFaint }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Clock size={13} /> {c.duracion}</span>
              <span>{c.nivel}</span>
            </div>
            <Button variant="outline" style={{ marginTop: 18, width: "100%", justifyContent: "center" }}
              onClick={() => { setActiveCourse(c.id); setPage("login"); }}>
              Empezar capacitación
            </Button>
          </TicketCard>
        ))}
      </div>
    </div>
  );
}

function Donde() {
  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "70px 24px" }}>
      <Eyebrow>Cobertura</Eyebrow>
      <h1 style={{ ...displayFont, fontSize: 36, color: T.ink, marginBottom: 30 }}>¿Dónde estamos?</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: 14 }}>
        {CIUDADES.map((c) => (
          <div key={c} style={{ border: `1px solid ${T.line}`, borderRadius: 4, padding: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <MapPin size={17} color={T.gold} />
            <span style={{ fontSize: 15, color: T.ink, fontWeight: 600 }}>{c}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 13, color: T.inkFaint, marginTop: 20 }}>Direcciones específicas se publicarán próximamente.</p>
    </div>
  );
}

function Contacto() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "70px 24px" }}>
      <Eyebrow>Contacto</Eyebrow>
      <h1 style={{ ...displayFont, fontSize: 32, color: T.ink, marginBottom: 30 }}>Hablemos de tu operación</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 14 }}>
        <a href="mailto:ingeniafood.sac@gmail.com" style={{ ...contactCardStyle, textDecoration: "none" }}>
          <Mail size={22} color={T.gold} />
          <span style={contactLabelStyle}>Correo</span>
          <span style={contactValueStyle}>ingeniafood.sac@gmail.com</span>
        </a>
        <a href="https://wa.me/573104572080" target="_blank" rel="noreferrer" style={{ ...contactCardStyle, textDecoration: "none" }}>
          <Phone size={22} color={T.gold} />
          <span style={contactLabelStyle}>WhatsApp</span>
          <span style={contactValueStyle}>310 457 2080</span>
        </a>
        <a href="https://www.instagram.com/ingeniafood_/" target="_blank" rel="noreferrer" style={{ ...contactCardStyle, textDecoration: "none" }}>
          <Instagram size={22} color={T.gold} />
          <span style={contactLabelStyle}>Instagram</span>
          <span style={contactValueStyle}>@ingeniafood_</span>
        </a>
      </div>
    </div>
  );
}

const contactCardStyle = {
  display: "grid", gap: 8, padding: 22, background: "#fff", border: `1px solid ${T.line}`,
  borderRadius: 4, color: T.ink,
};
const contactLabelStyle = { fontWeight: 700, fontSize: 14, color: T.ink };
const contactValueStyle = { fontSize: 13, color: T.inkSoft, overflowWrap: "anywhere" };

const inputStyle = {
  padding: "12px 14px", border: `1px solid ${T.line}`, borderRadius: 3, fontSize: 14,
  background: "#fff", color: T.ink, outline: "none", fontFamily: "inherit",
};

/* ---------------------------------------------------------------
   AUTH
--------------------------------------------------------------- */
function Login({ setPage, onAuth }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ nombre: "", documento: "", email: "", telefono: "", empresa: "", cargo: "", password: "" });
  const [error, setError] = useState("");

  const handle = async (e) => {
    e.preventDefault();
    setError("");
    if (mode === "register") {
      if (!form.nombre || !form.email || !form.password) { setError("Completa nombre, correo y contraseña."); return; }
      await saveJSON(`user:${form.email}`, form);
      onAuth(form);
      setPage("dashboard");
    } else {
      const existing = await loadJSON(`user:${form.email}`, null);
      if (!existing || existing.password !== form.password) { setError("Credenciales no encontradas. Prueba registrarte."); return; }
      onAuth(existing);
      setPage("dashboard");
    }
  };

  return (
    <div style={{ maxWidth: 460, margin: "0 auto", padding: "80px 24px" }}>
      <div style={{ display: "flex", gap: 20, marginBottom: 26, borderBottom: `1px solid ${T.line}` }}>
        {["login", "register"].map((m) => (
          <button key={m} onClick={() => setMode(m)} style={{
            background: "none", border: "none", cursor: "pointer", padding: "0 0 12px",
            borderBottom: mode === m ? `2px solid ${T.gold}` : "2px solid transparent",
            color: mode === m ? T.ink : T.inkFaint, fontWeight: 600, fontSize: 14,
          }}>
            {m === "login" ? "Iniciar sesión" : "Crear cuenta"}
          </button>
        ))}
      </div>
      <form onSubmit={handle} style={{ display: "grid", gap: 12 }}>
        {mode === "register" && (
          <>
            <input placeholder="Nombre completo" style={inputStyle} value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
            <input placeholder="Documento de identificación" style={inputStyle} value={form.documento} onChange={(e) => setForm({ ...form, documento: e.target.value })} />
            <input placeholder="Empresa" style={inputStyle} value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} />
            <input placeholder="Cargo" style={inputStyle} value={form.cargo} onChange={(e) => setForm({ ...form, cargo: e.target.value })} />
            <input placeholder="Teléfono" style={inputStyle} value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
          </>
        )}
        <input placeholder="Correo electrónico" type="email" style={inputStyle} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Contraseña" type="password" style={inputStyle} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <div style={{ color: T.clay, fontSize: 13 }}>{error}</div>}
        <Button variant="gold" type="submit" style={{ justifyContent: "center", marginTop: 6 }}>
          <Lock size={14} /> {mode === "login" ? "Entrar" : "Crear cuenta"}
        </Button>
      </form>
    </div>
  );
}

/* ---------------------------------------------------------------
   DASHBOARD / LMS
--------------------------------------------------------------- */
function Dashboard({ user, progress, setPage, setActiveCourse }) {
  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "60px 24px" }}>
      <Eyebrow>Mi formación en Ingenia Food</Eyebrow>
      <h1 style={{ ...displayFont, fontSize: 30, color: T.ink }}>Bienvenido, {user.nombre.split(" ")[0]}</h1>

      <h2 style={{ fontSize: 15, fontWeight: 700, color: T.inkSoft, marginTop: 40, marginBottom: 16 }}>Mis capacitaciones</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: 16 }}>
        {COURSES.map((c) => {
          const p = progress[c.id] || { pct: 0, done: false, cert: null };
          return (
            <TicketCard key={c.id} style={{ padding: 22, cursor: "pointer" }} onClick={() => { setActiveCourse(c.id); setPage("curso"); }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ ...monoFont, fontSize: 11, color: T.steel }}>{c.categoria.toUpperCase()}</div>
                  <div style={{ ...displayFont, fontSize: 17, fontWeight: 600, color: T.ink, marginTop: 4 }}>{c.nombre}</div>
                </div>
                {p.done ? <BadgeCheck size={20} color={T.gold} /> : <Circle size={18} color={T.line} />}
              </div>
              <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <Progress pct={p.pct} color={p.done ? T.gold : T.steel} />
                <span style={{ fontSize: 12.5, color: T.inkFaint, ...monoFont, width: 38 }}>{p.pct}%</span>
              </div>
            </TicketCard>
          );
        })}
      </div>
    </div>
  );
}

function CourseView({ course, progress, setProgress, setPage }) {
  const [modIdx, setModIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const p = progress[course.id] || { pct: 0, done: false, cert: null };

  const goModule = (i) => {
    setModIdx(i);
    const pct = Math.round(((i + 1) / course.modulos.length) * 90);
    const next = { ...p, pct: Math.max(p.pct, pct) };
    setProgress({ ...progress, [course.id]: next });
  };

  const submitQuiz = () => {
    let correct = 0;
    course.quiz.forEach((q, i) => { if (answers[i] === q.correcta) correct++; });
    const scorePct = Math.round((correct / course.quiz.length) * 100);
    const passed = scorePct >= 80;
    const cert = passed ? { code: genCertCode(), fecha: new Date().toLocaleDateString("es-CO"), score: scorePct } : p.cert;
    const next = { pct: passed ? 100 : p.pct, done: passed, cert };
    setProgress({ ...progress, [course.id]: next });
    setResult({ passed, scorePct });
  };

  const lastModule = modIdx === course.modulos.length - 1;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>
      <button onClick={() => setPage("dashboard")} style={{ background: "none", border: "none", color: T.inkFaint, fontSize: 13, cursor: "pointer", marginBottom: 20 }}>← Volver a mi panel</button>
      <Eyebrow>{course.categoria}</Eyebrow>
      <h1 style={{ ...displayFont, fontSize: 30, color: T.ink }}>{course.nombre}</h1>
      <div style={{ display: "flex", gap: 16, fontSize: 12.5, color: T.inkFaint, marginTop: 10 }}>
        <span>{course.duracion}</span><span>·</span><span>{course.nivel}</span>
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 30, marginBottom: 30, flexWrap: "wrap" }}>
        {course.modulos.map((m, i) => (
          <button key={i} onClick={() => goModule(i)} style={{
            padding: "8px 14px", borderRadius: 20, fontSize: 12.5, cursor: "pointer",
            border: `1px solid ${modIdx === i ? T.ink : T.line}`,
            background: modIdx === i ? T.ink : "transparent", color: modIdx === i ? "#fff" : T.inkSoft,
          }}>
            Módulo {i + 1}
          </button>
        ))}
      </div>

      {!lastModule || result === null ? (
        lastModule ? (
          <TicketCard style={{ padding: 28 }}>
            <div style={{ fontWeight: 700, color: T.ink, marginBottom: 4 }}>Evaluación</div>
            <div style={{ fontSize: 12.5, color: T.inkFaint, marginBottom: 20 }}>Puntaje mínimo de aprobación: 80%</div>
            {course.quiz.map((q, qi) => (
              <div key={qi} style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 14, color: T.ink, marginBottom: 10, fontWeight: 600 }}>{qi + 1}. {q.p}</div>
                <div style={{ display: "grid", gap: 8 }}>
                  {q.opciones.map((op, oi) => (
                    <label key={oi} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: T.inkSoft, cursor: "pointer" }}>
                      <input type="radio" name={`q${qi}`} checked={answers[qi] === oi} onChange={() => setAnswers({ ...answers, [qi]: oi })} />
                      {op}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <Button variant="gold" onClick={submitQuiz}>Enviar evaluación</Button>
          </TicketCard>
        ) : (
          <TicketCard style={{ padding: 28 }}>
            <div style={{ ...monoFont, fontSize: 11, color: T.steel, marginBottom: 10 }}>{course.modulos[modIdx].tipo.toUpperCase()}</div>
            <div style={{ ...displayFont, fontSize: 20, color: T.ink, fontWeight: 600 }}>{course.modulos[modIdx].titulo}</div>
            <p style={{ color: T.inkSoft, fontSize: 14, marginTop: 14, lineHeight: 1.6 }}>
              Contenido de ejemplo para este módulo. Aquí se incrustaría el video, PDF o presentación real.
            </p>
            <Button variant="outline" style={{ marginTop: 20 }} onClick={() => goModule(Math.min(modIdx + 1, course.modulos.length - 1))}>
              Siguiente módulo <ArrowRight size={14} />
            </Button>
          </TicketCard>
        )
      ) : result.passed ? (
        <TicketCard style={{ padding: 30, textAlign: "center" }}>
          <BadgeCheck size={30} color={T.gold} style={{ margin: "0 auto" }} />
          <div style={{ ...displayFont, fontSize: 22, color: T.ink, marginTop: 12 }}>¡Aprobaste con {result.scorePct}%!</div>
          <Button variant="gold" style={{ marginTop: 18 }} onClick={() => setPage("certificado")}>
            <Download size={14} /> Ver certificado
          </Button>
        </TicketCard>
      ) : (
        <TicketCard style={{ padding: 30, textAlign: "center" }}>
          <div style={{ ...displayFont, fontSize: 20, color: T.clay }}>Obtuviste {result.scorePct}%</div>
          <p style={{ color: T.inkSoft, fontSize: 13.5, marginTop: 6 }}>Necesitas 80% para aprobar.</p>
          <Button variant="outline" style={{ marginTop: 16 }} onClick={() => { setResult(null); setAnswers({}); }}>Reintentar evaluación</Button>
        </TicketCard>
      )}
    </div>
  );
}

function Certificado({ user, course, progress }) {
  const p = progress[course.id];
  if (!p?.cert) return <div style={{ padding: 80, textAlign: "center", color: T.inkFaint }}>Aún no tienes un certificado para este curso.</div>;
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "70px 24px" }}>
      <TicketCard style={{ padding: 44, textAlign: "center", border: `1.5px solid ${T.ink}` }}>
        <div style={{ ...monoFont, fontSize: 12, letterSpacing: 3, color: T.inkFaint }}>INGENIA FOOD</div>
        <div style={{ color: T.inkSoft, fontSize: 14, marginTop: 22 }}>Certifica que</div>
        <div style={{ ...displayFont, fontSize: 28, color: T.ink, fontWeight: 700, marginTop: 8 }}>{user.nombre}</div>
        <div style={{ color: T.inkSoft, fontSize: 14, marginTop: 14 }}>ha completado satisfactoriamente la capacitación</div>
        <div style={{ ...displayFont, fontSize: 20, color: T.gold, fontWeight: 600, marginTop: 6 }}>{course.nombre}</div>

        <div style={{ display: "flex", justifyContent: "center", margin: "30px 0" }}>
          <Seal size={110} />
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 30, fontSize: 12.5, color: T.inkFaint, ...monoFont }}>
          <span>FECHA: {p.cert.fecha}</span>
          <span>RESULTADO: {p.cert.score}%</span>
        </div>
        <div style={{ ...monoFont, fontSize: 13, color: T.ink, marginTop: 14, fontWeight: 700 }}>{p.cert.code}</div>
        <Button variant="outline" style={{ marginTop: 24 }} onClick={() => window.print()}><Download size={14} /> Descargar / imprimir</Button>
      </TicketCard>
    </div>
  );
}

function Validar({ progress }) {
  const [code, setCode] = useState("");
  const [found, setFound] = useState(undefined);

  const check = (e) => {
    e.preventDefault();
    let match = null;
    Object.entries(progress).forEach(([cid, p]) => {
      if (p.cert && p.cert.code.toUpperCase() === code.trim().toUpperCase()) {
        const course = COURSES.find((c) => c.id === cid);
        match = { course, cert: p.cert };
      }
    });
    setFound(match);
  };

  return (
    <div style={{ maxWidth: 520, margin: "0 auto", padding: "80px 24px" }}>
      <Eyebrow>Validación</Eyebrow>
      <h1 style={{ ...displayFont, fontSize: 28, color: T.ink, marginBottom: 24 }}>Validar certificado</h1>
      <form onSubmit={check} style={{ display: "flex", gap: 10 }}>
        <input placeholder="IF-2026-XXXXXX" style={{ ...inputStyle, flex: 1, ...monoFont }} value={code} onChange={(e) => setCode(e.target.value)} />
        <Button variant="gold" type="submit">Validar</Button>
      </form>
      {found !== undefined && (
        <TicketCard style={{ padding: 22, marginTop: 22 }}>
          {found ? (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: T.steel, fontWeight: 700, fontSize: 14 }}><CheckCircle2 size={16} /> Certificado válido</div>
              <div style={{ marginTop: 12, fontSize: 14, color: T.ink }}>{found.course.nombre}</div>
              <div style={{ fontSize: 13, color: T.inkFaint, marginTop: 4 }}>Fecha: {found.cert.fecha} · Resultado: {found.cert.score}%</div>
            </>
          ) : (
            <div style={{ color: T.clay, fontSize: 14 }}>No se encontró ningún certificado con ese código.</div>
          )}
        </TicketCard>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   ROOT
--------------------------------------------------------------- */
export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [activeCourseId, setActiveCourse] = useState(COURSES[0].id);
  const [progress, setProgressState] = useState({});
  const activeCourse = COURSES.find((c) => c.id === activeCourseId) || COURSES[0];

  useEffect(() => {
    if (user) loadJSON(`progress:${user.email}`, {}).then(setProgressState);
  }, [user]);

  const setProgress = (next) => {
    setProgressState(next);
    if (user) saveJSON(`progress:${user.email}`, next);
  };

  const onAuth = (u) => setUser(u);
  const onLogout = () => { setUser(null); setProgressState({}); setPage("home"); };

  const guarded = (node) => (user ? node : <Login setPage={setPage} onAuth={onAuth} />);

  let body;
  switch (page) {
    case "home": body = <Home setPage={setPage} />; break;
    case "quienes": body = <Quienes />; break;
    case "servicios": body = <Servicios />; break;
    case "capacitaciones": body = <Capacitaciones setPage={setPage} setActiveCourse={setActiveCourse} />; break;
    case "donde": body = <Donde />; break;
    case "contacto": body = <Contacto />; break;
    case "login": body = <Login setPage={setPage} onAuth={onAuth} />; break;
    case "dashboard": body = guarded(<Dashboard user={user} progress={progress} setPage={setPage} setActiveCourse={setActiveCourse} />); break;
    case "curso": body = guarded(<CourseView course={activeCourse} progress={progress} setProgress={setProgress} setPage={setPage} />); break;
    case "certificado": body = guarded(<Certificado user={user} course={activeCourse} progress={progress} />); break;
    case "validar": body = <Validar progress={progress} />; break;
    default: body = <Home setPage={setPage} />;
  }

  return (
    <div style={{ background: T.bg, minHeight: "100vh", color: T.ink, fontFamily: "'Inter', sans-serif" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,500;0,600;0,700;1,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
      <Nav page={page} setPage={setPage} user={user} onLogout={onLogout} />
      {body}
      <Footer setPage={setPage} />
    </div>
  );
}
