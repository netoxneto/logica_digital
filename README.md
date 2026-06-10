"""# 💻 Lógica Digital - Plataforma Interativa

Uma plataforma educacional interativa estruturada para facilitar a aprendizagem e o ensino de Arquitetura de Computadores e Lógica Digital. O projeto está organizado de forma modular para apresentar conceitos técnicos de computação através de uma interface visual, limpa e prática.

## 🎯 Objetivo

Fornecer um ambiente de aprendizagem de alta qualidade onde é possível explorar, visualizar e testar o funcionamento de circuitos digitais, portas lógicas e álgebra booleana. Serve como um excelente material de apoio didático para aulas teóricas e práticas, bem como para o estudo autónomo.

## 🗂️ Estrutura do Projeto

O projeto adota uma arquitetura modular moderna, separando de forma limpa a estrutura (HTML), a estética e design (CSS) e a interatividade (JavaScript). Esta organização facilita imenso a manutenção e futura expansão do plano curricular:

```text
/
├── index.html              # Módulo 01: Fundamentos (Página Inicial)
├── README.md               # Documentação do projeto
├── css/
│   └── style.css           # Estilos globais da interface e navegação
├── js/
│   └── script.js           # Motor de simulação, tabelas verdade e quiz
└── Modulos/
    ├── portas.html         # Módulo 02: Portas Lógicas e representações
    ├── simulador.html      # Módulo 03: Simulador Interativo
    ├── algebra.html        # Módulo 04: Álgebra Booleana
    ├── circuitos.html      # Módulo 05: Circuitos Digitais (Somadores, etc.)
    └── quiz.html           # Módulo 06: Avaliação e consolidação de conhecimentos