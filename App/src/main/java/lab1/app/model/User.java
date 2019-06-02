package lab1.app.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String password;
    private Long rating;
    private Long ratingAmount;

    @ManyToMany
    @JsonIgnore
    private List<Event> eventsAssisted;

    public User(Long id, String name, String email, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public User() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Long getRating() {
        return rating;
    }

    public Long getRatingAmount() {
        return ratingAmount;
    }

    public List<Event> getEventsAssisted() {
        return eventsAssisted;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRating(Long rating) {
        this.rating = rating;
    }

    public void setRatingAmount(Long ratingAmount) {
        this.ratingAmount = ratingAmount;
    }

    public void setEventsAssisted(List<Event> eventsAssisted) {
        this.eventsAssisted = eventsAssisted;
    }
}
