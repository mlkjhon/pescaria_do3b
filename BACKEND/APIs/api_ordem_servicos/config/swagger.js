import { application, request } from "express";

const documentacao = {
    openapi: '3.0.3',
    info: {
        title: 'API Ordem de Serviços',
        description: 'Documentaçãoda API de Ordens de Serviços',
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
        { name: "Departamentos", description: "Operações relacionadas aos departamentos" },
        { name: "Ordem Serviços", description: "Operações relacionadas às ordem de serviços" }
    ],
    paths: {
        "/usuarios": {
            get: {
                tags: ["Usuários"],
                summary: "Listar Usuários",
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
                description: "Recebe nome, email, senha para cadastrar novo usuario",
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
                description: "Atualiza todos os campos de um usuário existente, sendo necessário envir todos os campos(nome, email, senha)",
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
            patch: {
                tags: ["Usuários"],
                summary: "Atualizar usuário parcialmente",
                description: "Atualiza apenas os campos enviados de um usuário existente, não sendo necessário enviar todos os campos(nome, email, senha)",
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
                            schema: { $ref: "#/components/schemas/Atualizacao_Parcial_Usuario" },
                            examples: {
                                apenas_nome: { summary: "Atualizar apenas Nome", value: { nome: "Novo Nome" } },
                                apenas_email: { summary: "Atualizar apenas Email", value: { email: "novo@email.com" } }
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Usuário atualizado com sucesso",
                        content: { "application/json": { example: "Usuário não encontrado" } }
                    },
                    400: {
                        description: "Nenhum campo a ser atualizado"
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
                summary: "Remover o usuário",
                description: "Remove o usuário",
                parameters: [
                    {
                        name: "id_usuario",
                        in: "path",
                        required: true,
                        description: "Id do usuário a ser removido",
                        schema: { type: 'integer' },
                        example: 1
                    }
                ],
                responses: {
                    200: {
                        description: "Usuário removido com sucesso",
                        content: { "application/json": { example: "Usuário não encontrado" } }
                    },
                    500: {
                        description: "Erro no Servidor"
                    }
                }
            }
        },
        "/departamentos": {
            get: {
                tags: ["Departamentos"],
                summary: "Listar Departamentos",
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Lista_Departamentos" }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ["Departamentos"],
                summary: "Cadastrar novo departamento ",
                description: "Recebe nome e descricao para cadastrar novo deparrtamento",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cadastro_Departamento"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Departamento cadastrado com sucesso"
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
        "/departamentos/{id_departamento}": {
            put: {
                tags: ["Departamentos"],
                summary: "Atualizar departamento completo",
                description: "Atualiza todos os campos de um departamento existente, sendo necessário envir todos os campos(nome, descricao)",
                parameters: [
                    {
                        name: "id_departamento",
                        in: "path",
                        required: true,
                        description: "Id do departamento a ser atualizado",
                        schema: { type: 'integer' },
                        example: 1
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizacao_Departamento" }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Departamento atualizado com sucesso",
                        content: { "application/json": { example: "Departamento não encontrado" } }
                    },
                    404: {
                        description: "Departamento não encontrado",
                        content: { "application/json": { example: "Departamento não encontrado" } }
                    },
                    500: {
                        description: "Erro no Servidor"
                    }
                }
            },
            patch: {
                tags: ["Departamentos"],
                summary: "Atualizar departamento parcialmente",
                description: "Atualiza apenas os campos enviados de um departamento existente, não sendo necessário enviar todos os campos(nome, descricao)",
                parameters: [
                    {
                        name: "id_departamento",
                        in: "path",
                        required: true,
                        description: "Id do departamento a ser atualizado",
                        schema: { type: 'integer' },
                        example: 1
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizacao_Parcial_Departamento" },
                            examples: {
                                apenas_nome: { summary: "Atualizar apenas Nome", value: { nome: "Novo Nome" } },
                                apenas_descricao: { summary: "Atualizar apenas Descrição", value: { descricao: "Nova Descricao" } }
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Departamento atualizado com sucesso",
                        content: { "application/json": { example: "Departamento não encontrado" } }
                    },
                    400: {
                        description: "Nenhum campo a ser atualizado"
                    },
                    404: {
                        description: "Departamento não encontrado",
                        content: { "application/json": { example: "Departamento não encontrado" } }
                    },
                    500: {
                        description: "Erro no Servidor"
                    }
                }
            },
            delete: {
                tags: ["Departamentos"],
                summary: "Remover o Deparatamento",
                description: "Remove o departamento",
                parameters: [
                    {
                        name: "id_departamento",
                        in: "path",
                        required: true,
                        description: "Id do departamento a ser removido",
                        schema: { type: 'integer' },
                        example: 1
                    }
                ],
                responses: {
                    200: {
                        description: "Departamento removido com sucesso",
                        content: { "application/json": { example: "Departamento não encontrado" } }
                    },
                    500: {
                        description: "Erro no Servidor"
                    }
                }
            }
        },
        "/ordem-servicos": {
            get: {
                tags: ["Ordem Serviços"],
                summary: "Listar Ordem Serviços",
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Lista_Ordem_Servico" }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ["Ordem Serviços"],
                summary: "Cadastrar nova ordem de serviço ",
                description: "Recebe nome e descricao para cadastrar nova ordem de serviço",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cadastro_Ordem_Servico"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Ordem de Serviço cadastrada com sucesso"
                    },
                    400: {
                        description: "Erro na requisição(preencha todos os campos)"
                    },
                    500: {
                        description: "Erro interno no Servidor"
                    }
                }
            }
        },
        "/ordem-servicos/{id_ordem}": {
            put: {
                tags: ["Ordem Serviços"],
                summary: "Atualizar ordem completa",
                description: `Atualiza todos os campos de uma ordem de serviço existente, 
                    sendo necessário envir todos os campos(numero_ordem, titulo, descricao, prioridade, status, data, id_usuario, id_departamento)`,
                parameters: [
                    {
                        name: "id_ordem",
                        in: "path",
                        required: true,
                        description: "Id da ordem a ser atualizada",
                        schema: { type: 'integer' },
                        example: 1
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizacao_Ordem_Servico" }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Ordem de Serviço atualizada com sucesso",
                        content: { "application/json": { example: "Ordem de Serviço não encontrada" } }
                    },
                    404: {
                        description: "Ordem de Serviço não encontrada",
                        content: { "application/json": { example: "Ordem de Serviço não encontrada" } }
                    },
                    500: {
                        description: "Erro no Servidor"
                    }
                }
            },
            patch: {
                tags: ["Ordem Serviços"],
                summary: "Atualizar ordem de serviço parcialmente",
                description: `Atualiza apenas os campos enviados de um ordem de serviço existente, 
                não sendo necessário enviar todos os campos (numero_ordem, titulo, descricao, prioridade, status, data, id_usuario, id_departamento)`,
                parameters: [
                    {
                        name: "id_ordem",
                        in: "path",
                        required: true,
                        description: "Id da ordem a ser atualizada",
                        schema: { type: 'integer' },
                        example: 1
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizacao_Parcial_Ordem_Servico" },
                            examples: {
                                apenas_numero_ordem: { summary: "Atualizar apenas Numero da Ordem", value: { numero_ordem: "1" } },
                                apenas_titulo: { summary: "Atualizar apenas Nome", value: { titulo: "Novo Titulo" } },
                                apenas_descricao: { summary: "Atualizar apenas Descrição", value: { descricao: "Nova Descricao" } },
                                apenas_prioridade: { summary: "Atualizar apenas Prioridade", value: { descricao: "Prioridade" } },
                                apenas_status: { summary: "Atualizar apenas Status", value: { status: "Status" } },
                                apenas_data: { summary: "Atualizar apenas Data", value: { data: "" } },
                                apenas_id_usuario: { summary: "Atualizar apenas Id usuario", value: { id_usuario: "1" } },
                                apenas_id_departamento: { summary: "Atualizar apenas Id departamento", value: { id_departamento: "1" } }
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Ordem de Serviço atualizado com sucesso",
                        content: { "application/json": { example: "Ordem de Serviço não encontrado" } }
                    },
                    400: {
                        description: "Nenhum campo a ser atualizado"
                    },
                    404: {
                        description: "Ordem de Serviço não encontrado",
                        content: { "application/json": { example: "Ordem de Serviço não encontrado" } }
                    },
                    500: {
                        description: "Erro no Servidor"
                    }
                }
            },
            delete: {
                tags: ["Ordem Serviços"],
                summary: "Remover a Ordem de Serviço",
                description: "Remove a Ordem de Serviço",
                parameters: [
                    {
                        name: "id_ordem",
                        in: "path",
                        required: true,
                        description: "Id da Ordem a ser removida",
                        schema: { type: 'integer' },
                        example: 1
                    }
                ],
                responses: {
                    200: {
                        description: "Ordem removida com sucesso",
                        content: { "application/json": { example: "Ordem não encontrada" } }
                    },
                    500: {
                        description: "Erro no Servidor"
                    }
                }
            }
        },

    },
    components: {
        schemas: {
            Lista_Usuarios: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 1 },
                    nome: { type: "string", example: "Gustavo" },
                    email: { type: "string", example: "gustavo@email.com" }
                }
            },
            Cadastro_Usuario: {
                type: "object",
                properties: {
                    nome: { type: "string", example: "Gustavo" },
                    email: { type: "string", example: "gustavo@email.com" },
                    senha: { type: "string", example: "2026" },
                }
            },
            Atualizacao_Usuario: {
                type: "object",
                required: ["nome", "email", "senha"],
                properties: {
                    nome: { type: "string", example: "Gustavo" },
                    email: { type: "string", example: "gustavo@email.com" },
                    senha: { type: "string", example: "2026" },
                }
            },
            Atualizacao_Parcial_Usuario: {
                type: "object",
                properties: {
                    nome: { type: "string", example: "Gustavo" },
                    email: { type: "string", example: "gustavo@email.com" },
                    senha: { type: "string", example: "2026" },
                }
            },
            Lista_Departamentos: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 1 },
                    nome: { type: "string", example: "TI" },
                    descricao: { type: "string", example: "Tecnologia da Informação" }
                }
            },
            Cadastro_Departamento: {
                type: "object",
                properties: {
                    nome: { type: "string", example: "TI" },
                    descricao: { type: "string", example: "Tecnologia da Informação" }
                }
            },
            Atualizacao_Departamento: {
                type: "object",
                required: ["nome", "descricao"],
                properties: {
                    nome: { type: "string", example: "TI" },
                    descricao: { type: "string", example: "Tecnologia da Informação" }
                }
            },
            Atualizacao_Parcial_Departamento: {
                type: "object",
                properties: {
                    nome: { type: "string", example: "TI" },
                    descricao: { type: "string", example: "Tecnologia da Informação" }
                }
            },
            Lista_Ordem_Servico: {
                type: "object",
                properties: {
                    id_ordem: { type: "integer", example: 1 },
                    numero_ordem: { type: "integer", example: 2024001 },
                    titulo: { type: "string", example: "Problema no sistema" },
                    descricao: { type: "string", example: "Sistema não está respondendo" },
                    prioridade: { type: "string", example: "Alta" },
                    status: { type: "string", example: "Em andamento" },
                    data: { type: "string", format: "date", example: "2026-02-27" },
                    id_usuario: { type: "integer", example: 3 },
                    id_departamento: { type: "integer", example: 2 }
                }
            },
            Cadastro_Ordem_Servico: {
                type: "object",
                properties: {
                    numero_ordem: { type: "integer", example: 2024001 },
                    titulo: { type: "string", example: "Problema no sistema" },
                    descricao: { type: "string", example: "Sistema não está respondendo" },
                    prioridade: { type: "string", example: "Alta" },
                    status: { type: "string", example: "Em andamento" },
                    data: { type: "string", format: "date", example: "2026-02-27" },
                    id_usuario: { type: "integer", example: 3 },
                    id_departamento: { type: "integer", example: 2 }
                }
            },
            Atualizacao_Ordem_Servico: {
                type: "object",
                required: ["numero_ordem", "titulo", "descricao", "prioridade", "status", " data", "id_usuario", "id_departamento"],
                properties: {
                    numero_ordem: { type: "integer", example: 2024001 },
                    titulo: { type: "string", example: "Problema no sistema" },
                    descricao: { type: "string", example: "Sistema não está respondendo" },
                    prioridade: { type: "string", example: "Alta" },
                    status: { type: "string", example: "Em andamento" },
                    data: { type: "string", format: "date", example: "2026-02-27" },
                    id_usuario: { type: "integer", example: 3 },
                    id_departamento: { type: "integer", example: 2 }
                }
            },
            Atualizacao_Parcial_Ordem_Servico: {
              type: "object",
                properties: {
                    numero_ordem: { type: "integer", example: 2024001 },
                    titulo: { type: "string", example: "Problema no sistema" },
                    descricao: { type: "string", example: "Sistema não está respondendo" },
                    prioridade: { type: "string", example: "Alta" },
                    status: { type: "string", example: "Em andamento" },
                    data: { type: "string", format: "date", example: "2026-02-27" },
                    id_usuario: { type: "integer", example: 3 },
                    id_departamento: { type: "integer", example: 2 }
                }  
            }
        }
    }
}

export default documentacao;