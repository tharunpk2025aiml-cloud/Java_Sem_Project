package com.example.ParkSmart.dto;

public record CheckoutResponse(

        Long bookingId,
        long overstayMinutes,
        double penalty,
        String message

) {
}