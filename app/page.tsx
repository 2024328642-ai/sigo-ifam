"use client";

import { FormEvent, ReactNode, useMemo, useState } from "react";

type Page =
  | "Dashboard"
  | "Registrar ocorrência"
  | "Alunos"
  | "Ocorrências"
  | "Alertas"
  | "Progressão disciplinar"
  | "Assistência Social"
  | "Relatórios"
  | "Configurações"
  | "Usuários"
  | "Perfil do aluno"
  | "Notificação aos responsáveis"
  | "Detalhes do acompanhamento"
  | "Login";

type IconName =
  | "grid"
  | "plus"
  | "users"
  | "clipboard"
  | "bell"
  | "steps"
  | "heart"
  | "chart"
  | "settings"
  | "search"
  | "chevron"
  | "calendar"
  | "clock"
  | "filter"
  | "arrow"
  | "shield"
  | "menu"
  | "check"
  | "user"
  | "logout"
  | "download"
  | "lock";

const paths: Record<IconName, ReactNode> = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><path d="M20 8v6M23 11h-6" /></>,
  clipboard: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V2h6v2M9 10h6M9 14h6M9 18h4" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
  steps: <><path d="M4 19h4v-4h4v-4h4V7h4M4 5h5" /></>,
  heart: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" /></>,
  chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  chevron: <path d="m9 18 6-6-6-6" />,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  filter: <path d="M4 5h16l-6 7v5l-4 2v-7Z" />,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  check: <path d="m5 12 4 4L19 6" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></>,
  download: <><path d="M12 3v12M7 10l5 5 5-5M5 21h14" /></>,
  lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
};

function Icon({ name, size = 19 }: { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{paths[name]}</svg>;
}

function Button({ children, variant = "primary", icon, onClick, type = "button", className = "", disabled = false }: { children: ReactNode; variant?: "primary" | "secondary" | "ghost" | "danger"; icon?: IconName; onClick?: () => void; type?: "button" | "submit"; className?: string; disabled?: boolean }) {
  return <button className={`button button-${variant} ${className}`} onClick={onClick} type={type} disabled={disabled}>{icon && <Icon name={icon} size={17} />}<span>{children}</span></button>;
}

function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: ReactNode }) {
  return <label className="field"><span className="field-label">{label}</span>{children}{hint && <span className="field-hint">{hint}</span>}{error && <span className="field-error">{error}</span>}</label>;
}

function Input({ placeholder, type = "text", defaultValue, icon, required = false, value, onChange, max }: { placeholder?: string; type?: string; defaultValue?: string; icon?: IconName; required?: boolean; value?: string; onChange?: (v: string) => void; max?: string }) {
  const controlled = value !== undefined ? { value, onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value) } : { defaultValue };
  return <span className="input-wrap">{icon && <Icon name={icon} size={18} />}<input className="input" placeholder={placeholder} type={type} required={required} max={max} {...controlled} /></span>;
}

function Select({ children, defaultValue }: { children: ReactNode; defaultValue?: string }) {
  return <select className="input" defaultValue={defaultValue}>{children}</select>;
}

