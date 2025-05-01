package pfm.backend.service;

import pfm.backend.model.Etudiant;
import pfm.backend.repository.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EtudiantService {
    
    @Autowired
    private EtudiantRepository etudiantRepository;
    
    public List<Etudiant> getAllEtudiants() {
        return etudiantRepository.findAll();
    }
    
    public Etudiant getEtudiantById(Long id) {
        return etudiantRepository.findById(id).orElse(null);
    }
    
    public Etudiant createEtudiant(Etudiant etudiant) {
        return etudiantRepository.save(etudiant);
    }
    
    public Etudiant updateEtudiant(Long id, Etudiant etudiantDetails) {
        Etudiant etudiant = etudiantRepository.findById(id).orElse(null);
        if (etudiant != null) {
            etudiant.setNom(etudiantDetails.getNom());
            etudiant.setEmail(etudiantDetails.getEmail());
            return etudiantRepository.save(etudiant);
        }
        return null;
    }
    
    public void deleteEtudiant(Long id) {
        etudiantRepository.deleteById(id);
    }
    
    public Etudiant findByEmail(String email) {
        return etudiantRepository.findByEmail(email).orElse(null);
    }
}