package com.suren.controller;

import com.suren.entities.CommonResult;
import com.suren.entities.Note;
import com.suren.service.AddNoteService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Description: TODO
 * @Author: 00suren
 * @Date: 2020/5/22 18:00
 **/
@RestController
@Slf4j
public class AddNoteController {

    @Autowired
    AddNoteService addNoteService;

    @PostMapping("/addNote")
    public CommonResult<Note> addNote(@RequestBody Note note){
        return addNoteService.addNote(note);
    }
}
