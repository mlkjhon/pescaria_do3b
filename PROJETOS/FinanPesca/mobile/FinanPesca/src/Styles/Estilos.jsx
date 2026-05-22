/**
 * FinanPesca — Design System Global
 * Paleta: neutro quente (branco, cinza-creme, laranja âmbar)
 * Use este arquivo em todas as páginas importando o que precisar.
 */

// ─── 1. TOKENS DE DESIGN ─────────────────────────────────────────────────────

export const tokens = {
  // Cores principais
  color: {
    bg: "#FAFAF8",            // fundo geral (branco creme)
    bgCard: "#FFFFFF",        // fundo de cards
    bgPage: "#F4F2EE",        // fundo de página completa

    text: "#1A1714",          // texto principal
    textMuted: "#7A7370",     // texto secundário
    textLight: "#B0ABA6",     // texto desabilitado / placeholder

    accent: "#E07B39",        // laranja âmbar — cor de destaque
    accentLight: "#FAF0E8",   // laranja muito suave (hover/bg)
    accentDark: "#C4672C",    // laranja escuro (hover do botão)

    border: "#E8E4DF",        // bordas suaves
    borderFocus: "#E07B39",   // borda ao focar (laranja)

    error: "#C0392B",         // erro
    errorBg: "#FDF3F2",       // fundo do erro
    success: "#2E7D5A",       // sucesso
    successBg: "#F0FAF5",     // fundo do sucesso

    white: "#FFFFFF",
    black: "#1A1714",
    overlay: "rgba(26,23,20,0.45)", // overlay de loading
  },

  // Tipografia
  font: {
    family: "'Inter', 'Segoe UI', sans-serif",
    sizeXs: "11px",
    sizeSm: "13px",
    sizeMd: "14.5px",
    sizeLg: "16px",
    sizeXl: "20px",
    size2xl: "26px",
    weightNormal: "400",
    weightMedium: "500",
    weightSemibold: "600",
    weightBold: "700",
  },

  // Espaçamento
  space: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },

  // Raios de borda
  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    full: "9999px",
  },

  // Sombras
  shadow: {
    sm: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
    md: "0 4px 16px rgba(0,0,0,0.08)",
    lg: "0 12px 40px rgba(0,0,0,0.10)",
    accent: "0 6px 20px rgba(224,123,57,0.28)",
    accentHover: "0 10px 28px rgba(224,123,57,0.40)",
  },

  // Transições
  transition: {
    fast: "0.15s ease",
    normal: "0.22s ease",
    slow: "0.35s ease",
  },
};

