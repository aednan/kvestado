package com.kvestado.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

/**
 *  Datasource Configuration File - DATABASE_URL Support
 *  @See <a>https://devcenter.heroku.com/articles/connecting-to-relational-databases-on-heroku-with-java</a>
 */
@Configuration
@Profile("prod")
public class DataSourceConfig {

    @Value("${spring.database-url}")
    private String databaseURL;

    @Bean
    @Primary
    public DataSource dataSource() throws URISyntaxException {
        URI dbURI = new URI(databaseURL);
        String username = dbURI.getUserInfo().split(":")[0];
        String password = dbURI.getUserInfo().split(":")[1];
        String url = "jdbc:postgresql://" + dbURI.getHost() + ':' + dbURI.getPort() + dbURI.getPath();
        return DataSourceBuilder
                .create()
                .username(username)
                .password(password)
                .url(url)
//                .driverClassName("")
                .build();
    }
}
