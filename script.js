// Selecionar o canvas e obter o contexto 2D
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Definir o tamanho do canvas
canvas.width = 600;
canvas.height = 800;

// Variáveis para rastrear o cursor do mouse
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

// Cores originais da Monalisa (Paleta Renascentista)
const CORES = {
    pele: '#C9A961',
    peleEscura: '#A0826D',
    peleClara: '#E5C8A0',
    cabelo: '#4A3728',
    cabeloClaro: '#6B5344',
    fundo: '#7B8B4F',
    fundoClaro: '#9BA46F',
    roupa: '#2A2520',
    roupaMarrom: '#4A3D35',
    branco: '#F5F1E8',
    olho: '#3D3D2D',
    labios: '#8B5A5A',
    sombra: 'rgba(0, 0, 0, 0.2)',
    luz: 'rgba(255, 255, 255, 0.3)'
};

// Ouvinte de movimento do mouse
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Calcular posição relativa ao canvas
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

// Função para desenhar um círculo preenchido
function desenharCirculo(x, y, raio, cor) {
    ctx.fillStyle = cor;
    ctx.beginPath();
    ctx.arc(x, y, raio, 0, Math.PI * 2);
    ctx.fill();
}

// Função para desenhar uma curva suave (para contornos faciais)
function desenharCurva(x1, y1, x2, y2, x3, y3, cor) {
    ctx.strokeStyle = cor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(x2, y2, x3, y3);
    ctx.stroke();
}

// Função para calcular o ângulo do olho em relação ao cursor
function calcularAnguloOlho(olhoX, olhoY, cursorX, cursorY) {
    return Math.atan2(cursorY - olhoY, cursorX - olhoX);
}

// Função para desenhar o olho com pupila que segue o cursor
function desenharOlho(x, y, tamanho, raioIris) {
    // Branco do olho
    desenharCirculo(x, y, tamanho, CORES.branco);
    
    // Calcular posição da íris (que segue o cursor)
    const angulo = calcularAnguloOlho(x, y, mouseX, mouseY);
    const distancia = tamanho - raioIris - 5;
    const irisX = x + Math.cos(angulo) * distancia;
    const irisY = y + Math.sin(angulo) * distancia;
    
    // Desenhar a íris (cor dos olhos)
    desenharCirculo(irisX, irisY, raioIris, CORES.olho);
    
    // Desenhar a pupila
    desenharCirculo(irisX, irisY, raioIris * 0.6, '#000000');
    
    // Brilho nos olhos (efeito de luz)
    ctx.fillStyle = CORES.luz;
    ctx.beginPath();
    ctx.arc(irisX - raioIris * 0.25, irisY - raioIris * 0.25, raioIris * 0.3, 0, Math.PI * 2);
    ctx.fill();
}

