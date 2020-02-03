package nu.te4.arena_shooter.entities.player;

public class PlayerFactory {
    /**
     * Creates a standard player object with hp & maxHp set to 3
     * @param playerNr Sessions playerNr
     * @param color Color of player
     * @return Returns a player object
     */
    public Player getStandardPlayer(int playerNr, PlayerColor color){
        return new PlayerBuilder().Color(color)
                .Hp(3)
                .MaxHp(3)
                .PlayerNr(playerNr).build();
    }
}
