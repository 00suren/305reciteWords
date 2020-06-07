package com.suren.service;

import com.suren.entities.CommonResult;
import com.suren.entities.Note;

public interface PutNoteService {
    CommonResult<String> putNote(Note note);
}
