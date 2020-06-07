package com.suren.controller;

import com.suren.entities.CommonResult;
import com.suren.entities.Note;
import com.suren.service.AddNoteService;
import com.suren.service.DeleteNoteService;
import com.suren.service.GetNoteListService;
import com.suren.service.PutNoteService;
import lombok.extern.slf4j.Slf4j;
import org.bouncycastle.pqc.crypto.newhope.NHOtherInfoGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

/**
 * @Description: TODO
 * @Author: 00suren
 * @Date: 2020/5/22 18:00
 **/
@RestController
@Slf4j
public class NoteController {

    @Autowired
    AddNoteService addNoteService;
    @Autowired
    PutNoteService putNoteService;
    @Autowired
    DeleteNoteService deleteNoteService;
    @Autowired
    GetNoteListService getNoteListService;

    @PostMapping("/note")
    public CommonResult<Note> addNote(@RequestBody Note note){
        return addNoteService.addNote(note);
    }

    @PutMapping("/note")
    public CommonResult<String> putNote(@RequestBody Note note){
        return  putNoteService.putNote(note);
    }

    @DeleteMapping("/note/{noteid}")
    public CommonResult<String> deleteNote(@PathVariable("noteid") Integer noteid){
        return deleteNoteService.deleteNote(noteid);
    }

    @GetMapping("/note/{wxid}")
    public CommonResult<ArrayList<Note>> getNoteList(@PathVariable("wxid") String wxid){
        return getNoteListService.getNoteList(wxid);
    }
}
