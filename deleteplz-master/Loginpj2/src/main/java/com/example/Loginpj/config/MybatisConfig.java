package com.example.Loginpj.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan("com.example.Loginpj.mapper") // MyBatis Mapper가 위치한 패키지 경로
public class MybatisConfig {

}
