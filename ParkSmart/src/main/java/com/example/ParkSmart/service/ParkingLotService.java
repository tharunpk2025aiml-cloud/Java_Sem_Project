package com.example.ParkSmart.service;

import com.example.ParkSmart.dto.ParkingLotRequest;
import com.example.ParkSmart.entity.ParkingLot;
import com.example.ParkSmart.enums.BookingStatus;
import com.example.ParkSmart.exception.ResourceNotFoundException;
import com.example.ParkSmart.repository.BookingRepository;
import com.example.ParkSmart.repository.ParkingLotRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParkingLotService {

    private final ParkingLotRepository parkingLotRepository;
    private final BookingRepository bookingRepository;


    public ParkingLotService(
            ParkingLotRepository parkingLotRepository,
            BookingRepository bookingRepository) {

        this.parkingLotRepository = parkingLotRepository;
        this.bookingRepository = bookingRepository;
    }


    /*
     * Create a new parking lot.
     */
    public ParkingLot create(ParkingLotRequest request) {

        ParkingLot parkingLot = new ParkingLot();

        parkingLot.setName(request.name());

        parkingLot.setLocation(
                request.location()
        );

        parkingLot.setOverstayRatePerHour(
                request.overstayRatePerHour()
        );

        return parkingLotRepository.save(parkingLot);
    }


    /*
     * Get all parking lots.
     */
    public List<ParkingLot> getAll() {

        return parkingLotRepository.findAll();
    }


    /*
     * Get one parking lot by ID.
     */
    public ParkingLot getById(Long id) {

        return parkingLotRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Parking lot not found with ID: " + id
                        )
                );
    }


    /*
     * Get occupancy for ONE particular parking lot.
     *
     * Only CHECKED_IN bookings are counted
     * as occupied vehicles.
     */
    public long getCurrentOccupancy(Long lotId) {

        if (!parkingLotRepository.existsById(lotId)) {

            throw new ResourceNotFoundException(
                    "Parking lot not found with ID: " + lotId
            );
        }

        return bookingRepository.countByLotAndStatus(
                lotId,
                BookingStatus.CHECKED_IN
        );
    }


    /*
     * Get occupancy across ALL parking lots.
     *
     * This is used by the dashboard.
     */
    public long getTotalOccupancy() {

        return bookingRepository.countByStatus(
                BookingStatus.CHECKED_IN
        );
    }
}