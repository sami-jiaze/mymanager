import hyRequest from "..";

// 获取所有role信息
export function getEntireRoles() {
  return hyRequest.post({
    url: "/role/list"
  });
}

// 获取所有列表信息
export function getEntireDepartments() {
  return hyRequest.post({
    url: "/department/list"
  });
}
// 菜单列表
export function getEntireMenus() {
  return hyRequest.post({
    url: "/menu/list"
  });
}
