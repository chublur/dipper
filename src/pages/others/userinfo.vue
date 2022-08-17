<template >
  <div class="manage">
    <el-dialog
      :title="operatetype === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isshow"
    >
      <commonform
        :formlabel="operateFormlabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></commonform>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isshow = false" type="danger">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="adduser">新增</el-button>
      <commonform
        :formlabel="formlabel"
        :form="searchForm"
        :inline="true"
        ref="form"
      >
        <el-button type="primary"  @click="getList(searchForm.keyword)"
          >搜索</el-button
        >
      </commonform>
    </div>
    <commontable
      :tabledata="tabledata"
      :tablelabel="tablelabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    ></commontable>
  </div>
</template>
<script>
import commonform from "@/components/commonform";
import commontable from "@/components/commontable";
import { getUser } from "@/api/index.js";
export default {
  name: "userinfo",
  data() {
    return {
      operatetype: "add",
      isshow: false,
      operateFormlabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      formlabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchForm: {
        keyword: "",
      },
      tabledata: [],
      tablelabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sex",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "address",
          label: "地址",
          width: 320,
        },
      ],
      config: {
        page: 1,
      },
    };
  },
  
  components: { commonform, commontable },
  methods: {
    confirm() {
      if (this.operateForm == "edit") {
        this.$http.post("/user/edit", this.operateForm).then((res) => {
          console.log(res);
          this.isshow = false;
          this.getList();
        });
      } else {
        this.$http.post("/user/add", this.operateForm).then((res) => {
          console.log(res);
          this.isshow = false;
          this.getList();
        });
      }
    },
    adduser() {
      this.isshow = true;
      this.operatetype = "add";
      this.operateForm = {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      };
    },
    editUser(row) {
      this.operatetype = "edit";
      this.isshow = true;
      this.operateForm = row;
    },
    delUser(row) {
      this.$confirm("此操作将永久删除该用户账号，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id;
        this.$http
          .post("/user/del", {
            params: { id },
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.getList();
          });
      });
    },
    getList(name = "") {
      this.config.loading = true;
      name ? (this.config.page = 1) : "";
      getUser({
        page: this.config.page,
        name,
      }).then(({ data: res }) => {
        this.tabledata = res.list.map((item) => {
          item.sexlabel = item.sex === 0 ? "女" : "男";
          return item;
        });
        this.config.total = res.count;
        this.config.loading = false;
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>
<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-button{
    background-color:#386078;
    border:1px solid #386078
}
.el-button:hover{
    background-color:#578daf;
    border:1px solid #578daf
}
</style>