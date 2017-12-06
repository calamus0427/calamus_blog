<template>
<div>
    <el-tabs tab-position="left">
      <el-tab-pane label="列表">
          <el-form ref="searchForm" :inline="true" class="demo-form-inline"  :model="searchForm" >
            <el-form-item label="标题" prop="title">
                <el-input v-model="searchForm.title" placeholder="请输入标题" size="small"></el-input>
            </el-form-item>
            <el-form-item label="标签" prop="tag">
                <el-input v-model="searchForm.tag" placeholder="请输入标签" size="small"></el-input>
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
            <el-form-item label="发布时间" prop="publishDate">
                <el-date-picker
                    v-model="searchForm.publishDate"
                    type="daterange"
                    size="small"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button  type="primary" size="small"  icon="el-icon-search">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button   type="primary" size="small" @click="resetForm('searchForm')" icon="el-icon-refresh">重置</el-button>
            </el-form-item>
        </el-form>

        <!--应用按钮-->
        <el-button-group>
            <el-button type="primary" size="small" @click="handleAdd()">新增
            </el-button>
            <el-button type="warning" size="small" @click="refresh()">
            刷新
            </el-button>
        </el-button-group>

                <el-table
          :data="tableData3"
          style="width: 100%"
          height="480">
          <el-table-column
              prop="cover"
              label="封面"
              fixed
              width="120">
            </el-table-column>
            <el-table-column
              prop="title"
              label="博客标题"
              fixed
              width="120">
              <template slot-scope="scope">
                  <a @click="handleDetail()">{{scope.row.title}}  <i class="el-icon-view"></i></a>
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              width="120"
              sortable>
            </el-table-column>
            <el-table-column
              prop="publishStatus"
              label="发布状态"
              width="120"
              :filters="[{ text: '已发布', value: 1 }, { text: '草稿', value: 0 }]"
              :filter-method="filterPublish"
              filter-placement="bottom-end">
              <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.publishStatus == 1">已发布</el-tag>
                  <el-tag type="info" v-if="scope.row.publishStatus == 0">草稿</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="topStatus"
              label="置顶状态"
              width="120"
              :filters="[{ text: '是', value: 1 }, { text: '否', value: 0 }]"
              :filter-method="filterTop"
              filter-placement="bottom-end">
              <template slot-scope="scope">
                  <el-tag type="danger" v-if="scope.row.topStatus == 1">是</el-tag>
                  <el-tag type="info" v-if="scope.row.topStatus == 0">否</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="tags"
              label="标签"
              width="120">
            </el-table-column>
            <el-table-column
              prop="comment"
              label="内容概要"
              width="120">
            </el-table-column>
            <el-table-column
              prop="remarks"
              label="备注"
              width="120">
            </el-table-column>
            <el-table-column
              prop="publishTime"
              label="发布日期"
              width="150"
              sortable>
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="最近修改日期"
              width="150"
              sortable>
            </el-table-column>
            <el-table-column label="数据统计">
              <el-table-column
                prop="readNum"
                label="阅读数"
                width="120">
              </el-table-column>
              <el-table-column
                prop="commentNum"
                label="评论数"
                width="120"
                sortable>
              </el-table-column>
              <el-table-column
                prop="pointNum"
                label="点赞数"
                width="300"
                sortable>
              </el-table-column>
            </el-table-column>
            <el-table-column
                label="操作"
                width="400"
                fixed="right">
                <template slot-scope="scope">
                          <el-button-group >
                              <el-button size="small" type="primary" @click="handleEdit(scope.row)">
                                  <a class="el-icon-edit" style="color: white;"></a> 编辑
                              </el-button>
                              <el-button size="small" type="danger" >
                                  <a class="el-icon-circle-close" style="color: white;"></a> 移入回收站
                              </el-button>
                              <el-button v-if="scope.row.topStatus === 0 && scope.row.publishStatus === 1" size="small" type="warning">
                                  <a class="el-icon-upload2" style="color: white;"></a> 置顶
                              </el-button>
                              <el-button v-if="scope.row.topStatus === 1" size="small" type="warning">
                                  <a class="el-icon-setting" style="color: white;"></a> 取消置顶
                              </el-button>

                              <el-button v-if="scope.row.publishStatus === 0" size="small" type="success">
                                  <a class="el-icon-upload" style="color: white;"></a> 发布
                              </el-button>
                              <el-button v-if="scope.row.publishStatus === 1" size="small" type="info">
                                  <a class="el-icon-document" style="color: white;"></a> 存为草稿
                              </el-button>
                          </el-button-group>
                      </template>
            </el-table-column>
        </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="回收站">
        <el-form ref="searchForm" :inline="true" class="demo-form-inline"  :model="searchForm" >
            <el-form-item label="标题" prop="title">
                <el-input v-model="searchForm.title" placeholder="请输入标题" size="small"></el-input>
            </el-form-item>
            <el-form-item label="标签" prop="tag">
                <el-input v-model="searchForm.tag" placeholder="请输入标签" size="small"></el-input>
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
            <el-form-item label="删除时间" prop="delDate">
                <el-date-picker
                    v-model="searchForm.delDate"
                    type="daterange"
                    size="small"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button  type="primary" size="small"  icon="el-icon-search">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button   type="primary" size="small" @click="resetForm('searchForm')" icon="el-icon-refresh">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table
          :data="tableData3"
          style="width: 100%"
          height="480">
          <el-table-column
              prop="cover"
              label="封面"
              fixed
              width="120">
            </el-table-column>
            <el-table-column
              prop="title"
              label="博客标题"
              fixed
              width="120">
              <template slot-scope="scope">
                  <a @click="handleDetail()">{{scope.row.title}}  <i class="el-icon-view"></i></a>
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              width="120"
              sortable>
            </el-table-column>
            <el-table-column
              prop="delTime"
              label="删除时间"
              width="150"
              sortable>
            </el-table-column>
            <el-table-column
              prop="tags"
              label="标签"
              width="120">
            </el-table-column>
            <el-table-column
              prop="comment"
              label="内容概要"
              width="120">
            </el-table-column>
            <el-table-column
              prop="remarks"
              label="备注"
              width="120">
            </el-table-column>
            <el-table-column
              prop="publishTime"
              label="发布日期"
              width="150"
              sortable>
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="最近修改日期"
              width="150"
              sortable>
            </el-table-column>
            <el-table-column label="数据统计">
              <el-table-column
                prop="readNum"
                label="阅读数"
                width="120"
                sortable>
              </el-table-column>
              <el-table-column
                prop="commentNum"
                label="评论数"
                width="120"
                sortable>
              </el-table-column>
              <el-table-column
                prop="pointNum"
                label="点赞数"
                width="300"
                sortable>
              </el-table-column>
            </el-table-column>
            <el-table-column
                label="操作"
                width="200"
                fixed="right">
                <template slot-scope="scope">
                          <el-button-group >
                              <el-button size="small" type="info">
                                  <a class="el-icon-refresh" style="color: white;"></a> 恢复
                              </el-button>
                              <el-button size="small" type="danger">
                                  <a class="el-icon-circle-close" style="color: white;"></a> 删除
                              </el-button>
                          </el-button-group>
                      </template>
            </el-table-column>
        </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
      </el-tab-pane>
    </el-tabs>
        <el-dialog
        title="新建博客"
        :fullscreen="true"
        :visible.sync="addFormVisible">
        </el-dialog>
         <el-dialog
        title="查看详情"
        :visible.sync="detailFormVisible">
        </el-dialog>
        <el-dialog
        title="编辑博客"
        :fullscreen="true"
        :visible.sync="editFormVisible">
        </el-dialog>
