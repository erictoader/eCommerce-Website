package is22.BogdanEricBunea.eCommerce.response.product;

import is22.BogdanEricBunea.eCommerce.entity.Product;
import is22.BogdanEricBunea.eCommerce.response.BaseResponse;

public class ProductUpdateResponse extends BaseResponse {
    private Product product;

    public ProductUpdateResponse(Integer code, String message, Product product) {
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
        int NAME_EMPTY = 202;
        int PRICE_ZERO = 203;
    }

    public interface Messages {
        String SUCCESS = "Product updated successfully";
        String NOT_FOUND = "No product with the provided ID was found";
        String NAME_EMPTY = "New product name cannot be empty";
        String PRICE_ZERO = "New product price cannot be 0";
    }
}
