package com.iamtechknow.d2sbackend;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
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
}
