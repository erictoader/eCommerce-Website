package is22.BogdanEricBunea.eCommerce.repo;

import is22.BogdanEricBunea.eCommerce.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<Order, Integer> {

    List<Order> findByBuyerUsername(String username);

}
