import { application, request } from "express";

const documentacao = {
    openapi: '3.0.3',
    info: {
        title: 'API Produtos',
        description: 'Documentaçãoda API de Produtos',
        version: '1.0.0'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor Localhost'
        }
    ],
    tags: [
        { name: "Usuários", description: "Operações relacionadas aos Usuários" },
        { name: "Produtos", description: "Operações relacionadas aos Produtos" }

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
        //Swagger Login
        "/login": {
            post: {
                tags: ["Usuários"],
                summary: "Realizar Login ",
                description: "Autentica um usuario e retorna seus dados",
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
                    201: {
                        description: "Login realizado com sucesso com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Resposta_Login"
                                }
                            }
                        }
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
        "/produtos": {
            get: {
                tags: ["Produtos"],
                summary: "Listar Produtos",
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Lista_Produto" }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ["Produtos"],
                summary: "Cadastrar novo produto ",
                description: "Recebe campos necessários para cadastrar nova ordem de serviço",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cadastro_Produto"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Produto cadastrado com sucesso"
                    },
                    400: {
                        description: "Erro na requisição (preencha todos os campos)"
                    },
                    500: {
                        description: "Erro interno no Servidor"
                    }
                }
            }
        },
        "/produtos/{id_produto}": {
            put: {
                tags: ["Produtos"],
                summary: "Atualizar poduto completo",
                description: `Atualiza todos os campos, sendo necessário enviar todos os campos`,
                parameters: [
                    {
                        name: "id_produto",
                        in: "path",
                        required: true,
                        description: "Id do produto a ser atualizado",
                        schema: { type: 'integer' },
                        example: 1
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizacao_Produto" }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Produto atualizado com sucesso",
                        content: { "application/json": { example: "Produto não encontrado" } }
                    },
                    404: {
                        description: "Produto não encontrado",
                        content: { "application/json": { example: "Produto não encontrado" } }
                    },
                    500: {
                        description: "Erro no Servidor"
                    }
                }
            },
            patch: {
                tags: ["Produtos"],
                summary: "Atualizar produto parcialmente",
                description: `Atualiza apenas os campos enviados de produtos, não sendo necessário enviar todos os campos`,
                parameters: [
                    {
                        name: "id_produto",
                        in: "path",
                        required: true,
                        description: "Id do produto a ser atualizado",
                        schema: { type: 'integer' },
                        example: 1
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizacao_Parcial_Produto" },
                            examples: {
                                apenas_nome: { summary: "Atualizar apenas Nome", value: { nome: "Novo Nome" } },
                                apenas_preco: { summary: "Atualizar apenas Preço", value: { preco: 1000 } },
                                apenas_link_imagem: { summary: "Atualizar apenas Link da Imagem", value: { link_imagem: "Nova URL" } },
                                apenas_link_produto: { summary: "Atualizar apenas Link do Produto", value: { link_produto: "Novo Link" } },
                                apenas_categoria: { summary: "Atualizar apenas Categoria", value: { status: "Nova Categoria" } },
                                apenas_frete: { summary: "Atualizar apenas Frete", value: { frete: false } }
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Produto atualizado com sucesso",
                        content: { "application/json": { example: "Produto não encontrado" } }
                    },
                    400: {
                        description: "Nenhum campo a ser atualizado"
                    },
                    404: {
                        description: "Produto não encontrado",
                        content: { "application/json": { example: "Produto não encontrado" } }
                    },
                    500: {
                        description: "Erro no Servidor"
                    }
                }
            },
            delete: {
                tags: ["Produtos"],
                summary: "Remover Produto",
                description: "Remove Produto",
                parameters: [
                    {
                        name: "id_produto",
                        in: "path",
                        required: true,
                        description: "Id do produto a ser removido",
                        schema: { type: 'integer' },
                        example: 1
                    }
                ],
                responses: {
                    200: {
                        description: "Produto removido com sucesso",
                        content: { "application/json": { example: "Produto não encontrado" } }
                    },
                    500: {
                        description: "Erro no Servidor"
                    }
                }
            }
        }
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
            Login_Usuario: {
                type: "object",
                required: ["email", "senha"],
                properties: {
                    email: { type: "string", example: "gustavo@email.com" },
                    senha: { type: "string", example: "2026" },
                }
            },
            Resposta_Login: {
                type: "object",
                properties: {
                    message: { type: 'string', example: 'Login realizado com sucesso' },
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
            Lista_Produto: {
                type: "object",
                properties: {
                    id_produto: { type: "integer", example: 1 },
                    nome: { type: "string", example: "Notebook Dell" },
                    preco: { type: "decimal", example: 3500.00 },
                    link_imagem: { type: "string", example: "site.com/imagem.jpg" },
                    link_produto: { type: "string", example: "site.com/produto" },
                    categoria: { type: "string", example: "Eletrônicos" },
                    frete: { type: "boolean", example: true }
                }
            },
            Cadastro_Produto: {
                type: "object",
                properties: {
                    nome: { type: "string", example: "Notebook Dell" },
                    preco: { type: "decimal", example: 3500.00 },
                    link_imagem: { type: "string", example: "site.com/imagem.jpg" },
                    link_produto: { type: "string", example: "site.com/produto" },
                    categoria: { type: "string", example: "Eletrônicos" },
                    frete: { type: "boolean", example: true }
                }
            },
            Atualizacao_Produto: {
                type: "object",
                required: ["nome", "preco", "link_imagem", "link_produto", "categoria", "frete"],
                properties: {
                    nome: { type: "string", example: "Notebook Dell" },
                    preco: { type: "decimal", example: 3500.00 },
                    link_imagem: { type: "string", example: "site.com/imagem.jpg" },
                    link_produto: { type: "string", example: "site.com/produto" },
                    categoria: { type: "string", example: "Eletrônicos" },
                    frete: { type: "boolean", example: true }
                }
            },
            Atualizacao_Parcial_Produto: {
                type: "object",
                properties: {
                    nome: { type: "string", example: "Notebook Dell" },
                    preco: { type: "decimal", example: 3500.00 },
                    link_imagem: { type: "string", example: "site.com/imagem.jpg" },
                    link_produto: { type: "string", example: "site.com/produto" },
                    categoria: { type: "string", example: "Eletrônicos" },
                    frete: { type: "boolean", example: true }
                }
            }
        }
    }
}

export default documentacao;