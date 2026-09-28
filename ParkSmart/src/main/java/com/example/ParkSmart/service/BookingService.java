package com.example.ParkSmart.service;

import com.example.ParkSmart.dto.BookingRequest;
import com.example.ParkSmart.entity.Booking;
import com.example.ParkSmart.entity.Slot;
import com.example.ParkSmart.enums.BookingStatus;
import com.example.ParkSmart.exception.BusinessException;
import com.example.ParkSmart.exception.ResourceNotFoundException;
import com.example.ParkSmart.repository.BookingRepository;
import com.example.ParkSmart.repository.SlotRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final SlotRepository slotRepository;

    public BookingService(
            BookingRepository bookingRepository,
            SlotRepository slotRepository) {

        this.bookingRepository = bookingRepository;
        this.slotRepository = slotRepository;
    }

    @Transactional
    public Booking createBooking(BookingRequest request) {

        // Validate time
        if (!request.endTime().isAfter(request.startTime())) {

            throw new BusinessException(
                    "End time must be after start time"
            );
        }

        // Find slot
        Slot slot = slotRepository.findById(
                request.slotId()
        ).orElseThrow(() ->
                new ResourceNotFoundException(
                        "Slot not found with ID: "
                                + request.slotId()
                )
        );

        // Check active status
        if (!slot.isActive()) {

            throw new BusinessException(
                    "This parking slot is inactive"
            );
        }

        // Check overlapping booking
        boolean overlapping =
                bookingRepository.existsOverlappingBooking(
                        slot.getId(),
                        request.startTime(),
                        request.endTime(),
                        BookingStatus.CANCELLED
                );

        if (overlapping) {

            throw new BusinessException(
                    "Slot is already booked for the selected time window"
            );
        }

        // Create booking
        Booking booking = new Booking();

        booking.setCustomerName(
                request.customerName()
        );

        booking.setVehicleNumber(
                request.vehicleNumber()
        );

        booking.setStartTime(
                request.startTime()
        );

        booking.setEndTime(
                request.endTime()
        );

        booking.setSlot(slot);

        booking.setStatus(
                BookingStatus.RESERVED
        );

        return bookingRepository.save(booking);
    }

    public Booking getBooking(Long id) {

        return bookingRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Booking not found with ID: " + id
                        )
                );
    }

    public List<Booking> getAllBookings() {

        return bookingRepository.findAll();
    }

    public List<Slot> getAvailableSlots(
            Long parkingLotId,
            LocalDateTime startTime,
            LocalDateTime endTime) {

        if (!endTime.isAfter(startTime)) {

            throw new BusinessException(
                    "End time must be after start time"
            );
        }

        List<Slot> allSlots =
                slotRepository.findByParkingLotId(
                        parkingLotId
                );

        List<Slot> availableSlots =
                new ArrayList<>();

        for (Slot slot : allSlots) {

            if (!slot.isActive()) {
                continue;
            }

            boolean overlapping =
                    bookingRepository.existsOverlappingBooking(
                            slot.getId(),
                            startTime,
                            endTime,
                            BookingStatus.CANCELLED
                    );

            if (!overlapping) {
                availableSlots.add(slot);
            }
        }

        return availableSlots;
    }
}