package com.hyrulecastle.mapper;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hyrulecastle.entity.Info;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

/**
 * @author Honggang Zhang
 * @since 2023-06-26
 */
@Mapper
public interface InfoMapper extends BaseMapper<Info> {

    @Select("select * from info where no = #{no}")
    Info selectByNo(String no);

    IPage myPagingQuery(Page<Info> page, @Param(Constants.WRAPPER) Wrapper wrapper);
}
