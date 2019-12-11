package lab1.app.model;


import javax.persistence.*;
import java.math.BigDecimal;
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
    private Long dateCreated;
    private Long date;
    private Double latitude;
    private Double longitude;

    public Event(List<User> users, List<User> usersVoted, User host, String name, String description, Boolean isPrivate, Long dateCreated, Long date, Double latitude, Double longitude) {
        this.users = users;
        this.usersVoted = usersVoted;
        this.host = host;
        this.name = name;
        this.description = description;
        this.isPrivate = isPrivate;
        this.dateCreated = dateCreated;
        this.date = date;
        this.latitude = latitude;
        this.longitude = longitude;
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

    public Long getDateCreated() {
        return dateCreated;
    }

    public Long getDate() {
        return date;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongitude() {
        return longitude;
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
    public void setDateCreated(Long dateCreated) {
        this.dateCreated = dateCreated;
    }

    public void setDate(Long date) {
        this.date = date;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Boolean didFinish(){
        return date - new Date().getTime() < 0;
    }
}
