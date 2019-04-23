package lab1.app.model;


import javax.persistence.*;


@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    private String name;
    private String description;


    public Event(User user, Long id, String name, String description) {
        this.user = user;
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public Event() {
    }

    public User getUser() {
        return user;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
