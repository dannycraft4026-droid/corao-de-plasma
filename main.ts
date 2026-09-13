// ==========================================
// A JORNADA DE SPARK - 3 NÍVEIS DE DESAFIO
// ==========================================

namespace SpriteKind {
    export const Bateria = SpriteKind.create()
    export const Cristal = SpriteKind.create()
    export const Obstaculo = SpriteKind.create()
    export const Chao = SpriteKind.create()
}

// Configuração do Jogador (Spark)
let spark = sprites.create(img`
    . . . . . f f f f . . . . . 
    . . . f f 5 5 5 5 f f . . . 
    . . f 5 5 5 5 5 5 5 5 f . . 
    . f 5 5 f 1 f 5 1 f 5 5 f . 
    . f 5 5 f f f 5 f f 5 5 f . 
    . f 5 5 5 5 5 5 5 5 5 5 f . 
    . f d d d d d d d d d d f . 
    . f d f 1 d d d d 1 f d f . 
    . . f d d d d d d d d f . . 
    . . . f f f f f f f f . . . 
    . . . f 8 8 8 8 8 8 f . . . 
    . . f 8 8 8 8 8 8 8 8 f . . 
    . . f 8 f 8 8 8 8 f 8 f . . 
    . . . f . f f f f . f . . . 
    . . . . . f . . f . . . . . 
    . . . . . f . . f . . . . . 
`, SpriteKind.Player)

controller.moveSprite(spark, 100, 0)
spark.ay = 350
spark.setFlag(SpriteFlag.StayInScreen, false)
scene.cameraFollowSprite(spark)

// Impede queda infinita
game.onUpdate(function () {
    if (spark.y > 220) {
        info.changeLifeBy(-1)
        music.powerDown.play()
        carregarNivel(nivelAtual)
    }
})

info.setLife(3)
info.setScore(0)

let nivelAtual = 1
let pulosRestantes = 2

// Controle de Pulo Duplo
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (pulosRestantes > 0) {
        spark.vy = -150
        pulosRestantes -= 1
    }
})

// Imagens dos blocos
let imgChao = img`
    b b b b b b b b b b b b b b b b 
    b 1 1 1 1 1 1 b 1 1 1 1 1 1 1 b 
    b 1 1 1 1 1 1 b 1 1 1 1 1 1 1 b 
    b b b b b b b b b b b b b b b b 
    b 1 1 1 b 1 1 1 1 1 1 b 1 1 1 b 
    b 1 1 1 b 1 1 1 1 1 1 b 1 1 1 b 
    b b b b b b b b b b b b b b b b 
`

let imgEspinho = img`
    . . . . . . . . . . . . . . . . 
    . . 2 . . . . 2 . . . . 2 . . . 
    . 2 4 2 . . 2 4 2 . . 2 4 2 . . 
    . 2 4 2 . . 2 4 2 . . 2 4 2 . . 
    2 4 5 4 2 2 4 5 4 2 2 4 5 4 2 . 
    2 4 5 4 2 2 4 5 4 2 2 4 5 4 2 . 
    2 5 5 5 2 2 5 5 5 2 2 5 5 5 2 . 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
`

// Funções Auxiliares de Criação
function criarPlataforma(x: number, y: number) {
    let plat = sprites.create(imgChao, SpriteKind.Chao)
    plat.setPosition(x, y)
}

function criarInimigo(x: number, y: number, velocidade: number) {
    let enemy = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . f 2 2 2 2 2 2 f . . . . . 
        . . f 2 1 2 2 1 2 2 2 f . . . . 
        . . f 2 2 2 2 2 2 2 2 f . . . . 
        . . f f f f f f f f f f . . . . 
        . . . f 2 2 2 2 2 2 f . . . . . 
        . . . f f f f f f f f . . . . . 
        . . . . . f . . f . . . . . . . 
    `, SpriteKind.Enemy)
    enemy.setPosition(x, y)
    enemy.vx = velocidade
    enemy.setFlag(SpriteFlag.BounceOnWall, true)
}

function criarBateria(x: number, y: number) {
    let bateria = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f . . . . . . . . 
        . . . . . f 5 5 f . . . . . . . 
        . . . . f f 5 5 f f . . . . . . 
        . . . f 7 7 7 7 7 7 f . . . . . 
        . . . f 7 7 5 5 7 7 f . . . . . 
        . . . f 7 5 5 5 5 7 f . . . . . 
        . . . f 7 5 5 5 5 7 f . . . . . 
        . . . f 7 7 5 5 7 7 f . . . . . 
        . . . f 7 7 7 7 7 7 f . . . . . 
        . . . f f f f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
    `, SpriteKind.Bateria)
    bateria.setPosition(x, y)
}

