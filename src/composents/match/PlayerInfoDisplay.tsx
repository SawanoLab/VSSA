import { PlayerInfo } from "../../interface/player";


interface PlayerInfoDisplayProps {
  selectedPlayer: string;
  players: PlayerInfo[];
}

const PlayerInfoDisplay: React.FC<PlayerInfoDisplayProps> = ({ selectedPlayer, players }) => {
  const selectedPlayerInfo = players.find((player) => player.uuid === selectedPlayer);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-2xl text-white">
      {selectedPlayer !== "" && selectedPlayerInfo?.player_number}
    </div>
  );
};

export default PlayerInfoDisplay;
