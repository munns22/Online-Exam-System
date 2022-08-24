package service.impl;

import com.exam.model.User;
import com.exam.model.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repo.RoleaRepository;
import repo.UserRepository;
import service.UserService;

import java.util.Set;
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleaRepository roleaRepository;
    //create user
    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {
        User local =this.userRepository.findByUsername(user.getUsername());
        if(local!=null){
           System.out.println("User is already there!!");
           throw new Exception("User already present");
        }else{
            //create user
            for(UserRole ur:userRoles){
                roleaRepository.save(ur.getRole());
            }
            user.getUserRoles().addAll(userRoles);
            local= this.userRepository.save(user);
        }
        return local;
    }
}
