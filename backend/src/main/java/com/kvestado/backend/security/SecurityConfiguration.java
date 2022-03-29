package com.kvestado.backend.security;

import com.kvestado.backend.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@Configuration
public class SecurityConfiguration {

    @Autowired
    CustomAuthenticationProvider authenticationProvider;
//    @Autowired
//    CustomUsernamePasswordFilter customUsernamePasswordFilter;
//    @Autowired
//    CustomSessionAuthenticationStrategy customSessionAuthenticationStrategy;

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http.httpBasic().and().authenticationProvider(authenticationProvider)
                .authorizeRequests(authorizeRequests ->
                        authorizeRequests
                                .mvcMatchers("/join","/login","/error").permitAll()
                                .anyRequest().authenticated()
                ).sessionManagement().sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                .and().cors()
                .and().csrf().ignoringAntMatchers("/join")
                .and().logout().logoutUrl("/logout");
        return http.build();
    }

    @Bean
    UserDetailsService userDetailsService() {
        return new CustomUserDetailsService();
    }

    @Bean
    PasswordEncoder passwordEncoder (){
        return NoOpPasswordEncoder.getInstance();
    }


}
