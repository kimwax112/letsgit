package com.example.Loginpj.model;

public class User {
	private String username;
	private String password;
	private String email;
	private String usertype;
	
	//getter
	public String getUsername() {
		return username;
	}
	public String getPassword() {
		return password;
	}
	public String getEmail() {
		return email;
	}
	public String getUserType() {
		return usertype;
	}
	//setter
	public void setUsername(String username) {
		this.username= username;
	}
	public void setPassword(String password) {
		this.password= password;
	}
	public void setEmail(String email) {
		this.email= email;
	}
	public void setUserType(String usertype) {
		this.usertype= usertype;
	}
	
	@Override
    public String toString() {
        return "User{username='" + username + "', password='" + password + "', email='" + email + "' , usertype='" + usertype + "'}";
    }
}
