package pfm.backend.service;

import pfm.backend.model.Professor;
import pfm.backend.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProfessorService {
    
    @Autowired
    private ProfessorRepository professorRepository;
    
    public List<Professor> getAllProfessors() {
        return professorRepository.findAll();
    }
    
    public Professor getProfessorById(Long id) {
        return professorRepository.findById(id).orElse(null);
    }
    
    public Professor createProfessor(Professor professor) {
        professor.hashPassword();
        return professorRepository.save(professor);
    }
    
    public Professor updateProfessor(Long id, Professor professorDetails) {
        Professor professor = professorRepository.findById(id).orElse(null);
        if (professor != null) {
            professor.setNom(professorDetails.getNom());
            professor.setEmail(professorDetails.getEmail());
            if (professorDetails.getMotDePasse() != null && !professorDetails.getMotDePasse().isEmpty()) {
                professor.setMotDePasse(professorDetails.getMotDePasse());
                professor.hashPassword();
            }
            return professorRepository.save(professor);
        }
        return null;
    }
    
    public void deleteProfessor(Long id) {
        professorRepository.deleteById(id);
    }
    
    public Professor findByEmail(String email) {
        return professorRepository.findByEmail(email).orElse(null);
    }
    
    public Professor findByEmailAndPassword(String email, String password) {
        Professor professor = professorRepository.findByEmail(email).orElse(null);
        if (professor != null && professor.checkPassword(password)) {
            return professor;
        }
        return null;
    }
}