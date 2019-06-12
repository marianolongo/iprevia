package lab1.app.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long eventId;
    private String author;
    private String description;

    public Long getId() {
        return id;
    }

    public Long getEventId() {
        return eventId;
    }

    public String getAuthor() {
        return author;
    }


    public String getDescription() {
        return description;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public void setAuthor(String author) {
        this.author = author;
    }


    public void setDescription(String description) {
        this.description = description;
    }
}
