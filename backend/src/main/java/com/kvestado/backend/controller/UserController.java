package com.kvestado.backend.controller;

import com.kvestado.backend.dto.UProfileDTO;
import com.kvestado.backend.dto.UserInfo;
import com.kvestado.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = {"http://localhost:8081"}, methods = {RequestMethod.OPTIONS},
        allowCredentials = "true", allowedHeaders = {"*"})
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/profile")
    @CrossOrigin(methods = RequestMethod.POST)
    public ResponseEntity<String> editProfile(@RequestBody(required = true) UProfileDTO profile, Authentication authentication) {
        userService.saveUserProfile(profile,authentication);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/check_username")
    @CrossOrigin(methods = RequestMethod.GET)
    public ResponseEntity<Boolean> isValidUsername(@RequestParam(required = true)String username, Authentication authentication) {
        if(username.length() < 3 || username.length() > 20) return ResponseEntity.ok(false);
        // Should start with a letter and contains only allowed characters (-,_,letters,numbers)
        if(!username.toLowerCase().matches("^[a-z][a-z0-9\\-\\_]+$")) return ResponseEntity.ok(false);
        if(username.toUpperCase().matches("\\b(ADMIN|USER|ROOT|MANAGER|HELP|SUPPORT|INFO)\\b")) return ResponseEntity.ok(false);
        return ResponseEntity.ok(userService.usernameIsValid(username, authentication));
    }

    @GetMapping("/userinfo")
    @CrossOrigin(methods = RequestMethod.GET)
    public ResponseEntity<UserInfo> userInfo(Authentication authentication) {
        UserInfo userInfo = userService.getUserInfo(authentication);
//                new UserInfo("XX","A@A.COM","sdjkf","/sjd", LocalDate.parse("2020-01-07"),true);
        return ResponseEntity.ok().body(userInfo);
    }

}
