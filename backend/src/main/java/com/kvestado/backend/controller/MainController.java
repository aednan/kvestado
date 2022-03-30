package com.kvestado.backend.controller;

import com.kvestado.backend.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class MainController {

    @Autowired
    CustomUserDetailsService customUserDetailsService;

//    @PostMapping("/join")
//    public ResponseEntity<String> join(
//            @RequestBody(required = true) String walletAddress
//    ){
//        if (walletAddress == null
//                || walletAddress.isBlank()
//                || walletAddress.isEmpty()){
//            return ResponseEntity.badRequest().body("missing_walletAddress_value");
//        }
//
//        if(customUserDetailsService.userExists(walletAddress))
//            return ResponseEntity.badRequest().body("user_exist");
//
//        customUserDetailsService.createUser(walletAddress);
//
//        return new ResponseEntity<>(HttpStatus.CREATED);
//    }

    @GetMapping("/request_challenge")
    public ResponseEntity<String> challengeRequest(@RequestParam(required = true, name = "wallet_address") String walletAddress){
        if (walletAddress == null
                || walletAddress.isBlank()
                || walletAddress.isEmpty()){
            return ResponseEntity.badRequest().body("missing_walletAddress_value");
        }
       try {
           return ResponseEntity.ok(customUserDetailsService.requestChallengeMessage(walletAddress));
       }catch (BadCredentialsException ex){
           return ResponseEntity.ok(customUserDetailsService.createUser(walletAddress));
       }catch (Exception e){
           return ResponseEntity.badRequest().body("Please try again later");
       }
    }


}


