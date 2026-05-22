import { View, Text, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native'
import { tokens, Icon } from '../Styles/Estilos'

export default function Principal() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;
    
    const statCardStyle = {
        flex: 1,
        minWidth: isMobile ? '100%' : 220,
        backgroundColor: tokens.color.bgCard,
        borderRadius: parseInt(tokens.radius.lg) || 16,
        padding: parseInt(tokens.space.lg) || 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
        borderWidth: 1,
        borderColor: tokens.color.border,
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: tokens.color.bgPage }} contentContainerStyle={{ padding: isMobile ? 20 : 40, paddingBottom: 60 }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
                <View>
                    <Text style={{ fontSize: 26, fontWeight: "700", fontFamily: "Inter, sans-serif", color: tokens.color.text, letterSpacing: -0.5 }}>Início</Text>
                    <Text style={{ fontSize: 13, color: tokens.color.textMuted, marginTop: 4, fontFamily: "Inter, sans-serif" }}>Bem-vindo ao FinanPesca 🐟</Text>
                </View>
                
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: tokens.color.bgCard, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 30, borderWidth: 1, borderColor: tokens.color.border, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 1 }}>
                    <View style={{ backgroundColor: tokens.color.accent, width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name="user" size={16} color={tokens.color.white} />
                    </View>
                    <Text style={{ fontSize: 14, fontWeight: "600", color: tokens.color.text, fontFamily: "Inter, sans-serif" }}>Pescador</Text>
                </TouchableOpacity>
            </View>

            {/* Cards Superiores */}
            <View style={{ flexDirection: isMobile ? 'column' : 'row', gap: 20, marginTop: 40 }}>
                {/* Card Receitas */}
                <View style={statCardStyle}>
                    <View style={{ backgroundColor: tokens.color.successBg, width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
                        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: tokens.color.success }} />
                    </View>
                    <Text style={{ fontSize: 13, color: tokens.color.textMuted, fontFamily: "Inter, sans-serif" }}>Receitas do mês</Text>
                    <Text style={{ fontSize: 20, fontWeight: "700", color: tokens.color.text, marginTop: 8, fontFamily: "Inter, sans-serif" }}>R$ 0,00</Text>
                </View>

                {/* Card Despesas */}
                <View style={statCardStyle}>
                    <View style={{ backgroundColor: tokens.color.errorBg, width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
                        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: tokens.color.error }} />
                    </View>
                    <Text style={{ fontSize: 13, color: tokens.color.textMuted, fontFamily: "Inter, sans-serif" }}>Despesas do mês</Text>
                    <Text style={{ fontSize: 20, fontWeight: "700", color: tokens.color.text, marginTop: 8, fontFamily: "Inter, sans-serif" }}>R$ 0,00</Text>
                </View>

                {/* Card Saldo */}
                <View style={statCardStyle}>
                    <View style={{ backgroundColor: tokens.color.accentLight, width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
                        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: tokens.color.accent }} />
                    </View>
                    <Text style={{ fontSize: 13, color: tokens.color.textMuted, fontFamily: "Inter, sans-serif" }}>Saldo atual</Text>
                    <Text style={{ fontSize: 20, fontWeight: "700", color: tokens.color.text, marginTop: 8, fontFamily: "Inter, sans-serif" }}>R$ 0,00</Text>
                </View>
            </View>

            {/* Empty State / Histórico */}
            <View style={{ marginTop: 24, backgroundColor: tokens.color.bgCard, borderRadius: parseInt(tokens.radius.xl) || 24, paddingVertical: 60, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: tokens.color.border, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 16, elevation: 3 }}>
                <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: tokens.color.bgPage, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    <Icon name="home" size={24} color={tokens.color.textLight} />
                </View>
                <Text style={{ fontSize: parseInt(tokens.font.sizeLg) || 16, fontWeight: "700", color: tokens.color.text, marginBottom: 8, fontFamily: "Inter, sans-serif", textAlign: 'center' }}>Nenhum lançamento ainda</Text>
                <Text style={{ fontSize: 13, color: tokens.color.textMuted, textAlign: 'center', maxWidth: 320, lineHeight: 20, fontFamily: "Inter, sans-serif" }}>Comece adicionando suas receitas e despesas para visualizar seu saldo.</Text>
            </View>
        </ScrollView>
    )
}