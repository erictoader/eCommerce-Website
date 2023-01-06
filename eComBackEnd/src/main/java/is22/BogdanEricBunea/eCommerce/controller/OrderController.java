package is22.BogdanEricBunea.eCommerce.controller;

import is22.BogdanEricBunea.eCommerce.request.order.OrderAddRequest;
import is22.BogdanEricBunea.eCommerce.response.order.OrderAddResponse;
import is22.BogdanEricBunea.eCommerce.response.order.OrderGetAllByUsernameResponse;
import is22.BogdanEricBunea.eCommerce.response.order.OrderGetAllResponse;
import is22.BogdanEricBunea.eCommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RequestMapping("order")
@RestController
public class OrderController {

    @Autowired
    private OrderService service;

    // GET
    @GetMapping("/getAll")
    public OrderGetAllResponse getOrders() {
        return service.getAllOrders();
    }

    @GetMapping("/getByUsername/{username}")
    public OrderGetAllByUsernameResponse getOrdersByUsername(@PathVariable String username) {
        return service.getOrdersMadeByUsername(username);
    }

    // POST
    @PostMapping("/add")
    public OrderAddResponse placeOrder(@RequestBody OrderAddRequest request) {
        return service.saveOrder(request);
    }

}
