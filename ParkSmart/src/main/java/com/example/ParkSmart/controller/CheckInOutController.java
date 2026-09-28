package com.example.ParkSmart.controller;

import com.example.ParkSmart.dto.CheckoutResponse;
import com.example.ParkSmart.entity.CheckInOut;
import com.example.ParkSmart.service.CheckInOutService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/check-in-out")
public class CheckInOutController {

    private final CheckInOutService checkInOutService;

    public CheckInOutController(
            CheckInOutService checkInOutService) {

        this.checkInOutService = checkInOutService;
    }

    @PostMapping("/{bookingId}/check-in")
    public ResponseEntity<CheckInOut> checkIn(
            @PathVariable Long bookingId) {

        return ResponseEntity.ok(
                checkInOutService.checkIn(bookingId)
        );
    }

    @PostMapping("/{bookingId}/check-out")
    public ResponseEntity<CheckoutResponse> checkOut(
            @PathVariable Long bookingId) {

        return ResponseEntity.ok(
                checkInOutService.checkOut(bookingId)
        );
    }
}