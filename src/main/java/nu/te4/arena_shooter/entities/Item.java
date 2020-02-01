package nu.te4.arena_shooter.entities;

import nu.te4.arena_shooter.entities.effects.Effect;

/**
 *
 * @author erikh
 */
public class Item extends Entity{

    Effect effect;

    public Item(Point point, Effect effect) {
        super(point);
        this.effect = effect;
    }

}
