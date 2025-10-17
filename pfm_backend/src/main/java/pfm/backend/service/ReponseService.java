package pfm.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pfm.backend.model.Reponse;
import pfm.backend.repository.ReponseRepository;

import java.util.List;

@Service
public class ReponseService {
    
    @Autowired
    private ReponseRepository reponseRepository;
    
    public List<Reponse> getAllReponses() {
        return reponseRepository.findAll();
    }
    
    public Reponse getReponseById(Long id) {
        return reponseRepository.findById(id).orElse(null);
    }
    
    public Reponse getReponseByQuestionEtudiant(Long questionId, Long etudiantId) {
        return reponseRepository.findByQuestionIdAndEtudiantId(questionId, etudiantId);
    }
    
    public Reponse createReponse(Reponse reponse) {
        return reponseRepository.save(reponse);
    }
    
    public Reponse updateReponse(Long id, Reponse reponseDetails) {
        Reponse reponse = reponseRepository.findById(id).orElse(null);
        if (reponse != null) {
            reponse.setReponse(reponseDetails.getReponse());
            reponse.setEstCorrecte(reponseDetails.isEstCorrecte());
            reponse.setScore(reponseDetails.getScore());
            return reponseRepository.save(reponse);
        }
        return null;
    }
    
    public void deleteReponse(Long id) {
        reponseRepository.deleteById(id);
    }
}