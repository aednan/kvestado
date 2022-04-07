package com.kvestado.backend.service;

import com.kvestado.backend.dao.ContributionRepository;
import com.kvestado.backend.dto.ContributionDTO;
import com.kvestado.backend.model.Contribution;
import com.kvestado.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class ContributionService {

    @Autowired
    ContributionRepository contributionRepository;

      public void addContribution(ContributionDTO contributionDTO, Authentication authentication){

          Contribution contribution = new Contribution(
          contributionDTO.getCampaignId(),
          contributionDTO.getCampaignOwnerWalletAddress(),
          contributionDTO.getAmount(),
          new User(authentication.getName())
          );

          contributionRepository.save(contribution);
      }
}
