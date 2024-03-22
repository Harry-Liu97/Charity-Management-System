package com.hyrulecastle.mapper;

import com.hyrulecastle.entity.Info;
import com.hyrulecastle.entity.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * @author Honggang Zhang
 * @since 2023-06-26
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {

}
