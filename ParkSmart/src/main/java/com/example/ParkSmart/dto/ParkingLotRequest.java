package com.example.ParkSmart.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;

public record ParkingLotRequest(

        @NotBlank(message = "Parking lot name is required")
        String name,

        @NotBlank(message = "Location is required")
        String location,

        @PositiveOrZero(message = "Overstay rate cannot be negative")
        double overstayRatePerHour

) {
}