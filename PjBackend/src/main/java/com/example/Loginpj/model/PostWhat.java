package com.example.Loginpj.model;

public class PostWhat {
    private Long postnum;
    private String id;
    private String contents;

    //getter
    public Long getPostnum() {
        return postnum;
    }
    public String getId() {
        return id;
    }
    public String getContents() {
        return contents;
    }

    //setter
    public void setPostnum(Long postnum) {
        this.postnum = postnum;
    }
    public void setId(String id) {
        this.id = id;
    }
    public void setContents(String contents) {
        this.contents = contents;
    }
    @Override
    public String toString() {
        return "PostWhat{" +
                "postnum='" + postnum + '\'' +
                ", id='" + id + '\'' +
                ", contents='" + contents + '\'' +
                '}';
    }
}
