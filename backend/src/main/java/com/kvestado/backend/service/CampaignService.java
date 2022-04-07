package com.kvestado.backend.service;

import com.kvestado.backend.dao.CampaignRepository;
import com.kvestado.backend.dto.CampaignDTO;
import com.kvestado.backend.model.Campaign;
import com.kvestado.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
               new User(authentication.getName()),
               campaignDTO.getSlug(),
               LocalDate.now()
       );
       campaignRepository.save(campaign);
   }

   public Page<CampaignDTO> getPage(int offset, int pageSize){
       List<CampaignDTO> campaignDTOs = new ArrayList<>();
       campaignRepository.findAll()
               .stream().parallel().forEach(campaign -> {
                   campaignDTOs.add(campaignToCampaignDTO(campaign));
               });

     return new PageImpl<CampaignDTO>(campaignDTOs);
   }

    public CampaignDTO getCampaign(String slug) {
       Optional<Campaign> campaign = campaignRepository.findBySlug(slug);
       if(campaign.isPresent())
           return campaignToCampaignDTO(campaign.get());
      return null;
    }


    private CampaignDTO campaignToCampaignDTO(Campaign campaign){
       return new CampaignDTO(
               campaign.getId(),
               campaign.getCoverPicturePath(),
               campaign.getTitle(),
               campaign.getDescription(),
               campaign.getBeneficiaryAddress(),
               campaign.getExpireAfter(),
               campaign.getAmount(),
               campaign.getMinimumRaisedValueRequired(),
               campaign.getSlug(),
               campaign.getCreatedAt()==null?"":campaign.getCreatedAt().toString()
       );
    }
}
