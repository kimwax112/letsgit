package com.example.Loginpj.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000") // React 앱 주소
                .allowedMethods("*")
                .allowCredentials(true); // 세션 쿠키 포함
        registry.addMapping("/files/**")
                .allowedOrigins("http://localhost:3000") // React 앱 주소
                .allowedMethods("*")
                .allowCredentials(true); // 세션 쿠키 포함
    }
}
