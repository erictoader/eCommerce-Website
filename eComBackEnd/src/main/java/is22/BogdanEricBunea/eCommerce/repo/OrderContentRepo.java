package is22.BogdanEricBunea.eCommerce.repo;

import is22.BogdanEricBunea.eCommerce.entity.OrderContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderContentRepo extends JpaRepository<OrderContent, Integer> {

}
