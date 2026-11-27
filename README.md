# Valle BPO Financeiro — Site institucional

Site institucional e comercial da **Valle BPO Financeiro**, desenvolvido como uma página estática, responsiva e de fácil manutenção.

- **Site publicado:** https://vallebpo.github.io/valle-bpo-site/
- **Repositório:** https://github.com/vallebpo/valle-bpo-site
- **Posicionamento:** Organização financeira com método e proximidade.
- **Conceito:** Digital por padrão. Próxima quando necessário.

## Sobre o projeto

O site apresenta a Valle BPO Financeiro, seus serviços, públicos atendidos, processo de trabalho, planos comerciais, treinamentos complementares e canais de contato.

A implementação utiliza **HTML, CSS e JavaScript puro**, sem frameworks, gerenciador de pacotes ou etapa de compilação. Os arquivos podem ser editados diretamente pelo navegador no GitHub e publicados pelo GitHub Pages.

## Conteúdo do site

A página principal (`index.html`) reúne as seguintes seções:

- **Início:** apresentação e proposta de valor da Valle.
- **Serviços:** contas a pagar e receber, faturamento e cobranças, conciliação financeira, fluxo de caixa, relatórios, organização financeira e integração com a contabilidade.
- **Para quem:** profissionais e empresas prestadoras de serviços, incluindo advocacia, tecnologia e saúde.
- **Como funciona:** entendimento, organização, execução e acompanhamento.
- **Planos e investimento:** planos Essencial, Profissional, Premium e Personalizado.
- **Sobre a Valle:** posicionamento e forma de atuação.
- **Treinamentos:** serviço complementar para equipes.
- **Dúvidas frequentes:** informações sobre o BPO Financeiro e o escopo de atuação.
- **Contato:** canais institucionais e acesso ao WhatsApp.

## Planos comerciais apresentados

Os valores abaixo são preços iniciais exibidos no site. A proposta final depende do volume de operações e da complexidade da rotina financeira. A implantação inicial é dimensionada separadamente.

| Plano | Investimento inicial | Principais características |
|---|---:|---|
| Essencial | R$ 890/mês | 2 ciclos de execução por semana, conciliação semanal e resumo financeiro mensal. |
| Profissional | R$ 1.490/mês | 3 ciclos de execução por semana, conciliação duas vezes por semana e fluxo de caixa projetado para 30 dias. |
| Premium | R$ 2.390/mês | 4 ciclos de execução por semana, conciliação três vezes por semana e fluxo de caixa projetado para 60 dias. |
| Personalizado | Sob consulta | Serviços, volume e frequência definidos conforme a operação. |

### Limites operacionais divulgados

| Critério mensal | Essencial | Profissional | Premium |
|---|---:|---:|---:|
| Movimentações financeiras | Até 60 | Até 120 | Até 220 |
| Contas bancárias | 1 | Até 2 | Até 3 |
| Emissões de NFS-e | Até 10 | Até 25 | Até 50 |
| Cobranças acompanhadas | Até 15 | Até 30 | Até 60 |

A conciliação de uma movimentação já contabilizada não gera uma segunda contagem. Transferências entre contas próprias não são consideradas duas operações. Cada cobrança acompanhada inclui um contato inicial e uma reiteração. A quantidade de clientes, fornecedores e a complexidade dos sistemas também podem influenciar a proposta.

## Estrutura de arquivos

```text
.
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── img/
│   │   └── favicon.svg
│   └── js/
│       └── main.js
├── index.html
├── politica-de-privacidade.html
├── robots.txt
├── sitemap.xml
├── site.config.js
└── README.md
```

### Arquivos principais

| Arquivo | Responsabilidade |
|---|---|
| `index.html` | Conteúdo, estrutura, navegação, seções e chamadas para contato. |
| `assets/css/styles.css` | Identidade visual, componentes, espaçamentos e responsividade. |
| `assets/js/main.js` | Comportamentos do menu, atualização de marca e contatos, links do WhatsApp e ano do rodapé. |
| `site.config.js` | Configuração central da marca, contatos, dados institucionais e cores. |
| `politica-de-privacidade.html` | Página de informações sobre privacidade. Deve refletir as práticas reais da empresa. |
| `robots.txt` | Orientações básicas para robôs de indexação. |
| `sitemap.xml` | Estrutura inicial do mapa do site; completar quando a URL canônica/domínio definitivo estiver configurado. |

