package nu.te4.arena_shooter.entities.effects;

import nu.te4.arena_shooter.entities.player.Player;
import nu.te4.arena_shooter.interfaces.Effect;

public class MaxHpUP implements Effect {

    @Override
    public void effect(Player player) {
        player.setMaxHp(player.getMaxHp() + 1);
        player.setHp(player.getHp() + 1);
    }
}
