package com.example.ParkSmart.controller;

import com.example.ParkSmart.dto.SlotRequest;
import com.example.ParkSmart.entity.Slot;
import com.example.ParkSmart.service.SlotService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/slots")
public class SlotController {

    private final SlotService slotService;

    public SlotController(SlotService slotService) {
        this.slotService = slotService;
    }

    @PostMapping
    public ResponseEntity<Slot> create(
            @Valid @RequestBody SlotRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        slotService.create(request)
                );
    }

    @GetMapping("/lot/{lotId}")
    public ResponseEntity<List<Slot>> getByLot(
            @PathVariable Long lotId) {

        return ResponseEntity.ok(
                slotService.getSlotsByLot(lotId)
        );
    }
}