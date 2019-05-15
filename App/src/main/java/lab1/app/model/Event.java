package lab1.app.model;


import javax.persistence.*;
import java.util.List;


@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    private List<User> users;

    @ManyToOne
    private User host;

    private String name;
    private String description;
    private Boolean isPrivate;


    public Event(List<User> users, Long id, String name, String description) {
        this.users = users;
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public Event() {
    }

    public List<User> getUser() {
        return users;
    }

    public User getHost() {
        return host;
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

    public Boolean getPrivate() {
        return isPrivate;
    }

    public void setUser(List<User> user) {
        this.users = user;
    }

    public void setHost(User host) {
        this.host = host;
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

    public void setPrivate(Boolean aPrivate) {
        isPrivate = aPrivate;
    }
}
