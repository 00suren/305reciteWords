package com.suren.service.impl;

import com.suren.dao.DeleteNoteDao;
import com.suren.entities.CommonResult;
import com.suren.service.DeleteNoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @Description: TODO
 * @Author: 00suren
 * @Date: 2020/6/7 15:01
 **/
@Service
public class DeleteNoteServiceImpl implements DeleteNoteService {

    @Autowired
    DeleteNoteDao deleteNoteDao;
    @Override
    public CommonResult<String> deleteNote(Integer noteid) {
        int result = deleteNoteDao.deleteNote(noteid);
        if (result == 0){
            return new CommonResult<>(400, "未找到该记录，删除失败", null);
        }
        return new CommonResult<>(200, "删除成功", null);
    }
}
