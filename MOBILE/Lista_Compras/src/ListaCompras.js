import { Text, View, TextInput, Image, TouchableOpacity, FlatList, StatusBar, RefreshControl } from "react-native";
import { useState, useEffect, useCallback } from "react";
import styles, { corPrincipal, corPlaceholder, corDelete } from "./Style";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
//Importando configuração e funções do firebase
import { firestore } from '../firebaseconfig'
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'


const ListaCompras = () => {
    //Variavel de estado que recebera os dados do Input do item
    const [item, setItem] = useState('')
    //Criando vetor da lista de compras
    const [listaCompras, setListaCompras] = useState([])
    //Controla se o histórico está visível
    const [mostrarHistorico, setMostrarHistorico] = useState(false)
    //Estado para o RefreshControl
    const [refreshing, setRefreshing] = useState(false)

    // Função para buscar itens do Firebase
    const buscarItens = useCallback(async () => {
        try {
            const dados = await getDocs(collection(firestore, 'compras'))
            const items = []
            dados.forEach((documento) => {
                items.push({ id: documento.id, ...documento.data() })
            })
            setListaCompras(items)
        } catch (error) {
            console.error("Erro ao buscar itens: ", error)
        }
    }, [])

    // Buscar itens do Firebase ao abrir o app
    useEffect(() => {
        buscarItens()
    }, [buscarItens])

    // Função para o RefreshControl
    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        await buscarItens()
        setRefreshing(false)
    }, [buscarItens])

    function exibirItem({ item }) {
        return (
            <TouchableOpacity
                style={[styles.botaoItem, item.comprado && styles.botaoItemComprado]}
                onPress={() => marcarComoComprado(item.id)}
            >
                <View style={[styles.checkbox, item.comprado && styles.checkboxChecked]}>
                    {item.comprado && <AntDesign name="check" size={15} color="#FFFFFF" />}
                </View>

                <Text style={item.comprado ? styles.textoBotaoItemComprado : styles.textoBotaoItem}>
                    {item.produto}
                </Text>
                <TouchableOpacity style={styles.botaoDeletar} onPress={() => botaoDeletar(item.id)}>
                    <EvilIcons name="trash" size={22} color={corDelete} />
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    async function marcarComoComprado(id) {
        // Lógica simples para atualizar na tela
        const novaLista = listaCompras.map(obj => {
            if (obj.id === id) {
                return { ...obj, comprado: !obj.comprado }
            }
            return obj
        })
        setListaCompras(novaLista)

        // Integrando com Firebase de modo simples
        const itemSelecionado = listaCompras.find(obj => obj.id === id)
        await updateDoc(doc(firestore, 'compras', id), {
            comprado: !itemSelecionado.comprado
        })
    }

    async function botaoDeletar(id) {
        // Lógica simples para remover da tela
        const novaLista = listaCompras.filter(obj => obj.id !== id)
        setListaCompras(novaLista)

        // Integrando com Firebase de modo simples
        await deleteDoc(doc(firestore, 'compras', id))
    }

    async function botaoAdicionar() {
        if (!item.trim()) return; // Evita adicionar itens vazios

        const novoItem = { produto: item, comprado: false }

        //Adicionar documento firebase
        const docRef = await addDoc(collection(firestore, 'compras'), novoItem)
        console.log('Documento inserido', docRef)

        const novaLista = [...listaCompras, { id: docRef.id, ...novoItem }]
        setListaCompras(novaLista)
        setItem('')
    }

    return (
        <View style={styles.conteudo}>
            <StatusBar backgroundColor="#FF6924" barStyle='light-content' />

            <View style={styles.header}>
                <Image style={styles.logo} source={require('../assets/logo_lista_compras.png')} />
            </View>

            <View style = {styles.inputContainer}>
                <TextInput
                    placeholder="Adicione um novo item a lista"
                    placeholderTextColor={corPlaceholder}
                    style={styles.input}
                    value={item} onChangeText={setItem}
                />
                <TouchableOpacity style={styles.botao} onPress={botaoAdicionar}>
                    <Text style={styles.textoBotao}>+</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.corpo}>
                <View style={styles.listaHeader}>
                    <Text style={styles.listaHeaderTitulo}>Minha Lista</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <TouchableOpacity
                            style={[styles.badge, { backgroundColor: mostrarHistorico ? '#059669' : '#FFF8F0', borderColor: mostrarHistorico ? '#059669' : '#FFB085' }]}
                            onPress={() => setMostrarHistorico(!mostrarHistorico)}
                        >
                            <Text style={[styles.badgeTexto, { color: mostrarHistorico ? '#FFFFFF' : corPrincipal }]}>
                                {mostrarHistorico ? '✕ Fechar Histórico' : '🕐 Histórico'}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.badge}>
                            <Text style={styles.badgeTexto}>
                                {listaCompras.filter(i => i.comprado).length}/{listaCompras.length}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Seção de Totais */}
                <View style={styles.containerTotais}>
                    <View style={[styles.badgeTotal, { backgroundColor: '#F0FDF8', borderColor: '#34D399' }]}>
                        <Text style={[styles.badgeTexto, { color: '#059669' }]}>
                            ✓ Comprados: {listaCompras.filter(i => i.comprado).length}
                        </Text>
                    </View>
                    <View style={[styles.badgeTotal, { backgroundColor: '#FFF8F0', borderColor: '#FFB085' }]}>
                        <Text style={[styles.badgeTexto, { color: corPrincipal }]}>
                            Total: {listaCompras.length}
                        </Text>
                    </View>
                    <View style={[styles.badgeTotal, { backgroundColor: '#FFF0F3', borderColor: '#F43F5E' }]}>
                        <Text style={[styles.badgeTexto, { color: '#F43F5E' }]}>
                            ✗ Pendentes: {listaCompras.filter(i => !i.comprado).length}
                        </Text>
                    </View>
                </View>

                <FlatList
                    data={listaCompras.filter(i => !i.comprado)}
                    renderItem={exibirItem}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl 
                            refreshing={refreshing} 
                            onRefresh={onRefresh} 
                            colors={[corPrincipal]} // Android
                            tintColor={corPrincipal} // iOS
                        />
                    }
                    ListFooterComponent={() => (
                        mostrarHistorico ? (
                            <View style={{ marginTop: 10, paddingBottom: 30 }}>
                                <View style={[styles.listaHeader, { marginTop: 10 }]}>
                                    <Text style={styles.listaHeaderTitulo}>Histórico de Compras</Text>
                                    <View style={[styles.badge, { backgroundColor: '#F0FDF8', borderColor: '#34D399' }]}>
                                        <Text style={[styles.badgeTexto, { color: '#059669' }]}>
                                            {listaCompras.filter(i => i.comprado).length} itens
                                        </Text>
                                    </View>
                                </View>
                                {listaCompras.filter(i => i.comprado).map(historico => (
                                    <TouchableOpacity
                                        key={historico.id}
                                        style={[styles.botaoItem, styles.botaoItemComprado]}
                                        onPress={() => marcarComoComprado(historico.id)}
                                    >
                                        <View style={[styles.checkbox, styles.checkboxChecked]}>
                                            <AntDesign name="check" size={15} color="#FFFFFF" />
                                        </View>
                                        <Text style={styles.textoBotaoItemComprado}>{historico.produto}</Text>
                                        <TouchableOpacity style={styles.botaoDeletar} onPress={() => botaoDeletar(historico.id)}>
                                            <EvilIcons name="trash" size={22} color={corDelete} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ) : <View style={{ height: 30 }} />
                    )}
                />
            </View>
        </View>
    )
}

export default ListaCompras