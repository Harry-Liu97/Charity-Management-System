package com.hyrulecastle.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hyrulecastle.config.QueryPageParam;
import com.hyrulecastle.config.Result;
import com.hyrulecastle.entity.Reward;
import com.hyrulecastle.service.RewardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

/**
 * ClassName: RewardController
 * Package: com.hyrulecastle.controller
 * Description:
 * Reward Controller
 *
 * @author Honggang Zhang
 * @since 2023-07-24
 */
@RestController
@RequestMapping("/reward")
public class RewardController {

    @Autowired
    private RewardService rewardService;

    /**
     * Add rewards.
     * @param reward
     * @return Result
     */
    @PostMapping("/add")
    public Result add(@RequestBody Reward reward) {
        return rewardService.save(reward) ? Result.success() : Result.fail();
    }

    /**
     * Delete reward based on id
     * @param id
     * @return Result
     */
    @GetMapping("/del")
    public Result del(@RequestParam String id) {
        return rewardService.removeById(id) ? Result.success() : Result.fail();
    }

    /**
     * Update reward information based on id
     * @param reward
     * @return Result
     */
    @PostMapping("/update")
    public Result update(@RequestBody Reward reward) {
        return rewardService.updateById(reward) ? Result.success() : Result.fail();
    }

    /**
     * Paging query reward using name
     * @param queryPageParam
     * @return Result
     */
    @PostMapping("/pagingQuery")
    public Result PagingQuery(@RequestBody QueryPageParam queryPageParam){
        Page<Reward> page = new Page<>();
        page.setCurrent(queryPageParam.getPageNum());
        page.setSize(queryPageParam.getPageSize());
        HashMap params = queryPageParam.getParams();
        String name = (String) params.get("name");

        LambdaQueryWrapper<Reward> lambdaQueryWrapper = new LambdaQueryWrapper<>();

        if(StringUtils.isNotBlank(name) && !"null".equals(name)) {
            lambdaQueryWrapper.like(Reward::getName, name);
        }

        IPage result = rewardService.myPagingQuery(page, lambdaQueryWrapper);

        return Result.success(result.getRecords(), result.getTotal());
    }

    /**
     * Query reward based on name
     * @param name
     * @return Result
     */
    @GetMapping("/findByName")
    public Result findByName(@RequestParam String name) {
        List<Reward> list = rewardService.lambdaQuery().eq(Reward::getName, name).list();
        return list.size() > 0 ? Result.success(list.get(0)) : Result.fail();
    }

    /**
     * List all rewards.
     * @return Result
     */
    @GetMapping("/list")
    public Result list(){
        return Result.success(rewardService.list());
    }
}
