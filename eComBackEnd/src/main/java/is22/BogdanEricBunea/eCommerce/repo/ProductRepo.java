package is22.BogdanEricBunea.eCommerce.repo;


import is22.BogdanEricBunea.eCommerce.entity.Product;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends PagingAndSortingRepository<Product, Integer> {

    Product findByName(String name);

    List<Product> findByNameContainingIgnoreCase(String name);

}
