<h1 align="center"></h1>
<h1 align="center">🎮 TETRIS 🎮</h1>

MiniGierka TETRIS wykonana w Fivem :D
TETRIS MiniGame made for Fivem :D

## <h1 align="center">📺 Przykłady:</h1> 
## <h1 align="center">📺 Example:</h1> 

![App Screenshot](https://cdn.discordapp.com/attachments/817356849187651624/1131254713006960760/image.png)

#### PRZYKŁADOWE VIDEO 
#### Example Video 
[![Watch the video](https://images.drivereasy.com/wp-content/uploads/2017/07/img_596dda8d77553.png)](https://www.youtube.com/watch?v=ip06DJZldYs)

##  <h1 align="center">⚠️ Co jest potrzebne? / co zostało użyte?</h1>
##  <h1 align="center">⚠️ Co jest potrzebne? / Requirements?</h1>

- qTarget (albo jakiś inny target)
- ESX.ShowNotification
- PolyZone
- Niezależny / Standalone

## <h1 align="center">🪛 Komendy / Command</h1>


## <h1 align="center">🪛 Komendy</h1>

Dostępne komendy:
Dostępne komendy / Avalible Commands:

```
    /tetrisGame
```

## <h1 align="center">❤️ Export też dostępny!</h1>
## <h1 align="center">❤️ Export też dostępny! / Export</h1>

Przykładowe użycie exporta
Przykładowe użycie exporta / Export Example

Tetris:
```
    tetris/client.lua: 
        exports('tetrisGame', tetrisGame)
```
Twój kod:
Twój kod / Your Code:
```
    Twój/client.lua:
        exports['lrk_tetris']:tetrisGame()
```


## <h1 align="center">🔧 Ustawienia</h1>
## <h1 align="center">🔧 Ustawienia / Settings</h1>

#### Score

@@ -54,15 +50,11 @@ poradnik:
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
