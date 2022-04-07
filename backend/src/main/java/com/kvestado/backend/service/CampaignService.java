package com.kvestado.backend.service;

import com.kvestado.backend.dao.CampaignRepository;
import com.kvestado.backend.dto.CampaignDTO;
import com.kvestado.backend.model.Campaign;
import com.kvestado.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class CampaignService {

    @Autowired
    CampaignRepository campaignRepository;

   public void createNewCampaign(CampaignDTO campaignDTO, Authentication authentication){

       Campaign campaign = new Campaign(
               campaignDTO.getId(),
               campaignDTO.getCoverPicturePath(),
               campaignDTO.getTitle(),
               campaignDTO.getDescription(),
               campaignDTO.getBeneficiaryAddress(),
               campaignDTO.getExpireAfter(),
               campaignDTO.getAmount(),
               campaignDTO.getMinimumRaisedValueRequired(),
               new User(authentication.getName())
       );
       campaignRepository.save(campaign);
   }


}
