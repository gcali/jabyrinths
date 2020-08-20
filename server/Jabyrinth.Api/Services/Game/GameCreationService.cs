using System;
using System.Collections.Generic;
using System.Linq;
using Jabyrinth.Api.ApiModels;
using Jabyrinth.Api.Constants;

namespace Jabyrinth.Api.Services.Game
{
    public class GameCreationService
    {

        private static readonly object _lock = new object();
        private readonly IDictionary<string, GameFullStateModel> _gameStates = new Dictionary<string, GameFullStateModel>();
        private readonly static Random _random = new Random();
        public GameFullStateModel CreateGame(CreateGameModel gameParameters)
        {
            if (gameParameters.PlayerNames == null || gameParameters.PlayerNames.Count < 1 || gameParameters.PlayerNames.Count > 4) 
            {
                throw new ArgumentOutOfRangeException("Wrong number of players");
            }
            var id = Guid.NewGuid().ToString();

            var possiblePlayers = new [] { ("red", 0, 0), ("green", 0, 10), ("blue", 10, 0), ("yellow", 10, 10) };

            lock (_lock)
            {
                var players = gameParameters.PlayerNames.Zip(possiblePlayers.OrderBy(e => _random.NextDouble())).Select((e) => {
                    return new PlayerState {
                        Coordinates = new Models.Coordinates {
                            Row = e.Second.Item2,
                            Column = e.Second.Item3
                        },
                        Name = e.First,
                        Type = e.Second.Item1
                    };
                }).OrderBy(e => _random.NextDouble()).ToList();
                return new GameFullStateModel
                {
                    CurrentPlayer = players.First().Type,
                    HasScrolled = false,
                    PlayerState = players,
                    ID = id,
                    IsMoving = false,
                    Tiles = Enumerable.Range(0, 10)
                        .SelectMany(row => Enumerable.Range(0, 10)
                            .Select(column => new GameFullStateModel.Tile
                            {
                                Directions = GenerateDirections(),
                                Coordinates = new Models.Coordinates { Row = row, Column = column }
                            })
                        ).ToList()
                };
            }
        }

        private static List<Direction> GenerateDirections()
        {
            lock (_lock)
            {
                return new List<Direction> {
                    Direction.Down,
                    Direction.Left,
                    Direction.Right,
                    Direction.Up
                }.Where(e => _random.NextDouble() < 0.5).ToList();
            }
        }
    }
}