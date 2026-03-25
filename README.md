# Ecomm Frontend

Interface web para um e-commerce com catalogo de produtos, carrinho, autenticacao, checkout com Stripe e area administrativa. Construido com React + Vite e integra-se a uma API REST.

## Principais Funcionalidades
- Catalogo de produtos com paginacao
- Carrinho de compras e gerenciamento de quantidade
- Autenticacao (login e cadastro)
- Perfil do usuario com enderecos e pedidos
- Checkout com Stripe
- Area admin com dashboard, categorias, produtos, vendedores e pedidos

## Stack
- React 19 + Vite
- Redux (Toolkit + react-redux)
- Tailwind CSS + MUI + Headless UI
- Axios
- Stripe (checkout)

## Requisitos
- Node.js instalado
- Backend rodando e acessivel pela URL configurada no `.env`

## Instalacao
1. Instale as dependencias:

```bash
npm install
```

2. Configure o arquivo `.env` na raiz:

```bash
VITE_BACK_END_URL=http://localhost:8080
VITE_FRONTEND_URL=http://localhost:5173
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_sua_chave_aqui
```

3. Rode o projeto:

```bash
npm run dev
```

A aplicacao ficara disponivel em `http://localhost:5173`.

## Scripts
- `npm run dev` - ambiente de desenvolvimento
- `npm run build` - build de producao
- `npm run preview` - preview do build
- `npm run lint` - lint do projeto

## Rotas Principais
- `/` Home
- `/products` Produtos
- `/cart` Carrinho
- `/login` Login
- `/register` Cadastro
- `/profile` Perfil do usuario
- `/checkout` Checkout (protegida)
- `/order-confirm` Confirmacao de pagamento (protegida)
- `/admin` Dashboard admin (protegida)
- `/admin/categories` Categorias
- `/admin/products` Produtos
- `/admin/sellers` Vendedores
- `/admin/orders` Pedidos

## Estrutura de Pastas
- `src/api` configuracao do Axios
- `src/components` componentes de UI e paginas
- `src/hooks` hooks customizados
- `src/store` actions e reducers do Redux
- `src/utils` funcoes utilitarias

## Observacoes
- O frontend utiliza cookies com `withCredentials` para autenticar as requisicoes.
- Para o checkout online, a chave publica do Stripe e obrigatoria.