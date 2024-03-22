package com.hyrulecastle.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hyrulecastle.entity.Reward;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * @author Honggang Zhang
 * @since 2023-07-24
 */
public interface RewardService extends IService<Reward> {

    IPage myPagingQuery(Page<Reward> page, Wrapper wrapper);
}
