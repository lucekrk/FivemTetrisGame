ESX = nil

Citizen.CreateThread(function()
    while ESX == nil do
        TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
        Citizen.Wait(1000)
    end
end)

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
ESX.ShowNotification("udaj sie tam i tu")
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

RegisterNetEvent('startOko', function()
    SetNuiFocus(true, true)
    SendNUIMessage({type = 'otworz'})
end)
---
exports.qtarget:AddBoxZone("startTetrisZone", vector3(-292.15, -957.85, 31.21), 2, 1, {
	name="startTetrisZone",
	heading=11.0,
	debugPoly=false,
	minZ=28.77834,
	maxZ=32.87834,
	}, {
		options = {
			{
				event = "startOko",
				icon = "fa-solid fa-virus",
				label = "hackuj",
			},
		},
		distance = 3.5
})


---vector3(-292.15, -957.85, 31.21), 2, 1, 
