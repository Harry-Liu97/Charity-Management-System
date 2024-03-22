package com.hyrulecastle.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hyrulecastle.entity.Info;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * @author Honggang Zhang
 * @since 2023-06-26
 */
public interface InfoService extends IService<Info> {

    IPage myPagingQuery(Page<Info> page, Wrapper wrapper);
}
