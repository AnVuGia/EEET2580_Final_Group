package com.example.EEET2580_Group.Repository;

import com.example.EEET2580_Group.Entity.StudentAcc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StudentAccRepository extends JpaRepository<StudentAcc, Long>{
    @Query("SELECT s FROM StudentAcc s WHERE s.username = :username")
    StudentAcc findByUsername(@Param("username") String username);
}
