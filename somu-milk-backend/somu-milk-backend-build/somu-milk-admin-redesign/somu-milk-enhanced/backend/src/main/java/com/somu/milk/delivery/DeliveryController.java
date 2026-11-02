package com.somu.milk.delivery;

import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/delivery")
public class DeliveryController {
    // Replace these sample PIN codes with the actual serviceable PIN codes for Somu Milk.
    private static final Set<String> SERVICEABLE_PIN_CODES = Set.of("620001", "620002", "620003", "620017");
    @GetMapping("/check")
    public Map<String,Object> check(@RequestParam String pinCode) {
        boolean validFormat = pinCode != null && pinCode.matches("[0-9]{6}");
        boolean serviceable = validFormat && SERVICEABLE_PIN_CODES.contains(pinCode);
        return Map.of("pinCode", pinCode == null ? "" : pinCode, "serviceable", serviceable,
          "message", serviceable ? "Delivery is available in this area." : "Delivery is not currently available in this PIN code.");
    }
}
