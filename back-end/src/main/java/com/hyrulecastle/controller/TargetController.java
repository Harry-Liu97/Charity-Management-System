package com.hyrulecastle.controller;


import com.hyrulecastle.config.Result;
import com.hyrulecastle.entity.Target;
import com.hyrulecastle.service.TargetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * ClassName: TargetController
 * Package: com.hyrulecastle.controller
 * Description:
 * Target Controller
 *
 * @author Honggang Zhang
 * @since 2023-07-11
 */
@RestController
@RequestMapping("/target")
public class TargetController {

    @Autowired
    private TargetService targetService;

    /**
     * Add target
     * @param target
     * @return Result
     */
    @PostMapping("/add")
    public Result add(@RequestBody Target target){
        return targetService.save(target) ? Result.success(): Result.fail();
    }

    /**
     * Delete target based on id
     * @param id
     * @return Result
     */
    @GetMapping("/del")
    public Result del(@RequestParam String id){
        return targetService.removeById(id) ? Result.success() : Result.fail();
    }

    /**
     * Update target based on id
     * @param target
     * @return Result
     */
    @PostMapping("/update")
    public Result update(@RequestBody Target target) {
        return targetService.updateById(target) ? Result.success() : Result.fail();
    }

    /**
     * List all targets.
     * @return Result
     */
    @GetMapping("/list")
    public Result list(){
        return Result.success(targetService.list());
    }
}
