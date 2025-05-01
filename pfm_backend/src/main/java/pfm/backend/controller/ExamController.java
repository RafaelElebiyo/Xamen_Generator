package pfm.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pfm.backend.model.Exam;
import pfm.backend.service.ExamService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/exams")
public class ExamController {
    
    @Autowired
    private ExamService examService;
    
    @GetMapping
    public List<Exam> getAllExams() {
        return examService.getAllExams();
    }
    
    @GetMapping("/{id}")
    public Exam getExamById(@PathVariable Long id) {
        return examService.getExamById(id);
    }
    
    @PostMapping
    public Exam createExam(@RequestBody Exam exam) {
        return examService.createExam(exam);
    }
    
    @PutMapping("/{id}")
    public Exam updateExam(@PathVariable Long id, @RequestBody Exam examDetails) {
        return examService.updateExam(id, examDetails);
    }
    
    @DeleteMapping("/{id}")
    public void deleteExam(@PathVariable Long id) {
        examService.deleteExam(id);
    }
    
    @GetMapping("/link/{lienExamen}")
    public Exam getExamByLienExamen(@PathVariable String lienExamen) {
        return examService.findByLienExamen(lienExamen);
    }
    
    @GetMapping("/nom/{nomExam}")
    public Exam getExamByNom(@PathVariable String nom) {
        return examService.findByLienExamen(nom);
    }
    
    @GetMapping("/professor/{professorId}")
    public List<Exam> getExamsByProfessorId(@PathVariable Long professorId) {
        return examService.getExamsByProfessorId(professorId);
    }
}