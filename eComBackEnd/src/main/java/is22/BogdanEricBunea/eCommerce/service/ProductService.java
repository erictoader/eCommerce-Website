package is22.BogdanEricBunea.eCommerce.service;

import is22.BogdanEricBunea.eCommerce.entity.Product;
import is22.BogdanEricBunea.eCommerce.repo.ProductRepo;
import is22.BogdanEricBunea.eCommerce.request.product.ProductAddRequest;
import is22.BogdanEricBunea.eCommerce.request.product.ProductGetPaginatedRequest;
import is22.BogdanEricBunea.eCommerce.request.product.ProductUpdateRequest;
import is22.BogdanEricBunea.eCommerce.response.product.*;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepo repo;

    // GET
    public ProductGetAllResponse getProducts() {
        Iterable<Product> products = repo.findAll();
        List<Product> productList = new ArrayList<>();
        products.forEach(productList::add);
        return new ProductGetAllResponse(
                ProductGetAllResponse.Codes.SUCCESS,
                ProductGetAllResponse.Messages.SUCCESS,
                productList
        );
    }

    private int getAllProductsLength() {
        Iterable<Product> products = repo.findAll();
        List<Product> productList = new ArrayList<>();
        products.forEach(productList::add);
        return productList.size();
    }

    public ProductGetPaginatedResponse getProductsPaginated(ProductGetPaginatedRequest request) {
        if (getAllProductsLength() <= request.getPage()) return new ProductGetPaginatedResponse(
                ProductGetPaginatedResponse.Codes.HARD_OVERFLOW,
                ProductGetPaginatedResponse.Messages.HARD_OVERFLOW,
                List.of()
        );

        Pageable paging = PageRequest.of(request.getPage(), request.getQuantity());
        Iterable<Product> products = repo.findAll(paging);
        List<Product> productList = new ArrayList<>();
        products.forEach(productList::add);

        if (productList.size() <= request.getPage() + request.getQuantity()) return new ProductGetPaginatedResponse(
                ProductGetPaginatedResponse.Codes.SOFT_OVERFLOW,
                ProductGetPaginatedResponse.Messages.SOFT_OVERFLOW,
                productList
        );
        else return new ProductGetPaginatedResponse(
                ProductGetPaginatedResponse.Codes.SUCCESS,
                ProductGetPaginatedResponse.Messages.SUCCESS,
                productList
        );
    }

    public ProductGetByIdResponse getProductById(int id) {
        Product product = repo.findById(id).orElse(null);
        if (product == null) return new ProductGetByIdResponse(
                ProductGetByIdResponse.Codes.NOT_FOUND,
                ProductGetByIdResponse.Messages.NOT_FOUND,
                null
        );
        else return new ProductGetByIdResponse(
                ProductGetByIdResponse.Codes.SUCCESS,
                ProductGetByIdResponse.Messages.SUCCESS,
                product
        );
    }

    public ProductSearchByNameResponse searchProductsByName(String name) {
        List<Product> products = repo.findByNameContainingIgnoreCase(name);
        return new ProductSearchByNameResponse(
                ProductSearchByNameResponse.Codes.SUCCESS,
                ProductSearchByNameResponse.Messages.SUCCESS,
                products
        );
    }

    // POST
    public ProductAddResponse saveProduct(ProductAddRequest request) {
        if (request.getName().isBlank() || request.getName().isEmpty()) return new ProductAddResponse(
                ProductAddResponse.Codes.NAME_EMPTY,
                ProductAddResponse.Messages.NAME_EMPTY,
                null
        );
        if (request.getPrice() == 0f) return new ProductAddResponse(
                ProductAddResponse.Codes.PRICE_ZERO,
                ProductAddResponse.Messages.PRICE_ZERO,
                null
        );
        Product product = repo.save(new Product(
                request.getName(),
                request.getDesc(),
                request.getPrice(),
                request.isAvailable(),
                request.getImage(),
                0f)
        );
        return new ProductAddResponse(
                ProductAddResponse.Codes.SUCCESS,
                ProductAddResponse.Messages.SUCCESS,
                product
        );
    }

    // DELETE
    public ProductDeleteResponse deleteProductById(int id) {
        Product product = repo.findById(id).orElse(null);
        if (product == null) return new ProductDeleteResponse(
                ProductDeleteResponse.Codes.NO_EFFECT,
                ProductDeleteResponse.Messages.NO_EFFECT
        );
        repo.deleteById(id);
        return new ProductDeleteResponse(
                ProductDeleteResponse.Codes.SUCCESS,
                ProductDeleteResponse.Messages.SUCCESS
        );
    }

    // UPDATE
    public ProductUpdateResponse updateProduct(@NotNull ProductUpdateRequest request) {
        Product existing = repo.findById(request.getId()).orElse(null);
        if (existing == null) return new ProductUpdateResponse(
                ProductUpdateResponse.Codes.NOT_FOUND,
                ProductUpdateResponse.Messages.NOT_FOUND,
                null
        );
        if (request.getName().isBlank() || request.getName().isEmpty()) return new ProductUpdateResponse(
                ProductUpdateResponse.Codes.NAME_EMPTY,
                ProductUpdateResponse.Messages.NAME_EMPTY,
                null
        );
        if (request.getPrice() == 0f) return new ProductUpdateResponse(
                ProductUpdateResponse.Codes.PRICE_ZERO,
                ProductUpdateResponse.Messages.PRICE_ZERO,
                null
        );
        existing.setAvailable(request.isAvailable());
        existing.setDesc(request.getDesc());
        existing.setName(request.getName());
        existing.setImage(request.getImage());
        existing.setPrice(request.getPrice());

        Product updated = repo.save(existing);
        return new ProductUpdateResponse(
                ProductUpdateResponse.Codes.SUCCESS,
                ProductUpdateResponse.Messages.SUCCESS,
                updated
        );
    }
}
