import { application, request } from "express";


const swagger = {
    openapi: '3.0.3',
    info: {
        title: 'API - Financeira - FinanControl',
        description: 'Documentação da API de gerenciamento financeiro - FinanControl',
        version: '1.0.0'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor Localhost'
        }
    ],
    tags: [
        { name: "Usuários", description: "Operações relacionadas aos usuários" },
        { name: "Serviços", description: "Operações relacionadas aos serviços" },
        { name: "Agendamentos", description: "Operações relacionadas aos agendamentos" },

        
    ],
    paths: {
        "/usuarios": {
            get: {
                tags: ["Usuários"],
                summary: "Listar Usuários",
                security:[{
                    bearerAuth: []
                }],
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Lista_Usuarios" }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ["Usuários"],
                summary: "Cadastrar novo usuário ",
                description: "Recebe nome, email, senha, tipo_acesso e  para cadastrar novo usuario",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cadastro_Usuario"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Usuario cadastrado com sucesso"
                    },
                    400: {
                        description: "Erro na requisição(preencha todos os campos)"
                    },
                    500: {
                        description: "Erro interno so Servidor"
                    }
                }
            }
        },
        "/usuarios/{id_usuario}": {
            put: {
                tags: ["Usuários"],
                summary: "Atualizar usuário completo",
                description: "Atualiza todos os campos de um usuário existente",
                parameters: [
                    {
                        name: "id_usuario",
                        in: "path",
                        required: true,
                        description: "Id do usuário a ser atualizado",
                        schema: { type: 'integer' },
                        example: 1
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizacao_Usuario" }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Usuário atualizado com sucesso",
                        content: { "application/json": { example: "Usuário não encontrado" } }
                    },
                    404: {
                        description: "Usuário não encontrado",
                        content: { "application/json": { example: "Usuário não encontrado" } }
                    },
                    500: {
                        description: "Erro no Servidor"
                    }
                }
            },
            delete: {
                tags: ["Usuários"],
                summary: "Deasativar o usuário",
                description: "Desativa o usuário",
                parameters: [
                    {
                        name: "id_usuario",
                        in: "path",
                        required: true,
                        description: "Id do usuário a ser desativado",
                        schema: { type: 'integer' },
                        example: 1
                    }
                ],
                responses: {
                    200: {
                        description: "Usuário desativado com sucesso",
                        content: { "application/json": { example: "Usuário não encontrado" } }
                    },
                    500: {
                        description: "Erro no Servidor"
                    }
                }
            }
        },
        "/login": {
            post: {
                tags: ['Autenticação'],
                summary: 'Realizar Login',
                description: "Autentica um usuario e retorna id e nome",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Login_Usuario"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Login realizado com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Resposta_Login"
                                }
                            }
                        }
                    },
                    400: { description: "Email e senha são obrigatorios" },
                    401: { description: "Credenciais inválidas" },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/servicos": {
            get: {
                tags: ["Serviços"],
                summary: "Listar todos os serviços",
                responses: {
                    200: {
                        description: "Sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Servico" }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ["Serviços"],
                summary: "Cadastrar novo serviço",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Cadastro_Servico" }
                        }
                    }
                },
                responses: {
                    201: { description: "Serviço cadastrado" },
                    500: { description: "Erro no servidor" }
                }
            }
        },
        "/servicos/{id_servico}": {
            put: {
                tags: ["Serviços"],
                summary: "Atualizar serviço",
                parameters: [
                    { name: "id_servico", in: "path", required: true, schema: { type: "integer" } }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Cadastro_Servico" }
                        }
                    }
                },
                responses: {
                    200: { description: "Serviço atualizado" },
                    404: { description: "Serviço não encontrado" }
                }
            },
            delete: {
                tags: ["Serviços"],
                summary: "Excluir serviço",
                parameters: [
                    { name: "id_servico", in: "path", required: true, schema: { type: "integer" } }
                ],
                responses: {
                    200: { description: "Serviço excluído" },
                    404: { description: "Serviço não encontrado" }
                }
            }
        },
        "/agendamentos": {
            get: {
                tags: ["Agendamentos"],
                summary: "Listar todos os agendamentos",
                responses: {
                    200: {
                        description: "Sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Agendamento" }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ["Agendamentos"],
                summary: "Cadastrar novo agendamento",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Cadastro_Agendamento" }
                        }
                    }
                },
                responses: {
                    201: { description: "Agendamento realizado" },
                    500: { description: "Erro no servidor" }
                }
            }
        },
        "/agendamentos/{id_agendamento}": {
            put: {
                tags: ["Agendamentos"],
                summary: "Atualizar agendamento",
                parameters: [
                    { name: "id_agendamento", in: "path", required: true, schema: { type: "integer" } }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Cadastro_Agendamento" }
                        }
                    }
                },
                responses: {
                    200: { description: "Agendamento atualizado" },
                    404: { description: "Agendamento não encontrado" }
                }
            },
            delete: {
                tags: ["Agendamentos"],
                summary: "Excluir agendamento",
                parameters: [
                    { name: "id_agendamento", in: "path", required: true, schema: { type: "integer" } }
                ],
                responses: {
                    200: { description: "Agendamento excluído" },
                    404: { description: "Agendamento não encontrado" }
                }
            }
        },
        "/dashboard": {
            get: {
                tags: ["Dashboard"],
                summary: "Listar Dashboard",
                responses: {
                    200: {
                        description: "Sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Dashboard" }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: "Insira o token obtido no login"
            }
        },
        schemas: {
            Lista_Usuarios: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 1 },
                    nome: { type: "string", example: "Jhonatan" },
                    email: { type: "string", example: "jhon@gmail.com" },
                    tipo: { type: "string", example: "Cliente" },
                }
            },
            Cadastro_Usuario: {
                type: "object",
                properties: {
                    nome: { type: "string", example: "Miguel" },
                    email: { type: "string", example: "miguel@gmail.com" },
                    senha: { type: "string", example: "2026" },
                    tipo: { type: "string", example: "barbeiro" },
                }
            },
            Atualizacao_Usuario: {
                type: "object",
                required: ["nome", "email", "senha", "tipo"],
                properties: {
                    nome: { type: "string", example: "Gustavo" },
                    email: { type: "string", example: "gustavo@email.com" },
                    senha: { type: "string", example: "2030" },
                    tipo: { type: "string", example: "barbeiro" },
                }
            },
            Login_Usuario: {
                type: "object",
                required: ["email", "senha"],
                properties: {
                    email: { type: "string", example: "fulano@email.com" },
                    senha: { type: "string", example: "2026" },
                }
            },
            Resposta_Login: {
                type: "object",
                properties: {
                    message: { type: 'string', example: 'Login realizado com sucesso' },
                    token: {
                        type: 'string',
                        description: 'Token JWT para gerada',
                        example: 'eyJhbGciOihjbiuihvfyuvh...'
                    },
                    usuario: {
                        type: 'object',
                        properties: {
                            id_usuario: {type: 'integer', example: 1},
                            email: { type: "string", example: "gustavo@email.com" },
                            senha: { type: "string", example: "2026" },
                        }
                    }
                }
            },
            Servico: {
                type: "object",
                properties: {
                    id_servico: { type: "integer", example: 1 },
                    nome: { type: "string", example: "Corte de Cabelo" },
                    preco: { type: "number", example: 35.00 },
                    descricao: { type: "string", example: "Corte moderno degradê" },
                    especialidade: { type: "string", example: "Barbeiro" },
                    duracao_minutos: { type: "integer", example: 30 }
                }
            },
            Cadastro_Servico: {
                type: "object",
                required: ["nome", "preco", "especialidade", "duracao_minutos"],
                properties: {
                    nome: { type: "string", example: "Barba" },
                    preco: { type: "number", example: 25.00 },
                    descricao: { type: "string", example: "Fazimento de barba com toalha quente" },
                    especialidade: { type: "string", example: "Barbeiro" },
                    duracao_minutos: { type: "integer", example: 20 }
                }
            },
            Agendamento: {
                type: "object",
                properties: {
                    id_agendamento: { type: "integer", example: 1 },
                    id_cliente: { type: "integer", example: 1 },
                    nome_cliente: { type: "string", example: "Jhonatan" },
                    id_servico: { type: "integer", example: 1 },
                    nome_servico: { type: "string", example: "Corte de Cabelo" },
                    id_barbeiro: { type: "integer", example: 2 },
                    nome_barbeiro: { type: "string", example: "Miguel" },
                    dia_hora: { type: "string", format: "date-time", example: "2026-05-10T14:30:00Z" },
                    preco: { type: "number", example: 35.00 },
                    status: { type: "string", enum: ['Cancelado', 'Em andamento', 'Concluido'], example: "Em andamento" },
                    especialidade_servico: { type: "string", example: "Barbeiro" }
                }
            },
            Cadastro_Agendamento: {
                type: "object",
                required: ["id_cliente", "id_servico", "id_barbeiro", "dia_hora", "preco"],
                properties: {
                    id_cliente: { type: "integer", example: 1 },
                    id_servico: { type: "integer", example: 1 },
                    id_barbeiro: { type: "integer", example: 2 },
                    dia_hora: { type: "string", format: "date-time", example: "2026-05-10T14:30:00Z" },
                    preco: { type: "number", example: 35.00 },
                    status: { type: "string", enum: ['Cancelado', 'Em andamento', 'Concluido'], example: "Em andamento" }
                }
            },
            Dashboard: {
                type: "object",
                properties: {
                    faturamento_total: { type: "number", example: 1000.00 },
                    confirmados: { type: "integer", example: 10 },
                    cancelados: { type: "integer", example: 5 },
                    servicos_mais_procurados: { type: "array", items: { $ref: "#/components/schemas/Servico" } },
                    proximos_agendamentos: { type: "array", items: { $ref: "#/components/schemas/Agendamento" } },
                    fidelidade_clientes: { type: "array", items: { $ref: "#/components/schemas/Cliente" } }
                }
            }
        }
    },
    security: [
        {
            bearerAuth: []
        }
    ]
}

export default swagger;