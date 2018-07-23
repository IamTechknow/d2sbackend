package com.iamtechknow.d2sbackend;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

/**
 * Main controller that maps site URLs to specific views
 */
@Controller
public class D2sController {
    @GetMapping("/")
    public String d2sForm(Model model) {
        model.addAttribute("save", new D2Save());
        return "index";
    }

    @PostMapping("/")
    public String d2sSubmit(@ModelAttribute D2Save save, Model model) {
        model.addAttribute("save", save);
        return "result";
    }

    /**
     * Map download URLs to a corresponding file if it exists
     */
    @GetMapping("/download/{file_name}")
    public ResponseEntity<byte[]> getFile(@PathVariable("file_name") String fileName) {
        if(fileExists(fileName)) {
            HttpHeaders header = new HttpHeaders();
            header.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            header.setContentLength(1);

            return new ResponseEntity<>(new byte[]{5}, header, HttpStatus.OK);
        } else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    private boolean fileExists(String fileName) {
        return false;
    }
}
