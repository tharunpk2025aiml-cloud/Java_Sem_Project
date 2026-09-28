package com.example.ParkSmart.controller;

import com.example.ParkSmart.dto.BookingRequest;
import com.example.ParkSmart.entity.Booking;
import com.example.ParkSmart.entity.Slot;
import com.example.ParkSmart.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(
            BookingService bookingService) {

        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(
            @Valid @RequestBody BookingRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        bookingService.createBooking(request)
                );
    }

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {

        return ResponseEntity.ok(
                bookingService.getAllBookings()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBooking(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                bookingService.getBooking(id)
        );
    }

    @GetMapping("/available-slots")
    public ResponseEntity<List<Slot>> getAvailableSlots(

            @RequestParam Long parkingLotId,

            @RequestParam LocalDateTime startTime,

            @RequestParam LocalDateTime endTime) {

        return ResponseEntity.ok(
                bookingService.getAvailableSlots(
                        parkingLotId,
                        startTime,
                        endTime
                )
        );
    }
}