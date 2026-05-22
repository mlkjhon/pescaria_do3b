import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
  StatusBar,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

// ── Bolhas decorativas animadas ──────────────────────────────────────────────
function Bubble({ style, delay, duration }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -22],
  });
  const opacity = anim.interpolate({
    inputRange: [0, 0.4, 1],
    outputRange: [0.18, 0.45, 0.18],
  });

  return (
    <Animated.View
      style={[
        styles.bubble,
        style,
        { transform: [{ translateY }], opacity },
      ]}
    />
  );
}

// ── Componente de Input com label flutuante ──────────────────────────────────
function FloatingInput({ label, iconChar, value, onChangeText, secureTextEntry, keyboardType }) {
  const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;
  const borderAnim = useRef(new Animated.Value(0)).current;
  const iconAnim = useRef(new Animated.Value(0)).current;

  const animate = (toValue) => {
    Animated.parallel([
      Animated.timing(labelAnim, { toValue, duration: 220, useNativeDriver: false }),
      Animated.timing(borderAnim, { toValue, duration: 220, useNativeDriver: false }),
      Animated.timing(iconAnim,   { toValue, duration: 220, useNativeDriver: false }),
    ]).start();
  };

  const handleFocus = () => animate(1);
  const handleBlur  = () => { if (!value) animate(0); };

  // label flutua para cima do wrapper
  const labelTop   = labelAnim.interpolate({ inputRange: [0, 1], outputRange: [17, -11] });
  const labelSize  = labelAnim.interpolate({ inputRange: [0, 1], outputRange: [14, 11] });
  const labelColor = labelAnim.interpolate({ inputRange: [0, 1], outputRange: ['rgba(138,180,194,0.7)', '#00D4FF'] });
  const labelLeft  = labelAnim.interpolate({ inputRange: [0, 1], outputRange: [52, 12] });

  // borda do wrapper muda de cor
  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255,255,255,0.12)', 'rgba(0,212,255,0.65)'],
  });

  // ícone lateral muda de cor
  const iconColor = iconAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(138,180,194,0.5)', '#00D4FF'],
  });

  return (
    <Animated.View style={[styles.inputWrapper, { borderColor }]}>
      {/* ícone lateral — nunca some, nunca se move */}
      <Animated.Text style={[styles.inputIcon, { color: iconColor }]}>
        {iconChar}
      </Animated.Text>

      {/* área direita: label flutuante + TextInput */}
      <View style={styles.inputRight}>
        <Animated.Text
          style={[
            styles.floatingLabel,
            { top: labelTop, left: labelLeft, fontSize: labelSize, color: labelColor },
          ]}
          pointerEvents="none"
        >
          {label}
        </Animated.Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize="none"
          placeholderTextColor="transparent"
          selectionColor="#00D4FF"
          underlineColorAndroid="transparent"
        />
      </View>
    </Animated.View>
  );
}

// ── Tela principal de Login ──────────────────────────────────────────────────
function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const btnScale = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.spring(btnScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(btnScale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const shakeCard = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const handleLogin = () => {
    setErro('');
    setLoading(true);
    setTimeout(() => {
      navigation.navigate('MenuPrincipal');
    }, 1400);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* ── Fundo degradê ── */}
      <LinearGradient
        colors={['#020B18', '#041E33', '#063152', '#041E33', '#020B18']}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* ── Círculo de brilho superior ── */}
      <Animatable.View
        animation="pulse"
        iterationCount="infinite"
        duration={4000}
        style={styles.glowTop}
      />

      {/* ── Círculo de brilho inferior ── */}
      <Animatable.View
        animation="pulse"
        iterationCount="infinite"
        duration={5000}
        delay={1500}
        style={styles.glowBottom}
      />

      {/* ── Bolhas flutuantes ── */}
      <Bubble style={{ left: '10%', bottom: '20%', width: 60, height: 60, borderRadius: 30 }} delay={0} duration={3200} />
      <Bubble style={{ left: '75%', bottom: '35%', width: 40, height: 40, borderRadius: 20 }} delay={800} duration={4000} />
      <Bubble style={{ left: '50%', bottom: '12%', width: 25, height: 25, borderRadius: 13 }} delay={400} duration={2800} />
      <Bubble style={{ left: '30%', bottom: '55%', width: 18, height: 18, borderRadius: 9 }} delay={1200} duration={3600} />
      <Bubble style={{ left: '85%', bottom: '60%', width: 35, height: 35, borderRadius: 18 }} delay={600} duration={4500} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* ── Logo / Ond as de água ── */}
        <Animatable.View animation="fadeInDown" duration={900} delay={100} style={styles.logoArea}>
          <View style={styles.rippleWrap}>
            {/* Anel externo */}
            <Animatable.View
              animation="pulse"
              iterationCount="infinite"
              duration={2800}
              style={styles.ripple3}
            />
            {/* Anel médio */}
            <Animatable.View
              animation="pulse"
              iterationCount="infinite"
              duration={2800}
              delay={350}
              style={styles.ripple2}
            />
            {/* Anel interno */}
            <Animatable.View
              animation="pulse"
              iterationCount="infinite"
              duration={2800}
              delay={700}
              style={styles.ripple1}
            />
            {/* Ponto central com glow */}
            <LinearGradient
              colors={['#00EEFF', '#0099DD']}
              style={styles.rippleCenter}
            />
          </View>
          <Text style={styles.appName}>PESCADOR</Text>
          <Text style={styles.appTagline}>Sua parceria na pesca</Text>
        </Animatable.View>

        {/* ── Card de login ── */}
        <Animatable.View animation="fadeInUp" duration={900} delay={300}>
          <Animated.View
            style={[
              styles.card,
              { transform: [{ translateX: shakeAnim }] },
            ]}
          >
            {/* Linha de brilho topo do card */}
            <LinearGradient
              colors={['rgba(0,212,255,0.6)', 'rgba(0,212,255,0)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.cardTopLine}
            />

            <Text style={styles.cardTitle}>Bem-vindo de volta</Text>
            <Text style={styles.cardSubtitle}>Entre na sua conta para continuar</Text>

            {/* Inputs */}
            <FloatingInput
              label="E-mail"
              iconChar="@"
              value={email}
              onChangeText={(t) => { setEmail(t); setErro(''); }}
              keyboardType="email-address"
            />
            <FloatingInput
              label="Senha"
              iconChar="*"
              value={senha}
              onChangeText={(t) => { setSenha(t); setErro(''); }}
              secureTextEntry
            />

            {/* Mensagem de erro */}
            {erro ? (
              <Animatable.Text animation="shake" style={styles.erroText}>
                ⚠ {erro}
              </Animatable.Text>
            ) : null}

            {/* Esqueceu a senha */}
            <TouchableOpacity style={styles.forgotBtn}>
              <Text style={styles.forgotText}>Esqueceu a senha?</Text>
            </TouchableOpacity>

            {/* Botão Entrar */}
            <Animated.View style={{ transform: [{ scale: btnScale }] }}>
              <TouchableOpacity
                activeOpacity={1}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handleLogin}
                disabled={loading}
              >
                <LinearGradient
                  colors={['#00D4FF', '#0088CC', '#0055AA']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.loginBtn}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <Text style={styles.loginBtnText}>ENTRAR</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            {/* Divisor */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Botão cadastro */}
            <TouchableOpacity style={styles.registerBtn} onPress={() => navigation.navigate('Cadastro')}>
              <Text style={styles.registerText}>
                Não tem conta?{' '}
                <Text style={styles.registerHighlight}>Cadastre-se</Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animatable.View>

        {/* Versão */}
        <Animatable.Text animation="fadeIn" delay={1000} style={styles.version}>
          v1.0.0 · Pescador App
        </Animatable.Text>
      </KeyboardAvoidingView>
    </View>
  );
}

