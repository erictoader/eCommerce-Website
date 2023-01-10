package is22.BogdanEricBunea.eCommerce.response.product;

import is22.BogdanEricBunea.eCommerce.response.BaseResponse;

public class ProductAddResponse extends BaseResponse {

    public ProductAddResponse(Integer code, String message) {
        super(code, message);
    }

    public interface Codes {
        int SUCCESS = 200;
        int NAME_EMPTY = 201;
        int PRICE_ZERO = 202;
    }

    public interface Messages {
        String SUCCESS = "Product added successfully";
        String NAME_EMPTY = "Product name cannot be empty";
        String PRICE_ZERO = "Product price cannot be 0";
    }
}
