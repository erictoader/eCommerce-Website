package IS22.BogdanEricBunea.eCommerce.model;

import javax.persistence.*;
import java.util.Arrays;

@Entity
@Table(name = "PRODUCT")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String name;
    private String desc;
    private float price;
    private int available;
    private byte[] image;
    private float rating;

    public Product(int id, String name, String desc, float price, int available, byte[] image, float rating) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.available = available;
        this.image = image;
        this.rating = rating;
    }

    public Product(String name, String desc, float price, int available, byte[] image, float rating) {
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

    public int getAvailable() {
        return available;
    }

    public void setAvailable(int available) {
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
