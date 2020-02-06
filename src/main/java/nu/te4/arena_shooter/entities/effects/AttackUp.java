package nu.te4.arena_shooter.entities.effects;

import nu.te4.arena_shooter.entities.player.Player;
import nu.te4.arena_shooter.interfaces.Effect;

public class AttackUp implements Effect {

    @Override
    public void effect(Player player) {
        player.setDmg(player.getDmg()+1);
    }
    
}