function criarCristal(x: number, y: number) {
    let cristal = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . 8 8 . . . . . . . . 
        . . . . . 8 9 9 8 . . . . . . . 
        . . . . 8 9 9 9 9 8 . . . . . . 
        . . . 8 9 9 8 8 9 9 8 . . . . . 
        . . 8 9 9 8 8 8 8 9 9 8 . . . . 
        . . . 8 9 9 8 8 9 9 8 . . . . . 
        . . . . 8 9 9 9 9 8 . . . . . . 
        . . . . . 8 9 9 8 . . . . . . . 
        . . . . . . 8 8 . . . . . . . . 
    `, SpriteKind.Cristal)
    cristal.setPosition(x, y)
}

// Função para Limpar e Carregar Níveis
function carregarNivel(nivel: number) {
    for (let s of sprites.allOfKind(SpriteKind.Chao)) { s.destroy() }
    for (let s of sprites.allOfKind(SpriteKind.Enemy)) { s.destroy() }
    for (let s of sprites.allOfKind(SpriteKind.Bateria)) { s.destroy() }
    for (let s of sprites.allOfKind(SpriteKind.Cristal)) { s.destroy() }
    for (let s of sprites.allOfKind(SpriteKind.Obstaculo)) { s.destroy() }

    spark.setPosition(30, 80)
    spark.vy = 0

    if (nivel == 1) {
        scene.setBackgroundColor(15)
        effects.starField.startScreenEffect()

        for (let x = 0; x < 600; x += 16) {
            let blocoChao = sprites.create(imgChao, SpriteKind.Chao)
            blocoChao.setPosition(x + 8, 140)
        }

        criarPlataforma(120, 100)
        criarPlataforma(220, 80)
        criarPlataforma(340, 95)
        criarPlataforma(450, 75)

        criarInimigo(180, 125, 40)
        criarInimigo(380, 125, -40)

        criarBateria(120, 80)
        criarBateria(220, 60)
        criarBateria(450, 55)

        criarCristal(560, 120)

    } else if (nivel == 2) {
        scene.setBackgroundColor(11)
        effects.bubbles.startScreenEffect()

        for (let x = 0; x < 700; x += 16) {
            if (x < 150 || (x > 300 && x < 450) || x > 550) {
                let blocoChao = sprites.create(imgChao, SpriteKind.Chao)
                blocoChao.setPosition(x + 8, 140)
            } else {
                let espinho = sprites.create(imgEspinho, SpriteKind.Obstaculo)
                espinho.setPosition(x + 8, 144)
            }
        }

        criarPlataforma(180, 100)
        criarPlataforma(240, 75)
        criarPlataforma(480, 95)
        criarPlataforma(530, 70)

        criarInimigo(100, 125, 60)
        criarInimigo(400, 125, -60)
        criarInimigo(600, 125, 50)

        criarBateria(240, 55)
        criarBateria(530, 50)

        criarCristal(660, 120)

    } else if (nivel == 3) {
        scene.setBackgroundColor(2)
        effects.blizzard.startScreenEffect()

        for (let x = 0; x < 800; x += 16) {
            let blocoChao = sprites.create(imgChao, SpriteKind.Chao)
            blocoChao.setPosition(x + 8, 140)
        }

        criarPlataforma(100, 100)
        criarPlataforma(180, 70)
        criarPlataforma(260, 100)
        criarPlataforma(350, 65)
        criarPlataforma(440, 95)
        criarPlataforma(540, 70)
        criarPlataforma(640, 100)

        for (let x = 120; x < 700; x += 48) {
            let espinho = sprites.create(imgEspinho, SpriteKind.Obstaculo)
            espinho.setPosition(x, 128)
        }

        criarInimigo(150, 125, 70)
        criarInimigo(300, 125, -70)
        criarInimigo(480, 125, 80)
        criarInimigo(620, 125, -80)

        criarBateria(180, 50)
        criarBateria(350, 45)
        criarBateria(540, 50)

        criarCristal(760, 120)
    }
}

// Colisão com Chão / Plataformas
game.onUpdate(function () {
    let pisando = false
    for (let elementoChao of sprites.allOfKind(SpriteKind.Chao)) {
        if (spark.overlapsWith(elementoChao)) {
            if (spark.vy >= 0 && spark.y <= elementoChao.y - 4) {
                spark.y = elementoChao.y - 12
                spark.vy = 0
                pisando = true
            }
        }
    }
    if (pisando) {
        pulosRestantes = 2
    }
})

// Interações
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bateria, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(100)
    music.baDing.play()
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    music.powerDown.play()
    carregarNivel(nivelAtual)
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Obstaculo, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    music.smallCrash.play()
    carregarNivel(nivelAtual)
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Cristal, function (sprite, otherSprite) {
    music.powerUp.play()
    if (nivelAtual < 3) {
        nivelAtual += 1
        game.showLongText("Fase Concluída! Preparar para Nível " + nivelAtual, DialogLayout.Bottom)
        carregarNivel(nivelAtual)
    } else {
        game.over(true, effects.confetti)
    }
})

// Iniciar Nível 1
carregarNivel(1)