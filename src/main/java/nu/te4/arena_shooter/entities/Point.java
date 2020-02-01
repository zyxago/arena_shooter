package nu.te4.arena_shooter.entities;

import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author erikh
 */
public class Point {
    private int x;
    private int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public JsonObject toJson(){
        JsonObjectBuilder point = Json.createObjectBuilder();
        return point.add("x", getX())
                .add("y", getY())
                .build();
    }

}
