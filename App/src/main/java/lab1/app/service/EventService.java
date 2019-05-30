package lab1.app.service;


import lab1.app.model.Event;
import lab1.app.model.User;
import lab1.app.repository.EventRepository;
import lab1.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import sun.security.krb5.internal.ccache.FileCredentialsCache;

import javax.mail.*;
import javax.mail.internet.*;
import java.io.*;
import java.util.*;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final UserService userService;

    @Autowired
    public JavaMailSender emailSender;

    @Autowired
    public EventService(EventRepository eventRepository, UserService userService) {
        this.eventRepository = eventRepository;
        this.userService = userService;
    }

    public List<Event> getAllEvents() {
        List<Event> events = new ArrayList<>();
        eventRepository.findAll().forEach(events::add);
        return events;
    }

    public List<Event> getAllEventsFromUser(String name) {
        return eventRepository.findByHost_Name(name);
    }

    public Event getEvent(Long id) {
        return eventRepository.findById(id).get();
    }

    public void addEvent(Event event) {
        eventRepository.save(event);
    }

    public void updateEvent(Event event) {
        eventRepository.save(event);
    }

    public void addGuest(Long id, String guestName) throws MessagingException {
        Event event = eventRepository.findById(id).get();
        User user = userService.getUserByName(guestName);
        if (event.getUsers().contains(user) || event.getHost().getId().equals(user.getId())) {
            return; //TODO fijarse que hacer con usuario que ya esta o si es host
        }
        if (event.getPrivate()) {
            sendSimpleMessage(event.getHost().getEmail(),
                    "Inscripcion evento " + event.getName() + " de " + guestName
                    , guestName, id);
        } else {
            List<User> users = event.getUsers();
            users.add(user);
            event.setUsers(users);
            eventRepository.save(event);
        }
    }

    public void sendSimpleMessage(String to, String subject, String guestName, Long id) throws MessagingException {

        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, false, "utf-8");
        String htmlMsg = "";
        try {
            htmlMsg = fileToString("webApp/inscription.html", id, guestName);
        } catch (IOException e) {
            e.printStackTrace();
        }
        mimeMessage.setContent(htmlMsg, "text/html");
        helper.setTo(to);
        helper.setSubject(subject);
        emailSender.send(mimeMessage);
    }

    public List<Event> getAllEventsContaining(String inputText) {
        return eventRepository.findAllByNameContaining(inputText);
    }

    public List<Event> getAllPublicEvents() {
        return eventRepository.findAllByIsPrivateFalse();
    }

    public List<Event> getAllPrivateEvents(){
        return eventRepository.findAllByIsPrivateTrue();
    }

    public List<Event> getAllEventsAfterNow() {
        return eventRepository.findAllByDateAfter(new Date());
    }

    public boolean checkIfFinished(Long id) {
        return eventRepository.findById(id).get().didFinish();
    }

    public boolean addVote(Long id, String voterName) {
        Event event = eventRepository.findById(id).get();
        User host = event.getHost();
        User voter = userService.getUserByName(voterName);

        if(event.getUsers().contains(voter) && !event.getUsersVoted().contains(voter)){
            addVoter(voter, event);
            userService.incrementScore(host.getId());
            return true;
        }else{
            return false;
        }
    }

    public void addVoter(User voter, Event event){
        List<User> usersVoted = event.getUsersVoted();
        usersVoted.add(voter);
        event.setUsersVoted(usersVoted);
        eventRepository.save(event);
    }

    private String fileToString(String path, Long id, String guestName) throws IOException {
        InputStream is = new FileInputStream(path);
        BufferedReader buf = new BufferedReader(new InputStreamReader(is));

        String line = buf.readLine();
        StringBuilder sb = new StringBuilder();

        while(line != null){
            if(line.startsWith("<body>")){
                line = "<body onload=getEventAndGuest(" + id + ", " + guestName + ")>";
            }
            sb.append(line).append("\n");
            line = buf.readLine();
        }

        return sb.toString();
    }

    public void addUserWithMail(Long id, String guestName) {
        Event event = getEvent(id);
        List<User> users = event.getUsers();
        users.add(userService.getUserByName(guestName));
        event.setUsers(users);
        eventRepository.save(event);

    }

    public List<Event> getAllPrivateEvents() {
        return eventRepository.findAllByIsPrivateTrue();
    }

    public List<Event> getAllPastEvents() {
        return eventRepository.findAllByDateBefore(new Date());
    }
}
