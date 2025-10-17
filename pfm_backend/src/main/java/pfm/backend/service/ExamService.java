package pfm.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pfm.backend.model.Exam;
import pfm.backend.repository.ExamRepository;

import java.util.List;

@Service
public class ExamService {
    
    @Autowired
    private ExamRepository examRepository;
    
    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }
    
    public Exam getExamById(Long id) {
        return examRepository.findById(id).orElse(null);
    }
    
    public Exam getExamByNom(String nom) {
        return examRepository.findByNom(nom);
    }
    
    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }
    
    public Exam updateExam(Long id, Exam examDetails) {
        Exam exam = examRepository.findById(id).orElse(null);
        if (exam != null) {
            exam.setNom(examDetails.getNom());
            exam.setDescription(examDetails.getDescription());
            exam.setLienExamen(examDetails.getLienExamen());
            exam.setDate(examDetails.getDate());
            return examRepository.save(exam);
        }
        return null;
    }
    
    public void deleteExam(Long id) {
        examRepository.deleteById(id);
    }
    
    public Exam findByLienExamen(String lienExamen) {
        return examRepository.findByLienExamen(lienExamen);
    }
    
    public List<Exam> getExamsByProfessorId(Long professorId) {
        return examRepository.findByProfessorId(professorId);
    }
}