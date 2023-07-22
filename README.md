
<h1 align="center"></h1>
<h1 align="center">🎮 TETRIS 🎮</h1>

MiniGierka TETRIS wykonana w Fivem :D

## <h1 align="center">📺 Przykłady:</h1> 

![App Screenshot](https://cdn.discordapp.com/attachments/817356849187651624/1131254713006960760/image.png)

#### PRZYKŁADOWE VIDEO 
[![Watch the video](https://images.drivereasy.com/wp-content/uploads/2017/07/img_596dda8d77553.png)](https://www.youtube.com/watch?v=ip06DJZldYs)

##  <h1 align="center">⚠️ Co jest potrzebne? / co zostało użyte?</h1>

- qTarget (albo jakiś inny target)
- ESX.ShowNotification
- PolyZone



## <h1 align="center">🪛 Komendy</h1>

Dostępne komendy:

```
    /tetrisGame
```

## <h1 align="center">❤️ Export też dostępny!</h1>

Przykładowe użycie exporta

Tetris:
```
    tetris/client.lua: 
        exports('tetrisGame', tetrisGame)
```
Twój kod:
```
    Twój/client.lua:
        exports['lrk_tetris']:tetrisGame()
```


## <h1 align="center">🔧 Ustawienia</h1>

#### Score

Można ustawić `score` przez, który można wygrać minigierkę 

poradnik:
| Plik |  Co trzeba zrobić?    | Co wyszukać?               |
| :-------- | :------- | :------------------------- |
| `ui/script.js` | `wyszukać w pliku` | `winPoints` |

#### Czas

Można ustawić `czas` jaki jest dostępny podczas minigierki

poradnik:
| Plik |  Co trzeba zrobić?    | Co wyszukać?               |
| :-------- | :------- | :------------------------- |
| `ui/script.js` | `wyszukać w pliku` | `fullTime` |

#### Client.Lua

Wszystkie rzeczy typu co się stanie jak sie uda minigierkę też można ustawić w Cliencie poprzez event `udane()` (nie polecam bawić się w evencie 'nieudane()')

Można też ustawić co potrzeba do wykonania minigierki czy ustawić jakiś inny polyZone, ale to już baw się sam :D 


## <h1 align="center">⁉️ PYTANIA I PROBLEMY?</h1>

#### napisz do mnie na dc:

lucekrk

## <h1 align="center">🐿 Autorzy</h1>


- [lucekrk](https://github.com/lucekrk)
- [rosettacode.org](https://rosettacode.org)

## <h1 align="center">🌞 Główny kod JS tetrisa:</h1>
- [rosettacode.org](https://rosettacode.org/wiki/Tetris/JavaScript)

## <h1 align="center">🛎 License</h1>

[MIT](https://choosealicense.com/licenses/mit/)
