package com.example.ParkSmart.controller;

import com.example.ParkSmart.dto.ParkingLotRequest;
import com.example.ParkSmart.entity.ParkingLot;
import com.example.ParkSmart.service.ParkingLotService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parking-lots")
public class ParkingLotController {

    private final ParkingLotService parkingLotService;


    public ParkingLotController(
            ParkingLotService parkingLotService) {

        this.parkingLotService = parkingLotService;
    }


    /*
     * Create a parking lot.
     *
     * POST /api/parking-lots
     */
    @PostMapping
    public ResponseEntity<ParkingLot> create(
            @Valid @RequestBody ParkingLotRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        parkingLotService.create(request)
                );
    }


    /*
     * Get all parking lots.
     *
     * GET /api/parking-lots
     */
    @GetMapping
    public ResponseEntity<List<ParkingLot>> getAll() {

        return ResponseEntity.ok(
                parkingLotService.getAll()
        );
    }


    /*
     * IMPORTANT:
     * This endpoint comes BEFORE /{id}.
     *
     * Gets occupancy across ALL parking lots.
     *
     * GET /api/parking-lots/occupancy
     */
    @GetMapping("/occupancy")
    public ResponseEntity<Long> getTotalOccupancy() {

        return ResponseEntity.ok(
                parkingLotService.getTotalOccupancy()
        );
    }


    /*
     * Get one parking lot.
     *
     * GET /api/parking-lots/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<ParkingLot> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                parkingLotService.getById(id)
        );
    }


    /*
     * Get occupancy of ONE parking lot.
     *
     * GET /api/parking-lots/{id}/occupancy
     */
    @GetMapping("/{id}/occupancy")
    public ResponseEntity<Long> getOccupancy(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                parkingLotService.getCurrentOccupancy(id)
        );
    }
}