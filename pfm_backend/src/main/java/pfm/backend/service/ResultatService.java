package pfm.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pfm.backend.model.Resultat;
import pfm.backend.repository.ResultatRepository;

import java.util.List;

@Service
public class ResultatService {
    
    @Autowired
    private ResultatRepository resultatRepository;
    
    public List<Resultat> getAllResultats() {
        return resultatRepository.findAll();
    }
    
    public Resultat getResultatById(Long id) {
        return resultatRepository.findById(id).orElse(null);
    }
    
    public Resultat createResultat(Resultat resultat) {
        return resultatRepository.save(resultat);
    }
    
    public Resultat updateResultat(Long id, Resultat resultatDetails) {
        Resultat resultat = resultatRepository.findById(id).orElse(null);
        if (resultat != null) {
            resultat.setNote(resultatDetails.getNote());
            resultat.setDateSoumission(resultatDetails.getDateSoumission());
            return resultatRepository.save(resultat);
        }
        return null;
    }
    
    public void deleteResultat(Long id) {
        resultatRepository.deleteById(id);
    }
    
    public List<Resultat> getResultatsByExam(Long examId) {
        return resultatRepository.findByExamId(examId);
    }
    
    public Resultat getResultatByEtudiantAndExam(Long etudiantId, Long examId) {
        return resultatRepository.findByEtudiantIdAndExamId(etudiantId, examId);
    }
}