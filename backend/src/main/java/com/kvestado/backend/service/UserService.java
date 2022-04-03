package com.kvestado.backend.service;

import com.kvestado.backend.dao.UProfileRepository;
import com.kvestado.backend.dao.USettingsPreferenceRepository;
import com.kvestado.backend.dto.UProfileDTO;
import com.kvestado.backend.dto.UserInfo;
import com.kvestado.backend.model.UProfile;
import com.kvestado.backend.model.USettingsPreference;
import com.kvestado.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UProfileRepository uProfileRepository;
    @Autowired
    USettingsPreferenceRepository uSettingsPreferenceRepository;

    public void saveUserProfile(UProfileDTO profile, Authentication authentication) {

        Optional<UProfile> uProfilePersistence = uProfileRepository.findByUser(new User(authentication.getName()));
        if (uProfilePersistence.isPresent()) {
            uProfilePersistence.get().setAbout(profile.getAbout());
            uProfilePersistence.get().setEmail(profile.getEmail().toLowerCase());
            uProfilePersistence.get().setPictureUrl(profile.getPictureUrl());
            uProfileRepository.save(uProfilePersistence.get());
        } else {
            UProfile uProfile = new UProfile(profile.getUsername().toLowerCase(), profile.getEmail().toLowerCase()
                    , profile.getAbout(), LocalDate.now()
                    , profile.getPictureUrl(), new User(authentication.getName()));
            uProfileRepository.save(uProfile);
        }
    }

    public boolean usernameIsValid(String username, Authentication authentication) {
        Optional<UProfile> uProfile = uProfileRepository.findById(username);
        if(!uProfile.isPresent()) return true;
        if(uProfile.isPresent() && uProfile.get().getUser().getUsername().equalsIgnoreCase(authentication.getName())){
            return true;
        }
        // if present => false
        return false;
    }

    public UserInfo getUserInfo(Authentication authentication) {
        UserInfo userInfo = new UserInfo();
        Optional<USettingsPreference> uSettingsPreference = uSettingsPreferenceRepository.findById(authentication.getName());
        Optional<UProfile> uProfile = uProfileRepository.findByUser(new User(authentication.getName()));
        if (uProfile.isPresent()) {
            userInfo.setUsername(uProfile.get().getUsername());
            userInfo.setEmail(uProfile.get().getEmail());
            userInfo.setAbout(uProfile.get().getAbout());
            userInfo.setJoined(uProfile.get().getJoined()==null?null:uProfile.get().getJoined().toString());
            userInfo.setPictureUrl(uProfile.get().getPictureUrl());
        }
        if (uSettingsPreference.isPresent()) {
            userInfo.setNightMode(uSettingsPreference.get().getNightMode());
        }
        return userInfo;
    }


}
