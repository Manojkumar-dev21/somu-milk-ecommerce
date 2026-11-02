package com.somu.milk.payment;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    @GetMapping("/methods")
    public Map<String,Object> methods() {
        return Map.of(
            "availableMethods", new String[]{"COD","UPI"},
            "upiEnabled", false,
            "message", "UPI checkout is not enabled until a payment provider and server-side verification are configured."
        );
    }
}
