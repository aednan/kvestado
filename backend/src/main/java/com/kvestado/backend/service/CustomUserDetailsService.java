package com.kvestado.backend.service;

import com.kvestado.backend.dao.UserRepository;
import com.kvestado.backend.model.User;
import com.kvestado.backend.security.ECSignatureVerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String walletAddress) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findById(walletAddress);
        optionalUser.orElseThrow( () -> new UsernameNotFoundException("Bad Credentials"));
        return optionalUser.get();
    }

    public void createUser(String walletAddress) {
        User user = new User();
        user.setUsername(walletAddress);
        user.setPassword(ECSignatureVerificationService.generateChallengeMessage());
        userRepository.save(user);
    }

    public boolean userExists(String walletAddress) {
        return userRepository.existsById(walletAddress);
    }

//    public void updateUser(){
//    }

}
