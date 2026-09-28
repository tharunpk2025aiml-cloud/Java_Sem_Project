package com.example.ParkSmart.repository;

import com.example.ParkSmart.entity.CheckInOut;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CheckInOutRepository
        extends JpaRepository<CheckInOut, Long> {

    Optional<CheckInOut> findByBookingId(Long bookingId);
}