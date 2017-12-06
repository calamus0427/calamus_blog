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
                <el-input v-model="searchForm.createDate" placeholder="请输入创建时间" size="small"></el-input>
            </el-form-item>
            <el-form-item label="发布时间" prop="publishDate">
                <el-input v-model="searchForm.publishDate" placeholder="请输入发布时间" size="small"></el-input>
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
            <el-button type="primary" size="small" @click="addFormVisible = true ">新增
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
              prop="name"
              label="封面"
              fixed
              width="120">
            </el-table-column>
            <el-table-column
              prop="name"
              label="博客标题"
              fixed
              width="120">
            </el-table-column>
            <el-table-column
              prop="date"
              label="创建时间"
              width="120"
              sortable>
            </el-table-column>
            <el-table-column
              prop="publishStatus"
              label="发布状态"
              width="120"
              :filters="[{ text: '发布', value: 1 }, { text: '草稿', value: 0 }]"
              :filter-method="filterPublish"
              filter-placement="bottom-end">
              <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.publishStatus == 1">发布</el-tag>
                  <el-tag type="info" v-if="scope.row.publishStatus == 0">草稿</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
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
              prop="name"
              label="标签"
              width="120">
            </el-table-column>
            <el-table-column
              prop="name"
              label="内容概要"
              width="120">
            </el-table-column>
            <el-table-column
              prop="name"
              label="备注"
              width="120">
            </el-table-column>
            <el-table-column
              prop="date"
              label="发布日期"
              width="150"
              sortable>
            </el-table-column>
            <el-table-column
              prop="date"
              label="最近修改日期"
              width="150"
              sortable>
            </el-table-column>
            <el-table-column label="数据统计">
              <el-table-column
                prop="province"
                label="阅读数"
                width="120"
                sortable>
              </el-table-column>
              <el-table-column
                prop="city"
                label="评论数"
                width="120"
                sortable>
              </el-table-column>
              <el-table-column
                prop="address"
                label="点赞数"
                width="300"
                sortable>
              </el-table-column>
            </el-table-column>
            <el-table-column
                label="操作"
                width="300"
                fixed="right">
                <template slot-scope="scope">
                          <el-button-group >
                              <el-button size="small" type="success">
                                  <a class="el-icon-circle-check" style="color: white;"></a> 启用
                              </el-button>
                              <el-button size="small" type="danger">
                                  <a class="el-icon-circle-close" style="color: white;"></a> 禁用
                              </el-button>
                              <el-button size="small" type="info">
                                  <a class="el-icon-edit" style="color: white;"></a> 编辑
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

        <el-dialog
        title="收货地址"
        :fullscreen="true"
        :visible.sync="addFormVisible">
          www
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="回收站">
                <el-table
          :data="tableData3"
          style="width: 100%"
          height="480">
          <el-table-column
              prop="name"
              label="封面"
              fixed
              width="120">
            </el-table-column>
            <el-table-column
              prop="name"
              label="博客标题"
              fixed
              width="120">
            </el-table-column>
            <el-table-column
              prop="date"
              label="创建时间"
              width="120">
            </el-table-column>
            <el-table-column
              prop="publishStatus"
              label="发布状态"
              width="120">
              <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.publishStatus == 1">发布</el-tag>
                  <el-tag type="info" v-if="scope.row.publishStatus == 0">草稿</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="置顶状态"
              width="120">
              <template slot-scope="scope">
                  <el-tag type="danger" v-if="scope.row.topStatus == 1">是</el-tag>
                  <el-tag type="info" v-if="scope.row.topStatus == 0">否</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="标签"
              width="120">
            </el-table-column>
            <el-table-column
              prop="name"
              label="内容概要"
              width="120">
            </el-table-column>
            <el-table-column
              prop="name"
              label="备注"
              width="120">
            </el-table-column>
            <el-table-column
              prop="date"
              label="发布日期"
              width="150">
            </el-table-column>
            <el-table-column
              prop="date"
              label="最近修改日期"
              width="150">
            </el-table-column>
            <el-table-column label="数据统计">
              <el-table-column
                prop="province"
                label="阅读数"
                width="120">
              </el-table-column>
              <el-table-column
                prop="city"
                label="评论数"
                width="120">
              </el-table-column>
              <el-table-column
                prop="address"
                label="点赞数"
                width="300">
              </el-table-column>
            </el-table-column>
            <el-table-column
                label="操作"
                width="300"
                fixed="right">
                <template slot-scope="scope">
                          <el-button-group >
                              <el-button size="small" type="success">
                                  <a class="el-icon-circle-check" style="color: white;"></a> 启用
                              </el-button>
                              <el-button size="small" type="danger">
                                  <a class="el-icon-circle-close" style="color: white;"></a> 禁用
                              </el-button>
                              <el-button size="small" type="info">
                                  <a class="el-icon-edit" style="color: white;"></a> 编辑
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

</div>

</template>

<script>
  export default {
    data() {
      return {
        addFormVisible:false,
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          topStatus:1,
          publishStatus:1
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          topStatus:0,
          publishStatus:0
        }],
        currentPage4: 4,
        searchForm:{
          title:'',
          tag:'',
          createDate:'',
          publishDate:'',

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
    }
  }
</script>
