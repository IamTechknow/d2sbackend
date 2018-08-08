package com.iamtechknow.d2sbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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

import java.io.ByteArrayOutputStream;
import java.util.Map;

/**
 * Main controller that maps site URLs to specific views.
 * The constructor is automatically called to allow dependency injection.
 */
@Controller
public class D2sController {
    private Map<String, D2Save> cache;

    @Autowired
    public D2sController(@Qualifier("map") Map<String, D2Save> map) {
        cache = map;
    }

    @GetMapping("/")
    public String d2sForm(Model model) {
        model.addAttribute("save", new D2Save());
        return "index";
    }

    @PostMapping("/")
    public String d2sSubmit(@ModelAttribute D2Save save, Model model) {
        model.addAttribute("save", save);
        if(save.checkValid()) {
            cache.put(save.getName(), save);
            model.addAttribute("name", save.getName());
            return "result";
        } else
            return "index";
    }

    /**
     * Map download URLs to a corresponding file if it exists, and generate the save file to be downloaded.
     * Otherwise send a 404 error.
     */
    @GetMapping("/download/{file_name}.d2s")
    public ResponseEntity<byte[]> getFile(@PathVariable("file_name") String fileName) {
        if(fileExists(fileName)) {
            D2sWriter writer = new D2sWriter(new ByteArrayOutputStream());
            writer.write(cache.get(fileName));

            HttpHeaders header = new HttpHeaders();
            header.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            header.setContentLength(writer.size());

            return new ResponseEntity<>(writer.toByteArray(), header, HttpStatus.OK);
        } else
            throw new ResourceNotFoundException();
    }

    private boolean fileExists(String fileName) {
        return cache.containsKey(fileName);
    }
}
