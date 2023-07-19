

<h1 align="center">🎮 TETRIS 🎮</h1>

MiniGierka TETRIS wykonana w Fivem :D

## 📺 Przykłady:

![App Screenshot](https://cdn.discordapp.com/attachments/817356849187651624/1131254713006960760/image.png)

#### PRZYKŁADOWE VIDEO 
[![Watch the video](https://images.drivereasy.com/wp-content/uploads/2017/07/img_596dda8d77553.png)](https://www.youtube.com/watch?v=ip06DJZldYs)

## ⚠️ Co jest potrzebne? / co zostało użyte?

- qTarget (albo jakiś inny target)
- ESX.ShowNotification
- PolyZone



## 🪛 Komendy 

Dostępne komendy:

```
    /tetrisGame
```

## ❤️ Export też dostępny! 

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


## 🔧 Ustawienia

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

Można też ustawić co potrzeba do wykonania minigierki czy coś, ale to już baw się sam :D 


## ⁉️ PYTANIA I PROBLEMY? 

#### napisz do mnie na dc:

lucekrk

## 🐿 Autorzy


- [lucekrk](https://github.com/lucekrk)
- [rosettacode.org](https://rosettacode.org)

## 🌞 Główny kod JS tetrisa:
- [rosettacode.org](https://rosettacode.org/wiki/Tetris/JavaScript)

## 🛎 License 

[MIT](https://choosealicense.com/licenses/mit/)
## .
<p align="center"> <img src="https://komarev.com/ghpvc/?username=lucekrk&label=Profile%20views&color=0e75b6&style=flat" alt="lucekrk" /> </p>
