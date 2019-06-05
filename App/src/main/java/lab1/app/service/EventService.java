package lab1.app.service;


import lab1.app.model.Event;
import lab1.app.model.User;
import lab1.app.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

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
                    , guestName,id, event.getName(), event.getHost().getName());
        } else {
            addUserAndEvent(event, user);
        }
    }

    public void sendSimpleMessage(String to, String subject, String guestName,Long id, String name, String host) throws MessagingException {

        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, false, "utf-8");
        String htmlMsg = "";
        htmlMsg = "El usuario " + guestName + " desea participar del evento " + name + " , has click " +
                "<a href=\"http://localhost:63342/iprevia/webApp/login.html?"
                + "username=" + guestName
                + "&id=" + id
                + "\">aqui</a>"
                + " para aceptar o rechazar su solicitud";
        mimeMessage.setContent(htmlMsg, "text/html");
        helper.setTo(to);
        helper.setSubject(subject);
        emailSender.send(mimeMessage);
    }

    public List<Event> getAllEventsContaining(String inputText, String host) {
        User user = userService.getUserByName(host);
        return eventRepository.findAllByNameContainingAndHostNot(inputText, user);
    }

    public List<Event> getAllPublicEvents(String host) {
        User user = userService.getUserByName(host);
        return eventRepository.findAllByIsPrivateFalseAndDateAfterAndHostNotOrderByDate(new Date(), user);
    }

    public List<Event> getAllEventsAfterNow(String host) {
        User user = userService.getUserByName(host);
        return eventRepository.findAllByDateAfterAndHostNotOrderByDate(new Date(), user);
    }

    public boolean checkIfFinished(Long id) {
        return eventRepository.findById(id).get().didFinish();
    }

    public boolean addVote(Long id, String voterName, Long rating) {
        Event event = eventRepository.findById(id).get();
        User host = event.getHost();
        User voter = userService.getUserByName(voterName);

        if(event.getUsers().contains(voter) && !event.getUsersVoted().contains(voter)){
            addVoter(voter, event);
            userService.incrementScore(host.getId(), rating);
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
        User user = userService.getUserByName(guestName);
        addUserAndEvent(event, user);
    }

    private void addUserAndEvent(Event event, User user) {
        List<User> users = event.getUsers();
        users.add(user);
        event.setUsers(users);
        eventRepository.save(event);

        List<Event> events = user.getEventsAssisted();
        events.add(event);
        user.setEventsAssisted(events);
        userService.saveUser(user);
    }

    public List<Event> getAllPastEvents(String host) {
        User user = userService.getUserByName(host);
        return eventRepository.findAllByDateBeforeAndHostNot(new Date(), user);
    }

    public User getHost(Long id) {
        return eventRepository.findById(id).get().getHost();
    }

    public List<Event> getAllPrivateEvents(String host) {
        User user = userService.getUserByName(host);
        return eventRepository.findAllByIsPrivateTrueAndDateAfterAndHostNotOrderByDate(new Date(), user);
    }

    public List<Event> getAllEventsIfUserIsGuest(String name) {
        return eventRepository.findAllByUsersContaining(userService.getUserByName(name));
    }

    public List<Event> getAllEventsFromUser(Long id) {
        return eventRepository.findByHostId(id);
    }
}
