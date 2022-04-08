package com.kvestado.backend.security;

import com.kvestado.backend.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import javax.servlet.http.HttpServletResponse;


@EnableWebSecurity
@Configuration
public class SecurityConfiguration {

    @Autowired
    CustomAuthenticationProvider authenticationProvider;

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {

        http.httpBasic().and().authenticationProvider(authenticationProvider)
                .authorizeRequests(authorizeRequests ->
                        authorizeRequests
                                .mvcMatchers("/request_challenge" ).permitAll()
                                .mvcMatchers(HttpMethod.GET,"/contract/api/get_campaigns" ).permitAll()
                                .mvcMatchers(HttpMethod.GET,"/contract/api/get_campaign" ).permitAll()
                                .anyRequest().authenticated()
                )
                .cors()
                .and().csrf()
                .csrfTokenRepository(cookieCsrfTokenRepository())
                .ignoringAntMatchers("/login")
                .and()
                .logout( logout -> {
                    logout.logoutUrl("/logout")
                            .logoutSuccessHandler((request, response, authentication) -> {
                                response.setStatus(HttpServletResponse.SC_NO_CONTENT);
                            });
                });

        return http.build();
    }

    @Bean
    UserDetailsService userDetailsService() {
        return new CustomUserDetailsService();
    }

//    @Bean
//    PasswordEncoder passwordEncoder (){
//        return NoOpPasswordEncoder.getInstance();
//    }

    @Bean
    CookieCsrfTokenRepository cookieCsrfTokenRepository(){
        CookieCsrfTokenRepository cookieCsrfTokenRepository = new CookieCsrfTokenRepository();
        cookieCsrfTokenRepository.setCookieHttpOnly(false);
        cookieCsrfTokenRepository.setCookieMaxAge(-1);
        cookieCsrfTokenRepository.setSecure(true);
        return cookieCsrfTokenRepository;
    }
}
