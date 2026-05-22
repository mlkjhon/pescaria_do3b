import {View, Text, TouchableOpacity, TextInput, useWindowDimensions} from 'react-native'
import { tokens, injectGlobalStyles, LoadingOverlay, Icon, Logo } from "../Styles/Estilos";
import { useState } from 'react'
import { enderecoServidor } from '../utils'
import AsyncStorage from '@react-native-async-storage/async-storage';

injectGlobalStyles();

 export default function Login({navigation}) {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    //Verificar email e senha, se estiver correto, fazer login
    async function botaoEntrar() {
        try {
            if(email == '' || senha == ''){
                setMessage("Preencha todos os campos");
                return;
            }

            setLoading(true); // <--- ATIVA TELA DE LOADING

            const login = {
                "email": email,
                "senha": senha
            }
            const resposta = await fetch(`${enderecoServidor}/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(login)
            });

            //Verificar a resposta
            if(resposta.status == 404){
                setMessage(`Rota não encontrada: ${resposta.url}`);
                setLoading(false); // desativa loading no erro
                return;
            }
                const dados = await resposta.json();
           if(resposta.ok){

            AsyncStorage.setItem("Usuario logado", JSON.stringify(dados));
            navigation.navigate("MenuDrawer");
           } else{ 
            setMessage('Email ou senha incorretos');
           }
            setLoading(false); // <--- DESATIVA TELA DE LOADING
        } catch (error) {
            setMessage(`Email ou senha incorretos ${error.message}`);
            setLoading(false); // desativa loading no erro
        } 
    }
    return (
        <View style={{ flex: 1, backgroundColor: tokens.color.bgPage, justifyContent: 'center', alignItems: 'center', padding: isMobile ? 16 : 20 }}>
            {loading && <LoadingOverlay mensagem="Carregando..." submensagem="Aguarde um momento 🐟" />}
            
            <View style={{ width: '100%', maxWidth: 400, backgroundColor: tokens.color.bgCard, borderWidth: 1, borderColor: tokens.color.border, borderRadius: parseInt(tokens.radius.xl) || 24, padding: isMobile ? 24 : 40, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 16, elevation: 4 }}>
                <View style={{ alignItems: 'center', marginBottom: 32 }}>
                    <Logo size={64} />
                </View>

                <View style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 13, fontWeight: "600", color: tokens.color.textMuted, marginBottom: 8, fontFamily: "Inter, sans-serif" }}>Email</Text>
                    <View style={{ position: 'relative', justifyContent: 'center' }}>
                        <View style={{ position: 'absolute', left: 14, zIndex: 1, elevation: 1 }}>
                            <Icon name="email" size={18} color={tokens.color.textLight} />
                        </View>
                        <TextInput
                            placeholder="Digite seu email"
                            placeholderTextColor={tokens.color.textLight}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            style={{ width: '100%', paddingVertical: 12, paddingRight: 14, paddingLeft: 42, backgroundColor: tokens.color.bgCard, borderWidth: 1.5, borderColor: tokens.color.border, borderRadius: parseInt(tokens.radius.md) || 12, color: tokens.color.text, fontSize: 14.5, fontFamily: "Inter, sans-serif" }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 24 }}>
                    <Text style={{ fontSize: 13, fontWeight: "600", color: tokens.color.textMuted, marginBottom: 8, fontFamily: "Inter, sans-serif" }}>Senha</Text>
                    <View style={{ position: 'relative', justifyContent: 'center' }}>
                        <View style={{ position: 'absolute', left: 14, zIndex: 1, elevation: 1 }}>
                            <Icon name="lock" size={18} color={tokens.color.textLight} />
                        </View>
                        <TextInput
                            placeholder="Digite sua senha"
                            placeholderTextColor={tokens.color.textLight}
                            value={senha}
                            onChangeText={setSenha}
                            secureTextEntry
                            style={{ width: '100%', paddingVertical: 12, paddingRight: 14, paddingLeft: 42, backgroundColor: tokens.color.bgCard, borderWidth: 1.5, borderColor: tokens.color.border, borderRadius: parseInt(tokens.radius.md) || 12, color: tokens.color.text, fontSize: 14.5, fontFamily: "Inter, sans-serif" }}
                        />
                    </View>
                </View>

                {message ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: tokens.color.errorBg, borderWidth: 1, borderColor: 'rgba(192,57,43,0.2)', borderRadius: parseInt(tokens.radius.md) || 12, paddingVertical: 10, paddingHorizontal: 14, marginBottom: 16 }}>
                        <Icon name="alert" size={16} color={tokens.color.error} />
                        <Text style={{ color: tokens.color.error, fontSize: 13, fontWeight: "500", fontFamily: "Inter, sans-serif" }}>{message}</Text>
                    </View>
                ) : null}

                <TouchableOpacity 
                    style={{ width: '100%', paddingVertical: 13, backgroundColor: tokens.color.accent, borderRadius: parseInt(tokens.radius.md) || 12, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, shadowColor: tokens.color.accent, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.28, shadowRadius: 20, elevation: 6 }}
                    onPress={botaoEntrar}
                    disabled={loading}
                    activeOpacity={0.8}
                >
                    <Text style={{ color: tokens.color.white, fontSize: 15, fontWeight: "700", fontFamily: "Inter, sans-serif" }}>Entrar</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 24, gap: 12 }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: tokens.color.border }} />
                    <Text style={{ color: tokens.color.textLight, fontSize: 11, fontFamily: "Inter, sans-serif" }}>ou</Text>
                    <View style={{ flex: 1, height: 1, backgroundColor: tokens.color.border }} />
                </View>

                <View style={{ alignItems: 'center', gap: 8 }}>
                    <Text style={{ fontSize: 13, color: tokens.color.textMuted, fontFamily: "Inter, sans-serif" }}>
                        Não tem uma conta? <Text style={{ color: tokens.color.accent, fontWeight: "600" }}>Cadastre-se</Text>
                    </Text>
                    <Text style={{ fontSize: 13, color: tokens.color.textMuted, fontFamily: "Inter, sans-serif" }}>
                        Esqueceu sua senha? <Text style={{ color: tokens.color.accent, fontWeight: "600" }}>Recuperar senha</Text>
                    </Text>
                </View>
            </View>
        </View>
    )

 }