package com.suren.service.impl;

import com.suren.dao.AddNoteDao;
import com.suren.entities.CommonResult;
import com.suren.entities.Note;
import com.suren.service.AddNoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @Description: 添加笔记
 * @Author: 00suren
 * @Date: 2020/5/22 17:52
 **/
@Service
public class AddNoteServiceImpl implements AddNoteService {
    @Autowired
    AddNoteDao addNoteDao;

    @Override
    public CommonResult<Note> addNote(Note note) {
        int result =  addNoteDao.addNote(note);

        if (result == 0){
            return new CommonResult<>(400, "添加笔记失败", null);
        }
        return new CommonResult<>(200, "添加笔记成功", note);
    }
}
