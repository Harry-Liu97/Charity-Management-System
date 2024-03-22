package com.hyrulecastle.service.impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hyrulecastle.entity.Reward;
import com.hyrulecastle.mapper.MessageMapper;
import com.hyrulecastle.mapper.RewardMapper;
import com.hyrulecastle.service.RewardService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author Honggang Zhang
 * @since 2023-07-24
 */
@Service
public class RewardServiceImpl extends ServiceImpl<RewardMapper, Reward> implements RewardService {

    @Resource
    private RewardMapper rewardMapper;

    @Override
    public IPage myPagingQuery(Page<Reward> page, Wrapper wrapper) {
        return rewardMapper.myPagingQuery(page, wrapper);
    }
}
