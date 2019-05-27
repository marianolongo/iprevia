package lab1.app.model;


import javax.persistence.*;
import java.util.Date;
import java.util.List;


@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    private List<User> users;

    @ManyToMany
    private List<User> usersVoted;
    @ManyToOne
    private User host;

    private String name;
    private String description;
    private Boolean isPrivate;
    private Date dateCreated;
    private Date date;

    public Event(List<User> users, List<User> usersVoted, User host, String name, String description, Boolean isPrivate, Date dateCreated, Date date) {
        this.users = users;
        this.usersVoted = usersVoted;
        this.host = host;
        this.name = name;
        this.description = description;
        this.isPrivate = isPrivate;
        this.dateCreated = dateCreated;
        this.date = date;
    }

    public Event() {
    }

    public List<User> getUsers() {
        return users;
    }

    public List<User> getUsersVoted() {
        return usersVoted;
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

    public Date getDateCreated() {
        return dateCreated;
    }

    public Date getDate() {
        return date;
    }

    public void setUsers(List<User> user) {
        this.users = user;
    }

    public void setUsersVoted(List<User> usersVoted) {
        this.usersVoted = usersVoted;
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

    public void setIsPrivate(Boolean isPrivate){this.isPrivate = isPrivate;}
    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Boolean didFinish(){
        return date.compareTo(new Date()) < 0;
    }
}
