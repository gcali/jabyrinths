using System.Collections.Generic;
using Jabyrinth.Api.Constants;
using Jabyrinth.Api.Models;

namespace Jabyrinth.Api.ApiModels
{
    public class GameFullStateModel
    {
        public string ID { get; set; }
        public string CurrentPlayer { get; set; }
        public bool IsMoving { get; set; }
        public bool HasScrolled { get; set; }
        public List<Tile> Tiles { get; set; }
        public List<PlayerState> PlayerState { get; set; }

        public class Tile
        {
            public Coordinates Coordinates { get; set; }
            public List<Direction> Directions { get; set; }
        }
    }
    public class PlayerState
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public Coordinates Coordinates { get; set; }
    }

}