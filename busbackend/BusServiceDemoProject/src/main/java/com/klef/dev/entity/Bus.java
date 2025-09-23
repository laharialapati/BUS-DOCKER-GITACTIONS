package com.klef.dev.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "bus_table")
public class Bus {
    
    @Id
    @Column(name = "bus_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "bus_number", nullable = false, unique = true, length = 20)
    private String busNumber;  // Unique bus registration/number

    @Column(name = "bus_driver", nullable = false, length = 50)
    private String driverName;

    @Column(name = "bus_capacity", nullable = false)
    private int capacity;

    @Column(name = "bus_route", nullable = false, length = 100)
    private String route;  // e.g., "City Center to Campus"

    @Column(name = "bus_timings", nullable = false, length = 50)
    private String timings; // e.g., "8:00 AM - 6:00 PM"

    // Getters & Setters
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getBusNumber() {
        return busNumber;
    }
    public void setBusNumber(String busNumber) {
        this.busNumber = busNumber;
    }

    public String getDriverName() {
        return driverName;
    }
    public void setDriverName(String driverName) {
        this.driverName = driverName;
    }

    public int getCapacity() {
        return capacity;
    }
    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getRoute() {
        return route;
    }
    public void setRoute(String route) {
        this.route = route;
    }

    public String getTimings() {
        return timings;
    }
    public void setTimings(String timings) {
        this.timings = timings;
    }

    @Override
    public String toString() {
        return "Bus [id=" + id + ", busNumber=" + busNumber + ", driverName=" + driverName 
                + ", capacity=" + capacity + ", route=" + route + ", timings=" + timings + "]";
    }
}
