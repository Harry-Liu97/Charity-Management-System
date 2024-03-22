package com.hyrulecastle.mapper;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hyrulecastle.entity.Reward;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * @author Honggang Zhang
 * @since 2023-07-24
 */
@Mapper
public interface RewardMapper extends BaseMapper<Reward> {
    IPage myPagingQuery(Page<Reward> page, @Param(Constants.WRAPPER)Wrapper wrapper);
}
