package com.example.ParkSmart.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record BookingRequest(

        @NotBlank(message = "Customer name is required")
        String customerName,

        @NotBlank(message = "Vehicle number is required")
        String vehicleNumber,

        @NotNull(message = "Slot ID is required")
        Long slotId,

        @NotNull(message = "Start time is required")
        LocalDateTime startTime,

        @NotNull(message = "End time is required")
        LocalDateTime endTime

) {
}