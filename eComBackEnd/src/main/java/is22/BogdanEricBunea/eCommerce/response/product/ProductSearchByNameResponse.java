package is22.BogdanEricBunea.eCommerce.response.product;

import is22.BogdanEricBunea.eCommerce.entity.Product;
import is22.BogdanEricBunea.eCommerce.response.BaseResponse;

import java.util.List;

public class ProductSearchByNameResponse extends BaseResponse {
    private List<Product> products;

    public ProductSearchByNameResponse(Integer code, String message, List<Product> products) {
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
    }

    public interface Messages {
        String SUCCESS = "Products fetched successfully";
    }
}
