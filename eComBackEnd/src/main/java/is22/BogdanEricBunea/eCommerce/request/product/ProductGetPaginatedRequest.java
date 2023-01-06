package is22.BogdanEricBunea.eCommerce.request.product;

public class ProductGetPaginatedRequest {
    private int page;
    private int quantity;

    public ProductGetPaginatedRequest(int page, int quantity) {
        this.page = page;
        this.quantity = quantity;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
