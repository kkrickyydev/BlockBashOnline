# Block Bash Web

Projeto web completo inspirado no estilo de puzzle 8x8 com 3 peças por rodada.

## Como usar

1. Baixe os arquivos.
2. Abra `index.html` no navegador.
3. Jogue normalmente.

## O que o projeto inclui

- Tabuleiro 8x8
- 3 peças por rodada
- Arrastar e soltar
- Clique/tap alternativo para posicionar peça
- Limpeza automática de linhas e colunas
- Sistema de pontuação e combo
- Fases com temas visuais diferentes
- Recorde salvo em `localStorage`
- Gerador de peças com busca de trios jogáveis quando houver solução viável
- Estrutura pronta para anúncios nas laterais e abaixo do jogo via Google AdSense

## Configurar anúncios Google AdSense

No arquivo `index.html`, altere o bloco:

```html
<script>
  window.BLOCKBASH_ADS = {
    enabled: false,
    publisherId: 'ca-pub-0000000000000000',
    slots: {
      sidebarLeft: '0000000001',
      sidebarRight: '0000000002',
      bottom: '0000000003'
    }
  };
</script>
```

Troque para os seus dados:

- `enabled: true`
- `publisherId`: seu `ca-pub-...`
- `sidebarLeft`, `sidebarRight` e `bottom`: IDs reais dos blocos de anúncio

## Observações sobre anúncios

- O layout já foi preparado com duas colunas laterais no desktop e um banner abaixo do jogo.
- Em telas menores, os anúncios laterais são ocultados para preservar a jogabilidade.
- Se os IDs não forem configurados, o jogo mostra placeholders em vez de tentar carregar anúncios inválidos.

## Sobre a “IA” das peças

O gerador tenta montar um trio em que as 3 peças possam ser colocadas em alguma ordem no estado atual do tabuleiro. Primeiro ele testa combinações aleatórias com pesos por dificuldade. Se não encontrar, ele procura combinações mais leves. Se ainda assim não existir trio solucionável, faz fallback para pelo menos tentar entregar uma peça jogável — e, quando não existe movimento possível, o jogo encerra.

## Estrutura

- `index.html` → estrutura da interface e áreas de anúncio
- `styles.css` → visual, responsividade, temas por fase e layout dos anúncios
- `script.js` → regras, arraste, pontuação, solver, geração de peças e inicialização do AdSense
- `ads.txt.example` → modelo para publicar na raiz do site
