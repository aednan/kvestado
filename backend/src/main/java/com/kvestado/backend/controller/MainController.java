package com.kvestado.backend.controller;

import com.kvestado.backend.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"}, methods = {RequestMethod.OPTIONS},
        allowCredentials = "true", allowedHeaders = {"*"})
public class MainController {

    @Autowired
    CustomUserDetailsService customUserDetailsService;

    @PostMapping("/login")
    @CrossOrigin(methods = RequestMethod.POST)
    public ResponseEntity<String> login(HttpServletResponse response) {
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/logout")
    @CrossOrigin(methods = RequestMethod.POST)
    public void logout() {}

    // to be removed: only for testing
    @GetMapping("/")
    @CrossOrigin(methods = RequestMethod.GET)
    public ResponseEntity<String> testingRes() {
        return ResponseEntity.ok("12345");
    }

    @GetMapping("/request_challenge")
    @CrossOrigin(methods = RequestMethod.GET)
    public ResponseEntity<String> challengeRequest(@RequestParam(required = true, name = "wallet_address") String walletAddress) {
        String challenge = "";
        if (walletAddress == null
                || walletAddress.isBlank()
                || walletAddress.isEmpty()) {
            return ResponseEntity.badRequest().body("missing_walletAddress_value");
        }
        try {
            challenge = customUserDetailsService.requestChallengeMessage(walletAddress);
            return ResponseEntity.ok(challenge);
        } catch (BadCredentialsException ex) {
            challenge = customUserDetailsService.createUser(walletAddress);
            return ResponseEntity.ok(challenge);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Please try again later");
        }
    }

    @GetMapping("/userinfo")
    @CrossOrigin(methods = RequestMethod.GET)
    public ResponseEntity<String> userInfo(Authentication authentication) {
        return ResponseEntity.ok().body(authentication.getName());
    }



 }


