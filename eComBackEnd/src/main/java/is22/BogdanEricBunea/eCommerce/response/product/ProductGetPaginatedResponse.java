package is22.BogdanEricBunea.eCommerce.response.product;

import is22.BogdanEricBunea.eCommerce.entity.Product;
import is22.BogdanEricBunea.eCommerce.response.BaseResponse;

import java.util.List;

public class ProductGetPaginatedResponse extends BaseResponse {
    private List<Product> products;

    public ProductGetPaginatedResponse(Integer code, String message, List<Product> products) {
        super(code, message);
        this.products = products;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public interface Codes {
        int SUCCESS = 200;
        int HARD_OVERFLOW = 201;
        int SOFT_OVERFLOW = 202;
    }

    public interface Messages {
        String SUCCESS = "Products fetched successfully";
        String HARD_OVERFLOW = "Starting offset surpasses total size. No items fetched";
        String SOFT_OVERFLOW = "Interval surpasses total size. Fetched until reached end";
    }
}
