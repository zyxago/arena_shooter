package nu.te4.arena_shooter;

import nu.te4.arena_shooter.entities.Game;
import nu.te4.arena_shooter.entities.Player;
import nu.te4.arena_shooter.entities.Point;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class GameHandler {
    private Game game;

    private static final Logger LOGGER = LoggerFactory.getLogger(GameHandler.class);

    public GameHandler(Game game) {
        this.game = game;
    }

    /**
     *
     * @param playerNr
     * @param dirX
     * @param dirY
     */
    public void move(int playerNr, int dirX, int dirY) {
        for (Player player : getGame().getPlayers()) {
            if (player.getPlayerNr() == playerNr) {
                if (validateMove(player, dirX, dirY)) {
                    player.move(dirX, dirY);
                }
            }
        }
    }

    /**
     *
     * @param obj
     * @param dirX
     * @param dirY
     * @param <T>
     * @param <Bullet>
     * @return
     */
    public <T extends Player, Bullet> boolean validateMove(T obj, int dirX, int dirY) {
        Point movePoint = new Point(obj.getPoint().getX() + dirX, obj.getPoint().getY() + dirY);
        if (getGame().getGrid().containsKey(movePoint)) {
            return !getGame().getGrid().get(movePoint).isSolid();
        }
        return false;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }
}
