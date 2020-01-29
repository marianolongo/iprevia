package lab1.app.model;

import javax.persistence.*;

@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long eventId;

    @ManyToOne
    private User author;
    private String description;
    private Long date;

    public Long getId() {
        return id;
    }

    public Long getEventId() {
        return eventId;
    }

    public User getAuthor() {
        return author;
    }

    public String getDescription() {
        return description;
    }

    public Long getDate() {
        return date;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDate(Long date) {
        this.date = date;
    }
}
