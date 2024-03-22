package com.hyrulecastle.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hyrulecastle.config.QueryPageParam;
import com.hyrulecastle.config.Result;
import com.hyrulecastle.entity.Info;
import com.hyrulecastle.service.InfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

/**
 * ClassName: InfoController
 * Package: com.hyrulecastle.controller
 * Description:
 * Info Controller
 *
 * @author Honggang Zhang
 * @since 2023-06-26
 */
@RestController
@RequestMapping("/info")
public class InfoController {

    @Autowired
    private InfoService infoService;

    /**
     * Query by user account
     * @param no
     * @return Result
     */
    @GetMapping("/findByNo")
    public Result findByNo(@RequestParam String no) {
        List<Info> list = infoService.lambdaQuery().eq(Info::getNo, no).list();
        return list.size() > 0 ? Result.success(list.get(0)) : Result.fail();
    }

    /**
     * Update user information based on id
     * @param info
     * @return Result
     */
    @PostMapping("/update")
    public Result update(@RequestBody Info info) {
        return infoService.updateById(info) ? Result.success() : Result.fail();
    }

    /**
     * Pass in optional parameters for paging query
     * @param queryPageParam
     * @return Result
     */
    @PostMapping("/pagingQuery")
    public Result PagingQuery(@RequestBody QueryPageParam queryPageParam){
        Page<Info> page = new Page<>();
        page.setCurrent(queryPageParam.getPageNum());       // Set current page
        page.setSize(queryPageParam.getPageSize());         // Set the capacity per page

        // Gets the carried parameter
        HashMap params = queryPageParam.getParams();
        String name = (String) params.get("name");
        String role = (String) params.get("role");
        String target = (String) params.get("target");

        LambdaQueryWrapper<Info> lambdaQueryWrapper = new LambdaQueryWrapper();

        if (StringUtils.isNotBlank(name) && !"null".equals(name)) {
            lambdaQueryWrapper.like(Info::getName, name);
        }

        if (StringUtils.isNotBlank(role) && !"null".equals(role)) {
            lambdaQueryWrapper.like(Info::getRole, role);
        }

        if (StringUtils.isNotBlank(target) && !"null".equals(target)) {
            String[] targets = target.split(",");
            for (int i = 0; i < targets.length; i++) {
                lambdaQueryWrapper.like(Info::getTarget, targets[i]);
            }
        }

        // Get paging results using customPage method
        IPage result = infoService.myPagingQuery(page, lambdaQueryWrapper);

        return Result.success(result.getRecords(), result.getTotal());
    }

    /**
     * List all user information
     * @return Result
     */
    @GetMapping("/list")
    public Result list(){
        return Result.success(infoService.list());
    }
}
