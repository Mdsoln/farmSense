package com.borlaughX.models;

import lombok.*;

import java.util.Map;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class SoilHealthResponse {
    private String soilHealthPrediction;
    private Map<String, String> recommendations;
}
