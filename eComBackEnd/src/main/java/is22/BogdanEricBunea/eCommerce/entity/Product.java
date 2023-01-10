package is22.BogdanEricBunea.eCommerce.entity;

import javax.persistence.*;
import java.util.Arrays;

@Entity
@Table(name = "PRODUCTS")
public class Product {
    @Id
    private int id;
    private String name;
    private String desc;
    private float price;
    private boolean available;
    private byte[] image;
    private float rating;

    public Product(int id, String name, String desc, float price, boolean available, byte[] image, float rating) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.available = available;
        this.image = image;
        this.rating = rating;
    }

    public Product(String name, String desc, float price, boolean available, byte[] image, float rating) {
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.available = available;
        this.image = image;
        this.rating = rating;
    }

    public Product() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public boolean getAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public boolean isAvailable() {
        return available;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", desc='" + desc + '\'' +
                ", price=" + price +
                ", available=" + available +
                ", image=" + Arrays.toString(image) +
                ", rating=" + rating +
                '}';
    }
}
