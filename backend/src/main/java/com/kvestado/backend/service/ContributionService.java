package com.kvestado.backend.service;

import com.kvestado.backend.dao.ContributionRepository;
import com.kvestado.backend.dto.CampaignDTO;
import com.kvestado.backend.dto.ContributionDTO;
import com.kvestado.backend.exception.OperationNotAllowedException;
import com.kvestado.backend.model.Campaign;
import com.kvestado.backend.model.Contribution;
import com.kvestado.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContributionService {

    @Autowired
    ContributionRepository contributionRepository;

        public Page<ContributionDTO> getUserContributions(Authentication authentication, int offset, int pageSize ){
            List<ContributionDTO> contributionDTOs = new ArrayList<>();
            Page<Contribution> contributions = contributionRepository.findByUser(new User(authentication.getName()), PageRequest.of(offset,pageSize));
            contributions
                    .stream().parallel().forEach(contribution -> {
                        contributionDTOs.add(contributionToContributionDTO(contribution));
                    });
            return new PageImpl<ContributionDTO>(contributionDTOs,contributions.getPageable(),contributions.getTotalPages());
        }

    private ContributionDTO contributionToContributionDTO(Contribution contribution) {
            return new ContributionDTO(
                    contribution.getCampaignId(),
                    contribution.getCampaignOwnerWalletAddress(),
                    contribution.getAmount()
            );
    }

    public void addContribution(ContributionDTO contributionDTO, Authentication authentication) throws OperationNotAllowedException {
          checkContributionValidity(contributionDTO);
          Contribution contribution = new Contribution(
          contributionDTO.getCampaignId(),
          contributionDTO.getCampaignOwnerWalletAddress(),
          contributionDTO.getAmount(),
          new User(authentication.getName())
          );

          contributionRepository.save(contribution);
      }

    public void checkContributionValidity(ContributionDTO contributionDTO) throws OperationNotAllowedException {
        if (contributionDTO.getCampaignId() == null){
            throw new OperationNotAllowedException("missing_campaignId_value");
        }
        if (contributionDTO.getAmount() == null){
            throw new OperationNotAllowedException("missing_amount_value");
        }
        if (contributionDTO.getCampaignOwnerWalletAddress() == null
                || contributionDTO.getCampaignOwnerWalletAddress().isBlank()
                || contributionDTO.getCampaignOwnerWalletAddress().isEmpty()){
            throw new OperationNotAllowedException("missing_campaignOwnerWalletAddress_value");
        }
    }
}
