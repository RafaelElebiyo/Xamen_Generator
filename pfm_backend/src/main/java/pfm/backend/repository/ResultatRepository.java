package pfm.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pfm.backend.model.Resultat;
import java.util.List;

public interface ResultatRepository extends JpaRepository<Resultat, Long> {
    List<Resultat> findByExamId(Long examId);
    Resultat findByEtudiantIdAndExamId(Long etudiantId, Long examId);
}