package is22.BogdanEricBunea.eCommerce.entity;

import javax.persistence.*;

@Entity
@Table(name = "ORDERCONTENTS")
public class OrderContent {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name = "order_id")
    private int orderId;
    @Column(name = "items_id")
    private String itemsId;
    @Column(name = "items_quantity")
    private String itemsQuantity;

    public OrderContent(int id, int orderId, String itemsId, String itemsQuantity) {
        this.id = id;
        this.orderId = orderId;
        this.itemsId = itemsId;
        this.itemsQuantity = itemsQuantity;
    }

    public OrderContent(int orderId, String itemsId, String itemsQuantity) {
        this.orderId = orderId;
        this.itemsId = itemsId;
        this.itemsQuantity = itemsQuantity;
    }

    public OrderContent() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public String getItemsId() {
        return itemsId;
    }

    public void setItemsId(String itemsId) {
        this.itemsId = itemsId;
    }

    public String getItemsQuantity() {
        return itemsQuantity;
    }

    public void setItemsQuantity(String itemsQuantity) {
        this.itemsQuantity = itemsQuantity;
    }

    @Override
    public String toString() {
        return "OrderContent{" +
                "id=" + id +
                ", orderId=" + orderId +
                ", itemsId='" + itemsId + '\'' +
                ", itemsQuantity='" + itemsQuantity + '\'' +
                '}';
    }
}