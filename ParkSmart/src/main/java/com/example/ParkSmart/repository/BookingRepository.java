package com.example.ParkSmart.repository;

import com.example.ParkSmart.entity.Booking;
import com.example.ParkSmart.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    /*
     * Checks whether a slot already has a booking
     * that overlaps with the requested time window.
     */
    @Query("""
            SELECT COUNT(b) > 0
            FROM Booking b
            WHERE b.slot.id = :slotId
            AND b.status <> :cancelledStatus
            AND b.startTime < :requestedEnd
            AND b.endTime > :requestedStart
            """)
    boolean existsOverlappingBooking(
            @Param("slotId") Long slotId,
            @Param("requestedStart") LocalDateTime requestedStart,
            @Param("requestedEnd") LocalDateTime requestedEnd,
            @Param("cancelledStatus") BookingStatus cancelledStatus
    );


    /*
     * Finds all bookings belonging to a particular slot.
     */
    List<Booking> findBySlotId(Long slotId);


    /*
     * Counts currently checked-in vehicles
     * inside a particular parking lot.
     */
    @Query("""
            SELECT COUNT(b)
            FROM Booking b
            WHERE b.slot.parkingLot.id = :lotId
            AND b.status = :status
            """)
    long countByLotAndStatus(
            @Param("lotId") Long lotId,
            @Param("status") BookingStatus status
    );


    /*
     * Counts bookings with a particular status
     * across ALL parking lots.
     *
     * CHECKED_IN = currently occupied.
     */
    long countByStatus(BookingStatus status);
}