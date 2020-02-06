package nu.te4.arena_shooter.entities;

public abstract class Entity {
    Point point;

    public Entity(Point point) {
        this.point = point;
    }

    public Entity() {
    }

    public Point getPoint() {
        return point;
    }

    public void setPoint(Point point) {
        this.point = point;
    }
}
