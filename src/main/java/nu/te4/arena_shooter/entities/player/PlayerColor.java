package nu.te4.arena_shooter.entities.player;

public class PlayerColor {
    private int r;
    private int g;
    private int b;

    public PlayerColor(int r, int g, int b) {
        setR(r);
        setG(g);
        setB(b);
    }

    public PlayerColor() {
    }

    public int getR() {
        return r;
    }

    public void setR(int r) {
        if (r > 255) {
            r = 255;
        } else if (r < 0) {
            r = 0;
        }
        this.r = r;
    }

    public int getG() {
        return g;
    }

    public void setG(int g) {
        if (g > 255) {
            g = 255;
        } else if (g < 0) {
            g = 0;
        }
        this.g = g;
    }

    public int getB() {
        return b;
    }

    public void setB(int b) {
        if (b > 255) {
            b = 255;
        } else if (b < 0) {
            b = 0;
        }
        this.b = b;
    }

    @Override
    public String toString() {
        return "rgb(" + getR() + "," + getG() + "," + getB() + ")";
    }
}
