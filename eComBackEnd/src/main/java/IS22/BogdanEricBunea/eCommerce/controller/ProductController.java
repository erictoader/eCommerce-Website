package IS22.BogdanEricBunea.eCommerce.controller;

import IS22.BogdanEricBunea.eCommerce.model.Product;
import IS22.BogdanEricBunea.eCommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RequestMapping("product")
@RestController
public class ProductController {

    @Autowired
    private ProductService service;

    // GET
    @GetMapping("/getAll")
    public List<Product> getProducts() {
        return service.getProducts();
    }
    @GetMapping("/getById/{id}")
    public Product getProductById(@PathVariable int id) {
        return service.getProductById(id);
    }
    @GetMapping("/getByName/{name}")
    public Product getProductByName(@PathVariable String name) {
        return service.getProductByName(name);
    }

    // POST
    @PostMapping("/add")
    public Product saveProduct(@RequestBody Product product) {
        return service.saveProduct(product);
    }
    @PostMapping("/addAll")
    public List<Product> saveProducts(@RequestBody List<Product> products) {
        return service.saveProducts(products);
    }

    // DELETE
    @DeleteMapping("/delete")
    public void deleteProductById(@RequestParam int id) {
        service.deleteProductById(id);
    }

    // UPDATE
    @PutMapping("/update")
    public Product updateProduct(@RequestBody Product updated) {
        return service.updateProduct(updated);
    }
}
