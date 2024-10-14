## Fluxo para obtenção dos ranks de cada jogador:

getPlayerPuuid (Pega o puuid do jogador através de GameName#TagLine)
↓
getPlayerSummonerId (Pega o summonerId do jogador através do puuid)
↓
getPlayerLeague (Pega os dados de ligas, ranked, do jogador através do summonerId)