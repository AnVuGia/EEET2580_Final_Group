package com.example.EEET2580_Group.Controller;

import com.example.EEET2580_Group.Entity.Image;
import com.example.EEET2580_Group.Repository.ImageRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api")
@Transactional
public class ImageController {

    @Autowired
    private ImageRepository imageRepository;

    @PostMapping("/images")
    public Image saveImage(@RequestParam("file") MultipartFile file) throws IOException, IOException {
        System.out.println("Original Image Byte Size - " + file.getBytes().length);
        System.out.println("Original Image Name - " + file.getOriginalFilename());
        Image image = new Image();
        image.setName(file.getOriginalFilename());
        image.setData(file.getBytes());
        imageRepository.save(image);
        return image;
    }

    @GetMapping("/images/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        Image image = imageRepository.findById(id).orElse(null);
        if (image == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image.getData());
    }
}
