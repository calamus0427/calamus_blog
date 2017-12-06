<template>
<div style="margin:40px;">
  <cl-canvasBg></cl-canvasBg>
          <el-form ref="searchForm" :inline="true" class="demo-form-inline"  :model="searchForm" >
            <el-form-item label="标签" prop="tag">
                <el-input v-model="searchForm.tag" placeholder="请输入标签" size="small"></el-input>
            </el-form-item>
            <el-form-item label="启用状态" prop="publishStatus">
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
              <el-date-picker
                v-model="searchForm.createDate"
                type="daterange"
                size="small"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
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
            <el-button type="warning" plain size="small" @click="handleAdd()">新增
            </el-button>
            <el-button type="warning" plain size="small" @click="refresh()">
            刷新
            </el-button>
        </el-button-group>

        <el-row>
          <el-col :span="5" v-for="(item,index) in tagTable" :key=item.id :offset="index % 4 > 0 ? 1 : 0">
            <el-card :body-style="{ padding: '0px'  }">
              <div style="padding: 14px;">
                <span style="text-decoration:line-through" v-if="item.publishStatus === false">{{item.name}}</span>
                <span v-else>{{item.name}}</span>
                <div class="bottom clearfix">
                  <time class="time">{{ item.createTime }}</time>
                  <el-button type="text" class="button">
                    <el-button type="text" icon="el-icon-view" @click="handleDetail(item)"></el-button>
                    <el-button type="text" icon="el-icon-edit" @click="handleEdit(item)"></el-button>
                    <el-button type="text" icon="el-icon-delete" @click="handleDel(item.id)"></el-button>
                  </el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-dialog
          title="新增标签"
          :visible.sync="addFormVisible"
          width="30%"
          center>
          <el-form :model="tagForm" label-width="70px">
            <el-form-item label="标签名称" >
              <el-input v-model="tagForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="标签描述" >
              <el-input v-model="tagForm.description" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="启用状态" >
                <el-switch v-model="tagForm.publishStatus"></el-switch>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="success" plain  @click="addSubmit()">确 定</el-button>
            <el-button type="info" plain  @click="addCancel()">取 消</el-button>
          </div>
        </el-dialog>

        <el-dialog
          title="编辑标签"
          :visible.sync="editFormVisible"
          width="30%"
          center>
          <el-form :model="tagForm" label-width="70px">
            <el-form-item label="标签名称" >
              <el-input v-model="tagForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="标签描述" >
              <el-input v-model="tagForm.description" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="启用状态" >
                <el-switch v-model="tagForm.publishStatus"></el-switch>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="success" plain  @click="editFormVisible = false">确 定</el-button>
            <el-button type="info" plain  @click="editFormVisible = false">取 消</el-button>
          </div>
        </el-dialog>

        <el-dialog
          title="查看详情"
          :visible.sync="detailFormVisible"
          width="50%"
          center>
          <el-form :model="tagForm" label-width="100px">
            <el-form-item label="标签ID：" >
                <span>{{tagForm.id}}</span>
            </el-form-item>
            <el-form-item label="标签名称：" >
                <span>{{tagForm.name}}</span>
            </el-form-item>
            <el-form-item label="标签描述：" >
                <span>{{tagForm.description}}</span>
            </el-form-item>
            <el-form-item label="启用状态：" >
                <el-switch v-model="tagForm.publishStatus" disabled></el-switch>
            </el-form-item>
            <el-form-item label="标签下文章：" >

            </el-form-item>
            <el-table :data="detailArticle">
                  <el-table-column prop="title" label="标题" width="150"></el-table-column>
                  <el-table-column prop="createDate" label="创建时间" width="200"></el-table-column>
                  <el-table-column  label="操作">
                    <template slot-scope="scope">
                      <el-tooltip class="item" effect="light" content="移除标签" placement="right" >
                        <a ><i class="el-icon-circle-close"></i></a>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                </el-table>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button type="success" plain  @click="handleEdit(tagForm)">编 辑</el-button>
            <el-button type="info" plain  @click="handleDel(tagForm.id)">删 除</el-button>
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
          publishStatus:false,
        },{
          id:2,
          name:'tag2',
          createTime:'2017-12-5',
          updateTime:'2017-12-5',
          description:'描述',
          publishStatus:false,
        },{
          id:3,
          name:'tag3',
          createTime:'2017-12-5',
          updateTime:'2017-12-5',
          description:'描述',
          publishStatus:true,
        },{
          id:4,
          name:'tag4',
          createTime:'2017-12-5',
          updateTime:'2017-12-5',
          description:'描述',
          publishStatus:true,
        },{
          id:5,
          name:'tag5',
          createTime:'2017-12-5',
          updateTime:'2017-12-5',
          description:'描述',
          publishStatus:true,
        }],
        detailArticle:[{
          id:1,
          title:'文章1',
          createDate:'2017-12-6',
          tags:['tag1','tag2','tag3']
        }],
        tagForm:{
          id:'',
          name:'',
          createTime:'',
          updateTime:'',
          description:'',
          publishStatus:true,
        },
        addFormVisible:false,
        editFormVisible:false,
        detailFormVisible:false,

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
      /*新增相关操作*/
      handleAdd(){
        this.tagForm.id = '';
        this.tagForm.name = '' ;
        this.tagForm.createTime = new Date();
        this.tagForm.updateTime = new Date();
        this.tagForm.description = '';
        this.tagForm.publishStatus = true;
        this.addFormVisible = true ;

      },
      addSubmit(){
        this.tagTable.push(this.tagForm);
        this.addFormVisible = false ;
      },
      addCancel(){
        this.addFormVisible = false ;

      },

      /*查看详情相关操作*/
      handleDetail(item){
        this.tagForm.id = item.id;
        this.tagForm.name = item.name ;
        this.tagForm.createTime = item.createTime;
        this.tagForm.updateTime =item.updateTime;
        this.tagForm.description = item.description;
        this.tagForm.publishStatus = item.publishStatus;
        this.detailFormVisible = true ;
      },
      /*编辑相关操作*/
      handleEdit(item){
        this.tagForm.id = item.id;
        this.tagForm.name = item.name ;
        this.tagForm.createTime = item.createTime;
        this.tagForm.updateTime =item.updateTime;
        this.tagForm.description = item.description;
        this.tagForm.publishStatus = item.publishStatus;
         this.editFormVisible = true ;
      },
      //删除
      handleDel(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.addFormVisible = false;
          this.editFormVisible = false;
          this.detailFormVisible = false;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
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

