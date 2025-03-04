package com.example.Loginpj.mapper;

import com.example.Loginpj.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
    @Select("SELECT * FROM user_info WHERE username = #{username}")
    User findById(@Param("username") String username);

    @Insert("INSERT INTO user_info (username, password, email, name, tel, birthdate, gender) " +
            "VALUES (#{username}, #{password}, #{email}, #{name}, #{tel}, #{birthdate}, #{gender})")
    void insertUser(User user);
}
