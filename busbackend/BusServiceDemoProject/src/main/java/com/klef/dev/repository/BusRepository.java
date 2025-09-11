package com.klef.dev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.klef.dev.entity.Bus;

public interface BusRepository extends JpaRepository<Bus, Integer> {
    // Extra custom queries if needed
}
