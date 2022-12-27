package is22.BogdanEricBunea.eCommerce.response.product;

import is22.BogdanEricBunea.eCommerce.entity.Product;
import is22.BogdanEricBunea.eCommerce.response.BaseResponse;

import java.util.List;

public class ProductGetAllResponse extends BaseResponse {
    private List<Product> products;

    public ProductGetAllResponse(Integer code, String message, List<Product> users) {
        super(code, message);
        this.products = users;
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
        String SUCCESS = "Request successful";
    }
}
