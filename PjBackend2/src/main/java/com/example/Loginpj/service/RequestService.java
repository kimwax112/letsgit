package com.example.Loginpj.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Loginpj.mapper.RequestMapper;
import com.example.Loginpj.model.Request;

@Service
public class RequestService {

    private final RequestMapper mapper;

    public RequestService(RequestMapper mapper) {
        this.mapper = mapper;
    }

    public List<Request> getAll() {
        return mapper.findAll();
    }

    public Request getById(Long id) {
        return mapper.findById(id);
    }

    public int create(Request request) {
        return mapper.insert(request);
    }

    public int update(Request request) {
        return mapper.update(request);
    }

    public int delete(Long id) {
        return mapper.deleteById(id);
    }
    
    public List<Request> getByUsername(String username) {
        return mapper.findByUsername(username);
    }
}