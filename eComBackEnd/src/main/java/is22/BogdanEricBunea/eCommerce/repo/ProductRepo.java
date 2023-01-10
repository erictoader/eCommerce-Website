package is22.BogdanEricBunea.eCommerce.repo;


import is22.BogdanEricBunea.eCommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ProductRepo extends PagingAndSortingRepository<Product, Integer> {

    Product findByName(String name);

    List<Product> findByNameContainingIgnoreCase(String name);

    @Modifying
    @Transactional
    @Query(
            value = "INSERT INTO `PRODUCTS` (`name`, `desc`, `price`, `available`, `image`, `rating`) VALUES (?1, ?2, ?3, ?4, ?5, ?6);",
            nativeQuery = true
    )
    void insert(String name, String desc, float price, boolean available, byte[] image, float rating);

    @Modifying
    @Transactional
    @Query(
            value = "INSERT INTO `PRODUCTS` (`id`, `name`, `desc`, `price`, `available`, `image`, `rating`) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7);",
            nativeQuery = true
    )
    void insert(long id, String name, String desc, float price, boolean available, byte[] image, float rating);
}
