const TagDish = [
  "Calo thấp",
  "Calo cao",
  "Đạm thấp",
  "Đạm cao",
  "Dễ nấu",
  "Khó nấu",
  "Tốt cho sức khỏe",
  "Không tốt cho sức khỏe",
  "Rau củ",
  "Thịt gia cầm",
  "Thịt bò",
  "Thịt heo",
  "Thực phẩm nhanh",
  "Hải sản",
  "Mì ống",
  "Mì xào",
  "Mì hủ tiếu",
  "Bún",
  "Phở",
  "Cơm trắng",
  "Cơm nâu",
  "Salad",
  "Gỏi",
  "Bánh mì",
  "Bánh tráng",
  "Bánh xèo",
  "Bánh mì sandwich",
  "Bánh canh",
  "Bánh đậu xanh",
  "Bánh flan",
  "Bánh gato",
  "Bánh bao",
  "Bánh bèo",
  "Bánh trung thu",
  "Bánh mì nướng",
  "Bánh mì chiên",
  "Bánh mì que",
  "Bánh mì kẹp",
  "Bánh mì mềm",
  "Bánh xốp",
  "Bánh ngọt",
  "Bánh tráng trộn",
  "Bánh ít",
  "Bánh cuốn",
  "Bánh nướng",
  "Bánh trôi",
  "Bánh chưng",
  "Bánh dày",
  // Thêm các tags khác tương tự ở đây
];

const TagDishConstants = TagDish.map((tag, index) => ({
  value: tag,
  id: index  + 1,
}));

export default TagDishConstants;