// Função para desenhar a Monalisa
function desenharMonalisa() {
    // Limpar canvas com cor de fundo gradiente
    const gradienteF = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradienteF.addColorStop(0, CORES.fundo);
    gradienteF.addColorStop(1, CORES.fundoClaro);
    ctx.fillStyle = gradienteF;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Desenhar fundo da paisagem (para dar profundidade)
    ctx.fillStyle = CORES.fundoClaro;
    ctx.fillRect(0, 0, canvas.width, canvas.height * 0.4);
    
    // Pescoço
    ctx.fillStyle = CORES.pele;
    ctx.fillRect(280, 320, 40, 80);
    
    // Sombra no pescoço
    ctx.fillStyle = CORES.sombra;
    ctx.fillRect(280, 320, 15, 80);
    
    // Cabeça (rosto)
    desenharCirculo(300, 240, 80, CORES.pele);
    
    // Sombras faciais para dar volume
    ctx.fillStyle = CORES.peleEscura;
    ctx.beginPath();
    ctx.arc(300, 240, 80, 0, Math.PI * 2);
    ctx.fill();
    
    // Aplicar iluminação no rosto
    const gradienteRosto = ctx.createRadialGradient(280, 200, 20, 300, 240, 90);
    gradienteRosto.addColorStop(0, CORES.peleClara);
    gradienteRosto.addColorStop(1, CORES.pele);
    ctx.fillStyle = gradienteRosto;
    ctx.beginPath();
    ctx.arc(300, 240, 80, 0, Math.PI * 2);
    ctx.fill();
    
    // Cabelo (parte superior)
    ctx.fillStyle = CORES.cabelo;
    ctx.beginPath();
    ctx.arc(300, 180, 80, Math.PI, 0, false);
    ctx.fill();
    
    // Detalhes do cabelo
    ctx.strokeStyle = CORES.cabeloClaro;
    ctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
        const angulo = (Math.PI / 8) * i;
        ctx.beginPath();
        ctx.arc(300, 180, 70, angulo, angulo + 0.3);
        ctx.stroke();
    }
    
    // Orelhas
    ctx.fillStyle = CORES.peleClara;
    // Orelha esquerda
    ctx.beginPath();
    ctx.arc(220, 240, 20, 0, Math.PI * 2);
    ctx.fill();
    
    // Orelha direita
    ctx.beginPath();
    ctx.arc(380, 240, 20, 0, Math.PI * 2);
    ctx.fill();
    
    // Olhos (com movimento interativo)
    desenharOlho(270, 220, 15, 8);  // Olho esquerdo
    desenharOlho(330, 220, 15, 8);  // Olho direito
    
    // Sobrancelhas
    ctx.strokeStyle = CORES.cabelo;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    
    // Sobrancelha esquerda
    ctx.beginPath();
    ctx.moveTo(255, 200);
    ctx.quadraticCurveTo(265, 190, 285, 195);
    ctx.stroke();
    
    // Sobrancelha direita
    ctx.beginPath();
    ctx.moveTo(315, 195);
    ctx.quadraticCurveTo(335, 190, 345, 200);
    ctx.stroke();
    
    // Nariz
    ctx.strokeStyle = CORES.peleEscura;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(300, 220);
    ctx.lineTo(300, 270);
    ctx.stroke();
    
    // Narinas
    desenharCirculo(295, 275, 3, CORES.peleEscura);
    desenharCirculo(305, 275, 3, CORES.peleEscura);
    
    // Boca (o famoso sorriso enigmático)
    ctx.strokeStyle = CORES.labios;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    
    // Lábio superior
    ctx.beginPath();
    ctx.moveTo(280, 300);
    ctx.quadraticCurveTo(300, 310, 320, 300);
    ctx.stroke();
    
    // Lábio inferior
    ctx.beginPath();
    ctx.moveTo(280, 300);
    ctx.quadraticCurveTo(300, 315, 320, 300);
    ctx.stroke();
    
    // Sombreado dos lábios
    ctx.fillStyle = CORES.labios;
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.ellipse(300, 307, 18, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1.0;
    
    // Roupas (vestido da Monalisa)
    ctx.fillStyle = CORES.roupa;
    ctx.beginPath();
    ctx.moveTo(220, 320);
    ctx.lineTo(380, 320);
    ctx.lineTo(390, 800);
    ctx.lineTo(210, 800);
    ctx.closePath();
    ctx.fill();
    
    // Detalhes da roupa
    ctx.fillStyle = CORES.roupaMarrom;
    ctx.beginPath();
    ctx.moveTo(240, 330);
    ctx.quadraticCurveTo(300, 340, 360, 330);
    ctx.lineTo(360, 350);
    ctx.quadraticCurveTo(300, 345, 240, 350);
    ctx.closePath();
    ctx.fill();
    
    // Dobras da roupa (para dar profundidade)
    ctx.strokeStyle = CORES.sombra;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(270, 330);
    ctx.lineTo(265, 600);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(330, 330);
    ctx.lineTo(335, 600);
    ctx.stroke();
    
    // Mãos (simplificadas)
    ctx.fillStyle = CORES.pele;
    // Mão esquerda
    ctx.beginPath();
    ctx.ellipse(240, 450, 20, 35, -0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Mão direita
    ctx.beginPath();
    ctx.ellipse(360, 450, 20, 35, 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Dedos
    ctx.fillStyle = CORES.peleClara;
    for (let i = 0; i < 5; i++) {
        desenharCirculo(230 + i * 4, 485, 3, CORES.pele);
        desenharCirculo(370 - i * 4, 485, 3, CORES.pele);
    }
}

// Função de animação
function animar() {
    desenharMonalisa();
    requestAnimationFrame(animar);
}

// Iniciar a animação
animar();

// Mensagem no console
console.log('🎨 Monalisa Interativa carregada!');
console.log('👀 Mova o cursor para ver os olhos acompanharem!');