// ── Estilos ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020B18',
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  // Brilhos de fundo
  glowTop: {
    position: 'absolute',
    top: -120,
    left: width * 0.5 - 160,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(0, 140, 210, 0.18)',
  },
  glowBottom: {
    position: 'absolute',
    bottom: -100,
    right: -60,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(0, 80, 180, 0.15)',
  },

  // Bolhas
  bubble: {
    position: 'absolute',
    backgroundColor: 'rgba(0,212,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(0,212,255,0.2)',
  },

  // Logo — ripple rings
  logoArea: {
    alignItems: 'center',
    marginBottom: 32,
  },
  rippleWrap: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  ripple3: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: 'rgba(0,212,255,0.18)',
    backgroundColor: 'rgba(0,212,255,0.03)',
  },
  ripple2: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1.5,
    borderColor: 'rgba(0,212,255,0.38)',
    backgroundColor: 'rgba(0,212,255,0.06)',
  },
  ripple1: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(0,212,255,0.65)',
    backgroundColor: 'rgba(0,212,255,0.1)',
  },
  rippleCenter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    shadowColor: '#00D4FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 16,
  },
  appName: {
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 8,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,212,255,0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  appTagline: {
    fontSize: 13,
    color: 'rgba(0,212,255,0.7)',
    marginTop: 4,
    letterSpacing: 2,
  },

  // Card
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    padding: 28,
    overflow: 'hidden',
    // sombra
    shadowColor: '#00D4FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 20,
  },
  cardTopLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.45)',
    marginBottom: 28,
  },

  // Inputs
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 14,
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.04)',
    overflow: 'hidden',
  },
  inputIcon: {
    width: 48,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    paddingBottom: 2,
  },
  inputRight: {
    flex: 1,
    position: 'relative',
    paddingRight: 14,
  },
  floatingLabel: {
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  input: {
    height: 52,
    color: '#FFFFFF',
    fontSize: 15,
    paddingTop: 14,
    paddingBottom: 4,
    borderWidth: 0,
    includeFontPadding: false,
  },

  // Erro
  erroText: {
    color: '#FF6B6B',
    fontSize: 13,
    marginBottom: 8,
    marginTop: -8,
  },

  // Esqueceu senha
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 24,
    marginTop: -4,
  },
  forgotText: {
    color: 'rgba(0,212,255,0.7)',
    fontSize: 13,
  },

  // Botão entrar
  loginBtn: {
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00D4FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 12,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 4,
  },

  // Divisor
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  dividerText: {
    color: 'rgba(255,255,255,0.3)',
    marginHorizontal: 12,
    fontSize: 12,
  },

  // Cadastro
  registerBtn: {
    alignItems: 'center',
  },
  registerText: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 14,
  },
  registerHighlight: {
    color: '#00D4FF',
    fontWeight: '700',
  },

  // Versão
  version: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.2)',
    fontSize: 11,
    marginTop: 24,
    letterSpacing: 1,
  },
});

export default Login;