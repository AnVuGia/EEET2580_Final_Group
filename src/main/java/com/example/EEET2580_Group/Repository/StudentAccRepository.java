package com.example.EEET2580_Group.Repository;

import com.example.EEET2580_Group.Entity.StudentAcc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentAccRepository extends JpaRepository<StudentAcc, Long>{
    @Query("SELECT s FROM StudentAcc s WHERE s.username = :username")
    StudentAcc findByUsername(@Param("username") String username);

    @Query("SELECT s FROM StudentAcc s WHERE s.username = :username AND s.password = :password ")
    StudentAcc findByUsernameAndPassword(@Param("username") String username,
                                            @Param("password") String password);
}
