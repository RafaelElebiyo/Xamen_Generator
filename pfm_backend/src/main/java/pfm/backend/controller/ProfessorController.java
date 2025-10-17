package pfm.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pfm.backend.model.Professor;
import pfm.backend.model.LoginRequest;
import pfm.backend.service.ProfessorService;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/professors")
public class ProfessorController {
    
    @Autowired
    private ProfessorService professorService;
    
    @GetMapping
    public List<Professor> getAllProfessors() {
        return professorService.getAllProfessors();
    }
    
    @GetMapping("/{id}")
    public Professor getProfessorById(@PathVariable Long id) {
        return professorService.getProfessorById(id);
    }
    
    @PostMapping("/register")
    public Professor createProfessor(@RequestBody Professor professor) {
        return professorService.createProfessor(professor);
    }
    
    @PutMapping("/{id}")
    public Professor updateProfessor(@PathVariable Long id, @RequestBody Professor professorDetails) {
        return professorService.updateProfessor(id, professorDetails);
    }
    
    @DeleteMapping("/{id}")
    public void deleteProfessor(@PathVariable Long id) {
        professorService.deleteProfessor(id);
    }
    
    @GetMapping("/email/{email}")
    public Professor getProfessorByEmail(@PathVariable String email) {
        return professorService.findByEmail(email);
    }
    
    @PostMapping("/login")
    public Professor login(@RequestBody LoginRequest loginRequest) {
        return professorService.findByEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword());
    }
}


