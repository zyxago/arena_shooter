package nu.te4.arena_shooter.entities;

import nu.te4.arena_shooter.entities.effects.AttackUp;
import nu.te4.arena_shooter.entities.effects.HealUp;
import nu.te4.arena_shooter.interfaces.Effect;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

public class Item extends Entity {

    private Effect effect;
    private boolean dead;

    public Item(Point point, Effect effect) {
        super(point);
        this.effect = effect;
    }

    public Effect getEffect() {
        return effect;
    }

    public void setEffect(Effect effect) {
        this.effect = effect;
    }

    public boolean isDead() {
        return dead;
    }

    public void setDead(boolean dead) {
        this.dead = dead;
    }

    /**
     *
     * @return Returns this object as JsonObject
     */
    public JsonObject toJson() {
        String itemType = "none";

        JsonObjectBuilder item = Json.createObjectBuilder();
        item.add("point", getPoint().toJson());
        if(effect instanceof HealUp){
            itemType = "heal";
        } else if(effect instanceof AttackUp){
            itemType = "attack";
        }
        item.add("item", itemType);
        return item.build();
    }
}
