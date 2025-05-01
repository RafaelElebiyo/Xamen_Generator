package pfm.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pfm.backend.model.Exam;
import java.util.List;

public interface ExamRepository extends JpaRepository<Exam, Long> {
    Exam findByLienExamen(String lienExamen);
    Exam findByNom(String nom);
    List<Exam> findByProfessorId(Long professorId);
}