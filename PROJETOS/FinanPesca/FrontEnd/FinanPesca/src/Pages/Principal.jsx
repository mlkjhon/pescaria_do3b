import { useNavigate } from "react-router-dom";
import {
  tokens,
  injectGlobalStyles,
  Logo,
  Icon,
} from "../Styles/Estilos";

injectGlobalStyles();

export default function Principal() {
  const navigate = useNavigate();

  function sair() {
    localStorage.removeItem("Usuario logado");
    navigate("/");
  }

  return (
    <div style={page}>
      {/* Sidebar */}
      <aside style={sidebar}>
        <div style={{ marginBottom: "32px" }}>
          <Logo size={40} showText={false} />
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <SideItem icon="home" label="Início" active />
          <SideItem icon="user" label="Perfil" />
        </nav>

        <div style={{ marginTop: "auto" }}>
          <button onClick={sair} style={sairBtn}>
            <Icon name="logout" size={16} color={tokens.color.textMuted} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main style={main}>
        {/* Header */}
        <header style={header}>
          <div>
            <h1 style={pageTitle}>Início</h1>
            <p style={pageSubtitle}>Bem-vindo ao FinanPesca 🐟</p>
          </div>
          <div style={userChip}>
            <div style={userAvatar}>
              <Icon name="user" size={16} color={tokens.color.white} />
            </div>
            <span style={userName}>Pescador</span>
          </div>
        </header>

        {/* Cards de resumo */}
        <section style={cardsGrid}>
          <SummaryCard
            label="Receitas do mês"
            value="R$ 0,00"
            accent={tokens.color.success}
            accentBg="#F0FAF5"
          />
          <SummaryCard
            label="Despesas do mês"
            value="R$ 0,00"
            accent={tokens.color.error}
            accentBg={tokens.color.errorBg}
          />
          <SummaryCard
            label="Saldo atual"
            value="R$ 0,00"
            accent={tokens.color.accent}
            accentBg={tokens.color.accentLight}
          />
        </section>

        {/* Área de conteúdo futura */}
        <section className="fp-card fp-card-anim" style={emptyState}>
          <div style={emptyIcon}>
            <Icon name="home" size={28} color={tokens.color.textLight} />
          </div>
          <p style={emptyTitle}>Nenhum lançamento ainda</p>
          <p style={emptyDesc}>
            Comece adicionando suas receitas e despesas para visualizar seu saldo.
          </p>
        </section>
      </main>
    </div>
  );
}

// ─── Sub-componentes ──────────────────────────────────────────────────────────

function SideItem({ icon, label, active }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "10px 12px",
      borderRadius: tokens.radius.md,
      cursor: "pointer",
      background: active ? tokens.color.accentLight : "transparent",
      color: active ? tokens.color.accent : tokens.color.textMuted,
      fontFamily: tokens.font.family,
      fontSize: tokens.font.sizeSm,
      fontWeight: active ? tokens.font.weightSemibold : tokens.font.weightNormal,
      transition: `background ${tokens.transition.fast}, color ${tokens.transition.fast}`,
    }}>
      <Icon name={icon} size={17} color={active ? tokens.color.accent : tokens.color.textLight} />
      {label}
    </div>
  );
}

function SummaryCard({ label, value, accent, accentBg }) {
  return (
    <div className="fp-card" style={{ padding: "24px 28px", flex: 1, minWidth: "180px" }}>
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        borderRadius: tokens.radius.md,
        background: accentBg,
        marginBottom: "14px",
      }}>
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: accent }} />
      </div>
      <p style={{
        fontSize: tokens.font.sizeSm,
        color: tokens.color.textMuted,
        fontFamily: tokens.font.family,
        marginBottom: "6px",
      }}>{label}</p>
      <p style={{
        fontSize: tokens.font.sizeXl,
        fontWeight: tokens.font.weightBold,
        color: tokens.color.text,
        fontFamily: tokens.font.family,
      }}>{value}</p>
    </div>
  );
}

// ─── Estilos de layout ────────────────────────────────────────────────────────

const page = {
  display: "flex",
  minHeight: "100vh",
  background: tokens.color.bgPage,
  fontFamily: tokens.font.family,
};

const sidebar = {
  width: "220px",
  flexShrink: 0,
  background: tokens.color.bgCard,
  borderRight: `1px solid ${tokens.color.border}`,
  padding: "28px 16px",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};

const sairBtn = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  width: "100%",
  padding: "10px 12px",
  background: "transparent",
  border: "none",
  borderRadius: tokens.radius.md,
  cursor: "pointer",
  color: tokens.color.textMuted,
  fontSize: tokens.font.sizeSm,
  fontFamily: tokens.font.family,
  fontWeight: tokens.font.weightMedium,
  transition: `background ${tokens.transition.fast}, color ${tokens.transition.fast}`,
};

const main = {
  flex: 1,
  padding: "36px 40px",
  overflowY: "auto",
};

const header = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "32px",
};

const pageTitle = {
  fontSize: "22px",
  fontWeight: tokens.font.weightBold,
  color: tokens.color.text,
  fontFamily: tokens.font.family,
  marginBottom: "2px",
};

const pageSubtitle = {
  fontSize: tokens.font.sizeSm,
  color: tokens.color.textMuted,
  fontFamily: tokens.font.family,
};

const userChip = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "8px 14px",
  background: tokens.color.bgCard,
  border: `1px solid ${tokens.color.border}`,
  borderRadius: tokens.radius.full,
};

const userAvatar = {
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  background: tokens.color.accent,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const userName = {
  fontSize: tokens.font.sizeSm,
  fontWeight: tokens.font.weightSemibold,
  color: tokens.color.text,
  fontFamily: tokens.font.family,
};

const cardsGrid = {
  display: "flex",
  gap: "20px",
  marginBottom: "28px",
  flexWrap: "wrap",
};

const emptyState = {
  textAlign: "center",
  padding: "56px 40px",
};

const emptyIcon = {
  width: "60px",
  height: "60px",
  borderRadius: tokens.radius.xl,
  background: tokens.color.bgPage,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 16px",
};

const emptyTitle = {
  fontSize: tokens.font.sizeLg,
  fontWeight: tokens.font.weightSemibold,
  color: tokens.color.text,
  fontFamily: tokens.font.family,
  marginBottom: "8px",
};

const emptyDesc = {
  fontSize: tokens.font.sizeSm,
  color: tokens.color.textMuted,
  fontFamily: tokens.font.family,
  maxWidth: "340px",
  margin: "0 auto",
  lineHeight: "1.6",
};