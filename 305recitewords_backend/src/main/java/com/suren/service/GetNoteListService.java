package com.suren.service;

import com.suren.entities.CommonResult;
import com.suren.entities.Note;
import java.util.ArrayList;

public interface GetNoteListService {
    CommonResult<ArrayList<Note>> getNoteList(String wxid);
}
