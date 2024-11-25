package com.borlaughX.controller;

import com.borlaughX.models.SoilAnalysisResponse;
import com.borlaughX.service.SoilDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin()
@RestController
@RequestMapping("/api/v1/borlaughX/farm-sense")
@RequiredArgsConstructor
public class FarmSenseController {

    private final SoilDataService soilDataService;

    @GetMapping("/farm/{farmId}/soil-analysis")
    public SoilAnalysisResponse getSoilAnalysis(@PathVariable String farmId) {
        return soilDataService.fetchSoilData(farmId);
    }
}
