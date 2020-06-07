package com.suren.dao;

import com.suren.entities.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface AddUserInfoDao {
    int addUserInfo(User user);
}