function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "success" | "warning" | "danger" | "info" }) {
  return <span className={`badge badge-${tone}`}><span className="badge-dot" />{children}</span>;
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function PageTitle({ eyebrow, title, subtitle, action }: { eyebrow?: string; title: string; subtitle?: string; action?: ReactNode }) {
  return <div className="page-title"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>{action}</div>;
}

const nav: { name: Page; icon: IconName }[] = [
  { name: "Dashboard", icon: "grid" },
  { name: "Registrar ocorrência", icon: "plus" },
  { name: "Alunos", icon: "users" },
  { name: "Ocorrências", icon: "clipboard" },
  { name: "Alertas", icon: "bell" },
  { name: "Progressão disciplinar", icon: "steps" },
  { name: "Assistência Social", icon: "heart" },
  { name: "Relatórios", icon: "chart" },
  { name: "Configurações", icon: "settings" },
];

const students = [
  { initials: "AC", name: "Ana Carolina Mendes", id: "20240187", turma: "1º A — Informática", count: 3, level: "Advertência verbal", status: "Requer análise" },
  { initials: "BR", name: "Bruno Ribeiro Santos", id: "20240241", turma: "2º B — Eletrotécnica", count: 2, level: "Acompanhamento", status: "Regular" },
  { initials: "CL", name: "Camila Lima Ferreira", id: "20240312", turma: "1º B — Informática", count: 1, level: "Ocorrência", status: "Regular" },
  { initials: "DM", name: "Diego Martins Alves", id: "20240156", turma: "3º A — Mecânica", count: 4, level: "Advertência escrita", status: "Em andamento" },
  { initials: "EL", name: "Eduarda Lopes Silva", id: "20240408", turma: "2º A — Química", count: 0, level: "Sem registros", status: "Regular" },
];

type Student = (typeof students)[number];

students.push(
  { initials: "MA", name: "Marcelo Andrade Costa", id: "20240512", turma: "2º A — Química", count: 1, level: "Ocorrência", status: "Regular" },
  { initials: "MP", name: "Marcelo Pereira Nunes", id: "20240533", turma: "1º B — Informática", count: 0, level: "Sem registros", status: "Regular" },
  { initials: "MS", name: "Marcelo Silva Rocha", id: "20240547", turma: "3º A — Mecânica", count: 2, level: "Acompanhamento", status: "Regular" },
  { initials: "MC", name: "Marcela Souza Dias", id: "20240561", turma: "2º B — Eletrotécnica", count: 0, level: "Sem registros", status: "Regular" },
  { initials: "ME", name: "Maria Eduarda Lima", id: "20240574", turma: "1º A — Informática", count: 1, level: "Ocorrência", status: "Regular" },
  { initials: "JP", name: "João Pedro Santos", id: "20240602", turma: "3º A — Mecânica", count: 2, level: "Acompanhamento", status: "Regular" },
);

function normalize(t: string) {
  return t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

// Casa se alguma palavra do nome começa com o texto digitado (ou a matrícula começa com ele).
function matchStudent(s: Student, q: string) {
  const t = normalize(q);
  if (!t) return true;
  return (" " + normalize(s.name)).includes(" " + t) || s.id.startsWith(t);
}

function StudentSearch({ onSelect }: { onSelect: (s: Student) => void }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const results = q.trim() ? students.filter((s) => matchStudent(s, q)).slice(0, 8) : [];
  return <div className="suggest">
    <Input icon="search" placeholder="Digite o nome ou a matrícula do aluno..." value={q} onChange={(v) => { setQ(v); setOpen(true); }} />
    {open && q.trim() && <ul className="suggest-list">
      {results.length === 0 ? <li className="suggest-empty">Nenhum aluno encontrado</li> : results.map((s) => <li key={s.id}><button type="button" onClick={() => { onSelect(s); setQ(""); setOpen(false); }}><strong>{s.name}</strong><small>Matrícula {s.id} · {s.turma}</small></button></li>)}
    </ul>}
  </div>;
}

type Role = "inspetor" | "dep";
const profiles: Record<Role, { name: string; first: string; initials: string; label: string; short: string; desc: string; menu: Page[] }> = {
  inspetor: { name: "Marcelo Silva", first: "Marcelo", initials: "MS", label: "Assistente de alunos / Inspetor", short: "Assistente de alunos", desc: "Registra ocorrências pelo celular ou notebook", menu: ["Dashboard", "Registrar ocorrência", "Alunos", "Ocorrências"] },
  dep: { name: "Juliana Martins", first: "Juliana", initials: "JM", label: "Departamento de Ensino (DEP)", short: "DEP", desc: "Analisa alertas e toma as providências", menu: ["Dashboard", "Alunos", "Ocorrências", "Alertas", "Progressão disciplinar", "Assistência Social", "Relatórios", "Configurações"] },
};

const APP_NAME = "SIGO"; // <- troque aqui o nome do aplicativo
const APP_TAGLINE = "Gestão de Ocorrências · IFAM";

function todayISO() { const d = new Date(); return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); }
function nowTime() { return new Date().toTimeString().slice(0, 5); }

type Occ = { id: number; date: string; time: string; studentId: string; student: string; turma: string; tipo: "Uniforme" | "Atraso"; item: string; obs: string; by: string; status: string; edited?: boolean };
const initialOccs: Occ[] = [
  { id: 1, date: "2026-10-05", time: "07:42", studentId: "20240187", student: "Ana Carolina Mendes", turma: "1º A", tipo: "Uniforme", item: "Camisa do uniforme", obs: "", by: "Marcelo Silva", status: "Registrada" },
  { id: 2, date: "2026-10-05", time: "07:28", studentId: "20240241", student: "Bruno Ribeiro Santos", turma: "2º B", tipo: "Atraso", item: "22 minutos", obs: "", by: "Marcelo Silva", status: "Registrada" },
  { id: 3, date: "2026-10-04", time: "13:18", studentId: "20240156", student: "Diego Martins Alves", turma: "3º A", tipo: "Uniforme", item: "Calçado fechado", obs: "", by: "Luciana Rocha", status: "Em análise" },
  { id: 4, date: "2026-10-04", time: "07:54", studentId: "20240312", student: "Camila Lima Ferreira", turma: "1º B", tipo: "Atraso", item: "19 minutos", obs: "", by: "Marcelo Silva", status: "Registrada" },
  { id: 5, date: "2026-10-03", time: "08:06", studentId: "20240187", student: "Ana Carolina Mendes", turma: "1º A", tipo: "Uniforme", item: "Calça preta", obs: "", by: "Luciana Rocha", status: "Encaminhada" },
];

function Logo({ compact = false }: { compact?: boolean }) {
  const [noImg, setNoImg] = useState(false);
  return <div className={`brand ${compact ? "brand-compact" : ""}`}>{noImg ? <span className="brand-mark"><span /><span /><span /><span /></span> : <img className="brand-logo" src="/logo-ifam.png" alt="IFAM" onError={() => setNoImg(true)} />}{!compact && <span className="brand-copy"><strong>{APP_NAME}</strong><small>{APP_TAGLINE}</small></span>}</div>;
}

function Dashboard({ go, first, canRegister }: { go: (p: Page) => void; first: string; canRegister: boolean }) {
  const isDep = !canRegister;
  const metrics = [
    ["1.248", "Total de alunos", "users", "+12 este mês", "green"],
    ["18", "Ocorrências hoje", "clipboard", "6 a menos que ontem", "blue"],
    ["142", "Ocorrências no mês", "calendar", "12% abaixo da média", "blue"],
    ["08", "Com 3+ ocorrências", "bell", "Requer atenção do DEP", "amber"],
    ["05", "Encaminhados ao social", "heart", "2 aguardando triagem", "purple"],
    ["03", "Notificações pendentes", "clock", "1 vence hoje", "amber"],
  ];
  return <>
    <PageTitle eyebrow="Visão geral" title={`Bom dia, ${first}`} subtitle="Acompanhe os principais indicadores da rotina escolar." action={canRegister ? <Button icon="plus" onClick={() => go("Registrar ocorrência")}>Registrar ocorrência</Button> : undefined} />
    <div className={`metric-grid ${isDep ? "" : "metric-grid-4"}`}>{(isDep ? metrics : metrics.filter((m) => m[1] !== "Com 3+ ocorrências" && m[1] !== "Notificações pendentes")).map(([value, label, icon, detail, tone]) => <Card className="metric" key={label}><div className={`metric-icon tone-${tone}`}><Icon name={icon as IconName} /></div><div><span>{label}</span><strong>{value}</strong><small>{detail}</small></div></Card>)}</div>
    <div className="dashboard-grid">
      <Card className="wide-card">
        <div className="card-head"><div><h2>Ocorrências por período</h2><p>Últimos 7 dias</p></div><Badge tone="success">−8,4%</Badge></div>
        <div className="line-chart"><div className="chart-y"><span>30</span><span>20</span><span>10</span><span>0</span></div><svg viewBox="0 0 620 170" preserveAspectRatio="none"><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--primary)" stopOpacity=".18" /><stop offset="1" stopColor="var(--primary)" stopOpacity="0" /></linearGradient></defs><path className="area" d="M0 130 C60 100 75 110 110 95 S180 115 215 70 S280 50 325 80 S395 120 435 92 S510 45 620 38 L620 170 L0 170Z" /><path className="line" d="M0 130 C60 100 75 110 110 95 S180 115 215 70 S280 50 325 80 S395 120 435 92 S510 45 620 38" /></svg><div className="chart-labels"><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Hoje</span></div></div>
      </Card>
      <Card>
        <div className="card-head"><div><h2>Tipos de ocorrência</h2><p>Distribuição no mês</p></div><Button variant="ghost">Detalhes</Button></div>
        <div className="donut-wrap"><div className="donut"><span><strong>142</strong><small>Total</small></span></div><div className="legend"><span><i className="l-green" />Uniforme <b>58%</b></span><span><i className="l-blue" />Atraso <b>34%</b></span><span><i className="l-gray" />Outros <b>8%</b></span></div></div>
      </Card>
    </div>
    {isDep && <Card>
      <div className="card-head"><div><h2>Alertas recentes</h2><p>Alunos que precisam de acompanhamento do DEP</p></div><Button variant="ghost" onClick={() => go("Alertas")}>Ver todos <Icon name="arrow" size={16} /></Button></div>
      <div className="alert-list">
        {students.slice(0, 3).map((s, i) => <div className="alert-row" key={s.id}><div className={`avatar avatar-${i}`}>{s.initials}</div><div className="alert-student"><strong>{s.name}</strong><span>{s.turma} · Matrícula {s.id}</span></div><div className="alert-count"><strong>{s.count}</strong><span>ocorrências</span></div><div className="alert-date"><strong>{i === 0 ? "Hoje, 07:42" : i === 1 ? "Ontem, 13:18" : "20 mai, 08:06"}</strong><span>Última ocorrência</span></div><Badge tone={i === 0 ? "warning" : "info"}>{s.level}</Badge><Button variant="secondary" onClick={() => go("Perfil do aluno")}>Analisar</Button></div>)}
      </div>
    </Card>}
  </>;
}

