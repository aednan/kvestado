package com.kvestado.backend.service;

import org.apache.commons.codec.digest.HmacAlgorithms;
import org.apache.commons.codec.digest.HmacUtils;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class ToolsService {

    public static Map<String, String> getAuthenticatedParams(String token, long expire, String privateKey){
        if (token==null){
            token= UUID.randomUUID().toString();
        }
        if (expire==0){
            expire= Instant.now().plus(2, ChronoUnit.MINUTES).getEpochSecond();
        }
        if (privateKey==null) throw new RuntimeException("Private key can't be null.");

        String signature = new HmacUtils(HmacAlgorithms.HMAC_SHA_1, privateKey).hmacHex(token + expire);

        Map<String, String> auth=new HashMap<>();
        auth.put("token",token);
        auth.put("expire", String.valueOf(expire));
        auth.put("signature",signature);
        return auth;
    }
}
