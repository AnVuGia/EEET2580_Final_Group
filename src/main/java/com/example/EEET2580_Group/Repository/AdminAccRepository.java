package com.example.EEET2580_Group.Repository;

import com.example.EEET2580_Group.Entity.AdminAcc;
import com.example.EEET2580_Group.Entity.StudentAcc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AdminAccRepository extends JpaRepository<AdminAcc,Long> {

    @Query("SELECT a FROM AdminAcc a WHERE a.username = :username AND a.password = :password ")
    AdminAcc findByUsernameAndPassword(@Param("username") String username,
                                             @Param("password") String password);
}
