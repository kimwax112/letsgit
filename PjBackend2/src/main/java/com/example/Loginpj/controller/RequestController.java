package com.example.Loginpj.controller;

import com.example.Loginpj.model.Request;
import com.example.Loginpj.service.RequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/requests")
public class RequestController {

    private final RequestService service;

    public RequestController(RequestService service) {
        this.service = service;
    }

    @GetMapping
    public List<Request> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Request> getById(@PathVariable Long id) {
        Request request = service.getById(id);
        if (request == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(request);
    }

    @PostMapping
    public ResponseEntity<String> create(@RequestBody Request request) {
        int result = service.create(request);
        if (result == 1) return ResponseEntity.ok("Request created successfully");
        else return ResponseEntity.status(500).body("Failed to create request");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> update(@PathVariable Long id, @RequestBody Request request) {
        request.setRequestId(id);
        int result = service.update(request);
        if (result == 1) return ResponseEntity.ok("Request updated successfully");
        else return ResponseEntity.status(500).body("Failed to update request");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        int result = service.delete(id);
        if (result == 1) return ResponseEntity.ok("Request deleted successfully");
        else return ResponseEntity.status(500).body("Failed to delete request");
    }

    @GetMapping("/user")
    public ResponseEntity<List<Request>> getByUsername(@RequestParam String username) {
        List<Request> requests = service.getByUsername(username);
        if (requests.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(requests);
    }

    @PatchMapping("/{id}/description")
    public ResponseEntity<String> updateDescription(@PathVariable Long id, @RequestBody Map<String, String> requestBody) {
        String description = requestBody.get("description");
        if (description == null || description.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Description cannot be empty");
        }
        int result = service.updateDescription(id, description);
        if (result == 1) {
            return ResponseEntity.ok("Description updated successfully");
        } else {
            return ResponseEntity.status(500).body("Failed to update description");
        }
    }
}