package nu.te4.arena_shooter.entities.effects;

import nu.te4.arena_shooter.entities.player.Player;
import nu.te4.arena_shooter.interfaces.Effect;

public class HealUp implements Effect{

    @Override
    public void effect(Player player) {
        player.setHp(player.getHp()+1);
    }
    
}
