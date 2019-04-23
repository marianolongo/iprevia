package lab1.security.service;

import lab1.security.MyUserDetails;
import lab1.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

@Transactional
@Service
public class MyUserDetailsService implements UserDetailsService {

//    private UserRepository userRepository;
//
//    public MyUserDetailsService(UserRepository user) {
//        this.userRepository = user;
//    }
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        return new MyUserDetails(userRepository.findByName(username));
//    }
@Autowired
UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        lab1.security.model.User possibleUser = userRepository.findByName(s);
        return User.builder()
                .username(possibleUser.getName())
                .password(possibleUser.getPassword())
                .authorities(Collections.emptyList())
                .build();
    }
}
