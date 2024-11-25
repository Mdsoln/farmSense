package com.borlaughX.service;

import com.borlaughX.models.SoilAnalysisResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class SoilDataService {

    @Value("${python.api.url}")
    private String pythonApiUrl; // e.g., http://localhost:8000
    private final RestTemplate restTemplate;

    public SoilAnalysisResponse fetchSoilData(String farmId) {
        String url = pythonApiUrl + "/processed-data/" + farmId;

        try {
            return restTemplate.getForObject(url, SoilAnalysisResponse.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch data from Python API", e);
        }
    }
}
