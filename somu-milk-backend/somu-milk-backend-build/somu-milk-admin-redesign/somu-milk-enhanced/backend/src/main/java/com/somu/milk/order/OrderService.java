package com.somu.milk.order;

import com.somu.milk.product.Product;
import com.somu.milk.product.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.math.BigDecimal;
import java.util.UUID;

@Service
public class OrderService {
    private final OrderRepository orders;
    private final ProductRepository products;
    public OrderService(OrderRepository orders, ProductRepository products) { this.orders=orders; this.products=products; }

    @Transactional
    public CustomerOrder create(CreateOrderRequest request) {
        // Local delivery allowlist must be configured before launch. This development starter accepts six-digit PINs.
        CustomerOrder order = new CustomerOrder();
        order.setOrderNumber("SM-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        order.setCustomerName(request.customerName()); order.setPhone(request.phone());
        order.setDeliveryAddress(request.deliveryAddress()); order.setPinCode(request.pinCode());
        order.setPaymentMethod(request.paymentMethod());
        order.setPaymentStatus("COD".equals(request.paymentMethod()) ? "PAY_ON_DELIVERY" : "PENDING");
        BigDecimal total = BigDecimal.ZERO;
        for (CreateOrderRequest.Item item : request.items()) {
            Product product = products.findById(item.productId())
                .filter(Product::isActive)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Product unavailable: " + item.productId()));
            if (product.getStockQuantity() < item.quantity()) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Insufficient stock for " + product.getName());
            }
            product.setStockQuantity(product.getStockQuantity() - item.quantity());
            OrderLine line = new OrderLine();
            line.setOrder(order); line.setProductId(product.getId()); line.setProductName(product.getName());
            line.setQuantity(item.quantity()); line.setUnitPrice(product.getPrice());
            BigDecimal lineTotal = product.getPrice().multiply(BigDecimal.valueOf(item.quantity()));
            line.setLineTotal(lineTotal); order.getItems().add(line);
            total = total.add(lineTotal);
        }
        order.setTotal(total);
        return orders.save(order);
    }
}
