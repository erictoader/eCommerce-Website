package is22.BogdanEricBunea.eCommerce.request.order;

import is22.BogdanEricBunea.eCommerce.model.OrderItem;

import java.util.List;

public class OrderAddRequest {
    private String username;
    private String address;
    private float total;
    private List<OrderItem> items;

    public OrderAddRequest(String username, String address, float total, List<OrderItem> items) {
        this.username = username;
        this.address = address;
        this.total = total;
        this.items = items;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public float getTotal() {
        return total;
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
