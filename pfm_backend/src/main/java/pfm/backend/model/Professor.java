package pfm.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "professor")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Professor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String motDePasse;

    @Column(nullable = false)
    private String nom;

    public void hashPassword() {
        this.motDePasse = simpleHash(this.motDePasse);
    }

    public boolean checkPassword(String candidatePassword) {
        return this.motDePasse.equals(simpleHash(candidatePassword));
    }

    private String simpleHash(String password) {
        String salt = "hash1234";
        String hash = salt + password + salt;
        hash = new StringBuilder(hash).reverse().toString();
        hash = hash + password.length();
        
        return hash;
    }
}