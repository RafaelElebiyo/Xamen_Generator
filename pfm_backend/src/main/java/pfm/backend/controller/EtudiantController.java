package pfm.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pfm.backend.model.Etudiant;
import pfm.backend.model.LoginRequest;
import pfm.backend.service.EtudiantService;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/etudiants")
public class EtudiantController {
    
    @Autowired
    private EtudiantService etudiantService;
    
    @GetMapping
    public List<Etudiant> getAllEtudiants() {
        return etudiantService.getAllEtudiants();
    }
    
    @GetMapping("/{id}")
    public Etudiant getEtudiantById(@PathVariable Long id) {
        return etudiantService.getEtudiantById(id);
    }
    
    @PostMapping
    public Etudiant createEtudiant(@RequestBody Etudiant etudiant) {
        return etudiantService.createEtudiant(etudiant);
    }
    
    @PutMapping("/{id}")
    public Etudiant updateEtudiant(@PathVariable Long id, @RequestBody Etudiant etudiantDetails) {
        return etudiantService.updateEtudiant(id, etudiantDetails);
    }
    
    @DeleteMapping("/{id}")
    public void deleteEtudiant(@PathVariable Long id) {
        etudiantService.deleteEtudiant(id);
    }
    
    @GetMapping("/email/{email}")
    public Etudiant getEtudiantByEmail(@PathVariable String email) {
        return etudiantService.findByEmail(email);
    }
    
    @PostMapping("/login")
    public Etudiant login(@RequestBody LoginRequest loginRequest) {
        return etudiantService.findByEmail(loginRequest.getEmail());
    }
}