// ─── 2. CSS GLOBAL (injeta uma vez) ──────────────────────────────────────────

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    height: 100%;
    font-family: ${tokens.font.family};
    background: ${tokens.color.bgPage};
    color: ${tokens.color.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* ── Inputs ── */
  .fp-input {
    width: 100%;
    padding: 12px 14px 12px 42px;
    background: ${tokens.color.bgCard};
    border: 1.5px solid ${tokens.color.border};
    border-radius: ${tokens.radius.md};
    color: ${tokens.color.text};
    font-size: ${tokens.font.sizeMd};
    font-family: ${tokens.font.family};
    outline: none;
    transition: border-color ${tokens.transition.normal},
                box-shadow ${tokens.transition.normal},
                background ${tokens.transition.normal};
  }
  .fp-input::placeholder { color: ${tokens.color.textLight}; }
  .fp-input:focus {
    border-color: ${tokens.color.borderFocus};
    box-shadow: 0 0 0 3px rgba(224,123,57,0.15);
    background: ${tokens.color.accentLight};
  }
  .fp-input:disabled { opacity: 0.55; cursor: not-allowed; }

  /* ── Botão primário ── */
  .fp-btn-primary {
    width: 100%;
    padding: 13px;
    background: ${tokens.color.accent};
    border: none;
    border-radius: ${tokens.radius.md};
    color: ${tokens.color.white};
    font-size: ${tokens.font.sizeMd};
    font-weight: ${tokens.font.weightBold};
    font-family: ${tokens.font.family};
    cursor: pointer;
    letter-spacing: 0.2px;
    transition: background ${tokens.transition.normal},
                transform ${tokens.transition.fast},
                box-shadow ${tokens.transition.normal};
    box-shadow: ${tokens.shadow.accent};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .fp-btn-primary:hover:not(:disabled) {
    background: ${tokens.color.accentDark};
    transform: translateY(-1px);
    box-shadow: ${tokens.shadow.accentHover};
  }
  .fp-btn-primary:active:not(:disabled) {
    transform: translateY(0px);
  }
  .fp-btn-primary:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    transform: none;
  }

  /* ── Botão secundário (outline) ── */
  .fp-btn-secondary {
    padding: 10px 20px;
    background: transparent;
    border: 1.5px solid ${tokens.color.border};
    border-radius: ${tokens.radius.md};
    color: ${tokens.color.textMuted};
    font-size: ${tokens.font.sizeSm};
    font-weight: ${tokens.font.weightSemibold};
    font-family: ${tokens.font.family};
    cursor: pointer;
    transition: border-color ${tokens.transition.normal},
                color ${tokens.transition.normal},
                background ${tokens.transition.normal};
  }
  .fp-btn-secondary:hover {
    border-color: ${tokens.color.accent};
    color: ${tokens.color.accent};
    background: ${tokens.color.accentLight};
  }

  /* ── Card ── */
  .fp-card {
    background: ${tokens.color.bgCard};
    border: 1px solid ${tokens.color.border};
    border-radius: ${tokens.radius.xl};
    box-shadow: ${tokens.shadow.md};
    padding: 40px;
  }

  /* ── Links ── */
  .fp-link {
    color: ${tokens.color.accent};
    font-weight: ${tokens.font.weightSemibold};
    text-decoration: none;
    transition: color ${tokens.transition.fast};
  }
  .fp-link:hover {
    color: ${tokens.color.accentDark};
    text-decoration: underline;
  }

  /* ── Badge ── */
  .fp-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 10px;
    border-radius: ${tokens.radius.full};
    font-size: ${tokens.font.sizeXs};
    font-weight: ${tokens.font.weightSemibold};
    background: ${tokens.color.accentLight};
    color: ${tokens.color.accent};
  }

  /* ── Alert de erro ── */
  .fp-alert-error {
    display: flex;
    align-items: center;
    gap: 8px;
    background: ${tokens.color.errorBg};
    border: 1px solid rgba(192,57,43,0.2);
    border-radius: ${tokens.radius.md};
    padding: 10px 14px;
    color: ${tokens.color.error};
    font-size: ${tokens.font.sizeSm};
    font-weight: ${tokens.font.weightMedium};
  }

  /* ── Alert de sucesso ── */
  .fp-alert-success {
    display: flex;
    align-items: center;
    gap: 8px;
    background: ${tokens.color.successBg};
    border: 1px solid rgba(46,125,90,0.2);
    border-radius: ${tokens.radius.md};
    padding: 10px 14px;
    color: ${tokens.color.success};
    font-size: ${tokens.font.sizeSm};
    font-weight: ${tokens.font.weightMedium};
  }

  /* ── Divider ── */
  .fp-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 20px 0;
    color: ${tokens.color.textLight};
    font-size: ${tokens.font.sizeXs};
  }
  .fp-divider::before,
  .fp-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${tokens.color.border};
  }

  /* ── Spinner loading ── */
  @keyframes fp-spin {
    0%   { stroke-dashoffset: 120; transform: rotate(0deg); }
    50%  { stroke-dashoffset: 24; }
    100% { stroke-dashoffset: 120; transform: rotate(360deg); }
  }
  @keyframes fp-fade-in {
    from { opacity: 0; transform: scale(0.97); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes fp-pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }

  .fp-spinner circle {
    animation: fp-spin 1.3s cubic-bezier(0.4,0,0.2,1) infinite;
    transform-origin: center;
  }
  .fp-loading-text {
    animation: fp-pulse 1.8s ease-in-out infinite;
  }
  .fp-card-anim {
    animation: fp-fade-in 0.35s ease;
  }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: ${tokens.color.border};
    border-radius: 99px;
  }
  ::-webkit-scrollbar-thumb:hover { background: ${tokens.color.textLight}; }

  /* ── Seleção de texto ── */
  ::selection {
    background: rgba(224,123,57,0.2);
    color: ${tokens.color.text};
  }
