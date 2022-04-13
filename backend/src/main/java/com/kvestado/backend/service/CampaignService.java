package com.kvestado.backend.service;

import com.kvestado.backend.dao.CampaignRepository;
import com.kvestado.backend.dto.CampaignDTO;
import com.kvestado.backend.exception.OperationNotAllowedException;
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
import java.util.stream.Collectors;

@Service
public class CampaignService {

    @Autowired
    CampaignRepository campaignRepository;

   public void createNewCampaign(CampaignDTO campaignDTO, Authentication authentication) throws OperationNotAllowedException {
       checkCampaignValidity(campaignDTO);
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

   public Page<CampaignDTO> getCampaignsPage(int offset, int pageSize){
       List<CampaignDTO> campaignDTOs = new ArrayList<>();
       Page<Campaign> pCampaigns = campaignRepository.findAll(PageRequest.of(offset,pageSize));
       pCampaigns
               .stream().parallel().forEach(campaign -> {
                   campaignDTOs.add(campaignToCampaignDTO(campaign));
               });

     return new PageImpl<CampaignDTO>(campaignDTOs,pCampaigns.getPageable(),pCampaigns.getTotalPages());
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
               campaign.getUser().getUsername(),
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

    public void checkCampaignValidity(CampaignDTO campaignDTO) throws OperationNotAllowedException {

        if (campaignDTO.getId() == null){
            throw new OperationNotAllowedException("missing_id_value");
        }
        if (campaignDTO.getAmount() == null){
            throw new OperationNotAllowedException("missing_amount_value");
        }
        if (campaignDTO.getExpireAfter() == null){
            throw new OperationNotAllowedException("missing_expireAfter_value");
        }
        if (campaignDTO.getMinimumRaisedValueRequired() == null){
            throw new OperationNotAllowedException("missing_minimumRaisedValueRequired_value");
        }
        if (campaignDTO.getTitle() == null
               || campaignDTO.getTitle().isBlank() || campaignDTO.getTitle().isEmpty()){
            throw new OperationNotAllowedException("missing_title_value");
        }
        if (campaignDTO.getDescription() == null
               || campaignDTO.getDescription().isBlank() || campaignDTO.getDescription().isEmpty()){
            throw new OperationNotAllowedException("missing_description_value");
        }
        if (campaignDTO.getDescription() == null
               || campaignDTO.getBeneficiaryAddress().isBlank() || campaignDTO.getBeneficiaryAddress().isEmpty()){
            throw new OperationNotAllowedException("missing_beneficiaryAddress_value");
        }
        if (campaignDTO.getDescription() == null
               || campaignDTO.getBeneficiaryAddress().isBlank() || campaignDTO.getBeneficiaryAddress().isEmpty()){
            throw new OperationNotAllowedException("missing_beneficiaryAddress_value");
        }
        if (campaignDTO.getSlug() == null
               || campaignDTO.getSlug().isBlank() || campaignDTO.getSlug().isEmpty()){
            throw new OperationNotAllowedException("missing_slug_value");
        }
    }


    public Page<CampaignDTO> getUserCampaigns(Authentication authentication, int offset, int pageSize ){
       List<CampaignDTO> campaignDTOs = new ArrayList<>();
       Page<Campaign> campaigns = campaignRepository.findByUser(new User(authentication.getName()),PageRequest.of(offset,pageSize));
        campaigns
                .stream().parallel().forEach(campaign -> {
                    campaignDTOs.add(campaignToCampaignDTO(campaign));
                });
        return new PageImpl<CampaignDTO>(campaignDTOs,campaigns.getPageable(),campaigns.getTotalPages());
    }

    // For server side rendering in the frontend
    public List<String> getCampaignsSlugs () {
        return campaignRepository.findAll().parallelStream().map(campaign -> "/campaigns/" + campaign.getSlug()).collect(Collectors.toList());
    }
}
