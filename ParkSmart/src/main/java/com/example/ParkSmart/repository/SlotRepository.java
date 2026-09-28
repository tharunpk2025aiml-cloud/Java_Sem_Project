package com.example.ParkSmart.repository;

import com.example.ParkSmart.entity.Slot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SlotRepository
        extends JpaRepository<Slot, Long> {

    List<Slot> findByParkingLotId(Long parkingLotId);
}