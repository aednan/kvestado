package com.kvestado.backend.security;

import com.kvestado.backend.dao.UserRepository;
import com.kvestado.backend.model.Campaign;
import com.kvestado.backend.model.Contribution;
import com.kvestado.backend.model.UAuthority;
import com.kvestado.backend.model.User;
import com.kvestado.backend.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    CustomUserDetailsService userDetailsService;
    @Autowired
    UserRepository userRepository;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        //authentication.getCredentials() is the hashedMessage sent by the client
        UserDetails userDetails = userDetailsService.loadUserByUsername(authentication.getName());

        try {

            if(!userDetails.isAccountNonExpired()){
                throw new BadCredentialsException("Account is expired");
            }
            if(!userDetails.isAccountNonLocked()){
                throw new BadCredentialsException("Account is locked");
            }
            if(!userDetails.isCredentialsNonExpired()){
                throw new BadCredentialsException("Credentials expired");
            }
            if(!userDetails.isEnabled()){
                throw new BadCredentialsException("Account is disabled");
            }

            if(ECSignatureVerificationService.verifyMessageSignature(
                    userDetails.getUsername(),
                    userDetails.getPassword(),
                    authentication.getCredentials().toString()))
            {
                // update user ChallengeMessage = One time Password
                List<UAuthority> uAuthorities = new ArrayList<>();
                userDetails.getAuthorities().forEach(authority -> {
                    uAuthorities.add(new UAuthority(authority.getAuthority()));
                });

                User user = new User(
                        userDetails.getUsername(),
                        ECSignatureVerificationService.generateChallengeMessage(),
                        userDetails.isAccountNonExpired(),
                        userDetails.isAccountNonLocked(),
                        userDetails.isCredentialsNonExpired(),
                        userDetails.isEnabled(),
                        uAuthorities,
                        new ArrayList<Contribution>(),
                        new ArrayList<Campaign>()
                );

                userRepository.save(user);
                return new UsernamePasswordAuthenticationToken(userDetails.getUsername(),userDetails.getPassword(),userDetails.getAuthorities());
            }

        }catch (NullPointerException e) {
            throw new BadCredentialsException("Code:W25SE57F");
        } catch (IOException e) {
            throw new BadCredentialsException("Code:IO25SE57F");
        }
        throw new BadCredentialsException("Bad Credentials");

    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.equals(authentication);
    }
}
