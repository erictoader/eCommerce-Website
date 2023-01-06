package is22.BogdanEricBunea.eCommerce.model;

import java.sql.Timestamp;
import java.util.List;

public class OrderComplex {
    private int id;
    private String buyerUsername;
    private String buyerAddress;
    private Timestamp orderDate;
    private float total;
    private List<OrderItem> items;

    public OrderComplex(int id, String buyerUsername, String buyerAddress, Timestamp orderDate, float total, List<OrderItem> items) {
        this.id = id;
        this.buyerUsername = buyerUsername;
        this.buyerAddress = buyerAddress;
        this.orderDate = orderDate;
        this.total = total;
        this.items = items;
    }

    public OrderComplex(String buyerUsername, String buyerAddress, Timestamp orderDate, float total, List<OrderItem> items) {
        this.buyerUsername = buyerUsername;
        this.buyerAddress = buyerAddress;
        this.orderDate = orderDate;
        this.total = total;
        this.items = items;
    }

    public OrderComplex() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBuyerUsername() {
        return buyerUsername;
    }

    public void setBuyerUsername(String buyerUsername) {
        this.buyerUsername = buyerUsername;
    }

    public String getBuyerAddress() {
        return buyerAddress;
    }

    public void setBuyerAddress(String buyerAddress) {
        this.buyerAddress = buyerAddress;
    }

    public float getTotal() {
        return total;
    }

    public Timestamp getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Timestamp orderDate) {
        this.orderDate = orderDate;
    }

    public void setTotal(float total) {
        this.total = total;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }
}
