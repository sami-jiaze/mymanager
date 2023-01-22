const searchConfig = {
  formItems: [
    {
      type: "input",
      prop: "name",
      label: "角色名称",
      placeholder: "请输入查询的角色名称",
      initialValue: "abc"
    },
    {
      type: "input",
      prop: "leader",
      label: "权限介绍",
      placeholder: "请输入查询的权限介绍"
    },
    {
      type: "select",
      prop: "enable",
      label: "状态",
      placeholder: "选择状态",
      options: [
        { label: "启动", value: 1 },
        { label: "禁用", value: 0 }
      ]
    },
    {
      type: "date-picker",
      prop: "createAt",
      label: "创建时间"
    }
  ]
};

export default searchConfig;