## Configuração da marca e dos contatos

As informações centrais ficam em `site.config.js`. Para editá-las pelo navegador:

1. Abra o arquivo `site.config.js` no repositório do GitHub.
2. Clique no ícone de lápis para editar.
3. Atualize somente os campos necessários.
4. Clique em **Commit changes** para salvar.

Principais grupos de configuração:

- `brand`: nome da empresa, nome curto, descritor e mensagens institucionais.
- `contact.whatsapp`: número no formato internacional, contendo apenas números (país + DDD + número, sem `+`, espaços ou parênteses).
- `contact.defaultMessage`: mensagem padrão usada nos links de WhatsApp que não possuem uma mensagem própria.
- `contact.email` e `contact.phone`: e-mail e telefone apresentados no rodapé.
- `institutional`: dados institucionais, URL canônica e perfis sociais. Preencha apenas informações confirmadas e URLs oficiais.
- `theme.colors`: cores centrais da identidade visual.

Os botões de contato usam o atributo `data-whatsapp`. Quando o botão também possui `data-message`, essa mensagem específica é usada para iniciar a conversa. Por isso, os botões dos planos podem abrir o WhatsApp com mensagens diferentes para Essencial, Profissional, Premium e Personalizado.

O `main.js` monta os links com base no número configurado. Se o número não for válido, os elementos de WhatsApp são ocultados. O telefone e o e-mail do rodapé são apresentados como texto; os links externos de WhatsApp e redes sociais são configurados pelo JavaScript.

## Como atualizar o conteúdo

- **Textos e seções:** edite o `index.html`.
- **Planos, preços e limites:** edite os cartões da seção `id="planos"` no `index.html`. Mantenha os valores, frequências e limites coerentes com a proposta comercial vigente.
- **Aparência e adaptação para telas menores:** edite o `assets/css/styles.css`.
- **Contatos, marca e cores configuráveis:** edite o `site.config.js`.
- **Comportamentos do menu e dos links:** edite o `assets/js/main.js` somente quando houver necessidade funcional.

Ao alterar nomes de classes, atributos `data-*` ou identificadores de seções, confira também os seletores e comportamentos que dependem deles. Os links do menu utilizam os identificadores das seções, como `#servicos`, `#processo` e `#planos`.

## Publicação pelo GitHub Pages

O projeto pode ser mantido e publicado inteiramente pelo navegador, sem terminal ou instalação de ferramentas.

1. Abra o repositório no GitHub.
2. Acesse **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**.
4. Selecione a branch `main` e a pasta `/(root)`.
5. Salve a configuração, se necessário.
6. Acompanhe a publicação indicada pelo GitHub Pages e abra a URL apresentada.

Depois da configuração inicial, cada commit na branch e pasta publicadas inicia a atualização do site. Caso a alteração não apareça imediatamente, atualize a página sem usar o cache (`Ctrl + F5`).

## Verificação antes de publicar alterações

Após cada atualização, confira:

- Navegação no computador e no celular.
- Links do menu e rolagem para cada seção.
- Botões de WhatsApp e mensagens específicas dos planos.
- Expansão dos detalhes de limites operacionais.
- Leitura dos cartões em telas menores e ausência de rolagem horizontal.
- E-mail, telefone e demais informações de contato.
- Acesso à página de privacidade.
- Consistência entre os preços, limites apresentados no site e propostas comerciais enviadas aos clientes.

## Privacidade e segurança

O site é estático. A versão atual não possui banco de dados, área de login, formulário de cadastro ou painel administrativo. O JavaScript configura a navegação e os canais de contato no navegador; os links de WhatsApp direcionam o visitante para o serviço externo.

Como o repositório é público, todo conteúdo incluído nos arquivos pode ser acessado por terceiros. **Não inclua senhas, tokens, chaves privadas, credenciais bancárias, documentos de clientes ou informações financeiras confidenciais no código.** Não utilize o site estático para receber ou armazenar documentos financeiros sensíveis.

A página de privacidade deve ser revisada para corresponder aos canais efetivamente utilizados, às informações apresentadas e às práticas reais da Valle. Antes de adicionar ferramentas externas, rastreadores ou mecanismos de coleta de dados, avalie os impactos de privacidade e atualize a documentação correspondente.

---

**Valle BPO Financeiro**  
Organização financeira com método e proximidade.  
Digital por padrão. Próxima quando necessário.
