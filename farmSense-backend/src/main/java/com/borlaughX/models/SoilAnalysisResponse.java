package com.borlaughX.models;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class SoilAnalysisResponse {
    private String analysisResult;
    private String problemIdentified;
    private String recommendations;
    private String irrigationPlan;
    private String fertilizerUsage;

}
