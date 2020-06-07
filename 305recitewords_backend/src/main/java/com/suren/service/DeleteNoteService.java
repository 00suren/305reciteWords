package com.suren.service;

import com.suren.entities.CommonResult;

public interface DeleteNoteService {

    CommonResult<String> deleteNote(Integer noteid);
}
