import React from "react";

interface PlayerInfoProps {
  get_player_team: (player_id: string) => string;
  get_player_name: (player_id: string) => string;
  playerId: string;
}
export const PlayerInfo: React.FC<PlayerInfoProps> = ({
  get_player_team,
  get_player_name,
  playerId,
}) => (
  <p>
    {get_player_team(playerId)}
    <br />
    {get_player_name(playerId)}
  </p>
);
