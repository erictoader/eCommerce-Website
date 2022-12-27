package is22.BogdanEricBunea.eCommerce.response.product;

import is22.BogdanEricBunea.eCommerce.entity.Product;
import is22.BogdanEricBunea.eCommerce.response.BaseResponse;

public class ProductAddResponse extends BaseResponse {
    private Product product;

    public ProductAddResponse(Integer code, String message, Product product) {
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
        int NAME_EMPTY = 201;
        int PRICE_ZERO = 202;
    }

    public interface Messages {
        String SUCCESS = "Product added successfully";
        String NAME_EMPTY = "Product name cannot be empty";
        String PRICE_ZERO = "Product price cannot be 0";
    }
}
