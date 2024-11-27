package com.borlaughX.models;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class SoilHealthRequest {
    private double saturation;
    private double organicCarbon;
    private double soilPh;
    private double nitrogenLevel;
    private double phosphorusLevel;
    private double potassiumLevel;
    private double salinity;
    private double oxygenLevel;
}
