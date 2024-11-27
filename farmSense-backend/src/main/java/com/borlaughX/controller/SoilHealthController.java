package com.borlaughX.controller;

import com.borlaughX.models.SoilHealthRequest;
import com.borlaughX.models.SoilHealthResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/soil-health")
public class SoilHealthController {
    private final FlaskService flaskService;

    public SoilHealthController(FlaskService flaskService) {
        this.flaskService = flaskService;
    }

    @PostMapping("/predict")
    public SoilHealthResponse predictSoilHealth(@RequestBody SoilHealthRequest request) {
        return flaskService.getSoilHealthPrediction(request);
    }
}
