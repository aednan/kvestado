package com.kvestado.backend.service;

import com.kvestado.backend.dao.CampaignRepository;
import com.kvestado.backend.dto.CampaignDTO;
import com.kvestado.backend.exception.OperationNotAllowedException;
import com.kvestado.backend.model.Campaign;
import com.kvestado.backend.model.PendingTransaction;
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
    @Autowired
    Web3Service web3Service;

   public void createNewCampaign(CampaignDTO campaignDTO, Authentication authentication) throws OperationNotAllowedException {
       checkCampaignValidity(campaignDTO);
       LocalDate createdAt = LocalDate.now();

       Campaign campaign = new Campaign(
               campaignDTO.getTransactionHash(),
               null,
               campaignDTO.getCoverPicturePath(),
               campaignDTO.getTitle(),
               campaignDTO.getDescription(),
               campaignDTO.getBeneficiaryAddress(),
               campaignDTO.getExpireAfter(),
               campaignDTO.getAmount(),
               campaignDTO.getMinimumRaisedValueRequired(),
               new User(authentication.getName()),
               campaignDTO.getSlug(),
               createdAt,
               false
       );
       campaignRepository.save(campaign);
       web3Service.addAPendingTransaction(new PendingTransaction(campaignDTO.getTransactionHash(),createdAt));
   }

   public Page<CampaignDTO> getCampaignsPage(int page, int pageSize, boolean random){
       List<CampaignDTO> campaignDTOs = new ArrayList<>();
      // ,Sort.Direction.ASC, "transactionHash"
       Page<Campaign> pCampaigns = campaignRepository.findAll(PageRequest.of(page,pageSize));
       if(random){
           pCampaigns.stream().parallel().filter(Campaign::getValid).forEach(campaign -> {
                   campaignDTOs.add(campaignToCampaignDTO(campaign));
               });
       }else{
           pCampaigns.stream().sequential().filter(Campaign::getValid).forEach(campaign -> {
                   campaignDTOs.add(campaignToCampaignDTO(campaign));
               });}
     return new PageImpl<CampaignDTO>(campaignDTOs,pCampaigns.getPageable(),pCampaigns.getTotalElements());
   }

    public CampaignDTO getCampaign(String slug) {
       Optional<Campaign> campaign = campaignRepository.findBySlug(slug);
       if(campaign.isPresent() && campaign.get().getValid())
           return campaignToCampaignDTO(campaign.get());
      return null;
    }


    private CampaignDTO campaignToCampaignDTO(Campaign campaign){
       return new CampaignDTO(
               campaign.getTransactionHash(),
               campaign.getCampaignId()==null?null:campaign.getCampaignId().toString(),
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

        if ( campaignDTO.getTransactionHash() == null ||
                campaignDTO.getTransactionHash().isEmpty() || campaignDTO.getTransactionHash().isBlank()){
            throw new OperationNotAllowedException("missing_transactionHash_value");
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
                .stream().parallel().filter(Campaign::getValid).forEach(campaign -> {
                    campaignDTOs.add(campaignToCampaignDTO(campaign));
                });
        return new PageImpl<CampaignDTO>(campaignDTOs,campaigns.getPageable(),campaigns.getTotalElements());
    }

    // For server side rendering in the frontend
    public List<String> getCampaignsSlugs () {
        return campaignRepository.findAll().parallelStream().filter(Campaign::getValid).map(campaign -> "/campaigns/" + campaign.getSlug()).collect(Collectors.toList());
    }
}