function OccurrenceForm({ go, onAdd }: { go: (p: Page) => void; onAdd: (o: Omit<Occ, "id" | "by" | "status">) => void }) {
  const today = todayISO();
  const [date, setDate] = useState(today);
  const [time, setTime] = useState(nowTime());
  const [items, setItems] = useState<string[]>(["Camisa do uniforme"]);
  const [arrival, setArrival] = useState("07:22");
  const [obs, setObs] = useState("");
  const [student, setStudent] = useState<Student | null>(null);
  const [type, setType] = useState("uniforme");
  const [social, setSocial] = useState(false);
  const [success, setSuccess] = useState(false);
  function submit(e: FormEvent) { e.preventDefault(); if (!student) return; onAdd({ date, time, studentId: student.id, student: student.name, turma: student.turma.split(" — ")[0], tipo: type === "uniforme" ? "Uniforme" : "Atraso", item: type === "uniforme" ? items.join(", ") : `Entrada às ${arrival}`, obs }); setSuccess(true); setStudent(null); setObs(""); window.setTimeout(() => setSuccess(false), 5000); }
  return <>
    <PageTitle eyebrow="Registro rápido" title="Registrar ocorrência" subtitle="Preencha os dados abaixo. Nenhuma medida disciplinar é aplicada automaticamente." />
    {success && <div className="success-banner"><span><Icon name="check" /></span><div><strong>Ocorrência registrada com sucesso.</strong><p>O histórico do aluno foi atualizado e o DEP será notificado se necessário.</p></div><Button variant="ghost" onClick={() => setSuccess(false)}>Fechar</Button></div>}
    <form className="form-layout" onSubmit={submit}>
      <div className="form-main">
        <Card className="form-card">
          <div className="section-number">1</div><div className="section-body"><h2>Identificação do aluno</h2><p>Busque pelo nome completo ou número de matrícula.</p>
            <div className="student-search"><StudentSearch onSelect={setStudent} /></div>
            {student && <div className="selected-student"><div className="avatar avatar-0">{student.initials}</div><div><span>Aluno selecionado</span><strong>{student.name}</strong><small>Matrícula {student.id} · {student.turma}</small></div><Button variant="ghost" onClick={() => setStudent(null)}>Alterar</Button></div>}
          </div>
        </Card>
        <Card className="form-card">
          <div className="section-number">2</div><div className="section-body"><h2>Dados da ocorrência</h2><p>Informe o tipo e os detalhes do registro.</p>
            <div className="two-cols"><Field label="Data em que aconteceu" hint="Aconteceu em outro dia? Escolha a data real da ocorrência."><Input icon="calendar" type="date" value={date} max={today} onChange={setDate} /></Field><Field label="Horário"><Input icon="clock" type="time" value={time} onChange={setTime} /></Field></div>
            <Field label="Tipo de ocorrência"><div className="choice-row"><label className={`choice ${type === "uniforme" ? "active" : ""}`}><input type="radio" name="type" checked={type === "uniforme"} onChange={() => setType("uniforme")} /><span className="choice-icon"><Icon name="shield" /></span><span><strong>Uniforme</strong><small>Item obrigatório ausente</small></span></label><label className={`choice ${type === "atraso" ? "active" : ""}`}><input type="radio" name="type" checked={type === "atraso"} onChange={() => setType("atraso")} /><span className="choice-icon"><Icon name="clock" /></span><span><strong>Atraso</strong><small>Entrada após o horário</small></span></label></div></Field>
            {type === "uniforme" ? <Field label="Item ausente"><div className="check-grid">{["Camisa do uniforme", "Calça preta", "Calçado fechado"].map((x, i) => <label className="check" key={x}><input type="checkbox" checked={items.includes(x)} onChange={() => setItems(items.includes(x) ? items.filter((y) => y !== x) : [...items, x])} /><span><Icon name="check" size={14} /></span>{x}</label>)}</div></Field> : <Field label="Horário de entrada" hint="A tolerância configurada é de 15 minutos."><Input type="time" value={arrival} onChange={setArrival} /></Field>}
            <Field label="Observação (opcional)"><textarea className="input textarea" value={obs} onChange={(e) => setObs(e.target.value)} placeholder="Adicione uma informação relevante sobre o ocorrido..." /></Field>
          </div>
        </Card>
        <Card className="form-card social-card">
          <div className="section-number"><Icon name="heart" size={18} /></div><div className="section-body"><h2>Encaminhamento social</h2><p>Registre situações que demandem avaliação socioassistencial.</p>
            <label className="social-check"><input type="checkbox" checked={social} onChange={(e) => setSocial(e.target.checked)} /><span><Icon name="check" size={14} /></span><div><strong>Aluno relata dificuldade financeira para aquisição do uniforme</strong><small>Esta informação terá acesso restrito.</small></div></label>
            {social && <div className="social-notice"><Icon name="shield" /><div><strong>Atenção ao tratamento deste registro</strong><p>Esta ocorrência não deve gerar penalização automática antes da avaliação da Assistência Social.</p><label className="check"><input type="checkbox" defaultChecked /><span><Icon name="check" size={14} /></span>Encaminhar para Assistência Social</label></div></div>}
          </div>
        </Card>
        <div className="form-actions"><Button variant="secondary" onClick={() => go("Dashboard")}>Cancelar</Button><Button type="submit" icon="check" disabled={!student || (type === "uniforme" && items.length === 0)}>Registrar ocorrência</Button></div>
      </div>
      <aside className="form-aside"><Card><h3>Resumo do registro</h3><div className="summary-item"><span>Aluno</span><strong>{student ? student.name : "Não selecionado"}</strong></div><div className="summary-item"><span>Data</span><strong>{fmtDate(date)}</strong></div><div className="summary-item"><span>Tipo</span><strong>{type === "uniforme" ? "Uniforme" : "Atraso"}</strong></div><div className="summary-item"><span>Registrado por</span><strong>Marcelo Silva</strong></div><div className="rule"><Icon name="shield" /><p>Este registro contabiliza uma ocorrência, mas não aplica medida disciplinar automaticamente.</p></div></Card></aside>
    </form>
  </>;
}

function Toolbar({ search = "Buscar por nome ou matrícula...", value, onChange }: { search?: string; value?: string; onChange?: (v: string) => void }) {
  return <div className="toolbar"><div className="search-wide"><Input icon="search" placeholder={search} value={value} onChange={onChange} /></div><Button variant="secondary" icon="filter">Filtros</Button><Select defaultValue="all"><option value="all">Todas as turmas</option><option>1º A</option><option>2º B</option></Select></div>;
}

function Students({ go, isDep }: { go: (p: Page) => void; isDep: boolean }) {
  const [query, setQuery] = useState("");
  const list = students.filter((s) => matchStudent(s, query));
  return <><PageTitle eyebrow="Gestão acadêmica" title="Alunos" subtitle="Consulte estudantes, histórico de ocorrências e situação disciplinar." action={<Button icon="plus">Cadastrar aluno</Button>} /><Toolbar value={query} onChange={setQuery} /><Card className="table-card"><div className="table-scroll"><table><thead><tr><th>Aluno</th><th>Turma</th><th>Ocorrências</th>{isDep && <><th>Nível disciplinar</th><th>Situação</th></>}<th /></tr></thead><tbody>{list.length === 0 && <tr><td colSpan={6}>Nenhum aluno encontrado</td></tr>}{list.map((s, i) => <tr key={s.id} onClick={() => go("Perfil do aluno")}><td><div className="person"><div className={`avatar avatar-${i % 5}`}>{s.initials}</div><span><strong>{s.name}</strong><small>Matrícula {s.id}</small></span></div></td><td>{s.turma}</td><td><strong className={isDep && s.count >= 3 ? "count-danger" : ""}>{s.count}</strong></td>{isDep && <><td>{s.level}</td><td><Badge tone={s.status === "Regular" ? "success" : s.status === "Requer análise" ? "warning" : "info"}>{s.status}</Badge></td></>}<td><Icon name="chevron" size={16} /></td></tr>)}</tbody></table></div><div className="pagination"><span>Mostrando {list.length} de {students.length} alunos (dados de teste)</span><div><Button variant="secondary">Anterior</Button><Button variant="secondary">Próxima</Button></div></div></Card></>;
}

