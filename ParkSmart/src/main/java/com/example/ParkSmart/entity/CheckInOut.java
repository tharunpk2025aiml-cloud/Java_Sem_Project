package com.example.ParkSmart.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "check_in_out")
public class CheckInOut {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(
            name = "booking_id",
            nullable = false,
            unique = true
    )
    private Booking booking;

    private LocalDateTime checkInTime;

    private LocalDateTime checkOutTime;

    private long overstayMinutes;

    private double penalty;

    public CheckInOut() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public LocalDateTime getCheckInTime() {
        return checkInTime;
    }

    public void setCheckInTime(LocalDateTime checkInTime) {
        this.checkInTime = checkInTime;
    }

    public LocalDateTime getCheckOutTime() {
        return checkOutTime;
    }

    public void setCheckOutTime(LocalDateTime checkOutTime) {
        this.checkOutTime = checkOutTime;
    }

    public long getOverstayMinutes() {
        return overstayMinutes;
    }

    public void setOverstayMinutes(long overstayMinutes) {
        this.overstayMinutes = overstayMinutes;
    }

    public double getPenalty() {
        return penalty;
    }

    public void setPenalty(double penalty) {
        this.penalty = penalty;
    }
}