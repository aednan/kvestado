package com.kvestado.backend.security;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author ADNAN <ADNAN.E@TUTANOTA.DE>
 */

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CustomCORSFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        if (request.getHeader(HttpHeaders.ORIGIN) != null &&
                (request.getHeader(HttpHeaders.ORIGIN).equals("http://localhost:3000"))
        ) {
            response.setHeader("Access-Control-Allow-Origin", request.getHeader(HttpHeaders.ORIGIN));
            response.setHeader("Access-Control-Allow-Methods", "*");
            response.setHeader("Access-Control-Max-Age", "3600");
            response.setHeader("Access-Control-Allow-Headers", "*");
        }
        if (request.getMethod().equalsIgnoreCase(HttpMethod.OPTIONS.toString())) {
            response.setStatus(HttpServletResponse.SC_OK);
        } else {
            filterChain.doFilter(request, response);
        }
    }


}
