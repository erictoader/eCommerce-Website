package is22.BogdanEricBunea.eCommerce.request.product;

public class ProductUpdateRequest {
    private int id;
    private String name;
    private String desc;
    private float price;
    private boolean available;
    private byte[] image;

    public ProductUpdateRequest(int id, String name, String desc, float price, boolean available, byte[] image) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.available = available;
        this.image = image;
    }

    public ProductUpdateRequest() {
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

    public boolean isAvailable() {
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
}
