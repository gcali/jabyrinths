using System;
using System.Collections.Generic;
using System.Linq;
using Jabyrinth.Api.ApiModels;
using Jabyrinth.Api.Constants;
using Jabyrinth.Api.Services.Game;
using Microsoft.AspNetCore.Mvc;

namespace Jabyrinth.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameController
    {

        private static readonly object _lock = new object();
        private static readonly Random _random = new Random();
        private readonly GameCreationService _gameCreationService;

        public GameController(GameCreationService gameCreationService)
        {
            _gameCreationService = gameCreationService;
        }
        [HttpPost]
        public ActionResult<GameFullStateModel> CreateGame([FromBody] CreateGameModel createParameters)
        {
            return _gameCreationService.CreateGame(createParameters);
            // return new GameFullStateModel
            // {
            //     CurrentPlayer = "red",
            //     HasScrolled = false,
            //     PlayerState = new List<PlayerState>
            //     {
            //         new PlayerState {
            //             Coordinates = new Models.Coordinates {
            //                 Row = 0,
            //                 Column = 0
            //             },
            //             Name = "red",
            //             Type = "red"
            //         }
            //     },
            //     ID = Guid.NewGuid().ToString(),
            //     IsMoving = false,
            //     Tiles = Enumerable.Range(0, 10)
            //         .SelectMany(row => Enumerable.Range(0, 10)
            //             .Select(column => new GameFullStateModel.Tile
            //             {
            //                 Directions = GenerateDirections(),
            //                 Coordinates = new Models.Coordinates { Row = row, Column = column }
            //             })
            //         ).ToList()
            // };
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