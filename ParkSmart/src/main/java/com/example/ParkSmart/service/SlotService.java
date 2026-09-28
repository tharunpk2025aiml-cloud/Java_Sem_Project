package com.example.ParkSmart.service;

import com.example.ParkSmart.dto.SlotRequest;
import com.example.ParkSmart.entity.ParkingLot;
import com.example.ParkSmart.entity.Slot;
import com.example.ParkSmart.exception.ResourceNotFoundException;
import com.example.ParkSmart.repository.ParkingLotRepository;
import com.example.ParkSmart.repository.SlotRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SlotService {

    private final SlotRepository slotRepository;
    private final ParkingLotRepository parkingLotRepository;

    public SlotService(
            SlotRepository slotRepository,
            ParkingLotRepository parkingLotRepository) {

        this.slotRepository = slotRepository;
        this.parkingLotRepository = parkingLotRepository;
    }

    public Slot create(SlotRequest request) {

        ParkingLot parkingLot =
                parkingLotRepository.findById(
                        request.parkingLotId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Parking lot not found with ID: "
                                        + request.parkingLotId()
                        )
                );

        Slot slot = new Slot();

        slot.setSlotNumber(request.slotNumber());
        slot.setParkingLot(parkingLot);
        slot.setActive(true);

        return slotRepository.save(slot);
    }

    public List<Slot> getSlotsByLot(Long lotId) {

        if (!parkingLotRepository.existsById(lotId)) {

            throw new ResourceNotFoundException(
                    "Parking lot not found with ID: " + lotId
            );
        }

        return slotRepository.findByParkingLotId(lotId);
    }
}