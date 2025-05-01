package pfm.backend.controller;

import pfm.backend.model.Question;
import pfm.backend.model.QuestionType;
import pfm.backend.model.Exam;
import pfm.backend.service.QuestionService;
import pfm.backend.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/questions")
@CrossOrigin(origins = "*")
public class QuestionController {

    private static final String UPLOAD_DIR = "src/main/resources/static/questions/";
    
    @Autowired
    private QuestionService questionService;
    
    @Autowired
    private ExamRepository examRepository;

    @PostMapping("/exam/{examId}")
    @CrossOrigin(origins = "*")
    public Question createQuestion(
            @PathVariable Long examId,
            @RequestParam String texte,
            @RequestParam QuestionType type,
            @RequestParam int tempsLimite,
            @RequestParam String reponseCorrecte,
            @RequestParam(defaultValue = "1") int score,
            @RequestParam(required = false) String options,
            @RequestParam(required = false) MultipartFile image) throws IOException {

        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        Exam exam = examRepository.findById(examId)
            .orElseThrow(() -> new RuntimeException("Examen no encontrado"));

        Question question = new Question();
        question.setTexte(texte);
        question.setType(type);
        question.setTempsLimite(tempsLimite);
        question.setReponseCorrecte(reponseCorrecte);
        question.setScore(score);
        if (options != null && !options.isEmpty()) {
            List<String> optionsList = Arrays.asList(options.split("_"));
            question.setOptions(optionsList);
        }
        question.setExam(exam);
        
        if (image != null && !image.isEmpty()) {
            String imageName = "question_" + System.currentTimeMillis() + ".png";
            String imagePath = UPLOAD_DIR + imageName;
            image.transferTo(Path.of(imagePath));
            question.setImageUrl("/questions/" + imageName);
        }
        
        return questionService.createQuestion(question);
    }

    @GetMapping("/questions/images/{imageName:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) {
        Path imagePath = Paths.get(UPLOAD_DIR).resolve(imageName);
        try {
            Resource resource = new UrlResource(imagePath.toUri());
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_PNG) 
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/exam/{examId}")
    public List<Question> getQuestionsByExam(@PathVariable Long examId) {
        return questionService.getAllQuestionsByExamId(examId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestion(@PathVariable Long id) {
        return questionService.getQuestionById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public Question updateQuestion(
            @PathVariable Long id,
            @RequestParam(required = false) String texte,
            @RequestParam(required = false) QuestionType type,
            @RequestParam(required = false) Integer tempsLimite,
            @RequestParam(required = false) String reponseCorrecte,
            @RequestParam(required = false) Integer score,
            @RequestParam(required = false) String options,
            @RequestParam(required = false) MultipartFile image) throws IOException {
        
        Question question = questionService.getQuestionById(id)
            .orElseThrow(() -> new RuntimeException("Pregunta no encontrada"));
        
        if (texte != null) question.setTexte(texte);
        if (type != null) question.setType(type);
        if (tempsLimite != null) question.setTempsLimite(tempsLimite);
        if (reponseCorrecte != null) question.setReponseCorrecte(reponseCorrecte);
        if (score != null) question.setScore(score);
        if (options != null && !options.isEmpty()) {
            List<String> optionsList = Arrays.asList(options.split("_"));
            question.setOptions(optionsList);
        }
        
        if (image != null && !image.isEmpty()) {
            
            if (question.getImageUrl() != null) {
                String oldImageName = question.getImageUrl().replace("/questions/", "");
                File oldImage = new File(UPLOAD_DIR + oldImageName);
                if (oldImage.exists()) {
                    oldImage.delete();
                }
            }

            String imageName = "question_" + System.currentTimeMillis() + ".png";
            String imagePath = UPLOAD_DIR + imageName;
            image.transferTo(Path.of(imagePath));
            question.setImageUrl("/questions/images/" + imageName);
        }
        
        return questionService.updateQuestion(question);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionService.getQuestionById(id).ifPresent(question -> {
            if (question.getImageUrl() != null) {
                String imageName = question.getImageUrl().replace("/questions/", "");
                File image = new File(UPLOAD_DIR + imageName);
                if (image.exists()) {
                    image.delete();
                }
            }
        });
        
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }
}