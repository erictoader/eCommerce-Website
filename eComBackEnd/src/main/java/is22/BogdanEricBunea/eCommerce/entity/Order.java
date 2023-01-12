package is22.BogdanEricBunea.eCommerce.entity;

import org.springframework.data.annotation.ReadOnlyProperty;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "ORDERS")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name = "buyer_username")
    private String buyerUsername;
    @Column(name = "buyer_address")
    private String buyerAddress;
    @Column(name = "order_date", insertable = false, updatable = false)
    private Timestamp orderDate;
    @Column(name = "total")
    private float total;

    public Order(int id, String buyerUsername, String buyerAddress, float total) {
        this.id = id;
        this.buyerUsername = buyerUsername;
        this.buyerAddress = buyerAddress;
        this.total = total;
    }

    public Order(String buyerUsername, String buyerAddress, float total) {
        this.buyerUsername = buyerUsername;
        this.buyerAddress = buyerAddress;
        this.total = total;
    }

    public Order() {
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

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", buyerUsername='" + buyerUsername + '\'' +
                ", buyerAddress='" + buyerAddress + '\'' +
                ", total=" + total +
                '}';
    }
}

