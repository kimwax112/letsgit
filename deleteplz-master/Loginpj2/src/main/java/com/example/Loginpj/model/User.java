package com.example.Loginpj.model;

public class User {
    private String id;
    private String passwd;
    private String email;
    private String name;
    private String tel;
    private String birthdate; // 생년월일 추가
    private String gender;    // 성별 추가

    // Getter
    public String getName() {
        return name;
    }
    public String getId() {
        return id;
    }
    public String getPasswd() {
        return passwd;
    }
    public String getEmail() {
        return email;
    }
    public String getTel() {
        return tel;
    }
    public String getBirthdate() {
        return birthdate;
    }
    public String getGender() {
        return gender;
    }

    // Setter
    public void setName(String name) {
        this.name = name;
    }
    public void setId(String id) {
        this.id = id;
    }
    public void setPassword(String passwd) {
        this.passwd = passwd;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setTel(String tel) {
        this.tel = tel;
    }
    public void setBirthdate(String birthdate) {
        this.birthdate = birthdate;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", passwd='" + passwd + '\'' +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", tel='" + tel + '\'' +
                ", birthdate='" + birthdate + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }
}