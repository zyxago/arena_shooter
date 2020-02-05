package nu.te4.arena_shooter;

import nu.te4.arena_shooter.entities.*;
import nu.te4.arena_shooter.entities.player.Player;
import nu.te4.arena_shooter.entities.tiles.Tile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.websocket.Session;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class GameHandler {
    private Game game;

    private static final Logger LOGGER = LoggerFactory.getLogger(GameHandler.class);

    public GameHandler(Game game) {
        this.game = game;
    }

    /**
     * "Game loop"
     * Executes every 100 milliseconds form a scheduler
     */
    public synchronized void update() {
        for (Tile tile : getGame().getSpawnTiles()) {
            boolean occupied = false;
            for (Item item : getGame().getItems()) {
                if (item.getPoint().equals(tile.getPoint()))
                    occupied = true;
            }
            if (tile.getSpawnable().isSpawnReady() && !occupied) {
                Entity spawn = tile.getSpawnable().spawn(tile.getPoint());
                if (spawn instanceof Item) {
                    getGame().getItems().add((Item) spawn);
                }
            }
        }

        for (Bullet bullet : getGame().getBullets()) {
            if (validateMove(bullet, bullet.getDirX(), bullet.getDirY())) {
                bullet.move();
            } else {
                bullet.setDead(true);
            }
        }

        checkPlayerBulletCollision();

        for (Player player : getGame().getPlayers()) {
            if (player.isDead()) {
                for (Session session : SessionHandler.SESSIONS) {
                    if (Integer.parseInt((String) session.getUserProperties().get("playerNr")) == player.getPlayerNr()) {
                        try {
                            session.getBasicRemote().sendText(JsonMessenger.getJsonMessenger().gameLost());
                        } catch (Exception e) {
                            System.out.println("Error in GameHandler.checkPlayerBulletCollision: " + e.getMessage());
                        }
                    }
                }
            }
        }

        getGame().getPlayers().removeIf(Player::isDead);
        getGame().getBullets().removeIf(Bullet::isDead);

        if (getGame().getPlayers().size() <= 1) {
            getGame().setWinner(getGame().getPlayers().get(0));
            getGame().setFinished(true);
        }
    }

    /**
     * Removes a player form game
     *
     * @param playerNr Players Number
     */
    public void removeDisconnectedPlayer(int playerNr) {
        getGame().getPlayers().removeIf((player) -> player.getPlayerNr() == playerNr);
    }

    private void checkPlayerBulletCollision() {
        for (Bullet bullet : getGame().getBullets()) {
            for (Player player : getGame().getPlayers()) {
                if (player.getPoint().equals(bullet.getPoint())&& !bullet.isDead()) {
                    bullet.setDead(true);
                    player.setHp(player.getHp() - bullet.getOwner().getDmg());
                }
            }
        }

        for (Player player : getGame().getPlayers()) {
            if (player.getHp() <= 0) {
                player.setDead(true);
            }
        }
    }


    /**
     * @param playerNr
     * @param dirX
     * @param dirY
     */
    public void playerAttack(int playerNr, int dirX, int dirY) {
        List<Point> invalidPoints = new ArrayList();
        for (Point point : getGame().getGrid().keySet()) {
            if (game.getGrid().get(point).isSolid()) {
                invalidPoints.add((point));
            }
        }
        for (Player player : getGame().getPlayers()) {
            if (player.getPlayerNr() == playerNr) {
                if (!invalidPoints.contains(player.getPoint())) {
                    getGame().getBullets().add(new Bullet(player.getPoint(), player, player.getColor(), dirX, dirY));
                }
            }
        }
    }

    /**
     * @param playerNr
     * @param dirX
     * @param dirY
     */
    public void playerMove(int playerNr, int dirX, int dirY) {
        for (Player player : getGame().getPlayers()) {
            if (player.getPlayerNr() == playerNr) {
                if (validateMove(player, dirX, dirY)) {
                    player.move(dirX, dirY);
                    //checkPlayerBulletCollision();
                    for (Item item : getGame().getItems()) {
                        if (player.getPoint().equals(item.getPoint())) {
                            item.getEffect().effect(player);
                            item.setDead(true);
                        }
                    }
                }
            }
        }
        getGame().getItems().removeIf(Item::isDead);
    }

    /**
     * @param obj
     * @param dirX
     * @param dirY
     * @param <T>
     * @return
     */
    public <T extends Entity> boolean validateMove(T obj, int dirX, int dirY) {
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

    public void randomizePlayerPos() {
        Random r = new Random();
        List<Point> points = new ArrayList();
        for (Point point : getGame().getGrid().keySet()) {
            if (!getGame().getGrid().get(point).isSolid()) {
                points.add(point);
            }
        }
        for (Player player : getGame().getPlayers()) {
            player.setPoint(points.get(r.nextInt(points.size())));
        }
    }
}
