package pfm.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import pfm.backend.model.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
	 List<Question> findByExamId(Long examId);
}