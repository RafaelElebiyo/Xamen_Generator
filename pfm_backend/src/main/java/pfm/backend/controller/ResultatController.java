package pfm.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pfm.backend.model.Resultat;
import pfm.backend.service.ResultatService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/resultats")
public class ResultatController {
    
    @Autowired
    private ResultatService resultatService;
    
    @GetMapping
    public List<Resultat> getAllResultats() {
        return resultatService.getAllResultats();
    }
    
    @GetMapping("/{id}")
    public Resultat getResultatById(@PathVariable Long id) {
        return resultatService.getResultatById(id);
    }
    
    @PostMapping
    public Resultat createResultat(@RequestBody Resultat resultat) {
        return resultatService.createResultat(resultat);
    }
    
    @PutMapping("/{id}")
    public Resultat updateResultat(@PathVariable Long id, @RequestBody Resultat resultatDetails) {
        return resultatService.updateResultat(id, resultatDetails);
    }
    
    @DeleteMapping("/{id}")
    public void deleteResultat(@PathVariable Long id) {
        resultatService.deleteResultat(id);
    }
    
    @GetMapping("/exam/{examId}")
    public List<Resultat> getResultatsByExam(@PathVariable Long examId) {
        return resultatService.getResultatsByExam(examId);
    }
    
    @GetMapping("/exam/{examId}/etudiant/{etudiantId}")
    public Resultat getResultatByEtudiantAndExam(
            @PathVariable Long examId,
            @PathVariable Long etudiantId) {
        return resultatService.getResultatByEtudiantAndExam(etudiantId, examId);
    }
}