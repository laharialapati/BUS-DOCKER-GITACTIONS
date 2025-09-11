package com.klef.dev;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class BusServiceProjectApplication extends SpringBootServletInitializer
{
    public static void main(String[] args) {
        SpringApplication.run(BusServiceProjectApplication.class, args);
        System.out.println("Bus Service Management Project is Running ...");
    }
}
