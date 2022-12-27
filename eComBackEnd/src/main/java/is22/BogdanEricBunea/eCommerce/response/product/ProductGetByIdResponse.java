package is22.BogdanEricBunea.eCommerce.response.product;

import is22.BogdanEricBunea.eCommerce.entity.Product;
import is22.BogdanEricBunea.eCommerce.response.BaseResponse;

public class ProductGetByIdResponse extends BaseResponse {
    private Product product;

    public ProductGetByIdResponse(Integer code, String message, Product product) {
        super(code, message);
        this.product = product;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public interface Codes {
        int SUCCESS = 200;
        int NOT_FOUND = 201;
    }

    public interface Messages {
        String SUCCESS = "Request successful";
        String NOT_FOUND = "No product with given ID was found";
    }
}
