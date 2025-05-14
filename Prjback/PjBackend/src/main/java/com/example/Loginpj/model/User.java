package com.example.Loginpj.model;


public class User {


	private String id;
	private String passwd;
	private String email;
	private String usertype;
	private String birthdate;
	private String tel;
	private String name;
	private String gender;
	//getter
	public String getBirthdate() {
		return birthdate;
	}
	public void setBirthdate(String birthdate) {
		this.birthdate = birthdate;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
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
	public String getUsertype() {
		return usertype;
	}
	//setter
	public void setId(String id) {
		this.id= id;
	}
	public void setPasswd(String passwd) {
		this.passwd= passwd;
	}
	public void setEmail(String email) {
		this.email= email;
	}
	public void setUsertype(String usertype) {
		this.usertype= usertype;
	}
	
	@Override
	public String toString() {
	    return "User{" +
	            "id='" + id + '\'' +
	            ", password='" + passwd + '\'' +
	            ", email='" + email + '\'' +
	            ", usertype='" + usertype + '\'' +
	            ", birthdate='" + birthdate + '\'' +
	            ", tel='" + tel + '\'' +
	            ", name='" + name + '\'' +
	            ", gender='" + gender + '\'' +
	            '}';
	}
}
