//  카테고리 빈 객체 생성
const setCategories = (cnt: number): Array<{ name: string }> => {
  const categories = [];
  for (let i = 1; i <= cnt + 1; i++) {
    const obj = { name: `${i}` };
    categories.push(obj);
  }
  return categories;
};

export default setCategories;
