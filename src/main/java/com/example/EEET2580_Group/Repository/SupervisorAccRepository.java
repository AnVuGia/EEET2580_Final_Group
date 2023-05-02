package com.example.EEET2580_Group.Repository;

import com.example.EEET2580_Group.Entity.StudentAcc;
import com.example.EEET2580_Group.Entity.SupervisorAcc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface SupervisorAccRepository extends JpaRepository<SupervisorAcc, Long> {

    @Query("SELECT s FROM SupervisorAcc s ORDER BY s.name ASC")
    List<SupervisorAcc> getAllSupervisor();

    @Query("SELECT s FROM SupervisorAcc s WHERE s.username = :username")
    SupervisorAcc findByUsername(@Param("username") String username);


    @Query("SELECT s FROM SupervisorAcc s WHERE s.username = :username AND s.password = :password ")
    SupervisorAcc findByUsernameAndPassword(@Param("username") String username,
                                         @Param("password") String password);

}
