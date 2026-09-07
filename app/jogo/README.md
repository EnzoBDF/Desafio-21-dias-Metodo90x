# Mondra — Vale das Folhas

Jogo original de exploração, coleção de criaturas e batalhas por turnos. A rota `/jogo` é independente das páginas existentes do Desafio 21 Dias.

- WASD, setas ou clique no mapa: caminhar. Botões de direção disponíveis em dispositivos de toque.
- E: conversar, descansar na casa de apoio ou desafiar o guardião.
- B: abrir a mochila.
- Reduza os PV antes de lançar cápsulas. Uma criatura que desmaiou não pode ser capturada.
- Cada um dos três gramados contém duas espécies. Reúna três espécies para desafiar o guardião; complete o diário com as seis.
- A casa recupera a equipe e repõe gratuitamente cápsulas e poções.
- O progresso é local ao navegador, salvo fora de batalhas. Recarregar durante uma batalha restaura o último estado de exploração. O menu Como jogar permite reiniciar, com confirmação.
- Animações respeitam a preferência por movimento reduzido. Áudio sintetizado com Web Audio, ativado voluntariamente no menu.

Execute `npm run dev` e abra `http://localhost:3000/jogo`. `npm run test:game` verifica a aventura completa, caminhos, captura, combate, derrota, recuperação e carregamento de saves inválidos. `npm run build` compila todo o projeto. `npm run build:game` cria uma exportação estática apenas do jogo em `.next/mondra-site/out`, preservando o site existente.

## Arte original

Os dois atlas foram criados com a ferramenta integrada `image_gen`, em PNG RGBA 1536×1024, e armazenados em `public/game/creatures.png` (3×2 células de 512×512) e `public/game/terrain.png` (4×2 células de 384×512). As animações usam o atlas de quatro direções do personagem e transformações de posição, brilho e opacidade nos sprites das criaturas. Os PNGs possuem transparência real. Não há dependência de URLs externas para arte ou áudio.

Prompt final de criaturas:

```text
Use case: stylized-concept
Asset type: transparent PNG sprite atlas for a browser monster-catching RPG.
Primary request: Produce a single 1536 by 1024 pixel PNG with a REAL transparent alpha background, exactly 3 columns by 2 rows of equal 512 by 512 cells. There are exactly six original cute monster sprites, one per cell, with no grid, no labels, no text.
Style: crisp detailed 16-bit pixel art, deliberately stepped pixel edges, dark outlines, rich but limited color palettes, consistent scale and pixel density across all six monsters. Full bodies, friendly expressive faces, front three-quarter view facing right. Each sprite must be centered inside its own exact cell with at least 18 percent empty transparent padding on every side, including tails, flames, wings, and ears.
Cell contents, read left to right:
Top left, centered at (256,256): Folhito, a green leaf fox with big leaf ears.
Top middle, centered at (768,256): Fagulha, an orange ember salamander with a flame tail.
Top right, centered at (1280,256): Marolim, a blue water axolotl.
Bottom left, centered at (256,768): Lumina, a purple moth.
Bottom middle, centered at (768,768): Cascalho, a tan rock armadillo.
Bottom right, centered at (1280,768): Voltico, a golden electric chick.
Constraints: exactly 3 columns by 2 rows, exact equal cell spacing; sprites isolated for CSS animation and background-position cropping; no sprite may touch another cell or be cropped. Entire empty background must be actual transparent alpha, never a painted checkerboard, white, black, gray, or colored background. No floor, scenery, ground patches, captions, names, watermark, borders, or grid lines. Names are guidance only and must not appear in the image.
```

Prompt final de cenário e personagem:

```text
Use case: stylized-concept
Asset type: transparent PNG environment and adventurer sprite atlas for a top-down browser monster-catching RPG.
Primary request: Produce a single 1536 by 1024 pixel PNG with REAL transparent alpha background, exactly 4 columns by 2 rows of equal 384 by 512 cells. Exactly eight separate sprites, one per cell, no grid, no text, no labels.
Style: crisp detailed 16-bit pixel art with dark outlines, deliberately stepped pixel edges, consistent pixel density, classic top-down three-quarter RPG view for terrain objects. Center each complete object or character inside its exact cell with at least 14 percent empty transparent padding on every side.
Top row left to right:
Cell centered at (192,256): one rounded lush green tree, full canopy and trunk.
Cell centered at (576,256): one small cozy cream cottage, terracotta roof and front door; the entire house must fit in its cell.
Cell centered at (960,256): one thick grassy green bush.
Cell centered at (1344,256): one gray boulder with moss.
Bottom row left to right, four views of the SAME identical young adult chibi adventurer, brown hair, teal jacket, orange backpack, dark trousers and boots, same outfit and body size in all four cells:
Cell centered at (192,768): FRONT facing.
Cell centered at (576,768): BACK facing, orange backpack visible.
Cell centered at (960,768): LEFT facing profile.
Cell centered at (1344,768): RIGHT facing profile.
Constraints: exact 4 by 2 equal-cell atlas, centered full bodies and full objects, no overlapping cells, no cropped roof/canopy/head/feet; all empty pixels must be actual alpha transparency, never a painted checkerboard or colored background. No floor tiles, scenery, platform, extraneous objects, shadows outside the sprite, captions, labels, names, watermark, borders, or grid lines.
```
