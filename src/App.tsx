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

function Input({ placeholder, type = "text", defaultValue, icon, required = false }: { placeholder?: string; type?: string; defaultValue?: string; icon?: IconName; required?: boolean }) {
  return <span className="input-wrap">{icon && <Icon name={icon} size={18} />}<input className="input" placeholder={placeholder} type={type} defaultValue={defaultValue} required={required} /></span>;
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

function Logo({ compact = false }: { compact?: boolean }) {
  return <div className={`brand ${compact ? "brand-compact" : ""}`}><span className="brand-mark"><span /><span /><span /><span /></span>{!compact && <span className="brand-copy"><strong>Instituto Federal</strong><small>Gestão Escolar</small></span>}</div>;
}

function Dashboard({ go }: { go: (p: Page) => void }) {
  const metrics = [
    ["1.248", "Total de alunos", "users", "+12 este mês", "green"],
    ["18", "Ocorrências hoje", "clipboard", "6 a menos que ontem", "blue"],
    ["142", "Ocorrências no mês", "calendar", "12% abaixo da média", "blue"],
    ["08", "Com 3+ ocorrências", "bell", "Requer atenção do DEP", "amber"],
    ["05", "Encaminhados ao social", "heart", "2 aguardando triagem", "purple"],
    ["03", "Notificações pendentes", "clock", "1 vence hoje", "amber"],
  ];
  return <>
    <PageTitle eyebrow="Visão geral" title="Bom dia, Marcelo" subtitle="Acompanhe os principais indicadores da rotina escolar." action={<Button icon="plus" onClick={() => go("Registrar ocorrência")}>Registrar ocorrência</Button>} />
    <div className="metric-grid">{metrics.map(([value, label, icon, detail, tone]) => <Card className="metric" key={label}><div className={`metric-icon tone-${tone}`}><Icon name={icon as IconName} /></div><div><span>{label}</span><strong>{value}</strong><small>{detail}</small></div></Card>)}</div>
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
    <Card>
      <div className="card-head"><div><h2>Alertas recentes</h2><p>Alunos que precisam de acompanhamento do DEP</p></div><Button variant="ghost" onClick={() => go("Alertas")}>Ver todos <Icon name="arrow" size={16} /></Button></div>
      <div className="alert-list">
        {students.slice(0, 3).map((s, i) => <div className="alert-row" key={s.id}><div className={`avatar avatar-${i}`}>{s.initials}</div><div className="alert-student"><strong>{s.name}</strong><span>{s.turma} · Matrícula {s.id}</span></div><div className="alert-count"><strong>{s.count}</strong><span>ocorrências</span></div><div className="alert-date"><strong>{i === 0 ? "Hoje, 07:42" : i === 1 ? "Ontem, 13:18" : "20 mai, 08:06"}</strong><span>Última ocorrência</span></div><Badge tone={i === 0 ? "warning" : "info"}>{s.level}</Badge><Button variant="secondary" onClick={() => go("Perfil do aluno")}>Analisar</Button></div>)}
      </div>
    </Card>
  </>;
}

function OccurrenceForm({ go }: { go: (p: Page) => void }) {
  const [selected, setSelected] = useState(true);
  const [type, setType] = useState("uniforme");
  const [social, setSocial] = useState(false);
  const [success, setSuccess] = useState(false);
  function submit(e: FormEvent) { e.preventDefault(); setSuccess(true); window.setTimeout(() => setSuccess(false), 5000); }
  return <>
    <PageTitle eyebrow="Registro rápido" title="Registrar ocorrência" subtitle="Preencha os dados abaixo. Nenhuma medida disciplinar é aplicada automaticamente." />
    {success && <div className="success-banner"><span><Icon name="check" /></span><div><strong>Ocorrência registrada com sucesso.</strong><p>O histórico do aluno foi atualizado e o DEP será notificado se necessário.</p></div><Button variant="ghost" onClick={() => setSuccess(false)}>Fechar</Button></div>}
    <form className="form-layout" onSubmit={submit}>
      <div className="form-main">
        <Card className="form-card">
          <div className="section-number">1</div><div className="section-body"><h2>Identificação do aluno</h2><p>Busque pelo nome completo ou número de matrícula.</p>
            <div className="student-search"><Input icon="search" placeholder="Buscar aluno ou matrícula..." /><Button variant="secondary" onClick={() => setSelected(!selected)}>Pesquisar</Button></div>
            {selected && <div className="selected-student"><div className="avatar avatar-0">AC</div><div><span>Aluno selecionado</span><strong>Ana Carolina Mendes</strong><small>Matrícula 20240187 · 1º A — Técnico em Informática</small></div><Button variant="ghost" onClick={() => setSelected(false)}>Alterar</Button></div>}
          </div>
        </Card>
        <Card className="form-card">
          <div className="section-number">2</div><div className="section-body"><h2>Dados da ocorrência</h2><p>Informe o tipo e os detalhes do registro.</p>
            <div className="two-cols"><Field label="Data do registro"><Input icon="calendar" type="date" defaultValue="2025-05-23" /></Field><Field label="Horário"><Input icon="clock" type="time" defaultValue="07:42" /></Field></div>
            <Field label="Tipo de ocorrência"><div className="choice-row"><label className={`choice ${type === "uniforme" ? "active" : ""}`}><input type="radio" name="type" checked={type === "uniforme"} onChange={() => setType("uniforme")} /><span className="choice-icon"><Icon name="shield" /></span><span><strong>Uniforme</strong><small>Item obrigatório ausente</small></span></label><label className={`choice ${type === "atraso" ? "active" : ""}`}><input type="radio" name="type" checked={type === "atraso"} onChange={() => setType("atraso")} /><span className="choice-icon"><Icon name="clock" /></span><span><strong>Atraso</strong><small>Entrada após o horário</small></span></label></div></Field>
            {type === "uniforme" ? <Field label="Item ausente"><div className="check-grid">{["Camisa do uniforme", "Calça preta", "Calçado fechado"].map((x, i) => <label className="check" key={x}><input type="checkbox" defaultChecked={i === 0} /><span><Icon name="check" size={14} /></span>{x}</label>)}</div></Field> : <Field label="Horário de entrada" hint="A tolerância configurada é de 15 minutos."><Input type="time" defaultValue="07:22" /></Field>}
            <Field label="Observação (opcional)"><textarea className="input textarea" placeholder="Adicione uma informação relevante sobre o ocorrido..." /></Field>
          </div>
        </Card>
        <Card className="form-card social-card">
          <div className="section-number"><Icon name="heart" size={18} /></div><div className="section-body"><h2>Encaminhamento social</h2><p>Registre situações que demandem avaliação socioassistencial.</p>
            <label className="social-check"><input type="checkbox" checked={social} onChange={(e) => setSocial(e.target.checked)} /><span><Icon name="check" size={14} /></span><div><strong>Aluno relata dificuldade financeira para aquisição do uniforme</strong><small>Esta informação terá acesso restrito.</small></div></label>
            {social && <div className="social-notice"><Icon name="shield" /><div><strong>Atenção ao tratamento deste registro</strong><p>Esta ocorrência não deve gerar penalização automática antes da avaliação da Assistência Social.</p><label className="check"><input type="checkbox" defaultChecked /><span><Icon name="check" size={14} /></span>Encaminhar para Assistência Social</label></div></div>}
          </div>
        </Card>
        <div className="form-actions"><Button variant="secondary" onClick={() => go("Dashboard")}>Cancelar</Button><Button type="submit" icon="check" disabled={!selected}>Registrar ocorrência</Button></div>
      </div>
      <aside className="form-aside"><Card><h3>Resumo do registro</h3><div className="summary-item"><span>Aluno</span><strong>{selected ? "Ana Carolina Mendes" : "Não selecionado"}</strong></div><div className="summary-item"><span>Tipo</span><strong>{type === "uniforme" ? "Uniforme" : "Atraso"}</strong></div><div className="summary-item"><span>Registrado por</span><strong>Marcelo Silva</strong></div><div className="rule"><Icon name="shield" /><p>Este registro contabiliza uma ocorrência, mas não aplica medida disciplinar automaticamente.</p></div></Card></aside>
    </form>
  </>;
}

function Toolbar({ search = "Buscar por nome ou matrícula..." }: { search?: string }) {
  return <div className="toolbar"><div className="search-wide"><Input icon="search" placeholder={search} /></div><Button variant="secondary" icon="filter">Filtros</Button><Select defaultValue="all"><option value="all">Todas as turmas</option><option>1º A</option><option>2º B</option></Select></div>;
}

function Students({ go }: { go: (p: Page) => void }) {
  return <><PageTitle eyebrow="Gestão acadêmica" title="Alunos" subtitle="Consulte estudantes, histórico de ocorrências e situação disciplinar." action={<Button icon="plus">Cadastrar aluno</Button>} /><Toolbar /><Card className="table-card"><div className="table-scroll"><table><thead><tr><th>Aluno</th><th>Turma</th><th>Ocorrências</th><th>Nível disciplinar</th><th>Situação</th><th /></tr></thead><tbody>{students.map((s, i) => <tr key={s.id} onClick={() => go("Perfil do aluno")}><td><div className="person"><div className={`avatar avatar-${i}`}>{s.initials}</div><span><strong>{s.name}</strong><small>Matrícula {s.id}</small></span></div></td><td>{s.turma}</td><td><strong className={s.count >= 3 ? "count-danger" : ""}>{s.count}</strong></td><td>{s.level}</td><td><Badge tone={s.status === "Regular" ? "success" : s.status === "Requer análise" ? "warning" : "info"}>{s.status}</Badge></td><td><Icon name="chevron" size={16} /></td></tr>)}</tbody></table></div><div className="pagination"><span>Mostrando 1–5 de 1.248 alunos</span><div><Button variant="secondary">Anterior</Button><Button variant="secondary">Próxima</Button></div></div></Card></>;
}

function Occurrences({ go }: { go: (p: Page) => void }) {
  const rows = [
    ["23 mai 2025, 07:42", "Ana Carolina Mendes", "1º A", "Uniforme", "Camisa", "Marcelo Silva", "Registrada"],
    ["23 mai 2025, 07:28", "Bruno Ribeiro Santos", "2º B", "Atraso", "22 minutos", "Marcelo Silva", "Registrada"],
    ["22 mai 2025, 13:18", "Diego Martins Alves", "3º A", "Uniforme", "Calçado", "Luciana Rocha", "Em análise"],
    ["22 mai 2025, 07:54", "Camila Lima Ferreira", "1º B", "Atraso", "19 minutos", "Marcelo Silva", "Registrada"],
    ["21 mai 2025, 08:06", "Ana Carolina Mendes", "1º A", "Uniforme", "Calça preta", "Luciana Rocha", "Encaminhada"],
  ];
  return <><PageTitle eyebrow="Registros" title="Ocorrências" subtitle="Consulte todos os registros realizados pela equipe escolar." action={<Button icon="plus" onClick={() => go("Registrar ocorrência")}>Nova ocorrência</Button>} /><Toolbar search="Buscar aluno ou responsável..." /><Card className="table-card"><div className="table-scroll"><table><thead><tr>{["Data", "Aluno", "Turma", "Tipo", "Item / detalhe", "Registrado por", "Situação"].map(x => <th key={x}>{x}</th>)}</tr></thead><tbody>{rows.map((r, i) => <tr key={i}>{r.map((x, j) => <td key={j}>{j === 1 ? <strong>{x}</strong> : j === 6 ? <Badge tone={x === "Em análise" ? "warning" : x === "Encaminhada" ? "info" : "success"}>{x}</Badge> : x}</td>)}</tr>)}</tbody></table></div><div className="pagination"><span>Mostrando 1–5 de 142 ocorrências</span><Button variant="secondary">Próxima</Button></div></Card></>;
}

function Alerts({ go }: { go: (p: Page) => void }) {
  return <><PageTitle eyebrow="Acompanhamento DEP" title="Central de alertas" subtitle="Analise situações prioritárias e defina as ações adequadas." /><div className="info-banner"><Icon name="bell" /><div><strong>8 alunos atingiram 3 ou mais ocorrências</strong><p>O alerta não gera punição automática. Analise o histórico antes de registrar qualquer medida.</p></div></div><div className="tab-row"><Button>Requerem análise <span className="tab-count">8</span></Button><Button variant="ghost">Em andamento</Button><Button variant="ghost">Concluídos</Button></div><div className="alert-cards">{students.filter(s => s.count >= 3).map((s, i) => <Card className="alert-card" key={s.id}><div className="priority-line" /><div className="alert-card-head"><div className={`avatar avatar-${i}`}>{s.initials}</div><div><Badge tone="warning">Atingiu {s.count} ocorrências</Badge><h2>{s.name}</h2><p>{s.turma} · Matrícula {s.id}</p></div><Icon name="bell" /></div><div className="alert-facts"><span><small>Data do alerta</small><strong>{i ? "22 mai 2025" : "Hoje, 07:42"}</strong></span><span><small>Nível atual</small><strong>{s.level}</strong></span><span><small>Último registro</small><strong>{i ? "Uniforme" : "Camisa do uniforme"}</strong></span></div><div className="alert-actions"><Button variant="secondary" onClick={() => go("Perfil do aluno")}>Ver perfil</Button><Button onClick={() => go("Progressão disciplinar")}>Analisar ocorrências</Button></div></Card>)}</div></>;
}

function StudentProfile({ go }: { go: (p: Page) => void }) {
  return <><Button variant="ghost" icon="arrow" className="back-button" onClick={() => go("Alunos")}>Voltar para alunos</Button><Card className="profile-hero"><div className="avatar avatar-large avatar-0">AC</div><div className="profile-name"><Badge tone="warning">Requer análise do DEP</Badge><h1>Ana Carolina Mendes</h1><p>Matrícula 20240187 · 1º A — Técnico em Informática</p></div><div className="profile-stats"><span><strong>3</strong><small>Ocorrências</small></span><span><strong>1</strong><small>Alerta ativo</small></span></div><Button onClick={() => go("Notificação aos responsáveis")}>Registrar medida</Button></Card><div className="profile-grid"><Card><div className="card-head"><div><h2>Histórico de ocorrências</h2><p>Registros em ordem cronológica</p></div></div><div className="timeline">{[["23 mai 2025 · 07:42", "Uniforme — Camisa", "Registrado por Marcelo Silva", "Aluno informou que a camisa estava em processo de secagem."], ["21 mai 2025 · 08:06", "Uniforme — Calça preta", "Registrado por Luciana Rocha", "Encaminhado para avaliação do DEP."], ["12 mai 2025 · 07:34", "Atraso — 19 minutos", "Registrado por Marcelo Silva", "Entrada liberada após registro."]].map((x, i) => <div className="timeline-item" key={x[0]}><span className={i === 0 ? "current" : ""}><Icon name={i === 0 ? "clipboard" : "check"} size={15} /></span><div><small>{x[0]}</small><strong>{x[1]}</strong><p>{x[3]}</p><em>{x[2]}</em></div></div>)}</div></Card><Card><h2>Progressão disciplinar</h2><p>A etapa atual exige registro de ação pelo DEP.</p><div className="mini-progress"><div className="done"><span><Icon name="check" size={14} /></span><div><strong>Ocorrências</strong><small>3 registros contabilizados</small></div></div><div className="active"><span>2</span><div><strong>Advertência verbal</strong><small>Aguardando registro</small></div></div><div><span>3</span><div><strong>Advertência por escrito</strong><small>Não iniciada</small></div></div><div><span>4</span><div><strong>Notificação aos responsáveis</strong><small>Não iniciada</small></div></div></div><Button className="full" onClick={() => go("Progressão disciplinar")}>Ver progressão completa</Button></Card></div></>;
}

function Progression({ go }: { go: (p: Page) => void }) {
  const stages = [
    ["Ocorrências", "Concluída", "3 registros", "23 mai 2025", "Sistema"],
    ["Advertência verbal", "Etapa atual", "Aguardando registro da ação", "—", "DEP"],
    ["Advertência por escrito", "Não iniciada", "Exige ação anterior", "—", "DEP"],
    ["Notificação / convocação", "Não iniciada", "Exige ação anterior", "—", "DEP"],
  ];
  return <><PageTitle eyebrow="Acompanhamento DEP" title="Progressão disciplinar" subtitle="Visualize e registre cada etapa do acompanhamento do estudante." /><Card className="student-strip"><div className="avatar avatar-0">AC</div><div><strong>Ana Carolina Mendes</strong><span>1º A — Informática · 3 ocorrências</span></div><Button variant="secondary" onClick={() => go("Perfil do aluno")}>Ver perfil</Button></Card><div className="progression">{stages.map((s, i) => <div className={`stage ${i === 0 ? "done" : i === 1 ? "active" : ""}`} key={s[0]}><div className="stage-marker">{i === 0 ? <Icon name="check" /> : i + 1}</div><Card><div className="stage-head"><div><Badge tone={i === 0 ? "success" : i === 1 ? "warning" : "neutral"}>{s[1]}</Badge><h2>{s[0]}</h2><p>{s[2]}</p></div>{i === 1 && <Button>Registrar advertência verbal</Button>}</div><div className="stage-meta"><span>Data <strong>{s[3]}</strong></span><span>Responsável <strong>{s[4]}</strong></span><span>Documento <strong>{i === 0 ? "3 registros vinculados" : "Nenhum"}</strong></span></div></Card></div>)}</div><div className="rule-footer"><Icon name="shield" /><span><strong>Avanço responsável</strong><p>Nenhuma etapa avança automaticamente. É necessário registrar a ação correspondente.</p></span></div></>;
}

function Social({ go }: { go: (p: Page) => void }) {
  return <><PageTitle eyebrow="Área restrita" title="Assistência Social" subtitle="Acompanhe estudantes encaminhados para avaliação socioassistencial." action={<Badge tone="info"><Icon name="lock" size={13} /> Acesso restrito</Badge>} /><div className="social-metrics"><Card><span>Aguardando triagem</span><strong>2</strong></Card><Card><span>Em acompanhamento</span><strong>3</strong></Card><Card><span>Resolvidos no mês</span><strong>7</strong></Card></div><Toolbar search="Buscar estudante encaminhado..." /><Card className="table-card"><div className="table-scroll"><table><thead><tr><th>Aluno</th><th>Turma</th><th>Encaminhamento</th><th>Motivo</th><th>Status</th><th /></tr></thead><tbody>{students.slice(0, 4).map((s, i) => <tr key={s.id} onClick={() => go("Detalhes do acompanhamento")}><td><div className="person"><div className={`avatar avatar-${i}`}>{s.initials}</div><strong>{s.name}</strong></div></td><td>{s.turma}</td><td>{22 - i} mai 2025</td><td>Dificuldade para aquisição do uniforme</td><td><Badge tone={i < 2 ? "warning" : i === 2 ? "info" : "success"}>{i < 2 ? "Aguardando triagem" : i === 2 ? "Em acompanhamento" : "Resolvido"}</Badge></td><td><Icon name="chevron" size={16} /></td></tr>)}</tbody></table></div></Card></>;
}

function SocialDetails({ go }: { go: (p: Page) => void }) {
  return <><Button variant="ghost" icon="arrow" className="back-button" onClick={() => go("Assistência Social")}>Voltar para Assistência Social</Button><PageTitle eyebrow="Caso socioassistencial #AS-0258" title="Acompanhamento de Ana Carolina" subtitle="Dados protegidos e acessíveis somente a usuários autorizados." action={<Select defaultValue="triagem"><option value="triagem">Aguardando triagem</option><option>Em acompanhamento</option><option>Resolvido</option></Select>} /><div className="details-grid"><Card><h2>Dados do encaminhamento</h2><div className="detail-list"><span><small>Estudante</small><strong>Ana Carolina Mendes</strong></span><span><small>Turma</small><strong>1º A — Informática</strong></span><span><small>Data</small><strong>23 mai 2025, 07:48</strong></span><span><small>Encaminhado por</small><strong>Marcelo Silva — Inspetor</strong></span><span><small>Motivo</small><strong>Dificuldade financeira para aquisição do uniforme</strong></span></div></Card><Card><h2>Registrar acompanhamento</h2><Field label="Data"><Input type="date" defaultValue="2025-05-23" /></Field><Field label="Registro do atendimento"><textarea className="input textarea" placeholder="Descreva o contato, orientação ou providência realizada..." /></Field><Button className="full">Salvar acompanhamento</Button></Card></div></>;
}

function Reports() {
  return <><PageTitle eyebrow="Análise e transparência" title="Relatórios" subtitle="Configure filtros, visualize indicadores e exporte dados institucionais." /><Card className="report-builder"><div className="report-heading"><span><Icon name="filter" /></span><div><h2>Configurar relatório</h2><p>Selecione os critérios para gerar uma análise personalizada.</p></div></div><div className="report-fields"><Field label="Período inicial"><Input type="date" defaultValue="2025-05-01" /></Field><Field label="Período final"><Input type="date" defaultValue="2025-05-23" /></Field><Field label="Turma"><Select><option>Todas as turmas</option><option>1º A — Informática</option></Select></Field><Field label="Tipo de ocorrência"><Select><option>Todos os tipos</option><option>Uniforme</option><option>Atraso</option></Select></Field></div><div className="report-actions"><Button>Visualizar relatório</Button><Button variant="secondary" icon="download">Exportar PDF</Button><Button variant="secondary" icon="download">Exportar Excel</Button></div></Card><div className="report-grid"><Card><div className="metric-icon tone-green"><Icon name="clipboard" /></div><span>Ocorrências no período</span><strong>142</strong><small>−12% comparado ao período anterior</small></Card><Card><div className="metric-icon tone-blue"><Icon name="users" /></div><span>Estudantes envolvidos</span><strong>96</strong><small>7,7% do total de alunos</small></Card><Card><div className="metric-icon tone-purple"><Icon name="heart" /></div><span>Encaminhamentos sociais</span><strong>12</strong><small>8 foram concluídos</small></Card></div></>;
}

function Settings({ users, go }: { users?: boolean; go: (p: Page) => void }) {
  if (users) return <><PageTitle eyebrow="Administração" title="Gerenciamento de usuários" subtitle="Cadastre usuários e defina permissões de acesso." action={<Button icon="plus">Novo usuário</Button>} /><Toolbar search="Buscar usuário por nome ou e-mail..." /><Card className="table-card"><div className="table-scroll"><table><thead><tr><th>Usuário</th><th>Perfil</th><th>Último acesso</th><th>Status</th><th /></tr></thead><tbody>{[["Marcelo Silva", "marcelo.silva@if.edu.br", "Inspetor / Portaria", "Hoje, 08:14"], ["Juliana Martins", "juliana.martins@if.edu.br", "Departamento de Ensino", "Hoje, 07:58"], ["Renata Costa", "renata.costa@if.edu.br", "Assistência Social", "Ontem, 16:42"], ["André Luiz", "andre.luiz@if.edu.br", "Administrador", "22 mai, 18:03"]].map((u, i) => <tr key={u[1]}><td><div className="person"><div className={`avatar avatar-${i}`}>{u[0].split(" ").map(x => x[0]).slice(0,2).join("")}</div><span><strong>{u[0]}</strong><small>{u[1]}</small></span></div></td><td>{u[2]}</td><td>{u[3]}</td><td><Badge tone="success">Ativo</Badge></td><td><Button variant="ghost">Editar</Button></td></tr>)}</tbody></table></div></Card></>;
  return <><PageTitle eyebrow="Administração" title="Configurações" subtitle="Gerencie regras institucionais e parâmetros do sistema." /><div className="settings-grid">{[["clock", "Regras de atraso", "Defina horário de entrada e tolerância.", "Tolerância atual: 15 minutos"], ["steps", "Progressão disciplinar", "Configure etapas e critérios de acompanhamento.", "4 etapas ativas"], ["users", "Usuários e permissões", "Gerencie perfis e níveis de acesso.", "24 usuários ativos"], ["bell", "Notificações", "Defina alertas e comunicações automáticas.", "3 regras configuradas"]].map((s) => <Card className="setting-card" key={s[1]}><span><Icon name={s[0] as IconName} /></span><div><h2>{s[1]}</h2><p>{s[2]}</p><small>{s[3]}</small></div><Button variant="secondary" onClick={() => s[0] === "users" && go("Usuários")}>Configurar</Button></Card>)}</div></>;
}

function Notification({ go }: { go: (p: Page) => void }) {
  return <><Button variant="ghost" icon="arrow" className="back-button" onClick={() => go("Perfil do aluno")}>Voltar ao perfil</Button><PageTitle eyebrow="Ação disciplinar" title="Notificação aos responsáveis" subtitle="Registre o contato de forma clara e rastreável." /><div className="form-layout"><Card className="form-main"><h2>Dados da notificação</h2><div className="two-cols"><Field label="Data da notificação"><Input type="date" defaultValue="2025-05-23" /></Field><Field label="Responsável notificado"><Input placeholder="Nome do responsável" /></Field><Field label="Meio de comunicação"><Select><option>Telefone</option><option>E-mail</option><option>Aplicativo de mensagens</option><option>Presencial</option></Select></Field><Field label="Status"><Select><option>Pendente</option><option>Enviada</option><option>Recebida</option><option>Concluída</option></Select></Field></div><Field label="Observação"><textarea className="input textarea" placeholder="Registre detalhes da comunicação..." /></Field><div className="form-actions"><Button variant="secondary" onClick={() => go("Perfil do aluno")}>Cancelar</Button><Button>Salvar notificação</Button></div></Card><aside className="form-aside"><Card><h3>Estudante</h3><div className="person"><div className="avatar avatar-0">AC</div><span><strong>Ana Carolina Mendes</strong><small>1º A — Informática</small></span></div><div className="rule"><Icon name="shield" /><p>O registro ficará disponível no histórico disciplinar do estudante.</p></div></Card></aside></div></>;
}

function Login({ go }: { go: (p: Page) => void }) {
  return <div className="login-page"><div className="login-aside"><Logo /><div><Badge tone="success">Sistema institucional</Badge><h1>Gestão escolar com clareza e cuidado.</h1><p>Registre, acompanhe e tome decisões com informações organizadas e responsáveis.</p></div><small>Instituto Federal · Educação, ciência e tecnologia</small></div><div className="login-main"><form className="login-card" onSubmit={(e) => { e.preventDefault(); go("Dashboard"); }}><div className="mobile-logo"><Logo /></div><span className="login-icon"><Icon name="shield" size={25} /></span><h2>Acesse sua conta</h2><p>Use suas credenciais institucionais para continuar.</p><Field label="E-mail institucional"><Input type="email" placeholder="nome@if.edu.br" required /></Field><Field label="Senha"><Input type="password" placeholder="Digite sua senha" required /></Field><div className="login-help"><label className="check"><input type="checkbox" /><span><Icon name="check" size={14} /></span>Lembrar acesso</label><button type="button">Esqueci minha senha</button></div><Button type="submit" className="full">Entrar no sistema <Icon name="arrow" size={17} /></Button><small className="secure"><Icon name="lock" size={14} /> Ambiente seguro e acesso monitorado</small></form></div></div>;
}

function AppShell() {
  const [page, setPage] = useState<Page>("Dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const title = useMemo(() => page === "Perfil do aluno" ? "Alunos" : page, [page]);
  const go = (p: Page) => { setPage(p); setMobileMenu(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  if (page === "Login") return <Login go={go} />;
  let content: ReactNode;
  if (page === "Dashboard") content = <Dashboard go={go} />;
  else if (page === "Registrar ocorrência") content = <OccurrenceForm go={go} />;
  else if (page === "Alunos") content = <Students go={go} />;
  else if (page === "Ocorrências") content = <Occurrences go={go} />;
  else if (page === "Alertas") content = <Alerts go={go} />;
  else if (page === "Perfil do aluno") content = <StudentProfile go={go} />;
  else if (page === "Progressão disciplinar") content = <Progression go={go} />;
  else if (page === "Assistência Social") content = <Social go={go} />;
  else if (page === "Detalhes do acompanhamento") content = <SocialDetails go={go} />;
  else if (page === "Relatórios") content = <Reports />;
  else if (page === "Configurações") content = <Settings go={go} />;
  else if (page === "Usuários") content = <Settings users go={go} />;
  else content = <Notification go={go} />;
  return <div className="app-shell">
    <aside className={`sidebar ${mobileMenu ? "open" : ""}`}><div className="sidebar-top"><Logo /><button className="mobile-close" onClick={() => setMobileMenu(false)}>×</button></div><nav><span className="nav-label">MENU PRINCIPAL</span>{nav.map((n) => <button key={n.name} className={title === n.name ? "active" : ""} onClick={() => go(n.name)}><Icon name={n.icon} /><span>{n.name}</span>{n.name === "Alertas" && <b>8</b>}</button>)}<span className="nav-label nav-admin">ADMINISTRAÇÃO</span><button className={page === "Usuários" ? "active" : ""} onClick={() => go("Usuários")}><Icon name="user" /><span>Usuários</span></button></nav><div className="sidebar-footer"><button onClick={() => go("Login")}><Icon name="logout" /><span>Sair do sistema</span></button><small>Gestão Escolar v1.0</small></div></aside>
    {mobileMenu && <div className="scrim" onClick={() => setMobileMenu(false)} />}
    <div className="app-main"><header><button className="menu-button" onClick={() => setMobileMenu(true)}><Icon name="menu" /></button><div className="header-search"><Icon name="search" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar aluno, matrícula ou ocorrência..." /><kbd>⌘ K</kbd></div><div className="header-actions"><button className="notification-button" onClick={() => go("Alertas")}><Icon name="bell" /><span>8</span></button><button className="user-menu"><span className="avatar avatar-small avatar-1">MS</span><span><strong>Marcelo Silva</strong><small>Inspetor / Portaria</small></span><Icon name="chevron" size={14} /></button></div></header><main>{content}</main></div>
    <nav className="bottom-nav">{[{ name: "Dashboard", icon: "grid", label: "Início" }, { name: "Registrar ocorrência", icon: "plus", label: "Registrar" }, { name: "Alunos", icon: "users", label: "Alunos" }, { name: "Alertas", icon: "bell", label: "Alertas" }].map(x => <button key={x.name} onClick={() => go(x.name as Page)} className={title === x.name ? "active" : ""}><Icon name={x.icon as IconName} /><span>{x.label}</span></button>)}<button onClick={() => setMobileMenu(true)}><Icon name="menu" /><span>Menu</span></button></nav>
  </div>;
}

export default function App() {
  return <AppShell />;
}
