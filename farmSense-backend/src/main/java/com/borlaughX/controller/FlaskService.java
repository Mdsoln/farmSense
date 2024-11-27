package com.borlaughX.controller;

import com.borlaughX.models.SoilHealthRequest;
import com.borlaughX.models.SoilHealthResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;

@Service
public class FlaskService {

    @Value("${flask.api.url}")
    private String flaskApiUrl; // The URL where your Flask app is running (e.g., "http://localhost:5000/predict")

    private final RestTemplate restTemplate;

    public FlaskService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public SoilHealthResponse getSoilHealthPrediction(SoilHealthRequest request) {
        // Prepare request headers and body
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        HttpEntity<SoilHealthRequest> entity = new HttpEntity<>(request, headers);

        // Call Flask API
        ResponseEntity<SoilHealthResponse> responseEntity = restTemplate.exchange(
                flaskApiUrl,
                HttpMethod.POST,
                entity,
                SoilHealthResponse.class
        );

        return responseEntity.getBody();
    }
}
