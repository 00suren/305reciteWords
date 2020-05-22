package com.suren.service;

import com.suren.entities.CommonResult;
import com.suren.entities.Note;
import org.springframework.stereotype.Service;


public interface AddNoteService {

    CommonResult<Note> addNote(Note note);

}
