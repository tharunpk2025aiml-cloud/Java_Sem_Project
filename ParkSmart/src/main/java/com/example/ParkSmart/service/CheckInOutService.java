package com.example.ParkSmart.service;

import com.example.ParkSmart.dto.CheckoutResponse;
import com.example.ParkSmart.entity.Booking;
import com.example.ParkSmart.entity.CheckInOut;
import com.example.ParkSmart.entity.ParkingLot;
import com.example.ParkSmart.enums.BookingStatus;
import com.example.ParkSmart.exception.BusinessException;
import com.example.ParkSmart.exception.ResourceNotFoundException;
import com.example.ParkSmart.repository.BookingRepository;
import com.example.ParkSmart.repository.CheckInOutRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
public class CheckInOutService {

    private final BookingRepository bookingRepository;
    private final CheckInOutRepository checkInOutRepository;

    public CheckInOutService(
            BookingRepository bookingRepository,
            CheckInOutRepository checkInOutRepository) {

        this.bookingRepository = bookingRepository;
        this.checkInOutRepository = checkInOutRepository;
    }

    @Transactional
    public CheckInOut checkIn(Long bookingId) {

        Booking booking =
                bookingRepository.findById(bookingId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Booking not found with ID: "
                                                + bookingId
                                )
                        );

        if (booking.getStatus() != BookingStatus.RESERVED) {

            throw new BusinessException(
                    "Vehicle cannot be checked in. Current status: "
                            + booking.getStatus()
            );
        }

        LocalDateTime now = LocalDateTime.now();

        if (now.isBefore(booking.getStartTime())) {

            throw new BusinessException(
                    "Check-in time has not started yet"
            );
        }

        if (now.isAfter(booking.getEndTime())) {

            throw new BusinessException(
                    "Booking window has already expired"
            );
        }

        CheckInOut checkInOut = new CheckInOut();

        checkInOut.setBooking(booking);
        checkInOut.setCheckInTime(now);
        checkInOut.setOverstayMinutes(0);
        checkInOut.setPenalty(0);

        booking.setStatus(
                BookingStatus.CHECKED_IN
        );

        bookingRepository.save(booking);

        return checkInOutRepository.save(checkInOut);
    }

    @Transactional
    public CheckoutResponse checkOut(Long bookingId) {

        Booking booking =
                bookingRepository.findById(bookingId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Booking not found with ID: "
                                                + bookingId
                                )
                        );

        if (booking.getStatus()
                != BookingStatus.CHECKED_IN) {

            throw new BusinessException(
                    "Vehicle is not currently checked in"
            );
        }

        CheckInOut checkInOut =
                checkInOutRepository
                        .findByBookingId(bookingId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Check-in record not found"
                                )
                        );

        LocalDateTime now = LocalDateTime.now();

        long overstayMinutes = 0;
        double penalty = 0;

        if (now.isAfter(booking.getEndTime())) {

            overstayMinutes =
                    Duration.between(
                            booking.getEndTime(),
                            now
                    ).toMinutes();

            long extraHours =
                    (long) Math.ceil(
                            overstayMinutes / 60.0
                    );

            ParkingLot parkingLot =
                    booking.getSlot().getParkingLot();

            penalty =
                    extraHours *
                            parkingLot.getOverstayRatePerHour();
        }

        checkInOut.setCheckOutTime(now);
        checkInOut.setOverstayMinutes(
                overstayMinutes
        );
        checkInOut.setPenalty(penalty);

        booking.setStatus(
                BookingStatus.COMPLETED
        );

        bookingRepository.save(booking);
        checkInOutRepository.save(checkInOut);

        String message;

        if (penalty > 0) {

            message =
                    "Checkout completed with overstay penalty";

        } else {

            message =
                    "Checkout completed without penalty";
        }

        return new CheckoutResponse(
                bookingId,
                overstayMinutes,
                penalty,
                message
        );
    }
}