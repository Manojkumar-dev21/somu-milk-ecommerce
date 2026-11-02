package com.somu.milk.order;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.List;

public record CreateOrderRequest(
    @NotBlank @Size(max=100) String customerName,
    @NotBlank @Pattern(regexp="[0-9+() -]{8,20}") String phone,
    @NotBlank @Size(max=600) String deliveryAddress,
    @NotBlank @Pattern(regexp="[0-9]{6}") String pinCode,
    @NotBlank @Pattern(regexp="COD|UPI") String paymentMethod,
    @NotEmpty List<@Valid Item> items
) {
    public record Item(@NotNull @Positive Long productId, @NotNull @Min(1) @Max(100) Integer quantity) {}
}
