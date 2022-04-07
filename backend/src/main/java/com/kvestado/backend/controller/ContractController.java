package com.kvestado.backend.controller;

import com.kvestado.backend.dto.CampaignDTO;
import com.kvestado.backend.dto.ContributionDTO;
import com.kvestado.backend.service.CampaignService;
import com.kvestado.backend.service.ContributionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contract/api")
@CrossOrigin(origins = {"http://localhost:8081"}, methods = {RequestMethod.OPTIONS},
        allowCredentials = "true", allowedHeaders = {"*"})
public class ContractController {

    @Autowired
    CampaignService campaignService;
    @Autowired
    ContributionService contributionService;

    @PostMapping("/add_campaign")
    @CrossOrigin(methods = RequestMethod.POST)
    public ResponseEntity<String> addCampaign(@RequestBody(required = true) CampaignDTO campaignDTO, Authentication authentication) {
        if(authentication == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        campaignService.createNewCampaign(campaignDTO,authentication);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/add_contribution")
    @CrossOrigin(methods = RequestMethod.POST)
    public ResponseEntity<String> addContribution(@RequestBody(required = true) ContributionDTO contributionDTO, Authentication authentication) {
        if(authentication == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        contributionService.addContribution(contributionDTO,authentication);
        return ResponseEntity.noContent().build();
    }




}
