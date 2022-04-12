package com.kvestado.backend.controller;

import com.kvestado.backend.dto.CampaignDTO;
import com.kvestado.backend.dto.ContributionDTO;
import com.kvestado.backend.exception.OperationNotAllowedException;
import com.kvestado.backend.service.CampaignService;
import com.kvestado.backend.service.ContributionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/contract/api")
@CrossOrigin(origins = {"http://localhost:8081","https://kvestado.vercel.app"}, methods = {RequestMethod.OPTIONS},
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
        try {
            campaignService.createNewCampaign(campaignDTO,authentication);
        }catch (OperationNotAllowedException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }catch (Exception ex){
            ex.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/add_contribution")
    @CrossOrigin(methods = RequestMethod.POST)
    public ResponseEntity<String> addContribution(@RequestBody(required = true) ContributionDTO contributionDTO, Authentication authentication) {
        if(authentication == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        try {
            contributionService.addContribution(contributionDTO,authentication);
        }catch (OperationNotAllowedException ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }catch (Exception ex){
            ex.printStackTrace();
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/get_my_campaigns")
    @CrossOrigin(methods = RequestMethod.GET)
    public ResponseEntity<Page<CampaignDTO>> getUserCampaigns(@RequestParam(required = true) int offset,@RequestParam(required = true) int pageSize, Authentication authentication) {
        if(authentication == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        Page<CampaignDTO> page = new PageImpl<CampaignDTO>(new ArrayList<>());
       try {
           page = campaignService.getUserCampaigns(authentication,offset,pageSize);
       }catch (Exception ex) {
           ex.printStackTrace();
           return ResponseEntity.badRequest().build();
       }
        return ResponseEntity.ok(page);
    }

    @GetMapping("/get_my_contributions")
    @CrossOrigin(methods = RequestMethod.GET)
    public ResponseEntity<Page<ContributionDTO>> getUserContributions(@RequestParam(required = true) int offset,@RequestParam(required = true) int pageSize, Authentication authentication) {
        if(authentication == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        Page<ContributionDTO> page = new PageImpl<ContributionDTO>(new ArrayList<>());
        try {
            page = contributionService.getUserContributions(authentication,offset,pageSize);
        }catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(page);
    }

    @GetMapping("/get_campaigns")
    @CrossOrigin(methods = RequestMethod.GET)
    public ResponseEntity<Page<CampaignDTO>> getCampaigns(@RequestParam(required = true) int offset,@RequestParam(required = true) int pageSize) {
         Page<CampaignDTO> page = new PageImpl<CampaignDTO>(new ArrayList<>());
       try {
           page = campaignService.getCampaignsPage(offset,pageSize);
       }catch (Exception ex) {
           ex.printStackTrace();
           return ResponseEntity.badRequest().build();
       }
        return ResponseEntity.ok(page);
    }
    @GetMapping("/get_campaign")
    @CrossOrigin(methods = RequestMethod.GET)
    public ResponseEntity<CampaignDTO> getCampaigns(@RequestParam(required = true) String slug) {
         CampaignDTO campaign = null;
       try {
           campaign = campaignService.getCampaign(slug);
       }catch (Exception ex) {
           ex.printStackTrace();
           return ResponseEntity.badRequest().build();
       }
       if(campaign == null) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(campaign);
    }






}
