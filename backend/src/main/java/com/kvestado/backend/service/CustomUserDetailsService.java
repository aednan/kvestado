package com.kvestado.backend.service;

import com.kvestado.backend.dao.EmailSubscriberRepository;
import com.kvestado.backend.dao.UserRepository;
import com.kvestado.backend.exception.OperationNotAllowedException;
import com.kvestado.backend.model.EmailSubscriber;
import com.kvestado.backend.model.User;
import com.kvestado.backend.security.ECSignatureVerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    EmailSubscriberRepository emailSubscriberRepository;

    @Override
    public UserDetails loadUserByUsername(String walletAddress) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findById(walletAddress);
        optionalUser.orElseThrow( () -> new UsernameNotFoundException("Bad Credentials"));
        return optionalUser.get();
    }

    public String createUser(String walletAddress) {
        String challengeMessage = ECSignatureVerificationService.generateChallengeMessage();
        User user = new User();
        user.setUsername(walletAddress);
        user.setPassword(challengeMessage);
        userRepository.save(user);
        return challengeMessage;
    }

    public boolean userExists(String walletAddress) {
        return userRepository.existsById(walletAddress);
    }
    public String requestChallengeMessage(String walletAddress) {
        Optional<User> user = userRepository.findById(walletAddress);
        if(user.isPresent())
            return user.get().getPassword();
        throw new BadCredentialsException("User doesn't exist");
    }

    public void subscribeNewsletter(EmailSubscriber emailSubscriber) throws OperationNotAllowedException {
        if(emailSubscriber.getEmail() == null || emailSubscriber.getEmail().isEmpty() || emailSubscriber.getEmail().isBlank()) throw new OperationNotAllowedException("Email is required");
        emailSubscriberRepository.save(emailSubscriber);
    }

}
