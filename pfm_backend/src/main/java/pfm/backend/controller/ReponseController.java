package pfm.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pfm.backend.model.Reponse;
import pfm.backend.service.ReponseService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/reponses")
public class ReponseController {
    
    @Autowired
    private ReponseService reponseService;
    
    @GetMapping
    public List<Reponse> getAllReponses() {
        return reponseService.getAllReponses();
    }
    
    @GetMapping("/{id}")
    public Reponse getReponseById(@PathVariable Long id) {
        return reponseService.getReponseById(id);
    }
    
    
    @GetMapping("/question/{questionId}/etudiant/{etudiantId}")
    public Reponse getReponseByQuestionAndEtudiant(
            @PathVariable Long questionId, 
            @PathVariable Long etudiantId) { 
        return reponseService.getReponseByQuestionEtudiant(questionId, etudiantId);
    }
    
    @PostMapping
    public Reponse createReponse(@RequestBody Reponse reponse) {
        return reponseService.createReponse(reponse);
    }
    
    @PutMapping("/{id}")
    public Reponse updateReponse(@PathVariable Long id, @RequestBody Reponse reponseDetails) {
        return reponseService.updateReponse(id, reponseDetails);
    }
    
    @DeleteMapping("/{id}")
    public void deleteReponse(@PathVariable Long id) {
        reponseService.deleteReponse(id);
    }
}