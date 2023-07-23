local MinigameActive = false
local MinigameFinished = false
local Success = false
local SuccessTrigger = nil
local FailTrigger = nil

function tetrisGame(cb)
    if MinigameActive then return end

        SetNuiFocus(true, true)
        SendNUIMessage({type = 'otworz'})
        MinigameActive = true
        MinigameFinished = false

        while MinigameActive do
            Citizen.Wait(500)
        end

        if cb then
            cb(Success)
        end

        return Success
    end

exports('tetrisGame', tetrisGame)

RegisterCommand('tetrisGame', function()
    SetNuiFocus(true, true)
    SendNUIMessage({type = 'otworz'})
end)

RegisterNUICallback('udane', function(data, cb)
SetNuiFocus(false, false)
Success = true
MinigameFinished = false
MinigameActive = false
cb('ok')
end)

RegisterNUICallback('nieudane', function(data, cb)
SetNuiFocus(false, false)
MinigameActive = false
Success = false
cb('ok')
end)
