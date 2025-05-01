package pfm.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import pfm.backend.model.Reponse;

public interface ReponseRepository extends JpaRepository<Reponse, Long> {
	 Reponse findByQuestionIdAndEtudiantId(Long questionId, Long etudiantId);
}