function Occurrences({ go, occs, onUpdate }: { go: (p: Page) => void; occs: Occ[]; onUpdate: (o: Occ) => void }) {
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Occ | null>(null);
  const [saved, setSaved] = useState(false);
  const list = [...occs].sort((x, y) => (y.date + y.time).localeCompare(x.date + x.time)).filter((o) => !query.trim() || normalize(`${o.student} ${o.by} ${o.tipo} ${o.item}`).includes(normalize(query)));
  return <>
    <PageTitle eyebrow="Registros" title="Ocorrências" subtitle="Consulte todos os registros realizados pela equipe escolar." action={<Button icon="plus" onClick={() => go("Registrar ocorrência")}>Nova ocorrência</Button>} />
    {saved && <div className="success-banner"><span><Icon name="check" /></span><div><strong>Ocorrência atualizada.</strong><p>A alteração ficou marcada como editada.</p></div><Button variant="ghost" onClick={() => setSaved(false)}>Fechar</Button></div>}
    {editing && <Card className="edit-card"><div className="card-head"><div><h2>Editar ocorrência</h2><p>Corrija o aluno, a data ou os detalhes. A alteração fica marcada como editada.</p></div></div>
      <form className="inline-form" onSubmit={(e) => { e.preventDefault(); onUpdate(editing); setEditing(null); setSaved(true); window.setTimeout(() => setSaved(false), 5000); }}>
        <div className="field"><span className="field-label">Aluno</span><StudentSearch onSelect={(st) => setEditing({ ...editing, studentId: st.id, student: st.name, turma: st.turma.split(" — ")[0] })} /><span className="field-hint">Atual: {editing.student} · Matrícula {editing.studentId}. Busque outro nome para trocar o aluno.</span></div>
        <div className="two-cols"><Field label="Data em que aconteceu"><Input type="date" icon="calendar" value={editing.date} max={todayISO()} onChange={(v) => setEditing({ ...editing, date: v })} /></Field><Field label="Horário"><Input type="time" icon="clock" value={editing.time} onChange={(v) => setEditing({ ...editing, time: v })} /></Field></div>
        <div className="two-cols"><Field label="Tipo"><select className="input" value={editing.tipo} onChange={(e) => setEditing({ ...editing, tipo: e.target.value as Occ["tipo"] })}><option>Uniforme</option><option>Atraso</option></select></Field><Field label="Item / detalhe"><Input value={editing.item} onChange={(v) => setEditing({ ...editing, item: v })} /></Field></div>
        <Field label="Observação (opcional)"><textarea className="input textarea" value={editing.obs} onChange={(e) => setEditing({ ...editing, obs: e.target.value })} /></Field>
        <div className="inline-actions"><Button variant="secondary" onClick={() => setEditing(null)}>Cancelar</Button><Button type="submit" icon="check">Salvar alterações</Button></div>
      </form></Card>}
    <Toolbar search="Buscar aluno ou responsável..." value={query} onChange={setQuery} />
    <Card className="table-card"><div className="table-scroll"><table><thead><tr>{["Data", "Aluno", "Turma", "Tipo", "Item / detalhe", "Registrado por", "Situação", ""].map((x) => <th key={x}>{x}</th>)}</tr></thead><tbody>
      {list.length === 0 && <tr><td colSpan={8}>Nenhuma ocorrência encontrada</td></tr>}
      {list.map((o) => <tr key={o.id}><td>{fmtDate(o.date)}, {o.time}</td><td><strong>{o.student}</strong>{o.edited && <small className="tag-edited">editada</small>}</td><td>{o.turma}</td><td>{o.tipo}</td><td>{o.item}</td><td>{o.by}</td><td><Badge tone={o.status === "Em análise" ? "warning" : o.status === "Encaminhada" ? "info" : "success"}>{o.status}</Badge></td><td><Button variant="ghost" onClick={() => { setEditing(o); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Editar</Button></td></tr>)}
    </tbody></table></div><div className="pagination"><span>Mostrando {list.length} de {occs.length} ocorrências</span></div></Card>
  </>;
}

function Alerts({ go }: { go: (p: Page) => void }) {
  return <><PageTitle eyebrow="Acompanhamento DEP" title="Central de alertas" subtitle="Analise situações prioritárias e defina as ações adequadas." /><div className="info-banner"><Icon name="bell" /><div><strong>8 alunos atingiram 3 ou mais ocorrências</strong><p>O alerta não gera punição automática. Analise o histórico antes de registrar qualquer medida.</p></div></div><div className="tab-row"><Button>Requerem análise <span className="tab-count">8</span></Button><Button variant="ghost">Em andamento</Button><Button variant="ghost">Concluídos</Button></div><div className="alert-cards">{students.filter(s => s.count >= 3).map((s, i) => <Card className="alert-card" key={s.id}><div className="priority-line" /><div className="alert-card-head"><div className={`avatar avatar-${i}`}>{s.initials}</div><div><Badge tone="warning">Atingiu {s.count} ocorrências</Badge><h2>{s.name}</h2><p>{s.turma} · Matrícula {s.id}</p></div><Icon name="bell" /></div><div className="alert-facts"><span><small>Data do alerta</small><strong>{i ? "22 mai 2025" : "Hoje, 07:42"}</strong></span><span><small>Nível atual</small><strong>{s.level}</strong></span><span><small>Último registro</small><strong>{i ? "Uniforme" : "Camisa do uniforme"}</strong></span></div><div className="alert-actions"><Button variant="secondary" onClick={() => go("Perfil do aluno")}>Ver perfil</Button><Button onClick={() => go("Progressão disciplinar")}>Analisar ocorrências</Button></div></Card>)}</div></>;
}

const monthHistory: { month: string; uniforme: number; atraso: number; penalty: string; tone: "neutral" | "warning" | "info" }[] = [
  { month: "Outubro 2026", uniforme: 1, atraso: 1, penalty: "Sem penalidade ainda", tone: "neutral" },
  { month: "Setembro 2026", uniforme: 3, atraso: 2, penalty: "Advertência por escrito", tone: "warning" },
  { month: "Agosto 2026", uniforme: 1, atraso: 0, penalty: "Advertência verbal", tone: "info" },
];

function StudentProfile({ go, isDep }: { go: (p: Page) => void; isDep: boolean }) {
  return <><Button variant="ghost" icon="arrow" className="back-button" onClick={() => go("Alunos")}>Voltar para alunos</Button><Card className="profile-hero"><div className="avatar avatar-large avatar-0">AC</div><div className="profile-name">{isDep && <Badge tone="warning">Requer análise do DEP</Badge>}<h1>Ana Carolina Mendes</h1><p>Matrícula 20240187 · 1º A — Técnico em Informática</p></div><div className="profile-stats"><span><strong>3</strong><small>Ocorrências</small></span>{isDep && <span><strong>1</strong><small>Alerta ativo</small></span>}</div>{isDep && <Button onClick={() => go("Notificação aos responsáveis")}>Registrar medida</Button>}</Card><div className={`profile-grid ${isDep ? "" : "single"}`}><Card><div className="card-head"><div><h2>Histórico de ocorrências</h2><p>Registros em ordem cronológica</p></div></div><div className="timeline">{[["23 mai 2025 · 07:42", "Uniforme — Camisa", "Registrado por Marcelo Silva", "Aluno informou que a camisa estava em processo de secagem."], ["21 mai 2025 · 08:06", "Uniforme — Calça preta", "Registrado por Luciana Rocha", "Encaminhado para avaliação do DEP."], ["12 mai 2025 · 07:34", "Atraso — 19 minutos", "Registrado por Marcelo Silva", "Entrada liberada após registro."]].map((x, i) => <div className="timeline-item" key={x[0]}><span className={i === 0 ? "current" : ""}><Icon name={i === 0 ? "clipboard" : "check"} size={15} /></span><div><small>{x[0]}</small><strong>{x[1]}</strong><p>{x[3]}</p><em>{x[2]}</em></div></div>)}</div></Card>{isDep && <Card><h2>Progressão disciplinar</h2><p>A etapa atual exige registro de ação pelo DEP.</p><div className="mini-progress"><div className="done"><span><Icon name="check" size={14} /></span><div><strong>Ocorrências</strong><small>3 registros contabilizados</small></div></div><div className="active"><span>2</span><div><strong>Advertência verbal</strong><small>Aguardando registro</small></div></div><div><span>3</span><div><strong>Advertência por escrito</strong><small>Não iniciada</small></div></div><div><span>4</span><div><strong>Notificação aos responsáveis</strong><small>Não iniciada</small></div></div></div><Button className="full" onClick={() => go("Progressão disciplinar")}>Ver progressão completa</Button></Card>}</div><Card className="month-card"><div className="card-head"><div><h2>Histórico por mês</h2><p>Infrações e penalidades aplicadas em cada mês</p></div></div><div className="month-list">{monthHistory.map((m) => { const total = m.uniforme + m.atraso; return <div className="month-row" key={m.month}><div className="month-name"><strong>{m.month}</strong><small>{m.uniforme} de uniforme · {m.atraso} de atraso</small></div><div className="month-bar"><span style={{ width: `${Math.min(total / 6, 1) * 100}%` }} /></div><strong className="month-count">{total}</strong><Badge tone={m.tone}>{m.penalty}</Badge></div>; })}</div></Card></>;
}

function Progression({ go }: { go: (p: Page) => void }) {
  const [cur, setCur] = useState(1);
  const [open, setOpen] = useState(false);
  const [obs, setObs] = useState("");
  const [records, setRecords] = useState<Record<number, { date: string; obs: string }>>({});
  const stages = [
    ["Ocorrências", "Concluída", "3 registros", "23 mai 2025", "Sistema"],
    ["Advertência verbal", "Etapa atual", "Aguardando registro da ação", "—", "DEP"],
    ["Advertência por escrito", "Não iniciada", "Exige ação anterior", "—", "DEP"],
    ["Notificação / convocação", "Não iniciada", "Exige ação anterior", "—", "DEP"],
  ];
  return <><PageTitle eyebrow="Acompanhamento DEP" title="Progressão disciplinar" subtitle="Visualize e registre cada etapa do acompanhamento do estudante." /><Card className="student-strip"><div className="avatar avatar-0">AC</div><div><strong>Ana Carolina Mendes</strong><span>1º A — Informática · 3 ocorrências</span></div><Button variant="secondary" onClick={() => go("Perfil do aluno")}>Ver perfil</Button></Card><div className="progression">{stages.map((s, i) => { const done = i < cur; const active = i === cur; const rec = records[i]; return <div className={`stage ${done ? "done" : active ? "active" : ""}`} key={s[0]}><div className="stage-marker">{done ? <Icon name="check" /> : i + 1}</div><Card><div className="stage-head"><div><Badge tone={done ? "success" : active ? "warning" : "neutral"}>{done ? "Concluída" : active ? "Etapa atual" : "Não iniciada"}</Badge><h2>{s[0]}</h2><p>{i === 0 ? s[2] : done ? rec?.obs ?? "Ação registrada" : active ? "Aguardando registro da ação" : "Exige ação anterior"}</p></div>{active && !open && <Button onClick={() => setOpen(true)}>{`Registrar ${s[0].toLowerCase()}`}</Button>}</div>{active && open && <form className="inline-form" onSubmit={(e) => { e.preventDefault(); setRecords({ ...records, [i]: { date: new Date().toLocaleDateString("pt-BR"), obs: obs.trim() || "Ação registrada" } }); setCur(cur + 1); setOpen(false); setObs(""); }}><Field label="Observação (opcional)"><textarea className="input textarea" value={obs} onChange={(e) => setObs(e.target.value)} placeholder="Descreva a ação realizada..." /></Field><div className="inline-actions"><Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button><Button type="submit" icon="check">Confirmar registro</Button></div></form>}<div className="stage-meta"><span>Data <strong>{i === 0 ? s[3] : rec?.date ?? "—"}</strong></span><span>Responsável <strong>{s[4]}</strong></span><span>Documento <strong>{i === 0 ? "3 registros vinculados" : done ? "Registro interno" : "Nenhum"}</strong></span></div></Card></div>; })}</div><div className="rule-footer"><Icon name="shield" /><span><strong>Avanço responsável</strong><p>Nenhuma etapa avança automaticamente. É necessário registrar a ação correspondente.</p></span></div></>;
}

function Social({ go }: { go: (p: Page) => void }) {
  return <><PageTitle eyebrow="Área restrita" title="Assistência Social" subtitle="Acompanhe estudantes encaminhados para avaliação socioassistencial." action={<Badge tone="info"><Icon name="lock" size={13} /> Acesso restrito</Badge>} /><div className="social-metrics"><Card><span>Aguardando triagem</span><strong>2</strong></Card><Card><span>Em acompanhamento</span><strong>3</strong></Card><Card><span>Resolvidos no mês</span><strong>7</strong></Card></div><Toolbar search="Buscar estudante encaminhado..." /><Card className="table-card"><div className="table-scroll"><table><thead><tr><th>Aluno</th><th>Turma</th><th>Encaminhamento</th><th>Motivo</th><th>Status</th><th /></tr></thead><tbody>{students.slice(0, 4).map((s, i) => <tr key={s.id} onClick={() => go("Detalhes do acompanhamento")}><td><div className="person"><div className={`avatar avatar-${i}`}>{s.initials}</div><strong>{s.name}</strong></div></td><td>{s.turma}</td><td>{22 - i} mai 2025</td><td>Dificuldade para aquisição do uniforme</td><td><Badge tone={i < 2 ? "warning" : i === 2 ? "info" : "success"}>{i < 2 ? "Aguardando triagem" : i === 2 ? "Em acompanhamento" : "Resolvido"}</Badge></td><td><Icon name="chevron" size={16} /></td></tr>)}</tbody></table></div></Card></>;
}

function SocialDetails({ go }: { go: (p: Page) => void }) {
  const [status, setStatus] = useState("triagem");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [text, setText] = useState("");
  const [history, setHistory] = useState<{ date: string; text: string }[]>([]);
  function save() { if (!text.trim()) return; setHistory([{ date, text: text.trim() }, ...history]); setText(""); if (status === "triagem") setStatus("acompanhamento"); }
  return <><Button variant="ghost" icon="arrow" className="back-button" onClick={() => go("Assistência Social")}>Voltar para Assistência Social</Button><PageTitle eyebrow="Caso socioassistencial #AS-0258" title="Acompanhamento de Ana Carolina" subtitle="Dados protegidos e acessíveis somente a usuários autorizados." action={<select className="input" value={status} onChange={(e) => setStatus(e.target.value)}><option value="triagem">Aguardando triagem</option><option value="acompanhamento">Em acompanhamento</option><option value="resolvido">Resolvido</option></select>} /><div className="details-grid"><Card><h2>Dados do encaminhamento</h2><div className="detail-list"><span><small>Estudante</small><strong>Ana Carolina Mendes</strong></span><span><small>Turma</small><strong>1º A — Informática</strong></span><span><small>Data</small><strong>23 mai 2025, 07:48</strong></span><span><small>Encaminhado por</small><strong>Marcelo Silva — Inspetor</strong></span><span><small>Motivo</small><strong>Dificuldade financeira para aquisição do uniforme</strong></span></div></Card><Card><h2>Registrar acompanhamento</h2><Field label="Data"><Input type="date" value={date} onChange={setDate} /></Field><Field label="Registro do atendimento"><textarea className="input textarea" value={text} onChange={(e) => setText(e.target.value)} placeholder="Descreva o contato, orientação ou providência realizada..." /></Field><Button className="full" onClick={save} disabled={!text.trim()}>Salvar acompanhamento</Button></Card></div>{history.length > 0 && <Card className="history-card"><h2>Histórico de acompanhamento</h2><div className="history-list">{history.map((h, i) => <div key={i}><strong>{h.date.split("-").reverse().join("/")}</strong><p>{h.text}</p></div>)}</div></Card>}</>;
}

const reportRows = [
  { date: "2025-05-23", aluno: "Ana Carolina Mendes", turma: "1º A — Informática", tipo: "Uniforme", item: "Camisa do uniforme" },
  { date: "2025-05-23", aluno: "Bruno Ribeiro Santos", turma: "2º B — Eletrotécnica", tipo: "Atraso", item: "22 minutos" },
  { date: "2025-05-22", aluno: "Diego Martins Alves", turma: "3º A — Mecânica", tipo: "Uniforme", item: "Calçado fechado" },
  { date: "2025-05-22", aluno: "Camila Lima Ferreira", turma: "1º B — Informática", tipo: "Atraso", item: "19 minutos" },
  { date: "2025-05-21", aluno: "Ana Carolina Mendes", turma: "1º A — Informática", tipo: "Uniforme", item: "Calça preta" },
  { date: "2025-05-15", aluno: "Diego Martins Alves", turma: "3º A — Mecânica", tipo: "Atraso", item: "17 minutos" },
  { date: "2025-05-08", aluno: "Eduarda Lopes Silva", turma: "2º A — Química", tipo: "Uniforme", item: "Camisa do uniforme" },
];
const fmtDate = (d: string) => d.split("-").reverse().join("/");

function exportCsv(rows: typeof reportRows) {
  const lines = [["Data", "Aluno", "Turma", "Tipo", "Item"], ...rows.map((r) => [fmtDate(r.date), r.aluno, r.turma, r.tipo, r.item])].map((l) => l.map((c) => `"${c}"`).join(";"));
  const blob = new Blob(["\ufeff" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "relatorio-ocorrencias.csv";
  a.click();
  URL.revokeObjectURL(a.href);
}

function Reports() {
  const [from, setFrom] = useState("2025-05-01");
  const [to, setTo] = useState("2025-05-23");
  const [turma, setTurma] = useState("all");
  const [tipo, setTipo] = useState("all");
  const [shown, setShown] = useState(false);
  const turmas = [...new Set(reportRows.map((r) => r.turma))];
  const rows = reportRows.filter((r) => r.date >= from && r.date <= to && (turma === "all" || r.turma === turma) && (tipo === "all" || r.tipo === tipo));
  return <><PageTitle eyebrow="Análise e transparência" title="Relatórios" subtitle="Configure filtros, visualize indicadores e exporte dados institucionais." /><Card className="report-builder"><div className="report-heading"><span><Icon name="filter" /></span><div><h2>Configurar relatório</h2><p>Selecione os critérios para gerar uma análise personalizada.</p></div></div><div className="report-fields"><Field label="Período inicial"><Input type="date" value={from} onChange={setFrom} /></Field><Field label="Período final"><Input type="date" value={to} onChange={setTo} /></Field><Field label="Turma"><select className="input" value={turma} onChange={(e) => setTurma(e.target.value)}><option value="all">Todas as turmas</option>{turmas.map((t) => <option key={t} value={t}>{t}</option>)}</select></Field><Field label="Tipo de ocorrência"><select className="input" value={tipo} onChange={(e) => setTipo(e.target.value)}><option value="all">Todos os tipos</option><option>Uniforme</option><option>Atraso</option></select></Field></div><div className="report-actions"><Button onClick={() => setShown(true)}>Visualizar relatório</Button><Button variant="secondary" icon="download" onClick={() => { setShown(true); window.setTimeout(() => window.print(), 150); }}>Exportar PDF</Button><Button variant="secondary" icon="download" onClick={() => exportCsv(rows)}>Exportar Excel</Button></div></Card>{shown && <Card className="table-card"><div className="card-head"><div><h2>Resultado do relatório</h2><p>{rows.length} ocorrência(s) no período (dados de teste)</p></div></div><div className="table-scroll"><table><thead><tr><th>Data</th><th>Aluno</th><th>Turma</th><th>Tipo</th><th>Item / detalhe</th></tr></thead><tbody>{rows.length === 0 ? <tr><td colSpan={5}>Nenhuma ocorrência encontrada</td></tr> : rows.map((r, i) => <tr key={i}><td>{fmtDate(r.date)}</td><td><strong>{r.aluno}</strong></td><td>{r.turma}</td><td>{r.tipo}</td><td>{r.item}</td></tr>)}</tbody></table></div></Card>}<div className="report-grid"><Card><div className="metric-icon tone-green"><Icon name="clipboard" /></div><span>Ocorrências no período</span><strong>142</strong><small>−12% comparado ao período anterior</small></Card><Card><div className="metric-icon tone-blue"><Icon name="users" /></div><span>Estudantes envolvidos</span><strong>96</strong><small>7,7% do total de alunos</small></Card><Card><div className="metric-icon tone-purple"><Icon name="heart" /></div><span>Encaminhamentos sociais</span><strong>12</strong><small>8 foram concluídos</small></Card></div></>;
}

type AppUser = { name: string; email: string; role: string; access: string };
const roleOptions = [profiles.inspetor.label, profiles.dep.label, "Assistência Social", "Administrador"];
const initialUsers: AppUser[] = [
  { name: "Marcelo Silva", email: "marcelo.silva@if.edu.br", role: profiles.inspetor.label, access: "Hoje, 08:14" },
  { name: "Juliana Martins", email: "juliana.martins@if.edu.br", role: profiles.dep.label, access: "Hoje, 07:58" },
  { name: "Renata Costa", email: "renata.costa@if.edu.br", role: "Assistência Social", access: "Ontem, 16:42" },
  { name: "André Luiz", email: "andre.luiz@if.edu.br", role: "Administrador", access: "22 mai, 18:03" },
];
type CfgKey = "verbal" | "escrita" | "notificacao" | "nAlerta" | "nResumo" | "nResponsaveis";

function Settings({ users, go }: { users?: boolean; go: (p: Page) => void }) {
  const [list, setList] = useState<AppUser[]>(initialUsers);
  const [q, setQ] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState<AppUser>({ name: "", email: "", role: roleOptions[0], access: "" });
  const [msg, setMsg] = useState("");
  const [panel, setPanel] = useState<string | null>(null);
  const [cfg, setCfg] = useState({ entrada: "07:00", tolerancia: 15, alerta: 3, verbal: true, escrita: true, notificacao: true, nAlerta: true, nResumo: false, nResponsaveis: true });
  const flash = (t: string) => { setMsg(t); window.setTimeout(() => setMsg(""), 4000); };
  const check = (k: CfgKey, label: string) => <label className="check" key={k}><input type="checkbox" checked={cfg[k]} onChange={() => setCfg({ ...cfg, [k]: !cfg[k] })} /><span><Icon name="check" size={14} /></span>{label}</label>;
  const banner = msg && <div className="success-banner"><span><Icon name="check" /></span><div><strong>{msg}</strong></div><Button variant="ghost" onClick={() => setMsg("")}>Fechar</Button></div>;
  function openForm(i: number | null) { setEditIdx(i); setForm(i === null ? { name: "", email: "", role: roleOptions[0], access: "" } : list[i]); setFormOpen(true); }
  function saveUser(e: FormEvent) {
    e.preventDefault();
    if (editIdx === null) {
      if (list.some((u) => u.email.toLowerCase() === form.email.toLowerCase())) { flash("Já existe um usuário com esse e-mail."); return; }
      setList([{ ...form, access: "Nunca acessou" }, ...list]); flash(`Usuário ${form.name} cadastrado.`);
    } else { setList(list.map((u, i) => (i === editIdx ? { ...form, access: u.access } : u))); flash("Usuário atualizado."); }
    setFormOpen(false); setEditIdx(null);
  }
  if (users) {
    const shown = list.filter((u) => !q.trim() || normalize(`${u.name} ${u.email}`).includes(normalize(q)));
    return <>
      <PageTitle eyebrow="Administração" title="Gerenciamento de usuários" subtitle="Cadastre usuários e defina permissões de acesso." action={<Button icon="plus" onClick={() => openForm(null)}>Novo usuário</Button>} />
      {banner}
      {formOpen && <Card className="edit-card"><div className="card-head"><div><h2>{editIdx === null ? "Cadastrar usuário" : "Editar usuário"}</h2><p>O assistente de alunos registra ocorrências; o DEP analisa e toma as providências.</p></div></div>
        <form className="inline-form" onSubmit={saveUser}>
          <div className="two-cols"><Field label="Nome completo"><Input placeholder="Nome e sobrenome" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required /></Field><Field label="E-mail institucional"><Input type="email" placeholder="nome@if.edu.br" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required /></Field></div>
          <Field label="Perfil de acesso"><select className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>{roleOptions.map((r) => <option key={r}>{r}</option>)}</select></Field>
          <div className="inline-actions"><Button variant="secondary" onClick={() => setFormOpen(false)}>Cancelar</Button><Button type="submit" icon="check">{editIdx === null ? "Cadastrar usuário" : "Salvar alterações"}</Button></div>
        </form></Card>}
      <Toolbar search="Buscar usuário por nome ou e-mail..." value={q} onChange={setQ} />
      <Card className="table-card"><div className="table-scroll"><table><thead><tr><th>Usuário</th><th>Perfil</th><th>Último acesso</th><th>Status</th><th /></tr></thead><tbody>
        {shown.map((u, i) => <tr key={u.email}><td><div className="person"><div className={`avatar avatar-${i % 5}`}>{u.name.split(" ").map((x) => x[0]).slice(0, 2).join("")}</div><span><strong>{u.name}</strong><small>{u.email}</small></span></div></td><td>{u.role}</td><td>{u.access}</td><td><Badge tone="success">Ativo</Badge></td><td><Button variant="ghost" onClick={() => openForm(list.indexOf(u))}>Editar</Button></td></tr>)}
      </tbody></table></div></Card>
    </>;
  }
  const cards: [IconName, string, string, string, string][] = [
    ["clock", "atraso", "Regras de atraso", "Defina horário de entrada e tolerância.", `Entrada às ${cfg.entrada} · tolerância de ${cfg.tolerancia} minutos`],
    ["steps", "progressao", "Progressão disciplinar", "Configure etapas e critérios de acompanhamento.", `${1 + [cfg.verbal, cfg.escrita, cfg.notificacao].filter(Boolean).length} etapas ativas · alerta com ${cfg.alerta} ocorrências`],
    ["users", "usuarios", "Usuários e permissões", "Gerencie perfis e níveis de acesso.", `${list.length} usuários ativos`],
    ["bell", "notificacoes", "Notificações", "Defina alertas e comunicações automáticas.", `${[cfg.nAlerta, cfg.nResumo, cfg.nResponsaveis].filter(Boolean).length} regras ativas`],
  ];
  const titles: Record<string, string> = { atraso: "Regras de atraso", progressao: "Progressão disciplinar", notificacoes: "Notificações" };
  return <><PageTitle eyebrow="Administração" title="Configurações" subtitle="Gerencie regras institucionais e parâmetros do sistema." />{banner}
    <div className="settings-grid">{cards.map((c) => <Card className="setting-card" key={c[1]}><span><Icon name={c[0]} /></span><div><h2>{c[2]}</h2><p>{c[3]}</p><small>{c[4]}</small></div><Button variant="secondary" onClick={() => (c[1] === "usuarios" ? go("Usuários") : setPanel(panel === c[1] ? null : c[1]))}>Configurar</Button></Card>)}</div>
    {panel && <Card className="edit-card"><div className="card-head"><div><h2>{titles[panel]}</h2><p>Valores de teste: a gravação definitiva depende do back-end.</p></div></div>
      <div className="inline-form">
        {panel === "atraso" && <div className="two-cols"><Field label="Horário de entrada"><Input type="time" value={cfg.entrada} onChange={(v) => setCfg({ ...cfg, entrada: v })} /></Field><Field label="Tolerância (minutos)"><Input type="number" value={String(cfg.tolerancia)} onChange={(v) => setCfg({ ...cfg, tolerancia: Math.max(0, Number(v) || 0) })} /></Field></div>}
        {panel === "progressao" && <><Field label="Ocorrências para alertar o DEP" hint="A regra exata deve seguir as Resoluções nº 57 e nº 94."><Input type="number" value={String(cfg.alerta)} onChange={(v) => setCfg({ ...cfg, alerta: Math.max(1, Number(v) || 1) })} /></Field><div className="check-grid">{check("verbal", "Advertência verbal")}{check("escrita", "Advertência por escrito")}{check("notificacao", "Notificação / convocação dos responsáveis")}</div></>}
        {panel === "notificacoes" && <div className="check-grid">{check("nAlerta", "Avisar o DEP quando um aluno atingir o limite de ocorrências")}{check("nResumo", "Enviar resumo diário ao DEP")}{check("nResponsaveis", "Registrar notificações aos responsáveis")}</div>}
        <div className="inline-actions"><Button variant="secondary" onClick={() => setPanel(null)}>Fechar</Button><Button icon="check" onClick={() => { flash("Configuração salva (dados de teste)."); setPanel(null); }}>Salvar configuração</Button></div>
      </div></Card>}
  </>;
}

function Notification({ go }: { go: (p: Page) => void }) {
  return <><Button variant="ghost" icon="arrow" className="back-button" onClick={() => go("Perfil do aluno")}>Voltar ao perfil</Button><PageTitle eyebrow="Ação disciplinar" title="Notificação aos responsáveis" subtitle="Registre o contato de forma clara e rastreável." /><div className="form-layout"><Card className="form-main"><h2>Dados da notificação</h2><div className="two-cols"><Field label="Data da notificação"><Input type="date" defaultValue="2025-05-23" /></Field><Field label="Responsável notificado"><Input placeholder="Nome do responsável" /></Field><Field label="Meio de comunicação"><Select><option>Telefone</option><option>E-mail</option><option>Aplicativo de mensagens</option><option>Presencial</option></Select></Field><Field label="Status"><Select><option>Pendente</option><option>Enviada</option><option>Recebida</option><option>Concluída</option></Select></Field></div><Field label="Observação"><textarea className="input textarea" placeholder="Registre detalhes da comunicação..." /></Field><div className="form-actions"><Button variant="secondary" onClick={() => go("Perfil do aluno")}>Cancelar</Button><Button>Salvar notificação</Button></div></Card><aside className="form-aside"><Card><h3>Estudante</h3><div className="person"><div className="avatar avatar-0">AC</div><span><strong>Ana Carolina Mendes</strong><small>1º A — Informática</small></span></div><div className="rule"><Icon name="shield" /><p>O registro ficará disponível no histórico disciplinar do estudante.</p></div></Card></aside></div></>;
}

function Login({ onLogin }: { onLogin: (r: Role) => void }) {
  const [role, setRole] = useState<Role>("inspetor");
  return <div className="login-page"><div className="login-aside"><Logo /><div><Badge tone="success">Sistema institucional</Badge><h1>Gestão escolar com clareza e cuidado.</h1><p>Registre, acompanhe e tome decisões com informações organizadas e responsáveis.</p></div><small>IFAM — Instituto Federal do Amazonas · Educação, ciência e tecnologia</small></div><div className="login-main"><form className="login-card" onSubmit={(e) => { e.preventDefault(); onLogin(role); }}><div className="mobile-logo"><Logo /></div><span className="login-icon"><Icon name="shield" size={25} /></span><h2>Acesse sua conta</h2><p>Escolha seu perfil e use suas credenciais institucionais.</p><span className="field-label">Entrar como</span><div className="choice-row">{(["inspetor", "dep"] as Role[]).map((r) => <label key={r} className={`choice ${role === r ? "active" : ""}`}><input type="radio" name="role" checked={role === r} onChange={() => setRole(r)} /><span className="choice-icon"><Icon name={r === "dep" ? "shield" : "user"} /></span><span><strong>{profiles[r].short}</strong><small>{profiles[r].desc}</small></span></label>)}</div><Field label="E-mail institucional"><Input type="email" placeholder="nome@if.edu.br" required /></Field><Field label="Senha"><Input type="password" placeholder="Digite sua senha" required /></Field><div className="login-help"><label className="check"><input type="checkbox" /><span><Icon name="check" size={14} /></span>Lembrar acesso</label><button type="button">Esqueci minha senha</button></div><Button type="submit" className="full">Entrar no sistema <Icon name="arrow" size={17} /></Button><small className="secure"><Icon name="lock" size={14} /> Ambiente seguro e acesso monitorado</small></form></div></div>;
}

function AppShell() {
  const [page, setPage] = useState<Page>("Login");
  const [role, setRole] = useState<Role>("inspetor");
  const profile = profiles[role];
  const [occs, setOccs] = useState<Occ[]>(initialOccs);
  const addOcc = (o: Omit<Occ, "id" | "by" | "status">) => setOccs((prev) => [{ ...o, id: Date.now(), by: profile.name, status: "Registrada" }, ...prev]);
  const updateOcc = (o: Occ) => setOccs((prev) => prev.map((x) => (x.id === o.id ? { ...o, edited: true } : x)));
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const title = useMemo(() => page === "Perfil do aluno" ? "Alunos" : page, [page]);
  const go = (p: Page) => { setPage(p); setMobileMenu(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  if (page === "Login") return <Login onLogin={(r) => { setRole(r); setPage("Dashboard"); }} />;
  let content: ReactNode;
  if (page === "Dashboard") content = <Dashboard go={go} first={profile.first} canRegister={role === "inspetor"} />;
  else if (page === "Registrar ocorrência") content = <OccurrenceForm go={go} onAdd={addOcc} />;
  else if (page === "Alunos") content = <Students go={go} isDep={role === "dep"} />;
  else if (page === "Ocorrências") content = <Occurrences go={go} occs={occs} onUpdate={updateOcc} />;
  else if (page === "Alertas") content = <Alerts go={go} />;
  else if (page === "Perfil do aluno") content = <StudentProfile go={go} isDep={role === "dep"} />;
  else if (page === "Progressão disciplinar") content = <Progression go={go} />;
  else if (page === "Assistência Social") content = <Social go={go} />;
  else if (page === "Detalhes do acompanhamento") content = <SocialDetails go={go} />;
  else if (page === "Relatórios") content = <Reports />;
  else if (page === "Configurações") content = <Settings go={go} />;
  else if (page === "Usuários") content = <Settings users go={go} />;
  else content = <Notification go={go} />;
  return <div className="app-shell">
    <aside className={`sidebar ${mobileMenu ? "open" : ""}`}><div className="sidebar-top"><Logo /><button className="mobile-close" onClick={() => setMobileMenu(false)}>×</button></div><nav><span className="nav-label">MENU PRINCIPAL</span>{nav.filter((n) => profile.menu.includes(n.name)).map((n) => <button key={n.name} className={title === n.name ? "active" : ""} onClick={() => go(n.name)}><Icon name={n.icon} /><span>{n.name}</span>{n.name === "Alertas" && <b>8</b>}</button>)}{role === "dep" && <><span className="nav-label nav-admin">ADMINISTRAÇÃO</span><button className={page === "Usuários" ? "active" : ""} onClick={() => go("Usuários")}><Icon name="user" /><span>Usuários</span></button></>}</nav><div className="sidebar-footer"><button onClick={() => go("Login")}><Icon name="logout" /><span>Sair do sistema</span></button><small>{APP_NAME} v1.0</small></div></aside>
    {mobileMenu && <div className="scrim" onClick={() => setMobileMenu(false)} />}
    <div className="app-main"><header><button className="menu-button" onClick={() => setMobileMenu(true)}><Icon name="menu" /></button><div className="header-search"><Icon name="search" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar aluno, matrícula ou ocorrência..." /><kbd>⌘ K</kbd></div><div className="header-actions">{role === "dep" && <button className="notification-button" onClick={() => go("Alertas")}><Icon name="bell" /><span>8</span></button>}<button className="user-menu"><span className="avatar avatar-small avatar-1">{profile.initials}</span><span><strong>{profile.name}</strong><small>{profile.label}</small></span><Icon name="chevron" size={14} /></button></div></header><main>{content}</main></div>
    <nav className="bottom-nav">{[{ name: "Dashboard", icon: "grid", label: "Início" }, { name: "Registrar ocorrência", icon: "plus", label: "Registrar" }, { name: "Alunos", icon: "users", label: "Alunos" }, { name: "Alertas", icon: "bell", label: "Alertas" }].filter((x) => profile.menu.includes(x.name as Page)).map(x => <button key={x.name} onClick={() => go(x.name as Page)} className={title === x.name ? "active" : ""}><Icon name={x.icon as IconName} /><span>{x.label}</span></button>)}<button onClick={() => setMobileMenu(true)}><Icon name="menu" /><span>Menu</span></button></nav>
  </div>;
}

export default function App() {
  return <AppShell />;
}
