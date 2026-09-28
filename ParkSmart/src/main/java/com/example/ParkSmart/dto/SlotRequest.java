package com.example.ParkSmart.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SlotRequest(

        @NotBlank(message = "Slot number is required")
        String slotNumber,

        @NotNull(message = "Parking lot ID is required")
        Long parkingLotId

) {
}