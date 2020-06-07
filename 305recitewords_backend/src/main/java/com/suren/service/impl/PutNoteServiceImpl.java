package com.suren.service.impl;

import com.suren.dao.PutNoteDao;
import com.suren.entities.CommonResult;
import com.suren.entities.Note;
import com.suren.service.PutNoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @Description: TODO
 * @Author: 00suren
 * @Date: 2020/6/7 14:41
 **/
@Service
public class PutNoteServiceImpl implements PutNoteService {
    @Autowired
    PutNoteDao putNoteDao;

    public CommonResult<String> putNote(Note note){
        int result =  putNoteDao.putNote(note);

        if (result == 0){
            return new CommonResult<>(400, "修改笔记失败", null);
        }
        return new CommonResult<>(200, "修改笔记成功", null);
    }

}