</div>

</template>

<script>
  export default {
    data() {
      return {
        addFormVisible:false,
        detailFormVisible:false,
        editFormVisible:false,
        tableData3: [{
          cover:'',
          title:'文章1',
          createTime:'2017-12-6',
          updateTime:'2017-12-6',
          publishTime:'2017-12-6',
          topStatus:1,
          publishStatus:1,
          tags:[1,2,3],
          content:'简介1',
          remarks:'备注1',
          readNum:25,
          commentNum:2,
          pointNum:1,
        }, {
          cover:'',
          title:'文章2',
          createTime:'2017-12-6',
          updateTime:'2017-12-6',
          publishTime:'2017-12-6',
          topStatus:0,
          publishStatus:0,
          tags:[1,2,3],
          content:'简介2',
          remarks:'备注2',
          readNum:25,
          commentNum:2,
          pointNum:1,
        },{
          cover:'',
          title:'文章3',
          createTime:'2017-12-6',
          updateTime:'2017-12-6',
          publishTime:'2017-12-6',
          topStatus:0,
          publishStatus:1,
          tags:[1,2,3],
          content:'简介3',
          remarks:'备注3',
          readNum:25,
          commentNum:2,
          pointNum:1,
        }],
        currentPage4: 1,
        searchForm:{
          title:'',
          tag:'',
          createDate:'',
          publishDate:'',
          delDate:'',

        }
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
      /*新增 */
      handleAdd(){
                this.addFormVisible = true ;
      },
      /* 查看详情 */
      handleDetail(row){
          this.detailFormVisible = true ;
      },
      /*编辑 */
      handleEdit(){
          this.editFormVisible = true ;
      },
    }
  }
</script>

<style lang="scss" scoped>
  a{
    text-decoration: none;
    color:#3c54d2;
    cursor: pointer;
  }
  a:hover{
    cursor: pointer;
    color:aquamarine;

  }
</style>

