package com.klef.dev.service;

import java.util.List;
import com.klef.dev.entity.Bus;

public interface BusService {
    Bus addBus(Bus bus);
    List<Bus> getAllBuses();
    Bus getBusById(int id);
    Bus updateBus(Bus bus);
    void deleteBusById(int id);
}
