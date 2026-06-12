# 🎨 Monalisa Interativa - Projeto Alura

Uma arte interativa da Monalisa criada com Canvas JavaScript, onde os olhos seguem o movimento do cursor do mouse. O projeto utiliza as cores originais da obra de Leonardo da Vinci.

## 📋 Características

- **Olhos Interativos**: Os olhos da Monalisa seguem o cursor do mouse em tempo real
- **Cores Originais**: Paleta de cores baseada na obra original renascentista
- **Desenho Detalhado**: 
  - Rosto com iluminação e sombreamento
  - Cabelo com textura
  - Fundo da paisagem
  - Roupas com dobras
  - Mãos e dedos
  - Expressão facial característica
- **Design Responsivo**: Funciona em diferentes tamanhos de tela
- **Animação Fluida**: Usa `requestAnimationFrame` para suavidade

## 🚀 Como Usar

1. Clone ou faça o download dos arquivos:
   - `index.html`
   - `style.css`
   - `script.js`

2. Abra o arquivo `index.html` em seu navegador

3. Mova o cursor sobre o canvas para ver os olhos acompanharem!

## 📁 Estrutura dos Arquivos

```
├── index.html       # Estrutura HTML
├── style.css        # Estilos e layout
├── script.js        # Lógica de desenho e interatividade
└── README.md        # Este arquivo
```

## 💻 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e Canvas API
- **CSS3**: Estilos modernos, gradientes e efeitos visuais
- **JavaScript**: Desenho 2D, detecção de movimento do mouse e animações

## 🎨 Paleta de Cores (Cores Originais)

- **Pele**: `#C9A961` (tons quentes)
- **Cabelo**: `#4A3728` (marrom escuro)
- **Olhos**: `#3D3D2D` (marrom acinzentado)
- **Lábios**: `#8B5A5A` (rosa terroso)
- **Fundo**: `#7B8B4F` - `#9BA46F` (verde-acinzentado)
- **Roupas**: `#2A2520` - `#4A3D35` (marrom escuro)

## 🧠 Como Funciona

### Detecção de Cursor
O código utiliza o evento `mousemove` para rastrear a posição do cursor em tempo real:
```javascript
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});
```

### Cálculo do Ângulo do Olho
A função `calcularAnguloOlho()` usa `Math.atan2()` para calcular o ângulo entre o olho e o cursor:
```javascript
function calcularAnguloOlho(olhoX, olhoY, cursorX, cursorY) {
    return Math.atan2(cursorY - olhoY, cursorX - olhoX);
}
```

### Desenho dos Olhos
Os olhos são compostos por:
- Círculo branco (esclera)
- Íris que segue o cursor (dentro de um raio limitado)
- Pupila (círculo preto)
- Brilho (efeito de luz)

### Animação Contínua
A função `requestAnimationFrame()` garante que o desenho seja atualizado em sincronização com a tela:
```javascript
function animar() {
    desenharMonalisa();
    requestAnimationFrame(animar);
}
```

## 📝 Explicação do Código Principal

### Cores
Todas as cores são armazenadas em um objeto `CORES` para fácil manutenção:
```javascript
const CORES = {
    pele: '#C9A961',
    cabelo: '#4A3728',
    // ... mais cores
};
```

### Funções Auxiliares
- `desenharCirculo()`: Desenha círculos preenchidos
- `desenharCurva()`: Desenha curvas suaves
- `desenharOlho()`: Desenha olhos com pupila interativa
- `desenharMonalisa()`: Desenha toda a composição

### Gradientes
Uso de gradientes para dar profundidade e realismo:
```javascript
const gradienteRosto = ctx.createRadialGradient(...);
gradienteRosto.addColorStop(0, CORES.peleClara);
gradienteRosto.addColorStop(1, CORES.pele);
```

## 🔧 Personalizações

Você pode facilmente personalizar:
- **Cores**: Modifique o objeto `CORES` em `script.js`
- **Tamanho do Canvas**: Altere `canvas.width` e `canvas.height`
- **Posições**: Ajuste as coordenadas x, y nos comandos de desenho
- **Tamanho dos Elementos**: Modifique os valores de raio e tamanho

## 🎓 Conceitos de Canvas Aprendidos

1. **Context 2D**: `ctx.getContext('2d')`
2. **Formas**: Círculos, linhas, curvas quadráticas
3. **Cores e Gradientes**: `fillStyle`, `strokeStyle`, gradientes radiais e lineares
4. **Transformações**: Movimentos suaves com matemática
5. **Eventos**: Rastreamento de movimento do mouse
6. **Animação**: `requestAnimationFrame`
7. **Trigonometria**: `Math.atan2()`, `Math.cos()`, `Math.sin()`

## 📚 Referências

- [MDN - Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [MDN - requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- [Monalisa - Wikipedia](https://pt.wikipedia.org/wiki/Mona_Lisa)

## 👨‍💻 Autor

Projeto desenvolvido como parte do curso de Arte Interativa na Alura.

## 📄 Licença

Este projeto é livre para uso educacional e pessoal.

---

**Divirta-se com a arte interativa!** 🎨✨