`;

let cssInjected = false;
export function injectGlobalStyles() {
  if (cssInjected) return;
  if (typeof document === "undefined") return;
  const el = document.getElementById("fp-global-styles");
  if (el) { cssInjected = true; return; }
  const style = document.createElement("style");
  style.id = "fp-global-styles";
  style.textContent = GLOBAL_CSS;
  document.head.appendChild(style);
  cssInjected = true;
}

// ─── 3. COMPONENTES COMPARTILHADOS ───────────────────────────────────────────

/** Tela de loading fullscreen */
export function LoadingOverlay({ mensagem = "Carregando...", submensagem = "Aguarde um momento 🐟" }) {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(250,242,238,0.80)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      gap: "20px",
    }}>
      <svg className="fp-spinner" width="52" height="52" viewBox="0 0 52 52" fill="none">
        <circle cx="26" cy="26" r="20" stroke={tokens.color.border} strokeWidth="4" />
        <circle
          cx="26" cy="26" r="20"
          stroke={tokens.color.accent}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="120"
          strokeDashoffset="60"
        />
      </svg>
      <p className="fp-loading-text" style={{
        fontSize: tokens.font.sizeLg,
        fontWeight: tokens.font.weightSemibold,
        color: tokens.color.text,
        fontFamily: tokens.font.family,
      }}>
        {mensagem}
      </p>
      {submensagem && (
        <p style={{
          fontSize: tokens.font.sizeSm,
          color: tokens.color.textMuted,
          fontFamily: tokens.font.family,
          marginTop: "-12px",
        }}>
          {submensagem}
        </p>
      )}
    </div>
  );
}

/** Logo FinanPesca */
export function Logo({ size = 48, showText = true }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
      <div style={{
        width: size,
        height: size,
        borderRadius: tokens.radius.lg,
        background: tokens.color.accent,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: tokens.shadow.accent,
        flexShrink: 0,
      }}>
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none"
          stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
          <circle cx="15" cy="12" r="1.2" fill="#fff" stroke="none" />
          <path d="M22 6l-3.5 2.8M22 18l-3.5-2.8" />
        </svg>
      </div>
      {showText && (
        <>
          <h1 style={{
            fontSize: tokens.font.size2xl,
            fontWeight: tokens.font.weightBold,
            color: tokens.color.text,
            letterSpacing: "-0.5px",
            margin: 0,
            fontFamily: tokens.font.family,
          }}>
            FinanPesca
          </h1>
          <p style={{
            fontSize: tokens.font.sizeSm,
            color: tokens.color.textMuted,
            margin: 0,
            fontFamily: tokens.font.family,
          }}>
            Gestão financeira para pescadores
          </p>
        </>
      )}
    </div>
  );
}

/** Ícone SVG inline — usa "name" para escolher */
export function Icon({ name, size = 17, color = "currentColor" }) {
  const props = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: color, strokeWidth: "2",
    strokeLinecap: "round", strokeLinejoin: "round",
  };
  switch (name) {
    case "email":
      return <svg {...props}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
    case "lock":
      return <svg {...props}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
    case "eye":
      return <svg {...props}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>;
    case "eye-off":
      return <svg {...props}><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;
    case "alert":
      return <svg {...props}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
    case "check":
      return <svg {...props}><polyline points="20 6 9 17 4 12"/></svg>;
    case "user":
      return <svg {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
    case "home":
      return <svg {...props}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
    case "logout":
      return <svg {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
    default:
      return null;
  }
}
