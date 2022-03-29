package com.kvestado.backend.controller;

import com.kvestado.backend.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @Autowired
    CustomUserDetailsService customUserDetailsService;

    @PostMapping("/join")
    public ResponseEntity<String> join(
            @RequestBody(required = true) String walletAddress
    ){
        if (walletAddress == null
                || walletAddress.isBlank()
                || walletAddress.isEmpty()){
            return ResponseEntity.badRequest().body("missing_walletAddress_value");
        }

        if(customUserDetailsService.userExists(walletAddress))
            return ResponseEntity.badRequest().body("user_exist");

        customUserDetailsService.createUser(walletAddress);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }




}


