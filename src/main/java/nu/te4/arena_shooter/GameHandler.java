package nu.te4.arena_shooter;

import nu.te4.arena_shooter.entities.*;
import nu.te4.arena_shooter.entities.player.Player;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GameHandler {
    private Game game;
    private Runnable update;

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
    public void playerMove(int playerNr, int dirX, int dirY) {
        for (Player player : getGame().getPlayers()) {
            if (player.getPlayerNr() == playerNr) {
                if (validateMove(player, dirX, dirY)) {
                    player.move(dirX, dirY);
                    checkPlayerBulletCollision();
                }
            }
        }
    }

    //TODO skicka bara en skott lista istället för hela gamet
    public void update(){
        LOGGER.info("Update was called!");
        for(Bullet bullet : getGame().getBullets()){
            if(validateMove(bullet, bullet.getDirX(), bullet.getDirY())){
                bullet.move();
                checkPlayerBulletCollision();
            } else {
                bullet.setDead(true);
            }
        }
        getGame().getBullets().removeIf(Bullet::isDead);
    }

    public void checkPlayerBulletCollision(){
        for(Player player : getGame().getPlayers()){
            for(Bullet bullet : getGame().getBullets()){
                if(player.getPoint().equals(bullet.getPoint())){
                    bullet.setDead(true);
                    player.setHp(player.getHp()-1);
                }
            }
        }
        getGame().getBullets().removeIf(Bullet::isDead);
    }

    /**
     *
     * @param playerNr
     * @param dirX
     * @param dirY
     */
    public void playerAttack(int playerNr, int dirX, int dirY) {
        for (Player player: getGame().getPlayers()){
            if(player.getPlayerNr() == playerNr){
                getGame().getBullets().add(new Bullet(player.getPoint(), player, player.getColor(), dirX, dirY));
            }
        }
    }

    /**
     *
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
}
