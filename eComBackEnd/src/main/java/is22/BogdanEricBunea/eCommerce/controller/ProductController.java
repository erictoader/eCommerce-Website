package is22.BogdanEricBunea.eCommerce.controller;

import is22.BogdanEricBunea.eCommerce.request.product.ProductAddRequest;
import is22.BogdanEricBunea.eCommerce.request.product.ProductGetPaginatedRequest;
import is22.BogdanEricBunea.eCommerce.request.product.ProductUpdateRequest;
import is22.BogdanEricBunea.eCommerce.response.product.*;
import is22.BogdanEricBunea.eCommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RequestMapping("product")
@RestController
public class ProductController {

    @Autowired
    private ProductService service;

    // GET
    @GetMapping("/getAll")
    public ProductGetAllResponse getProducts() {
        return service.getProducts();
    }

    @GetMapping("/getPaginated")
    public ProductGetPaginatedResponse getProductsPaginated(@RequestBody ProductGetPaginatedRequest request) {
        return service.getProductsPaginated(request);
    }

    @GetMapping("/getById/{id}")
    public ProductGetByIdResponse getProductById(@PathVariable int id) {
        return service.getProductById(id);
    }

    @GetMapping("/searchByName/{name}")
    public ProductSearchByNameResponse searchProductsByName(@PathVariable String name) {
        return service.searchProductsByName(name);
    }

    // POST
    @PostMapping("/add")
    public ProductAddResponse saveProduct(@RequestBody ProductAddRequest request) {
        return service.saveProduct(request);
    }

    // DELETE
    @DeleteMapping("/delete")
    public ProductDeleteResponse deleteProductById(@RequestParam int id) {
        return service.deleteProductById(id);
    }

    // UPDATE
    @PutMapping("/update")
    public ProductUpdateResponse updateProduct(@RequestBody ProductUpdateRequest request) {
        return service.updateProduct(request);
    }
}
