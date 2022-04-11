package com.kvestado.backend.controller;

import com.kvestado.backend.dto.UProfileDTO;
import com.kvestado.backend.dto.UserInfo;
import com.kvestado.backend.exception.OperationNotAllowedException;
import com.kvestado.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = {"http://localhost:8081","https://kvestado.vercel.app"}, methods = {RequestMethod.OPTIONS},
        allowCredentials = "true", allowedHeaders = {"*"})
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/profile")
    @CrossOrigin(methods = RequestMethod.POST)
    public ResponseEntity<String> editProfile(@RequestBody(required = true) UProfileDTO profile, Authentication authentication) {
        if(authentication == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        try {
            userService.saveUserProfile(profile,authentication);
        }catch (OperationNotAllowedException ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }catch (Exception ex){
            ex.printStackTrace();
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/check_username")
    @CrossOrigin(methods = RequestMethod.GET)
    public ResponseEntity<Boolean> isValidUsername(@RequestParam(required = true)String username, Authentication authentication) {
        if(authentication == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if(username.length() < 3 || username.length() > 20) return ResponseEntity.ok(false);
        // Should start with a letter and contains only allowed characters (-,_,letters,numbers)
        if(!username.trim().toLowerCase().matches("^[a-z][a-z0-9\\-\\_]+$")) return ResponseEntity.ok(false);
        if(username.trim().toUpperCase().matches("\\b(ADMIN|USER|ROOT|MANAGER|HELP|SUPPORT|INFO)\\b")) return ResponseEntity.ok(false);
        return ResponseEntity.ok(userService.usernameIsValid(username, authentication));
    }

    @GetMapping("/userinfo")
    @CrossOrigin(methods = RequestMethod.GET)
    public ResponseEntity<UserInfo> userInfo(Authentication authentication) {
        if(authentication == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        UserInfo userInfo = userService.getUserInfo(authentication);
        return ResponseEntity.ok().body(userInfo);
    }

}
