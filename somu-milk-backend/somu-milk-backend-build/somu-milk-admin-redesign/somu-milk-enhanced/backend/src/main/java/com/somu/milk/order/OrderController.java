package com.somu.milk.order;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderRepository orders;
    private final OrderService service;
    public OrderController(OrderRepository orders, OrderService service) { this.orders=orders; this.service=service; }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CustomerOrder create(@Valid @RequestBody CreateOrderRequest request) { return service.create(request); }

    // Development/admin endpoints: secure these with real admin authentication before public deployment.
    @GetMapping
    public List<CustomerOrder> list() { return orders.findAllByOrderByCreatedAtDesc(); }

    @PatchMapping("/{id}/status")
    public CustomerOrder updateStatus(@PathVariable Long id, @RequestParam String status) {
        CustomerOrder order = orders.findById(id).orElseThrow();
        if (!List.of("PLACED","CONFIRMED","PACKING","OUT_FOR_DELIVERY","DELIVERED","CANCELLED").contains(status))
            throw new org.springframework.web.server.ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid status");
        order.setStatus(status);
        return orders.save(order);
    }
}
