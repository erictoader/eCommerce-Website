package IS22.BogdanEricBunea.eCommerce.repo;


import IS22.BogdanEricBunea.eCommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {

    Product findByName(String name);

}
