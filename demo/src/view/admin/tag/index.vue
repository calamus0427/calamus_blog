<template>
<div>
          <el-form ref="searchForm" :inline="true" class="demo-form-inline"  :model="searchForm" >
            <el-form-item label="标签" prop="tag">
                <el-input v-model="searchForm.tag" placeholder="请输入标签" size="small"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="publishStatus">
              <el-select size="small" v-model="searchForm.publishStatus" clearable placeholder="请选择">
                <el-option
                  key="1"
                  label="正常"
                  value="1">
                </el-option>
                <el-option
                  key="0"
                  label="锁定"
                  value="0">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="创建时间" prop="createDate">
                <el-input v-model="searchForm.createDate" placeholder="请输入创建时间" size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button-group>
                <el-button  type="primary" plain size="small"  icon="el-icon-search">查询</el-button>
                <el-button   type="primary" plain size="small" @click="resetForm('searchForm')" icon="el-icon-refresh">重置</el-button>
              </el-button-group>
            </el-form-item>
        </el-form>

        <!--应用按钮-->
        <el-button-group>
            <el-button type="warning" plain size="small" @click="addFormVisible = true ">新增
            </el-button>
            <el-button type="warning" plain size="small" @click="refresh()">
            刷新
            </el-button>
        </el-button-group>

        <el-row>
          <el-col :span="5" v-for="(item,index) in tagTable" :key=item.id :offset="index % 4 > 0 ? 1 : 0">
            <el-card :body-style="{ padding: '0px'  }">
              <div style="padding: 14px;">
                <span style="text-decoration:line-through" v-if="item.publishStatus === 0">{{item.name}}</span>
                <span v-else>{{item.name}}</span>
                <div class="bottom clearfix">
                  <time class="time">{{ item.createTime }}</time>
                  <el-button type="text" class="button">
                    <el-button type="text" icon="el-icon-view"></el-button>
                    <el-button type="text" icon="el-icon-edit"></el-button>
                    <el-button type="text" icon="el-icon-delete"></el-button>
                  </el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-dialog
          title="新增标签"
          :visible.sync="addFormVisible"
          center>
            <el-form :model="tagForm" label-width="120px">
              <el-form-item label="标签名称" >
                <el-input v-model="tagForm.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="标签描述" >
                <el-input v-model="tagForm.description" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>



</div>

</template>

<script>
  export default {
    data() {
      return {
        currentPage4: 4,
        currentDate: new Date(),
        searchForm:{
          title:'',
          tag:'',
          createDate:'',
          publishDate:'',
          publishStatus:''
        },
        tagTable:[{
          id:1,
          name:'tag1',
          createTime:'2017-12-5',
          updateTime:'2017-12-5',
          description:'描述',
          publishStatus:0,
        },{
          id:2,
          name:'tag2',
          createTime:'2017-12-5',
          updateTime:'2017-12-5',
          description:'描述',
          publishStatus:1,
        },{
          id:3,
          name:'tag3',
          createTime:'2017-12-5',
          updateTime:'2017-12-5',
          description:'描述',
          publishStatus:1,
        },{
          id:4,
          name:'tag4',
          createTime:'2017-12-5',
          updateTime:'2017-12-5',
          description:'描述',
          publishStatus:1,
        },{
          id:5,
          name:'tag5',
          createTime:'2017-12-5',
          updateTime:'2017-12-5',
          description:'描述',
          publishStatus:1,
        }],
        addFormVisible:false,
        tagForm:{
          id:'',
          name:'',
          createTime:'',
          updateTime:'',
          description:'',
          publishStatus:'',
        },
      }
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      resetForm:function(formName) {
          this.$refs[formName].resetFields();
      },
      refresh(){
        window.location.reload();
      },
      filterTop(value, row) {
        return row.topStatus === value;
      },
      filterPublish(value, row) {
        return row.publishStatus === value;
      },
    }
  }
</script>

<style lang="scss" scoped>
.el-card{
  margin-top:20px;
}
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
</style>

