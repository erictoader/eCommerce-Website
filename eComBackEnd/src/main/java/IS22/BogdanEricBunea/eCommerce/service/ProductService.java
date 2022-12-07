package IS22.BogdanEricBunea.eCommerce.service;

import IS22.BogdanEricBunea.eCommerce.model.Product;
import IS22.BogdanEricBunea.eCommerce.repo.ProductRepo;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepo repo;

    // GET
    public List<Product> getProducts() {
        return repo.findAll();
    }

    public Product getProductById(int id) {
        return repo.findById(id)
                .orElse(null);
    }

    public Product getProductByName(String name) {
        return repo.findByName(name);
    }

    // POST
    public Product saveProduct(Product product) {
        return repo.save(product);
    }

    public List<Product> saveProducts(List<Product> products) {
        return repo.saveAll(products);
    }

    // DELETE
    public void deleteProductById(int id) {
        repo.deleteById(id);
        System.out.println("Removed product with ID: " + id);
    }

    // UPDATE
    public Product updateProduct(@NotNull Product updated) {
        Product existing = repo.findById(updated.getId()).orElse(null);
        if (existing == null) return null;
        return repo.save(updated);
    }


}
