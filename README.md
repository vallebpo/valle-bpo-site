# Valle BPO Financeiro — site institucional

Site institucional de página única, criado com HTML5 semântico, CSS e JavaScript puro. Não utiliza framework, gerenciador de pacotes, terminal ou build step: pode ser publicado como arquivos estáticos no GitHub Pages.

## Estrutura

- `index.html` — página principal e conteúdo comercial.
- `politica-de-privacidade.html` — minuta de política de privacidade; exige revisão jurídica antes da publicação definitiva.
- `site.config.js` — configuração central de marca, contatos, dados institucionais, formulário, analytics e cores.
- `assets/css/styles.css` — identidade visual responsiva, componentes e estados de foco.
- `assets/js/main.js` — menu acessível, FAQ, configuração de links, SEO estruturado e lógica do formulário.
- `assets/img/favicon.svg` — favicon tipográfico.
- `assets/img/og-valle.svg` — imagem vetorial de compartilhamento, usada quando a URL real estiver configurada.
- `robots.txt` e `sitemap.xml` — arquivos iniciais de indexação; completar o sitemap após definir a URL pública.

## Como editar a configuração

Abra `site.config.js` no GitHub e clique no ícone de lápis para editar. Os campos vazios devem permanecer vazios até a Valle confirmar os dados reais.

- `brand`: nome, descritor e conceitos da marca.
- `contact.whatsapp`: número em formato internacional, apenas números, incluindo código do país e DDD (por exemplo, `55` + DDD + número, sem sinal de `+`, espaços ou parênteses).
- `contact.email`, `contact.phone`, `contact.city` e `contact.address`: canais e localização que a empresa decidir publicar.
- `institutional.legalName` e `institutional.cnpj`: dados legais validados.
- `institutional.domain` e `institutional.canonicalUrl`: URLs HTTPS reais, depois de definir o domínio/URL pública.
- `institutional.social`: URLs reais dos perfis oficiais.
- `form.endpoint`: endpoint HTTPS de um serviço de formulários. Confirme a integração e as regras de privacidade do fornecedor antes de ativar.
- `form.destinationEmail`: e-mail que receberá a mensagem quando o fallback por e-mail for usado. Preencher este campo não cria um servidor nem envia formulário automaticamente.
- `analytics`: os campos são ganchos de integração; a versão entregue não carrega scripts de terceiros. Qualquer implementação futura precisa de avaliação de privacidade/consentimento.
- `theme.colors`: tokens de cor aplicados pelo JavaScript sobre os valores de fallback em CSS.

Para atualizar a copy, edite o conteúdo em `index.html`. Não use clientes, depoimentos, resultados, endereços, números ou certificações sem confirmação real. As respostas do FAQ referentes a implantação, sistemas compatíveis e escopo devem ser revistas pela empresa antes da publicação.

## Formulário e contatos

O formulário valida os campos no navegador e utiliza um campo honeypot básico. Ele **não** simula confirmação de envio:

1. Se `form.endpoint` estiver configurado, o site envia os dados por `POST` e só exibe confirmação depois de receber uma resposta HTTP de sucesso do endpoint.
2. Sem endpoint, tenta preparar uma mensagem no WhatsApp configurado.
3. Se não houver WhatsApp, tenta abrir o cliente de e-mail usando `form.destinationEmail` ou `contact.email`.
4. Se nenhum canal estiver definido, informa que o envio não está configurado e não declara sucesso.

O número de WhatsApp e os canais de contato estão vazios por padrão, para evitar publicação de informação inventada. Antes de anunciar o site, configure pelo menos um canal de contato funcional e faça um teste real.

## Fontes e recursos externos

A página usa pilhas de fontes do sistema, sem buscar fontes ou bibliotecas externas. Isso mantém o site sem dependências de terceiros e sem requisições de fontes externas. Caso a Valle escolha fontes de marca específicas, obtenha os arquivos e licenças apropriados e hospede-os em `assets/fonts/`, atualizando o CSS.

## Publicar no GitHub Pages pelo navegador

1. Crie um repositório público para o site e inclua os arquivos mantendo os caminhos e pastas desta estrutura.
2. Na página do repositório, acesse **Settings** → **Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Selecione a branch principal (normalmente `main`) e a pasta `/(root)`; clique em **Save**.
5. Aguarde a conclusão do deploy indicada pelo GitHub Pages e abra o endereço mostrado na mesma seção.
6. Sempre que alterar arquivos e salvar um commit, o GitHub Pages publicará a atualização automaticamente.

Também é possível hospedar estes arquivos em hospedagem estática como Netlify, Vercel, Cloudflare Pages ou hospedagem tradicional. O projeto não depende desses provedores.

## SEO e domínio

- O `title`, a descrição e metadados Open Graph/Twitter são fornecidos no HTML.
- O `canonicalUrl`, quando configurado com uma URL HTTPS real, ativa a URL canônica e as imagens absolutas de compartilhamento.
- O JavaScript gera dados estruturados Organization e FAQPage com as informações disponíveis na página/configuração.
- Antes de indexar, preencha o `sitemap.xml` com URLs absolutas reais e inclua sua URL em `robots.txt`. Não publique URLs de exemplo.
- O endereço exato de projeto do GitHub Pages depende do nome de usuário e repositório. Preencha esses dados somente depois de conhecer a URL publicada.
- A imagem `og-valle.svg` é vetorial; valide sua compatibilidade com os canais de compartilhamento que serão utilizados.

## Checklist obrigatório antes da publicação comercial

- [ ] Configurar e testar número de WhatsApp, e-mail ou endpoint real.
- [ ] Confirmar razão social, CNPJ, endereço e cidade, se forem exibidos.
- [ ] Definir domínio/URL canônica e atualizar sitemap/robots.
- [ ] Revisar juridicamente e aprovar a política de privacidade; definir canal para solicitações de titulares e avaliar encarregado.
- [ ] Revisar as respostas do FAQ sobre implantação, compatibilidade de sistemas, escopo e procedimentos internos.
- [ ] Confirmar se o formulário realmente precisa de um endpoint e entender o tratamento dos dados pelo fornecedor escolhido.
- [ ] Confirmar fontes licenciadas, logotipo oficial (se existir), redes sociais e imagem de compartilhamento.
- [ ] Testar em larguras de aproximadamente 360 px, 768 px e 1440 px; revisar menu por teclado, foco, formulário, FAQ, links e ausência de rolagem horizontal.
- [ ] Testar o formulário com uma mensagem real e confirmar o recebimento no canal/serviço configurado.

## Segurança e privacidade

Não inclua senhas, chaves secretas, tokens ou credenciais em arquivos do front-end. Tudo que está no repositório público pode ser lido por qualquer pessoa. O site não carrega analytics de terceiros por padrão. O formulário transmite dados a terceiros somente se um endpoint/canal for configurado e acionado; documente isso na política revisada.

A hospedagem estática não permite criar segredos de servidor nem processar dados sensíveis com segurança apenas pelo JavaScript do navegador. Cabeçalhos de segurança avançados devem ser configurados no provedor/CDN quando suportados; veja a documentação do provedor escolhido.
