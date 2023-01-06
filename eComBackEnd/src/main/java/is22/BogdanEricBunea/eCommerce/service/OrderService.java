package is22.BogdanEricBunea.eCommerce.service;

import is22.BogdanEricBunea.eCommerce.entity.Order;
import is22.BogdanEricBunea.eCommerce.entity.OrderContent;
import is22.BogdanEricBunea.eCommerce.entity.Product;
import is22.BogdanEricBunea.eCommerce.model.OrderComplex;
import is22.BogdanEricBunea.eCommerce.model.OrderItem;
import is22.BogdanEricBunea.eCommerce.repo.OrderContentRepo;
import is22.BogdanEricBunea.eCommerce.repo.OrderRepo;
import is22.BogdanEricBunea.eCommerce.repo.ProductRepo;
import is22.BogdanEricBunea.eCommerce.request.order.OrderAddRequest;
import is22.BogdanEricBunea.eCommerce.response.order.OrderAddResponse;
import is22.BogdanEricBunea.eCommerce.response.order.OrderGetAllByUsernameResponse;
import is22.BogdanEricBunea.eCommerce.response.order.OrderGetAllResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepo orderRepo;
    @Autowired
    private OrderContentRepo orderContentRepo;
    @Autowired
    private ProductRepo productRepo;

    private static final String PRODUCT_SEPARATOR = ",";

    // GET
    public OrderGetAllResponse getAllOrders() {
        List<Order> orders = orderRepo.findAll();
        List<OrderContent> orderContents = orderContentRepo.findAll();
        List<OrderComplex> orderComplexList = new ArrayList<>();
        boolean encounteredError = false;

        for (Order order : orders) {
            OrderComplex orderComplex = new OrderComplex();
            orderComplex.setId(order.getId());
            orderComplex.setBuyerUsername(order.getBuyerUsername());
            orderComplex.setBuyerAddress(order.getBuyerAddress());
            orderComplex.setTotal(order.getTotal());
            orderComplex.setOrderDate(order.getOrderDate());

            OrderContent orderContent = orderContents.stream()
                    .filter(it -> it.getOrderId() == order.getId())
                    .findFirst()
                    .orElse(null);
            if (orderContent == null) {
                encounteredError = true;
                continue;
            }

            List<Integer> productIdList = Arrays.stream(orderContent.getItemsId().split(PRODUCT_SEPARATOR))
                    .mapToInt(Integer::parseInt)
                    .boxed()
                    .collect(Collectors.toList());
            List<Integer> productQuantityList = Arrays.stream(orderContent.getItemsQuantity().split(PRODUCT_SEPARATOR))
                    .mapToInt(Integer::parseInt)
                    .boxed()
                    .collect(Collectors.toList());

            List<OrderItem> orderItemList = new ArrayList<>();
            int currentIndex = 0;

            for (Integer productId : productIdList) {
                Product product = productRepo.findById(productId).orElse(null);
                if (product == null) {
                    encounteredError = true;
                    currentIndex++;
                    continue;
                }
                Integer quantity = 0;
                try {
                    quantity = productQuantityList.get(currentIndex);
                } catch (IndexOutOfBoundsException exception) {
                    encounteredError = true;
                    break;
                }
                orderItemList.add(new OrderItem(product, quantity));
            }

            orderComplex.setItems(orderItemList);
            orderComplexList.add(orderComplex);
        }

        if (encounteredError) return new OrderGetAllResponse(
                OrderGetAllResponse.Codes.ENCOUNTERED_ERROR,
                OrderGetAllResponse.Messages.ENCOUNTERED_ERROR,
                orderComplexList
        );
        else return new OrderGetAllResponse(
                OrderGetAllResponse.Codes.SUCCESS,
                OrderGetAllResponse.Messages.SUCCESS,
                orderComplexList
        );
    }

    public OrderGetAllByUsernameResponse getOrdersMadeByUsername(String username) {
        List<Order> orders = orderRepo.findByBuyerUsername(username);
        List<OrderContent> orderContents = orderContentRepo.findAll();
        List<OrderComplex> orderComplexList = new ArrayList<>();
        boolean encounteredError = false;

        for (Order order : orders) {
            OrderComplex orderComplex = new OrderComplex();
            orderComplex.setId(order.getId());
            orderComplex.setBuyerUsername(order.getBuyerUsername());
            orderComplex.setBuyerAddress(order.getBuyerAddress());
            orderComplex.setTotal(order.getTotal());
            orderComplex.setOrderDate(order.getOrderDate());

            OrderContent orderContent = orderContents.stream()
                    .filter(it -> it.getOrderId() == order.getId())
                    .findFirst()
                    .orElse(null);
            if (orderContent == null) {
                encounteredError = true;
                continue;
            }

            List<Integer> productIdList = Arrays.stream(orderContent.getItemsId().split(PRODUCT_SEPARATOR))
                    .mapToInt(Integer::parseInt)
                    .boxed()
                    .collect(Collectors.toList());
            List<Integer> productQuantityList = Arrays.stream(orderContent.getItemsQuantity().split(PRODUCT_SEPARATOR))
                    .mapToInt(Integer::parseInt)
                    .boxed()
                    .collect(Collectors.toList());

            List<OrderItem> orderItemList = new ArrayList<>();
            int currentIndex = 0;

            for (Integer productId : productIdList) {
                Product product = productRepo.findById(productId).orElse(null);
                if (product == null) {
                    encounteredError = true;
                    currentIndex++;
                    continue;
                }
                Integer quantity = 0;
                try {
                    quantity = productQuantityList.get(currentIndex);
                } catch (IndexOutOfBoundsException exception) {
                    encounteredError = true;
                    break;
                }
                orderItemList.add(new OrderItem(product, quantity));
            }

            orderComplex.setItems(orderItemList);
            orderComplexList.add(orderComplex);
        }

        if (encounteredError) return new OrderGetAllByUsernameResponse(
                OrderGetAllByUsernameResponse.Codes.ENCOUNTERED_ERROR,
                OrderGetAllByUsernameResponse.Messages.ENCOUNTERED_ERROR,
                orderComplexList
        );
        else return new OrderGetAllByUsernameResponse(
                OrderGetAllByUsernameResponse.Codes.SUCCESS,
                OrderGetAllByUsernameResponse.Messages.SUCCESS,
                orderComplexList
        );
    }

    // POST
    public OrderAddResponse saveOrder(OrderAddRequest request) {
        Order order = orderRepo.save(
                new Order(
                        request.getUsername(),
                        request.getAddress(),
                        request.getTotal()
                )
        );
        OrderContent orderContent = orderContentRepo.save(
                new OrderContent(
                        order.getId(),
                        getIdsStringFromItemList(request.getItems()),
                        getQuantitiesStringFromItemList(request.getItems())
                )
        );
        return new OrderAddResponse(
                OrderAddResponse.Codes.SUCCESS,
                OrderAddResponse.Messages.SUCCESS
        );
    }

    private String getIdsStringFromItemList(List<OrderItem> orderItems) {
        StringBuilder stringBuilder = new StringBuilder();
        for (OrderItem orderItem: orderItems) {
            stringBuilder.append(orderItem.getProduct().getId());
            stringBuilder.append(PRODUCT_SEPARATOR);
        }
        if (stringBuilder.length() - 1 > 0) {
            stringBuilder.deleteCharAt(stringBuilder.length() - 1);
        }
        return stringBuilder.toString();
    }

    private String getQuantitiesStringFromItemList(List<OrderItem> orderItems) {
        StringBuilder stringBuilder = new StringBuilder();
        for (OrderItem orderItem: orderItems) {
            stringBuilder.append(orderItem.getQuantity());
            stringBuilder.append(PRODUCT_SEPARATOR);
        }
        if (stringBuilder.length() - 1 > 0) {
            stringBuilder.deleteCharAt(stringBuilder.length() - 1);
        }
        return stringBuilder.toString();
    }
}
