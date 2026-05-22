import { StyleSheet, Dimensions, Platform } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── Paleta Warm Sunrise ──────────────────────────────────────────────────────
// Laranja vibrante surpresa, fundo marfim aconchegante, esmeralda para sucesso.
export const corPrincipal   = '#FF6924'  // Laranja quente — identidade marcante
export const corSecundaria  = '#FFB085'  // Pêssego suave — acento delicado
export const corTextos      = '#1C1917'  // Charcoal quente — legibilidade máxima
export const corFundo       = '#FEFCF7'  // Marfim — respiro entre os cards
export const corFundo2      = '#FFFFFF'  // Branco puro — superfície dos cards
export const corFundo3      = '#FFF8F0'  // Tint laranja — estado ativo/hover
export const corPlaceholder = '#B8ADA5'  // Cinza caramelo — discreção elegante
export const corCheck       = '#059669'  // Esmeralda rico — sucesso vibrante
export const corBorda       = '#EDE8DF'  // Creme — separação refinada
export const corDelete      = '#F43F5E'  // Rosa vibrante — ação destrutiva

const styles = StyleSheet.create({

    // ─── Container raiz ────────────────────────────────────────────────────
    conteudo: {
        flex: 1,
        backgroundColor: corFundo,
    },

    // ─── Header hero com curva na base ─────────────────────────────────────
    // Cria aquele efeito "app premium" onde o header abraça o topo da tela.
    header: {
        backgroundColor: corPrincipal,
        paddingTop: Platform.OS === 'ios' ? 60 : 50,
        paddingBottom: 40,
        paddingHorizontal: SCREEN_WIDTH * 0.08,
        alignItems: 'center',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        // Sombra calorosa laranja — profundidade real
        shadowColor: '#C94A0F',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.28,
        shadowRadius: 24,
        elevation: 12,
    },

    // Logo branca sobre o laranja
    logo: {
        width: SCREEN_WIDTH * 0.5,
        height: 34,
        resizeMode: 'contain',
        tintColor: '#FFFFFF',
    },

    // ─── Card flutuante do input ────────────────────────────────────────────
    // margem negativa sobe o card sobre a curva do header — efeito overlap premium
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: SCREEN_WIDTH * 0.05,
        marginTop: -24,
        marginBottom: 20,
        backgroundColor: corFundo2,
        borderRadius: 22,
        paddingVertical: 10,
        paddingHorizontal: 14,
        gap: 10,
        shadowColor: '#9A7B5A',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.16,
        shadowRadius: 24,
        elevation: 10,
    },

    // Input sem borda — o card já cria o contexto
    input: {
        flex: 1,
        height: 46,
        color: corTextos,
        fontSize: SCREEN_WIDTH > 400 ? 16 : 14,
        fontWeight: '400',
        paddingHorizontal: 6,
        letterSpacing: 0.2,
    },

    // Botão "+" laranja com glow
    botao: {
        width: 46,
        height: 46,
        borderRadius: 13,
        backgroundColor: corPrincipal,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: corPrincipal,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.50,
        shadowRadius: 12,
        elevation: 7,
    },

    textoBotao: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 26,
        lineHeight: 30,
        marginTop: -2,
    },

    // ─── Área da lista ─────────────────────────────────────────────────────
    corpo: {
        flex: 1,
        paddingHorizontal: SCREEN_WIDTH * 0.05,
        paddingTop: 0,
    },

    // ─── Cada item ─────────────────────────────────────────────────────────
    botaoItem: {
        backgroundColor: corFundo2,
        borderRadius: 18,
        marginBottom: 12,
        paddingVertical: 16,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        // Sombra calorosa e suave
        shadowColor: '#9A7B5A',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.09,
        shadowRadius: 14,
        elevation: 3,
    },

    // Item comprado — tint verde muito suave
    botaoItemComprado: {
        backgroundColor: '#F0FDF8',
        shadowColor: corCheck,
        shadowOpacity: 0.07,
    },

    // ─── Textos ────────────────────────────────────────────────────────────
    textoBotaoItem: {
        flex: 1,
        fontSize: 16,
        color: corTextos,
        fontWeight: '500',
        letterSpacing: 0.1,
    },

    textoBotaoItemComprado: {
        flex: 1,
        fontSize: 16,
        color: '#34D399',        // esmeralda suave
        fontWeight: '400',
        textDecorationLine: 'line-through',
        letterSpacing: 0.1,
    },

    // ─── Checkbox ──────────────────────────────────────────────────────────
    checkbox: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: corBorda,
        marginRight: 14,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: corFundo3,
    },

    checkboxChecked: {
        borderColor: corCheck,
        backgroundColor: corCheck,
        shadowColor: corCheck,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.45,
        shadowRadius: 8,
        elevation: 4,
    },

    // ─── Botão deletar ─────────────────────────────────────────────────────
    botaoDeletar: {
        width: 36,
        height: 36,
        borderRadius: 11,
        backgroundColor: '#FFF0F3',  // rosa muito suave
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },

    // ─── Header da lista ───────────────────────────────────────────────────
    listaHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14,
        marginTop: 2,
    },

    listaHeaderTitulo: {
        fontSize: 11,
        fontWeight: '700',
        color: '#C4B8AD',
        letterSpacing: 1.8,
        textTransform: 'uppercase',
    },

    badge: {
        backgroundColor: '#FFF3EC',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#FFD5B8',
        paddingHorizontal: 11,
        paddingVertical: 3,
    },

    badgeTexto: {
        fontSize: SCREEN_WIDTH > 400 ? 12 : 10,
        fontWeight: '700',
        color: corPrincipal,
        letterSpacing: 0.5,
    },

    containerTotais: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 20, 
        gap: 8 
    },

    badgeTotal: {
        flex: 1,
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 1,
        paddingHorizontal: 4,
        paddingVertical: 8,
    }

});

export default styles;