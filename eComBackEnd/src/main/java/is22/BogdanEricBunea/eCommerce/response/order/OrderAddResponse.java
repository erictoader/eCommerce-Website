package is22.BogdanEricBunea.eCommerce.response.order;

import is22.BogdanEricBunea.eCommerce.response.BaseResponse;

public class OrderAddResponse extends BaseResponse {

    public OrderAddResponse(Integer code, String message) {
        super(code, message);
    }

    public interface Codes {
        int SUCCESS = 200;
    }

    public interface Messages {
        String SUCCESS = "Add request successful";
    }
}
