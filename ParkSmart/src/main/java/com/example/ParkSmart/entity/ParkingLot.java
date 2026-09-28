//package com.example.ParkSmart.entity;
//
//import jakarta.persistence.*;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Entity
//@Table(name = "parking_lots")
//public class ParkingLot {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(nullable = false)
//    private String name;
//
//    @Column(nullable = false)
//    private String location;
//
//    @Column(nullable = false)
//    private double overstayRatePerHour;
//
//    @OneToMany(
//            mappedBy = "parkingLot",
//            cascade = CascadeType.ALL,
//            orphanRemoval = true
//    )
//    private List<Slot> slots = new ArrayList<>();
//
//    public ParkingLot() {
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getLocation() {
//        return location;
//    }
//
//    public void setLocation(String location) {
//        this.location = location;
//    }
//
//    public double getOverstayRatePerHour() {
//        return overstayRatePerHour;
//    }
//
//    public void setOverstayRatePerHour(double overstayRatePerHour) {
//        this.overstayRatePerHour = overstayRatePerHour;
//    }
//
//    public List<Slot> getSlots() {
//        return slots;
//    }
//
//    public void setSlots(List<Slot> slots) {
//        this.slots = slots;
//    }
//}
package com.example.ParkSmart.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "parking_lots")
public class ParkingLot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private double overstayRatePerHour;

    @OneToMany(
            mappedBy = "parkingLot",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Slot> slots = new ArrayList<>();

    public ParkingLot() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public double getOverstayRatePerHour() {
        return overstayRatePerHour;
    }

    public void setOverstayRatePerHour(double overstayRatePerHour) {
        this.overstayRatePerHour = overstayRatePerHour;
    }

    public List<Slot> getSlots() {
        return slots;
    }

    public void setSlots(List<Slot> slots) {
        this.slots = slots;
    }
}