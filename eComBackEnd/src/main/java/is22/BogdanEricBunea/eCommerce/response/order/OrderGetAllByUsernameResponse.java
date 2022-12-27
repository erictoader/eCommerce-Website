package is22.BogdanEricBunea.eCommerce.response.order;

import is22.BogdanEricBunea.eCommerce.model.OrderComplex;
import is22.BogdanEricBunea.eCommerce.response.BaseResponse;

import java.util.List;

public class OrderGetAllByUsernameResponse extends BaseResponse {
    private List<OrderComplex> orders;

    public OrderGetAllByUsernameResponse(Integer code, String message, List<OrderComplex> orders) {
        super(code, message);
        this.orders = orders;
    }

    public List<OrderComplex> getOrders() {
        return orders;
    }

    public void setOrders(List<OrderComplex> orders) {
        this.orders = orders;
    }

    public interface Codes {
        int SUCCESS = 200;
        int ENCOUNTERED_ERROR = 201;
    }

    public interface Messages {
        String SUCCESS = "Request successful";
        String ENCOUNTERED_ERROR = "Encountered some error while fetching orders. " +
                "Result is usable but back-end data integrity may be in question.";
    }
}